// JLPT N3/N4/N5 rasmiy formati: qismlar (時間区分), ball guruhlari va
// har bir 問題 ning yaponcha ko'rsatmasi. Server va client uchun umumiy.

import type { Question, SectionId } from "@/questions";

export type PaperId = 1 | 2 | 3;

export type Paper = {
  id: PaperId;
  title: string;
  subtitle: string;
  // 聴解 uchun null — vaqtni audioning o'zi belgilaydi.
  minutes: number | null;
  // Rasmiy jadvaldagi vaqt (start ekranida ko'rsatish uchun).
  officialMinutes: number;
  sections: SectionId[];
};

export type ScoreGroup = {
  id: string;
  title: string;
  subtitle: string;
  sections: SectionId[];
  max: number;
  min: number; // 基準点 — bundan past bo'lsa umumiy ball yetarli bo'lsa ham 不合格
};

export type MondaiInfo = {
  paper: PaperId;
  mondai: number;
  type: string;
  instruction: string;
  // 聴解: har bir savoldan keyin javob uchun pauza (soniya).
  answerSeconds?: number;
};

export type JlptSpec = {
  papers: Paper[];
  groups: ScoreGroup[];
  mondai: MondaiInfo[];
  // ポイント理解 da savoldan keyin variantlarni o'qish uchun pauza (audioga yoziladi).
  readingPauseSeconds: number;
};

export function paperOfSection(section: SectionId): PaperId {
  if (section === 1) return 1;
  if (section === 4) return 3;
  return 2;
}

export function getMondaiInfo(spec: JlptSpec, question: Question) {
  const paper = paperOfSection(question.section);
  return spec.mondai.find((m) => m.paper === paper && m.mondai === question.mondai);
}

// 問題 ichidagi tartib raqami (1番, 2番 ...).
export function numberInMondai(questions: Question[], index: number) {
  const q = questions[index];
  let n = 0;
  for (let i = 0; i <= index; i++) {
    const item = questions[i];
    if (item.section === q.section && item.mondai === q.mondai) n += 1;
  }
  return n;
}

// ---------------------------------------------------------
// N5 / N4 / N3 spetsifikatsiyalari
// ---------------------------------------------------------

const N5_N4_GROUPS: ScoreGroup[] = [
  {
    id: "knowledge",
    title: "言語知識（文字・語彙・文法）・読解",
    subtitle: "Til bilimi va o‘qish",
    sections: [1, 2, 3],
    max: 120,
    min: 38,
  },
  { id: "listening", title: "聴解", subtitle: "Tinglash", sections: [4], max: 60, min: 19 },
];

const N5_INSTRUCTIONS = {
  kanji: "＿＿＿の ことばは ひらがなで どう かきますか。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。",
  hyouki: "＿＿＿の ことばは どう かきますか。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。",
  bunmyaku: "（　　）に なにが はいりますか。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。",
  iikae: "＿＿＿の ぶんと だいたい おなじ いみの ぶんが あります。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。",
  bunpou1: "（　　）に 何を 入れますか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  bunpou2: "★に 入る ものは どれですか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  bunshou: "（１）から（４）に 何を 入れますか。ぶんしょうの いみを かんがえて、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  tanbun: "つぎの ぶんしょうを 読んで、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  chuubun: "つぎの ぶんしょうを 読んで、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  jouhou: "上の ちらしを 見て、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  kadai: "もんだい１では、はじめに しつもんを きいて ください。それから はなしを きいて、もんだいようしの １から４の なかから、いちばん いい ものを ひとつ えらんで ください。",
  point: "もんだい２では、はじめに しつもんを きいて ください。それから はなしを きいて、もんだいようしの １から４の なかから、いちばん いい ものを ひとつ えらんで ください。",
  hatsuwa: "もんだい３では、えを みながら しつもんを きいて ください。やじるしの ひとは なんと いいますか。１から３の なかから、いちばん いい ものを ひとつ えらんで ください。",
  sokuji: "もんだい４は、えなどが ありません。ぶんを きいて、１から３の なかから、いちばん いい ものを ひとつ えらんで ください。",
};

export const N5_SPEC: JlptSpec = {
  readingPauseSeconds: 3,
  papers: [
    { id: 1, title: "言語知識（文字・語彙）", subtitle: "Kanji va lug‘at", minutes: 20, officialMinutes: 20, sections: [1] },
    { id: 2, title: "言語知識（文法）・読解", subtitle: "Grammatika va o‘qish", minutes: 40, officialMinutes: 40, sections: [2, 3] },
    { id: 3, title: "聴解", subtitle: "Tinglab tushunish", minutes: null, officialMinutes: 30, sections: [4] },
  ],
  groups: N5_N4_GROUPS,
  mondai: [
    { paper: 1, mondai: 1, type: "漢字読み", instruction: N5_INSTRUCTIONS.kanji },
    { paper: 1, mondai: 2, type: "表記", instruction: N5_INSTRUCTIONS.hyouki },
    { paper: 1, mondai: 3, type: "文脈規定", instruction: N5_INSTRUCTIONS.bunmyaku },
    { paper: 1, mondai: 4, type: "言い換え類義", instruction: N5_INSTRUCTIONS.iikae },
    { paper: 2, mondai: 1, type: "文の文法1", instruction: N5_INSTRUCTIONS.bunpou1 },
    { paper: 2, mondai: 2, type: "文の文法2", instruction: N5_INSTRUCTIONS.bunpou2 },
    { paper: 2, mondai: 3, type: "文章の文法", instruction: N5_INSTRUCTIONS.bunshou },
    { paper: 2, mondai: 4, type: "内容理解（短文）", instruction: N5_INSTRUCTIONS.tanbun },
    { paper: 2, mondai: 5, type: "内容理解（中文）", instruction: N5_INSTRUCTIONS.chuubun },
    { paper: 2, mondai: 6, type: "情報検索", instruction: N5_INSTRUCTIONS.jouhou },
    { paper: 3, mondai: 1, type: "課題理解", instruction: N5_INSTRUCTIONS.kadai, answerSeconds: 12 },
    { paper: 3, mondai: 2, type: "ポイント理解", instruction: N5_INSTRUCTIONS.point, answerSeconds: 12 },
    { paper: 3, mondai: 3, type: "発話表現", instruction: N5_INSTRUCTIONS.hatsuwa, answerSeconds: 8 },
    { paper: 3, mondai: 4, type: "即時応答", instruction: N5_INSTRUCTIONS.sokuji, answerSeconds: 8 },
  ],
};

const N4_INSTRUCTIONS = {
  kanji: "＿＿＿の ことばは ひらがなで どう 書きますか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  hyouki: "＿＿＿の ことばは どう 書きますか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  bunmyaku: "（　　）に 何を 入れますか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  iikae: "＿＿＿の 文と だいたい 同じ いみの 文が あります。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  youhou: "つぎの ことばの つかいかたで いちばん いい ものを １・２・３・４から 一つ えらんで ください。",
  bunpou1: "（　　）に 何を 入れますか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  bunpou2: "★に 入る ものは どれですか。１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  bunshou: "（１）から（４）に 何を 入れますか。文章の いみを 考えて、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  tanbun: "つぎの（１）から（３）の 文章を 読んで、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  chuubun: "つぎの 文章を 読んで、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  jouhou: "上の 案内を 見て、下の しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一つ えらんで ください。",
  kadai: "問題１では、はじめに しつもんを 聞いて ください。それから 話を 聞いて、問題用紙の １から４の 中から、いちばん いい ものを 一つ えらんで ください。",
  point: "問題２では、はじめに しつもんを 聞いて ください。そのあと、問題用紙を 見て ください。読む 時間が あります。それから 話を 聞いて、問題用紙の １から４の 中から、いちばん いい ものを 一つ えらんで ください。",
  hatsuwa: "問題３では、絵を 見ながら しつもんを 聞いて ください。やじるしの 人は 何と 言いますか。１から３の 中から、いちばん いい ものを 一つ えらんで ください。",
  sokuji: "問題４では、絵などが ありません。文を 聞いて、１から３の 中から、いちばん いい ものを 一つ えらんで ください。",
};

export const N4_SPEC: JlptSpec = {
  readingPauseSeconds: 5,
  papers: [
    { id: 1, title: "言語知識（文字・語彙）", subtitle: "Kanji va lug‘at", minutes: 25, officialMinutes: 25, sections: [1] },
    { id: 2, title: "言語知識（文法）・読解", subtitle: "Grammatika va o‘qish", minutes: 55, officialMinutes: 55, sections: [2, 3] },
    { id: 3, title: "聴解", subtitle: "Tinglab tushunish", minutes: null, officialMinutes: 35, sections: [4] },
  ],
  groups: N5_N4_GROUPS,
  mondai: [
    { paper: 1, mondai: 1, type: "漢字読み", instruction: N4_INSTRUCTIONS.kanji },
    { paper: 1, mondai: 2, type: "表記", instruction: N4_INSTRUCTIONS.hyouki },
    { paper: 1, mondai: 3, type: "文脈規定", instruction: N4_INSTRUCTIONS.bunmyaku },
    { paper: 1, mondai: 4, type: "言い換え類義", instruction: N4_INSTRUCTIONS.iikae },
    { paper: 1, mondai: 5, type: "用法", instruction: N4_INSTRUCTIONS.youhou },
    { paper: 2, mondai: 1, type: "文の文法1", instruction: N4_INSTRUCTIONS.bunpou1 },
    { paper: 2, mondai: 2, type: "文の文法2", instruction: N4_INSTRUCTIONS.bunpou2 },
    { paper: 2, mondai: 3, type: "文章の文法", instruction: N4_INSTRUCTIONS.bunshou },
    { paper: 2, mondai: 4, type: "内容理解（短文）", instruction: N4_INSTRUCTIONS.tanbun },
    { paper: 2, mondai: 5, type: "内容理解（中文）", instruction: N4_INSTRUCTIONS.chuubun },
    { paper: 2, mondai: 6, type: "情報検索", instruction: N4_INSTRUCTIONS.jouhou },
    { paper: 3, mondai: 1, type: "課題理解", instruction: N4_INSTRUCTIONS.kadai, answerSeconds: 12 },
    { paper: 3, mondai: 2, type: "ポイント理解", instruction: N4_INSTRUCTIONS.point, answerSeconds: 12 },
    { paper: 3, mondai: 3, type: "発話表現", instruction: N4_INSTRUCTIONS.hatsuwa, answerSeconds: 8 },
    { paper: 3, mondai: 4, type: "即時応答", instruction: N4_INSTRUCTIONS.sokuji, answerSeconds: 8 },
  ],
};

export const N3_SPEC: JlptSpec = {
  readingPauseSeconds: 8,
  papers: [
    { id: 1, title: "言語知識（文字・語彙）", subtitle: "Kanji va lug‘at", minutes: 30, officialMinutes: 30, sections: [1] },
    { id: 2, title: "言語知識（文法）・読解", subtitle: "Grammatika va o‘qish", minutes: 70, officialMinutes: 70, sections: [2, 3] },
    { id: 3, title: "聴解", subtitle: "Tinglab tushunish", minutes: null, officialMinutes: 40, sections: [4] },
  ],
  groups: [
    {
      id: "knowledge",
      title: "言語知識（文字・語彙・文法）",
      subtitle: "Til bilimi",
      sections: [1, 2],
      max: 60,
      min: 19,
    },
    { id: "reading", title: "読解", subtitle: "O‘qish", sections: [3], max: 60, min: 19 },
    { id: "listening", title: "聴解", subtitle: "Tinglash", sections: [4], max: 60, min: 19 },
  ],
  mondai: [
    { paper: 1, mondai: 1, type: "漢字読み", instruction: "＿＿＿のことばの読み方として最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 1, mondai: 2, type: "表記", instruction: "＿＿＿のことばを漢字で書くとき、最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 1, mondai: 3, type: "文脈規定", instruction: "（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 1, mondai: 4, type: "言い換え類義", instruction: "＿＿＿に意味が最も近いものを、1・2・3・4から一つえらびなさい。" },
    { paper: 1, mondai: 5, type: "用法", instruction: "次のことばの使い方として最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 2, mondai: 1, type: "文の文法1", instruction: "次の文の（　　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 2, mondai: 2, type: "文の文法2", instruction: "次の文の　★　に入る最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 2, mondai: 3, type: "文章の文法", instruction: "次の文章を読んで、文章全体の内容を考えて、［１］から［５］の中に入る最もよいものを、1・2・3・4から一つえらびなさい。" },
    { paper: 2, mondai: 4, type: "内容理解（短文）", instruction: "次の（１）から（４）の文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。" },
    { paper: 2, mondai: 5, type: "内容理解（中文）", instruction: "次の（１）と（２）の文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。" },
    { paper: 2, mondai: 6, type: "内容理解（長文）", instruction: "次の文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。" },
    { paper: 2, mondai: 7, type: "情報検索", instruction: "右のページのお知らせを読んで、下の質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。" },
    { paper: 3, mondai: 1, type: "課題理解", instruction: "問題1では、まず質問を聞いてください。それから話を聞いて、問題用紙の1から4の中から、最もよいものを一つえらんでください。", answerSeconds: 12 },
    { paper: 3, mondai: 2, type: "ポイント理解", instruction: "問題2では、まず質問を聞いてください。そのあと、問題用紙のせんたくしを読んでください。読む時間があります。それから話を聞いて、問題用紙の1から4の中から、最もよいものを一つえらんでください。", answerSeconds: 12 },
    { paper: 3, mondai: 3, type: "概要理解", instruction: "問題3では、問題用紙に何もいんさつされていません。この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから、質問とせんたくしを聞いて、1から4の中から、最もよいものを一つえらんでください。", answerSeconds: 10 },
    { paper: 3, mondai: 4, type: "発話表現", instruction: "問題4では、絵を見ながら質問を聞いてください。矢印の人は何と言いますか。1から3の中から、最もよいものを一つえらんでください。", answerSeconds: 8 },
    { paper: 3, mondai: 5, type: "即時応答", instruction: "問題5では、問題用紙に何もいんさつされていません。まず文を聞いてください。それから、そのへんじを聞いて、1から3の中から、最もよいものを一つえらんでください。", answerSeconds: 8 },
  ],
};

// ---------------------------------------------------------
// Savollarni yozish uchun yordamchilar
// ---------------------------------------------------------

export type Draft = Omit<Question, "id" | "audio"> & { options: string[]; answer: number };

// To'g'ri javob o'rnini aralashtiradi: to'g'ri javob birinchi yoziladi, so'ng
// oldindan belgilangan naqsh bo'yicha 1–4 (yoki 1–3) o'ringa qo'yiladi.
// Shu tufayli javoblar teng taqsimlanadi va "hammasi 1" bo'lib qolmaydi.
export function createPicker() {
  const PATTERN_4 = [2, 0, 3, 1, 1, 3, 0, 2, 3, 2, 0, 1, 0, 1, 3, 2];
  const PATTERN_3 = [1, 0, 2, 2, 1, 0, 0, 2, 1];
  let i4 = 0;
  let i3 = 0;

  return {
    pick(correct: string, ...wrong: string[]) {
      const pos = wrong.length === 2 ? PATTERN_3[i3++ % PATTERN_3.length] : PATTERN_4[i4++ % PATTERN_4.length];
      const options = [...wrong];
      options.splice(pos, 0, correct);
      return { options, answer: pos };
    },
    // Tartibi muhim bo'lgan variantlar (vaqt, son) uchun.
    fixed(options: string[], answer: number) {
      return { options, answer };
    },
  };
}

// id va audio yo'lini avtomatik qo'yadi.
export function buildTest(slug: string, drafts: Draft[]): Question[] {
  return drafts.map((draft, index) => ({
    ...draft,
    id: index + 1,
    ...(draft.section === 4 ? { audio: `/audio/${slug}/${index + 1}.mp3` } : {}),
  }));
}

export function mondaiAudio(slug: string, mondai: number) {
  return `/audio/${slug}/mondai-${mondai}.mp3`;
}
