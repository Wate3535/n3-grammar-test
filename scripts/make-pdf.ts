// Testning elektron (PDF) variantini yaratadi:
//   pdf/JFT-Basic-A2-<slug>-savollar.pdf — faqat savollar
//   pdf/JFT-Basic-A2-<slug>-javoblar.pdf — javoblar kaliti, skriptlar bilan
//
// Ishga tushirish: npx tsx scripts/make-pdf.ts <test-slug>   (masalan: test-7)
// Chrome yoki Edge o'rnatilgan bo'lishi kerak (CHROME_PATH bilan ham berish mumkin).

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { GlossaryItem, Question } from "../questions";
import { getMondaiInfo, numberInMondai } from "../lib/jlpt";
import { LEVELS } from "../lib/levels";
import { getTest } from "../lib/tests";

const testSlug = process.argv[2] ?? "test-2";
const found = getTest(testSlug);
if (!found) throw new Error(`Unknown test: ${testSlug}`);
const TEST = found;
const LEVEL = LEVELS[TEST.level];
const { questions } = TEST;

const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "pdf");

const SECTIONS: Record<number, { title: string; subtitle: string }> = Object.fromEntries(
  LEVEL.sections.map((section) => [section.id, section])
);

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// "＿電車＿" → tagiga chizilgan so'z
const marked = (text: string) =>
  escape(text)
    .split("＿")
    .map((part, index) => (index % 2 === 1 ? `<u>${part}</u>` : part))
    .join("")
    .replace(/\n/g, "<br>");

const glossary = (items?: GlossaryItem[]) =>
  items
    ? `<div class="glossary"><b>📘 Kanji lug‘ati:</b> ${items
        .map(
          (item) =>
            `<span><b>${item.word}</b>（${item.reading}）— ${escape(item.meaning)}</span>`
        )
        .join("")}</div>`
    : "";

function questionBlock(q: Question, number: number, withAnswers: boolean) {
  const options = q.options
    .map((option, index) => {
      const correct = withAnswers && index === q.answer;
      return `<li class="${correct ? "correct" : ""}"><span class="num">${index + 1}</span>${escape(option)}${correct ? " ✓" : ""}</li>`;
    })
    .join("");

  const audio =
    q.audio && !withAnswers
      ? `<p class="audio">🔊 Audio: ${q.audio.split("/").pop()}</p>`
      : "";

  const script =
    withAnswers && q.script
      ? `<div class="script"><b>スクリプト</b>${q.script
          .map(
            (line) =>
              `<p><b>${line.speaker === "M" ? "男" : "女"}：</b>${escape(line.text)}</p>`
          )
          .join("")}</div>`
      : "";

  return `<div class="question">
    <p class="q"><span class="qnum">${number}</span><span class="type">${q.type}</span>${q.image ? `<span class="image">${q.image}</span>` : ""}${marked(q.question)}</p>
    ${audio}
    <ol>${options}</ol>
    ${script}
    ${glossary(q.glossary)}
  </div>`;
}

// JLPT: real 問題用紙 kabi — qismlar, 問題 ko'rsatmalari; 聴解 da savol matni
// yozilmaydi, ovozda o'qiladigan variantlar faqat javoblar PDF'ida chiqadi.
function jlptBody(withAnswers: boolean) {
  const spec = LEVEL.jlpt!;
  const mondaiWord = TEST.level === "n5" ? "もんだい" : "問題";
  let html = "";

  for (const paper of spec.papers) {
    const items = questions.map((q, index) => ({ q, index })).filter(({ q }) => paper.sections.includes(q.section));
    const time = paper.minutes ? `${paper.minutes}分` : `約${paper.officialMinutes}分`;
    html += `<h2 class="paper">${paper.title} <small>${paper.subtitle} · ${time}</small></h2>`;
    let lastMondai: number | undefined;

    items.forEach(({ q, index }, position) => {
      if (q.mondai !== lastMondai) {
        lastMondai = q.mondai;
        html += `<div class="mondai"><b>${mondaiWord}${q.mondai}</b>　${escape(getMondaiInfo(spec, q)?.instruction ?? "").replace(/＿＿＿/g, '<span class="line"></span>')}</div>`;
      }
      if (q.passage && q.passage !== questions[index - 1]?.passage) {
        html += `<div class="passage">${escape(q.passage).replace(/\n/g, "<br>")}</div>`;
      }

      const listening = q.section === 4;
      const number = listening ? `${numberInMondai(questions, index)}番` : String(position + 1);
      const hideOptions = listening && q.spoken && !withAnswers;
      const options = hideOptions
        ? `<p class="blank">（問題用紙に何も印刷されていません）</p>`
        : `<ol>${q.options
            .map((option, i) => {
              const correct = withAnswers && i === q.answer;
              return `<li class="${correct ? "correct" : ""}"><span class="num">${i + 1}</span>${escape(option)}${correct ? " ✓" : ""}</li>`;
            })
            .join("")}</ol>`;
      const text = listening
        ? withAnswers
          ? `${escape(q.intro ?? "")}${marked(q.question)}`
          : ""
        : marked(q.question);
      const script =
        withAnswers && q.script
          ? `<div class="script"><b>スクリプト</b>${q.script
              .map((line) => `<p><b>${line.speaker === "M" ? "男" : "女"}：</b>${escape(line.text)}</p>`)
              .join("")}</div>`
          : "";

      html += `<div class="question">
        <p class="q"><span class="qnum">${number}</span>${q.image ? `<span class="image">${q.image}</span>` : ""}${text}</p>
        ${options}
        ${script}
        ${withAnswers ? glossary(q.glossary) : ""}
      </div>`;
    });
  }

  return html;
}

function body(withAnswers: boolean) {
  if (LEVEL.jlpt) return jlptBody(withAnswers);
  let html = "";
  let section = 0;

  questions.forEach((q, index) => {
    if (q.section !== section) {
      section = q.section;
      const meta = SECTIONS[section];
      html += `<h2>${section}. ${meta.title} <small>${meta.subtitle}</small></h2>`;
    }

    if (q.passage && q.passage !== questions[index - 1]?.passage) {
      html += `<div class="passage">${escape(q.passage).replace(/\n/g, "<br>")}</div>`;
    }

    html += questionBlock(q, index + 1, withAnswers);
  });

  return html;
}

function answerKey() {
  const rows: string[] = [];

  for (let start = 0; start < questions.length; start += 8) {
    const cells = questions
      .slice(start, start + 8)
      .map((q, offset) => `<td><b>${start + offset + 1}</b> → ${q.answer + 1}</td>`)
      .join("");
    rows.push(`<tr>${cells}</tr>`);
  }

  return `<h2>Javoblar kaliti</h2><table class="key">${rows.join("")}</table>`;
}

function page(withAnswers: boolean) {
  const title = withAnswers ? "解答 — Javoblar" : "問題 — Savollar";

  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><title>${LEVEL.label} ${TEST.name} ${title}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  body { font-family: "Yu Gothic", "Meiryo", "MS Gothic", sans-serif; color: #0f172a; font-size: 11.5pt; line-height: 1.6; }
  header { border-bottom: 3px solid #2563eb; padding-bottom: 8px; margin-bottom: 12px; }
  header h1 { margin: 0; font-size: 20pt; color: #1e3a8a; }
  header p { margin: 2px 0; color: #475569; font-size: 10pt; }
  .student { margin-top: 8px; font-size: 11pt; }
  h2 { background: #2563eb; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 13pt; margin: 18px 0 10px; break-after: avoid; }
  h2 small { font-weight: normal; opacity: .85; font-size: 10pt; margin-left: 6px; }
  .passage { border: 1.5px solid #94a3b8; border-radius: 6px; padding: 10px 14px; margin: 10px 0; background: #f8fafc; break-inside: avoid; }
  .question { break-inside: avoid; border-bottom: 1px dashed #cbd5e1; padding: 6px 0 8px; }
  .q { margin: 0 0 4px; font-weight: bold; }
  .qnum { display: inline-block; min-width: 24px; padding: 0 6px; margin-right: 8px; border-radius: 4px; background: #1e3a8a; color: #fff; text-align: center; }
  .type { font-size: 8.5pt; color: #64748b; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0 4px; margin-right: 8px; font-weight: normal; }
  .image { font-size: 26pt; margin-right: 8px; vertical-align: middle; }
  u { text-decoration-thickness: 2px; text-underline-offset: 3px; }
  ol { list-style: none; padding: 0; margin: 0 0 0 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px 16px; }
  li { padding: 1px 6px; border-radius: 4px; }
  li .num { display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border: 1px solid #64748b; border-radius: 50%; font-size: 9pt; margin-right: 6px; }
  li.correct { background: #dcfce7; color: #166534; font-weight: bold; }
  .audio { margin: 0 0 4px 32px; color: #1d4ed8; font-size: 9.5pt; }
  .script { margin: 6px 0 0 32px; padding: 6px 10px; background: #eff6ff; border-left: 3px solid #2563eb; font-size: 10pt; }
  .script p { margin: 0; }
  .glossary { margin: 6px 0 0 32px; padding: 4px 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; font-size: 9pt; color: #334155; }
  .glossary span { margin-right: 14px; white-space: nowrap; }
  table.key { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  table.key td { border: 1px solid #cbd5e1; padding: 4px 6px; text-align: center; font-size: 10.5pt; }
  .detail { break-before: page; }
  h2.paper { background: #0f172a; break-before: page; }
  h2.paper:first-of-type { break-before: auto; }
  .mondai { border: 2px solid #0f172a; padding: 6px 10px; margin: 14px 0 8px; font-size: 10.5pt; break-after: avoid; }
  .line { display: inline-block; width: 36px; border-bottom: 2px solid #0f172a; margin: 0 3px; }
  .blank { margin: 0 0 0 32px; color: #64748b; font-size: 9.5pt; }
</style></head>
<body>
<header>
  <h1>${LEVEL.title}（${LEVEL.label}）</h1>
  <p>${TEST.name} · ${title} · ${questions.length}問 · ${LEVEL.examMinutes}分 · ${LEVEL.jlpt ? `${LEVEL.jlpt.papers.length} 時間区分` : `${LEVEL.sections.length} section`}</p>
  ${withAnswers ? "" : `<p class="student">Ism, familiya: ______________________________　 Sana: ____________</p>`}
</header>
${withAnswers ? `${answerKey()}<div class="detail">${body(true)}</div>` : body(false)}
</body></html>`;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  const found = candidates.find((path) => path && existsSync(path));
  if (!found) throw new Error("Chrome/Edge topilmadi. CHROME_PATH ni bering.");
  return found;
}

// Eski JFT fayllari nomi saqlanadi: JFT-Basic-A2-test-8-..., JLPT: JLPT-n3-1-...
const PREFIX = TEST.level === "jft" ? `JFT-Basic-A2-${TEST.slug}` : `JLPT-${TEST.slug}`;

const chrome = findChrome();
const tmp = mkdtempSync(join(tmpdir(), "jft-pdf-"));
mkdirSync(OUT_DIR, { recursive: true });

for (const [withAnswers, name] of [
  [false, `${PREFIX}-savollar.pdf`],
  [true, `${PREFIX}-javoblar.pdf`],
] as const) {
  const html = join(tmp, `${name}.html`);
  writeFileSync(html, page(withAnswers), "utf-8");

  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--user-data-dir=${join(tmp, "profile")}`,
    `--print-to-pdf=${join(OUT_DIR, name)}`,
    pathToFileURL(html).href,
  ]);

  console.log(`✓ pdf/${name}`);
}
