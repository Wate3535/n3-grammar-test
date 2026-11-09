"""JLPT 聴解 uchun real imtihon tuzilishidagi mp3 fayllar yaratadi.

Har bir 問題 uchun ko'rsatma:   public/audio/<slug>/mondai-<n>.mp3
Har bir savol uchun:            public/audio/<slug>/<id>.mp3
Ovoz tekshiruvi (bir marta):    public/audio/jlpt-sound-check.mp3

Savol tuzilishi (rasmiy JLPT kabi):
  課題理解 / ポイント理解: 「N番」 → vaziyat + savol → (ポイント理解: o'qish pauzasi)
                           → suhbat → savol yana bir marta
  概要理解:               「N番」 → vaziyat → suhbat → savol → 1〜4 variantlar ovozda
  発話表現:               「N番」 → vaziyat va savol → 1〜3 variantlar (→ odamning ovozida)
  即時応答:               「N番」 → gap → 1〜3 javoblar (boshqa odam ovozida)
Javob uchun pauza audioga yozilmaydi — uni sayt o'zi qo'shadi.

Ovozlar (Microsoft neural, edge-tts):
  女 — ja-JP-NanamiNeural, 男 — ja-JP-KeitaNeural, diktor — Nanami (pastroq ohang)

Ishga tushirish (loyiha ildizidan):
  pip install edge-tts imageio-ffmpeg
  python scripts/generate-jlpt-audio.py n3-1            # faqat yo'q fayllar
  python scripts/generate-jlpt-audio.py n3-1 --force    # hammasini qaytadan
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
    "F": {"voice": "ja-JP-NanamiNeural", "rate": "-5%", "pitch": "+0Hz"},
    "M": {"voice": "ja-JP-KeitaNeural", "rate": "-5%", "pitch": "+0Hz"},
    "N": {"voice": "ja-JP-NanamiNeural", "rate": "-8%", "pitch": "-14Hz"},
}
NUMBERS = ["いち", "に", "さん", "よん"]


def load(slug: str):
    result = subprocess.run(
        f"npx tsx scripts/export-jlpt.ts {slug}",
        cwd=ROOT, capture_output=True, check=True, shell=True,
    )
    return json.loads(result.stdout.decode("utf-8"))


async def speak(text: str, speaker: str, path: Path):
    cfg = VOICES[speaker]
    for attempt in range(5):
        try:
            await edge_tts.Communicate(
                text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"]
            ).save(str(path))
            return
        except Exception as error:  # tarmoq uzilishi — qayta urinish
            if attempt == 4:
                raise
            print(f"  retry {attempt + 1}: {error}", file=sys.stderr)
            await asyncio.sleep(3 * (attempt + 1))


def silence(seconds: float, path: Path):
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-f", "lavfi",
         "-i", "anullsrc=r=24000:cl=mono", "-t", str(seconds),
         "-q:a", "4", str(path)],
        check=True,
    )


def concat(parts: list[Path], out: Path, tmp: Path):
    listing = tmp / "list.txt"
    listing.write_text("".join(f"file '{p.as_posix()}'\n" for p in parts), encoding="utf-8")
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
         "-i", str(listing), "-ar", "24000", "-ac", "1", "-b:a", "64k", str(out)],
        check=True,
    )


class Builder:
    def __init__(self, tmp: Path):
        self.tmp = tmp
        self.parts: list[Path] = []
        self.count = 0
        self.gaps: dict[float, Path] = {}

    async def say(self, text: str, speaker: str = "N"):
        self.count += 1
        path = self.tmp / f"p{self.count}.mp3"
        await speak(text, speaker, path)
        self.parts.append(path)

    def gap(self, seconds: float):
        if seconds not in self.gaps:
            path = self.tmp / f"gap{len(self.gaps)}.mp3"
            silence(seconds, path)
            self.gaps[seconds] = path
        self.parts.append(self.gaps[seconds])


def other(speaker: str) -> str:
    return "F" if speaker == "M" else "M"


async def build_item(item: dict, reading_pause: float, out: Path):
    with tempfile.TemporaryDirectory() as folder:
        b = Builder(Path(folder))
        kind = item["type"]
        number = f"{item['number']}番。"
        script = item.get("script") or []
        intro = item.get("intro") or ""

        if kind in ("課題理解", "ポイント理解"):
            await b.say(number)
            b.gap(0.8)
            await b.say(f"{intro}{item['question']}")
            b.gap(reading_pause if kind == "ポイント理解" else 1.5)
            for line in script:
                await b.say(line["text"], line["speaker"])
                b.gap(0.6)
            b.gap(0.8)
            await b.say(item["question"])

        elif kind == "概要理解":
            await b.say(number)
            b.gap(0.8)
            await b.say(intro)
            b.gap(1.2)
            for line in script:
                await b.say(line["text"], line["speaker"])
                b.gap(0.6)
            b.gap(0.8)
            await b.say(item["question"])
            b.gap(1.0)
            for i, option in enumerate(item["options"]):
                await b.say(f"{NUMBERS[i]}、{option}")
                b.gap(0.8)

        elif kind == "発話表現":
            voice = item.get("speaker") or "F"
            await b.say(number)
            b.gap(0.8)
            await b.say(item["question"])
            b.gap(1.2)
            for i, option in enumerate(item["options"]):
                await b.say(NUMBERS[i])
                b.gap(0.3)
                await b.say(option, voice)
                b.gap(0.9)

        elif kind == "即時応答":
            first = script[0]
            await b.say(number)
            b.gap(0.8)
            await b.say(first["text"], first["speaker"])
            b.gap(1.2)
            for i, option in enumerate(item["options"]):
                await b.say(NUMBERS[i])
                b.gap(0.3)
                await b.say(option, other(first["speaker"]))
                b.gap(0.9)

        else:
            raise ValueError(f"Noma'lum tur: {kind}")

        concat(b.parts, out, b.tmp)


async def build_text(text: str, out: Path):
    with tempfile.TemporaryDirectory() as folder:
        b = Builder(Path(folder))
        await b.say(text)
        b.gap(1.0)
        concat(b.parts, out, b.tmp)


async def main():
    slug = sys.argv[1]
    force = "--force" in sys.argv
    data = load(slug)
    folder = PUBLIC / "audio" / slug

    check = PUBLIC / "audio" / "jlpt-sound-check.mp3"
    if not check.exists():
        await build_text("これは音のテストです。音がよく聞こえるか、確認してください。", check)
        print("/audio/jlpt-sound-check.mp3")

    for m in data["mondai"]:
        out = folder / f"mondai-{m['mondai']}.mp3"
        if force or not out.exists():
            await build_text(m["instruction"], out)
            print(f"/audio/{slug}/mondai-{m['mondai']}.mp3")

    for item in data["items"]:
        out = PUBLIC / item["audio"].lstrip("/")
        if force or not out.exists():
            await build_item(item, data["readingPause"], out)
            print(item["audio"])


if __name__ == "__main__":
    asyncio.run(main())
