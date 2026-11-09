"""JLPT 聴解 uchun rasmlar yaratadi (OpenAI gpt-image-2).

  発話表現 — vaziyat rasmi, gapiruvchini qizil strelka ko'rsatadi:
             public/images/<slug>/<id>.jpg
  課題理解 — har bir javob varianti uchun alohida rasm:
             public/images/<slug>/<id>-<n>.jpg

Promptlar: scripts/jlpt-image-spec.json (variant matni → rasm tavsifi).
Natija manifesti: lib/jlpt-images.json (sayt shu fayldan rasmlarni ulaydi).

Ishga tushirish (loyiha ildizidan, .env.local da OPENAI_API_KEY bo'lishi kerak):
  python scripts/generate-jlpt-images.py                 # faqat yo'q rasmlar
  python scripts/generate-jlpt-images.py --only n5-1:57  # bitta savol
  python scripts/generate-jlpt-images.py --force         # hammasini qaytadan
"""

import base64
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
SPEC = ROOT / "scripts" / "jlpt-image-spec.json"
MANIFEST = ROOT / "lib" / "jlpt-images.json"
PUBLIC = ROOT / "public"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
MODEL = "gpt-image-2"


def api_key():
    key = os.environ.get("OPENAI_API_KEY")
    if key:
        return key
    for line in (ROOT / ".env.local").read_text(encoding="utf-8").splitlines():
        if line.startswith("OPENAI_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("OPENAI_API_KEY topilmadi (.env.local).")


KEY = api_key()


def generate(prompt: str, out: Path, width: int):
    body = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "size": "1024x1024",
        "quality": "medium",
        "n": 1,
    }).encode("utf-8")
    request = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
    )
    last_error = None
    for _ in range(3):
        try:
            with urllib.request.urlopen(request, timeout=300) as response:
                data = json.loads(response.read())
            raw = base64.b64decode(data["data"][0]["b64_json"])
            break
        except Exception as error:  # tarmoq yoki vaqtinchalik xato — qayta urinish
            last_error = error
    else:
        raise RuntimeError(f"{out.name}: {last_error}")

    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as folder:
        source = Path(folder) / "source.png"
        source.write_bytes(raw)
        subprocess.run(
            [FFMPEG, "-y", "-loglevel", "error", "-i", str(source),
             "-vf", f"scale={width}:-1", "-q:v", "4", str(out)],
            check=True,
        )


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    force = "--force" in sys.argv
    only = None
    if "--only" in sys.argv:
        only = sys.argv[sys.argv.index("--only") + 1]

    spec = json.loads(SPEC.read_text(encoding="utf-8"))
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    jobs = []

    for item in spec["items"]:
        slug, qid = item["slug"], str(item["id"])
        if only and only != f"{slug}:{qid}":
            continue
        entry = manifest.setdefault(slug, {}).setdefault(qid, {})

        if item["kind"] == "picture":
            out = PUBLIC / "images" / slug / f"{qid}.jpg"
            entry["picture"] = f"/images/{slug}/{qid}.jpg"
            if force or only or not out.exists():
                jobs.append((f"{spec['style']['picture']} Scene: {item['prompt']}", out, 768))
        else:
            entry["options"] = {}
            for n, (text, description) in enumerate(item["options"].items(), start=1):
                out = PUBLIC / "images" / slug / f"{qid}-{n}.jpg"
                entry["options"][text] = f"/images/{slug}/{qid}-{n}.jpg"
                if force or only or not out.exists():
                    jobs.append((f"{spec['style']['option']} Subject: {description}", out, 480))

    print(f"{len(jobs)} ta rasm yaratiladi...")
    failed = 0
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(generate, prompt, out, width): out for prompt, out, width in jobs}
        for future in as_completed(futures):
            out = futures[future]
            try:
                future.result()
                print("✓", out.relative_to(PUBLIC).as_posix())
            except Exception as error:
                failed += 1
                print("✗", error)

    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Tayyor. Xato: {failed}. Manifest: lib/jlpt-images.json")


if __name__ == "__main__":
    main()
