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
      const memo = hideOptions && !q.picture ? `<div class="memo">メモ</div>` : "";
      const fileUrl = (src: string) => pathToFileURL(join(ROOT, "public", src)).href;
      const picture = q.picture ? `<img class="picture" src="${fileUrl(q.picture)}">` : "";
      const options = q.optionImages
        ? `<div class="pics">${q.optionImages
            .map((src, i) => {
              const correct = withAnswers && i === q.answer;
              return `<div class="pic${correct ? " correct" : ""}"><span class="num">${i + 1}</span><img src="${fileUrl(src)}">${withAnswers ? `<small>${escape(q.options[i])}${correct ? " ✓" : ""}</small>` : ""}</div>`;
            })
            .join("")}</div>`
        : hideOptions
        ? `<p class="blank">（問題用紙に何も印刷されていません）</p>${memo}`
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
        <p class="q"><span class="qnum">${number}</span>${!q.picture && q.image ? `<span class="image">${q.image}</span>` : ""}${text}</p>
        ${picture}
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

// ---------------------------------------------------------
// JLPT qog'oz imtihon: muqova (問題用紙) va 解答用紙 (javob varaqasi)
// ---------------------------------------------------------

function jlptCover() {
  const spec = LEVEL.jlpt!;
  const rows = spec.papers
    .map((paper) => {
      const count = questions.filter((q) => paper.sections.includes(q.section)).length;
      const time = paper.minutes ? `${paper.minutes}分` : `約${paper.officialMinutes}分`;
      return `<tr><td>${paper.title}</td><td>${paper.subtitle}</td><td>${count}問</td><td>${time}</td></tr>`;
    })
    .join("");

  return `<section class="cover">
  <p class="cover-level">${LEVEL.label}</p>
  <h1>${LEVEL.title}</h1>
  <p class="cover-kind">問題用紙　·　Savollar kitobchasi</p>
  <p class="cover-test">${TEST.name}　·　${questions.length}問</p>
  <table class="fields">
    <tr><th>受験者名 / Ism, familiya</th><td></td></tr>
    <tr><th>Telegram</th><td></td></tr>
    <tr><th>日付 / Sana</th><td></td></tr>
  </table>
  <table class="papers"><tr><th>時間区分</th><th></th><th>問題数</th><th>時間</th></tr>${rows}</table>
  <div class="notes">
    <p><b>注意 / Qoidalar</b></p>
    <ol class="rules">
      <li>試験が始まるまで、この問題用紙を開けないでください。<br><span>Imtihon boshlanguncha kitobchani ochmang.</span></li>
      <li>答えは解答用紙にマークしてください。問題用紙に書いた答えは採点されません。<br><span>Javoblarni alohida javob varaqasiga (解答用紙) belgilang. Kitobchadagi belgilar hisoblanmaydi.</span></li>
      <li>各時間区分の時間が終わったら、次に進みます。前の時間区分に戻ることはできません。<br><span>Har bir qism vaqti tugagach keyingisiga o‘tiladi, oldingi qismga qaytilmaydi.</span></li>
      <li>聴解の音声は一回だけ流れます。問題用紙にメモをしてもかまいません。<br><span>Tinglash audiosi faqat bir marta qo‘yiladi. Kitobchaga qoralama yozish mumkin.</span></li>
      <li>合格点 ${LEVEL.passScore}／${LEVEL.maxScore}点。基準点：${spec.groups.map((g) => `${g.title} ${g.min}点`).join("、")}。<br><span>O‘tish bali ${LEVEL.passScore}/${LEVEL.maxScore}; har bir bo‘limda minimal ball (基準点) olinishi kerak.</span></li>
    </ol>
  </div>
</section>`;
}

function answerSheet() {
  const spec = LEVEL.jlpt!;
  const mondaiWord = TEST.level === "n5" ? "もんだい" : "問題";
  const bubbles = (count: number) =>
    Array.from({ length: count }, (_, i) => `<span class="bubble">${i + 1}</span>`).join("");

  const papers = spec.papers
    .map((paper) => {
      const items = questions.map((q, index) => ({ q, index })).filter(({ q }) => paper.sections.includes(q.section));
      const groups: string[] = [];
      let current: number | undefined;
      let rows = "";
      const flush = () => {
        if (current !== undefined) groups.push(`<div class="m"><p class="mh">${mondaiWord}${current}</p>${rows}</div>`);
        rows = "";
      };
      items.forEach(({ q, index }, position) => {
        if (q.mondai !== current) {
          flush();
          current = q.mondai;
        }
        const number = q.section === 4 ? `${numberInMondai(questions, index)}番` : `${position + 1}`;
        rows += `<p class="row"><span class="n">${number}</span>${bubbles(q.options.length)}</p>`;
      });
      flush();
      return `<div class="sheet-paper"><h3>${paper.title}</h3><div class="cols">${groups.join("")}</div></div>`;
    })
    .join("");

  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><title>${LEVEL.label} ${TEST.name} 解答用紙</title>
<style>
  @page { size: A4; margin: 12mm 12mm; }
  body { font-family: "Yu Gothic", "Meiryo", sans-serif; color: #0f172a; font-size: 10pt; }
  .top { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #0f172a; padding-bottom: 6px; }
  .top h1 { margin: 0; font-size: 17pt; }
  .top p { margin: 0; font-size: 9.5pt; color: #334155; }
  table.fields { width: 100%; border-collapse: collapse; margin: 8px 0; }
  table.fields th { width: 40mm; text-align: left; font-size: 9pt; background: #f1f5f9; border: 1px solid #0f172a; padding: 5px 6px; }
  table.fields td { border: 1px solid #0f172a; height: 8mm; }
  .howto { font-size: 8.5pt; color: #334155; margin: 4px 0 8px; }
  .howto .on { background: #0f172a; color: #0f172a; }
  .sheet-paper { border: 1.5px solid #0f172a; margin-top: 8px; break-inside: avoid; }
  .sheet-paper h3 { margin: 0; padding: 4px 8px; background: #0f172a; color: #fff; font-size: 10.5pt; }
  .cols { columns: 4; column-gap: 8px; padding: 6px 8px; }
  .m { break-inside: avoid; margin-bottom: 6px; }
  .mh { margin: 0 0 2px; font-weight: bold; font-size: 9pt; border-bottom: 1px solid #94a3b8; }
  .row { margin: 0; display: flex; align-items: center; gap: 4px; height: 17px; }
  .n { display: inline-block; width: 30px; text-align: right; font-weight: bold; font-size: 9pt; margin-right: 2px; }
  .bubble { display: inline-block; width: 15px; height: 15px; line-height: 15px; border: 1.2px solid #0f172a; border-radius: 50%; text-align: center; font-size: 8pt; }
</style></head>
<body>
  <div class="top">
    <div><p>${LEVEL.label}　${TEST.name}</p><h1>解答用紙　·　Javob varaqasi</h1></div>
    <p>${questions.length}問</p>
  </div>
  <table class="fields">
    <tr><th>受験者名 / Ism, familiya</th><td></td><th>Telegram</th><td></td></tr>
  </table>
  <p class="howto">マークの仕方：正しい答えの番号を一つ、黒くぬりつぶしてください。
    <span class="bubble on">1</span> よい　·　Har bir savolga bitta doirachani to‘liq bo‘yang. Tuzatish uchun o‘chirg‘ich bilan to‘liq o‘chiring.</p>
  ${papers}
</body></html>`;
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
  header + h2.paper, .detail > h2.paper:first-child { break-before: auto; }
  .mondai { border: 2px solid #0f172a; padding: 6px 10px; margin: 14px 0 8px; font-size: 10.5pt; break-after: avoid; }
  .line { display: inline-block; width: 36px; border-bottom: 2px solid #0f172a; margin: 0 3px; }
  .picture { display: block; width: 62mm; margin: 4px 0 6px 32px; border: 1px solid #cbd5e1; }
  .pics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 4px 0 0 32px; }
  .pic { position: relative; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px; text-align: center; }
  .pic img { width: 100%; display: block; }
  .pic .num { position: absolute; left: 3px; top: 3px; width: 16px; height: 16px; line-height: 16px; border: 1px solid #64748b; border-radius: 50%; font-size: 8.5pt; background: #fff; }
  .pic small { font-size: 8pt; }
  .pic.correct { border: 2px solid #16a34a; background: #dcfce7; }
  .blank { margin: 0 0 0 32px; color: #64748b; font-size: 9.5pt; }
  .cover { height: 255mm; display: flex; flex-direction: column; }
  .cover-level { margin: 18mm 0 0; font-size: 13pt; color: #475569; }
  .cover h1 { margin: 2mm 0 0; font-size: 30pt; }
  .cover-kind { margin: 4mm 0 0; font-size: 16pt; font-weight: bold; border-top: 3px solid #0f172a; border-bottom: 3px solid #0f172a; padding: 3mm 0; }
  .cover-test { font-size: 12pt; color: #334155; }
  .cover table.fields { width: 100%; border-collapse: collapse; margin: 6mm 0; }
  .cover table.fields th { width: 55mm; text-align: left; background: #f1f5f9; border: 1px solid #0f172a; padding: 6px 8px; font-size: 10pt; }
  .cover table.fields td { border: 1px solid #0f172a; }
  .cover table.papers { width: 100%; border-collapse: collapse; font-size: 10.5pt; }
  .cover table.papers th, .cover table.papers td { border: 1px solid #94a3b8; padding: 4px 8px; text-align: left; }
  .cover table.papers th { background: #f1f5f9; }
  .notes { margin-top: auto; border: 1.5px solid #0f172a; padding: 4mm 6mm; font-size: 10pt; }
  .notes p { margin: 0 0 2mm; }
  ol.rules { display: block; list-style: decimal; margin: 0; padding-left: 18px; }
  ol.rules li { margin-bottom: 2mm; padding: 0; }
  ol.rules span { color: #475569; font-size: 9pt; }
  .memo { margin: 4px 0 0 32px; height: 14mm; border: 1px dashed #94a3b8; border-radius: 4px; font-size: 8pt; color: #94a3b8; padding: 2px 6px; }
</style></head>
<body>
${LEVEL.jlpt && !withAnswers ? jlptCover() : `<header>
  <h1>${LEVEL.title}（${LEVEL.label}）</h1>
  <p>${TEST.name} · ${title} · ${questions.length}問 · ${LEVEL.examMinutes}分 · ${LEVEL.jlpt ? `${LEVEL.jlpt.papers.length} 時間区分` : `${LEVEL.sections.length} section`}</p>
  ${withAnswers ? "" : `<p class="student">Ism, familiya: ______________________________　 Sana: ____________</p>`}
</header>`}
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

const outputs: { name: string; render: () => string }[] = [
  { name: `${PREFIX}-savollar.pdf`, render: () => page(false) },
  { name: `${PREFIX}-javoblar.pdf`, render: () => page(true) },
  ...(LEVEL.jlpt ? [{ name: `${PREFIX}-javob-varaqasi.pdf`, render: answerSheet }] : []),
];

for (const { name, render } of outputs) {
  const html = join(tmp, `${name}.html`);
  writeFileSync(html, render(), "utf-8");

  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--no-pdf-header-footer",
    `--user-data-dir=${join(tmp, "profile")}`,
    `--print-to-pdf=${join(OUT_DIR, name)}`,
    pathToFileURL(html).href,
  ]);

  console.log(`✓ pdf/${name}`);
}
