"""Qog'ozda imtihon uchun 聴解 ning bitta uzluksiz audiosini yig'adi.

Tartib (real JLPT kabi):
  boshlanish e'loni → har bir 問題: ko'rsatma → savollar (har biridan keyin
  javob uchun pauza) → tugash e'loni

Natija: pdf/JLPT-<slug>-choukai.mp3 (sinfda kolonkada qo'yish uchun).
Avval savol audiolari bo'lishi kerak: python scripts/generate-jlpt-audio.py <slug>

Ishga tushirish: python scripts/make-choukai-track.py n5-1
"""

import asyncio
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import edge_tts
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
NARRATOR = {"voice": "ja-JP-NanamiNeural", "rate": "-8%", "pitch": "-14Hz"}
LEVEL_NAMES = {"n3": "N3", "n4": "N4", "n5": "N5"}


def load(slug: str):
    result = subprocess.run(
        f"npx tsx scripts/export-jlpt.ts {slug}",
        cwd=ROOT, capture_output=True, check=True, shell=True,
    )
    return json.loads(result.stdout.decode("utf-8"))


async def speak(text: str, path: Path):
    await edge_tts.Communicate(
        text, NARRATOR["voice"], rate=NARRATOR["rate"], pitch=NARRATOR["pitch"]
    ).save(str(path))


def silence(seconds: float, path: Path):
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-f", "lavfi",
         "-i", "anullsrc=r=24000:cl=mono", "-t", str(seconds),
         "-q:a", "4", str(path)],
        check=True,
    )


def duration(path: Path) -> float:
    out = subprocess.run([FFMPEG, "-i", str(path)], capture_output=True, text=True).stderr
    h, m, s = out.split("Duration: ")[1].split(",")[0].split(":")
    return int(h) * 3600 + int(m) * 60 + float(s)


async def main():
    sys.stdout.reconfigure(encoding="utf-8")
    slug = sys.argv[1]
    data = load(slug)
    level = LEVEL_NAMES.get(data["level"], data["level"])
    answer = {m["mondai"]: m["answerSeconds"] for m in data["mondai"]}

    with tempfile.TemporaryDirectory() as folder:
        tmp = Path(folder)
        gaps: dict[float, Path] = {}

        def gap(seconds: float) -> Path:
            if seconds not in gaps:
                gaps[seconds] = tmp / f"gap{len(gaps)}.mp3"
                silence(seconds, gaps[seconds])
            return gaps[seconds]

        opening, ending = tmp / "opening.mp3", tmp / "ending.mp3"
        await speak(f"日本語能力試験、{level}、聴解。これから、聴解の試験を始めます。", opening)
        await speak("これで、聴解の試験を終わります。", ending)

        parts = [opening, gap(2.0)]
        last_mondai = None
        for item in data["items"]:
            if item["mondai"] != last_mondai:
                last_mondai = item["mondai"]
                parts += [PUBLIC / "audio" / slug / f"mondai-{last_mondai}.mp3", gap(1.5)]
            parts += [PUBLIC / item["audio"].lstrip("/"), gap(answer.get(item["mondai"], 10))]
        parts += [ending]

        missing = [p for p in parts if not p.exists()]
        if missing:
            raise SystemExit(f"Audio topilmadi: {missing[0]}")

        listing = tmp / "list.txt"
        listing.write_text("".join(f"file '{p.as_posix()}'\n" for p in parts), encoding="utf-8")
        out = ROOT / "pdf" / f"JLPT-{slug}-choukai.mp3"
        subprocess.run(
            [FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
             "-i", str(listing), "-ar", "24000", "-ac", "1", "-b:a", "64k", str(out)],
            check=True,
        )

    minutes = duration(out) / 60
    print(f"✓ pdf/{out.name} — {minutes:.1f} daqiqa, {out.stat().st_size / 1e6:.1f} MB")


if __name__ == "__main__":
    asyncio.run(main())
