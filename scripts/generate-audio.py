"""聴解 savollari uchun real yapon ovozli mp3 fayllar yaratadi.

Ovozlar (Microsoft neural, edge-tts):
  女 (F)  — ja-JP-NanamiNeural
  男 (M)  — ja-JP-KeitaNeural
  Narrator — Nanami, pastroq ohangda

Ishga tushirish (loyiha ildizidan):
  pip install edge-tts imageio-ffmpeg
  python scripts/generate-audio.py

Natija: har bir savolning `audio` maydonidagi yo'l (public/ ichida).
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

VOICES = {
    "F": {"voice": "ja-JP-NanamiNeural", "rate": "-8%", "pitch": "+0Hz"},
    "M": {"voice": "ja-JP-KeitaNeural", "rate": "-8%", "pitch": "+0Hz"},
    "N": {"voice": "ja-JP-NanamiNeural", "rate": "-10%", "pitch": "-12Hz"},
}

GAP_LINE = 0.7  # replikalar orasidagi pauza (s)
GAP_SECTION = 1.5  # savol va dialog orasidagi pauza (s)


def load_questions(test_slug: str):
    if test_slug not in {"test-2", "test-3"}:
        raise ValueError(f"Unknown test: {test_slug}")

    result = subprocess.run(
        f"npx tsx scripts/export-questions.ts {test_slug}",
        cwd=ROOT,
        capture_output=True,
        check=True,
        shell=True,
    )
    return json.loads(result.stdout.decode("utf-8"))


async def speak(text: str, speaker: str, path: Path):
    cfg = VOICES[speaker]
    await edge_tts.Communicate(
        text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"]
    ).save(str(path))


def silence(seconds: float, path: Path):
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-f", "lavfi",
         "-i", "anullsrc=r=24000:cl=mono", "-t", str(seconds),
         "-q:a", "4", str(path)],
        check=True,
    )


def concat(parts: list[Path], out: Path, tmp: Path):
    listing = tmp / "list.txt"
    listing.write_text(
        "".join(f"file '{p.as_posix()}'\n" for p in parts), encoding="utf-8"
    )
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
         "-i", str(listing), "-ar", "24000", "-ac", "1", "-b:a", "64k",
         str(out)],
        check=True,
    )


async def build(question: dict, number: int, tmp: Path):
    gap_line = tmp / "gap_line.mp3"
    gap_section = tmp / "gap_section.mp3"
    parts: list[Path] = []

    intro = tmp / "intro.mp3"
    await speak(f"{number}番。{question['question']}", "N", intro)
    parts += [intro, gap_section]

    for index, line in enumerate(question["script"]):
        path = tmp / f"line{index}.mp3"
        await speak(line["text"], line["speaker"], path)
        parts += [path, gap_line]

    # Real imtihondagidek savol oxirida yana bir marta o'qiladi.
    outro = tmp / "outro.mp3"
    await speak(question["question"], "N", outro)
    parts += [gap_section, outro]

    silence(GAP_LINE, gap_line)
    silence(GAP_SECTION, gap_section)
    out = PUBLIC / question["audio"].lstrip("/")
    out.parent.mkdir(parents=True, exist_ok=True)
    concat(parts, out, tmp)


async def main():
    test_slug = sys.argv[1] if len(sys.argv) > 1 else "test-2"
    questions = load_questions(test_slug)

    for number, question in enumerate(questions, start=1):
        if not question.get("script") or not question.get("audio"):
            continue
        with tempfile.TemporaryDirectory() as tmp:
            await build(question, number, Path(tmp))
        print(question["audio"])


if __name__ == "__main__":
    asyncio.run(main())
