// =========================================================
// JLPT N4 — MOCK TEST 1
//   1. 文字・語彙 — 漢字読み / 表記 / 文脈規定 / 言い換え類義
//   2. 文法       — 文の文法 / 文の組み立て
//   3. 読解       — 内容理解 / 情報検索
//   4. 聴解       — 課題理解 / ポイント理解 / 即時応答
// =========================================================

import type { GlossaryItem, Question } from "@/questions";

export const TEST_N4_1 = {
  name: "模擬テスト 1",
  slug: "n4-1",
};

const PASSAGE_MAIL = `山田先生

来週の 月曜日の 授業ですが、病院へ 行かなければ ならないので、休ませて いただけませんか。
宿題は、日曜日の 夜までに メールで 送ります。
火曜日の 授業には 出席します。
どうぞ よろしく お願いします。

グエン`;

const PASSAGE_SATO = `わたしは 去年の 春に 日本へ 来ました。はじめは 日本語が あまり わからなくて、買い物も 大変でした。
でも、アパートの となりに 住んで いる 佐藤さんが、よく 声を かけて くれました。日本の 料理の 作り方も 教えて くれました。
今は 日本語で 話すのが 楽しいです。来月 国へ 帰りますが、その 前に 佐藤さんに 国の 料理を 作って あげたいと 思って います。`;

const PASSAGE_POOL = `スポーツセンターの お知らせ

7月20日（土）から 8月31日（土）まで、プールが 使えます。
時間：午前10時〜午後6時
料金：大人 500円、中学生以下 200円
※プールに 入る 前に、シャワーを あびて ください。
※小学生は 大人と いっしょに 来て ください。`;

const PASSAGE_PIZZA = `ピザ　マルコ

Sサイズ　1,200円
Mサイズ　1,800円
Lサイズ　2,400円

・配達は 午前11時から 午後10時までです。
・2,000円 以上 注文すると、配達料は 無料です。
・2,000円より 少ない ときは、配達料が 300円 かかります。`;

const GLOSSARY_MAIL: GlossaryItem[] = [
  { word: "授業", reading: "じゅぎょう", meaning: "dars" },
  { word: "宿題", reading: "しゅくだい", meaning: "uy vazifasi" },
  { word: "出席", reading: "しゅっせき", meaning: "qatnashish" },
];

const GLOSSARY_SATO: GlossaryItem[] = [
  { word: "去年", reading: "きょねん", meaning: "o'tgan yil" },
  { word: "声を かける", reading: "こえをかける", meaning: "gapirib qo'ymoq, so'rab turmoq" },
];

const GLOSSARY_POOL: GlossaryItem[] = [
  { word: "料金", reading: "りょうきん", meaning: "narx, to'lov" },
  { word: "以下", reading: "いか", meaning: "va undan kichik" },
];

const GLOSSARY_PIZZA: GlossaryItem[] = [
  { word: "配達", reading: "はいたつ", meaning: "yetkazib berish" },
  { word: "注文", reading: "ちゅうもん", meaning: "buyurtma" },
  { word: "無料", reading: "むりょう", meaning: "bepul" },
];

const ORDER = "★に 入る ものは どれですか。\n";

export const questionsN4_1: Question[] = [
  // -------------------------------------------------------
  // 1. 文字・語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "漢字読み",
    question: "この ＿池＿には 魚が たくさん います。",
    options: ["いし", "うみ", "いけ", "かわ"],
    answer: 2,
  },
  {
    id: 2,
    section: 1,
    type: "漢字読み",
    question: "＿屋上＿から 町が よく 見えます。",
    options: ["おくじょう", "やじょう", "おくうえ", "やうえ"],
    answer: 0,
  },
  {
    id: 3,
    section: 1,
    type: "漢字読み",
    question: "日本の ＿文化＿に きょうみが あります。",
    options: ["もんか", "ぶんが", "ぶんけ", "ぶんか"],
    answer: 3,
  },
  {
    id: 4,
    section: 1,
    type: "漢字読み",
    question: "毎朝 ＿運動＿を して います。",
    options: ["うんど", "うんどう", "うんとう", "うんどお"],
    answer: 1,
  },
  {
    id: 5,
    section: 1,
    type: "表記",
    question: "この 道を まっすぐ ＿すすんで＿ ください。",
    options: ["通んで", "進んで", "運んで", "送んで"],
    answer: 1,
  },
  {
    id: 6,
    section: 1,
    type: "表記",
    question: "駅の ＿ちかく＿に 住んで います。",
    options: ["地く", "短く", "低く", "近く"],
    answer: 3,
  },
  {
    id: 7,
    section: 1,
    type: "表記",
    question: "あなたの ＿いけん＿を 言って ください。",
    options: ["意見", "意建", "異見", "意県"],
    answer: 0,
  },
  {
    id: 8,
    section: 1,
    type: "文脈規定",
    question: "会議の 時間に（　　）しまって、すみません。",
    options: ["まちがえて", "わすれて", "おくれて", "ねむって"],
    answer: 2,
  },
  {
    id: 9,
    section: 1,
    type: "文脈規定",
    question: "この 薬は 一日 三回、食事の あとに（　　）ください。",
    options: ["飲んで", "食べて", "入れて", "かけて"],
    answer: 0,
  },
  {
    id: 10,
    section: 1,
    type: "文脈規定",
    question: "新しい ことばを おぼえるのは（　　）ですが、楽しいです。",
    options: ["たいせつ", "ひま", "しんせつ", "たいへん"],
    answer: 3,
  },
  {
    id: 11,
    section: 1,
    type: "言い換え類義",
    question: "「ここは 禁煙です。」と だいたい 同じ 意味の 文は どれですか。",
    options: [
      "ここで たばこを 吸っても いいです。",
      "ここで たばこを 吸っては いけません。",
      "ここで たばこを 売って います。",
      "ここで たばこを 買えます。",
    ],
    answer: 1,
  },
  {
    id: 12,
    section: 1,
    type: "言い換え類義",
    question: "「兄は 銀行に つとめて います。」と だいたい 同じ 意味の 文は どれですか。",
    options: [
      "兄は 銀行で お金を かりて います。",
      "兄は 銀行に 行く ところです。",
      "兄は 銀行で 働いて います。",
      "兄は 銀行が 好きです。",
    ],
    answer: 2,
  },

  // -------------------------------------------------------
  // 2. 文法
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文の文法",
    question: "雨が（　　）、試合は 中止に なりました。",
    options: ["ふったら", "ふったので", "ふっても", "ふるのに"],
    answer: 1,
  },
  {
    id: 14,
    section: 2,
    type: "文の文法",
    question: "先生に 作文を（　　）もらいました。",
    options: ["なおして", "なおす", "なおした", "なおさ"],
    answer: 0,
  },
  {
    id: 15,
    section: 2,
    type: "文の文法",
    question: "この 料理は 作り方が かんたん（　　）、おいしいです。",
    options: ["なのに", "だから", "でも", "で"],
    answer: 3,
  },
  {
    id: 16,
    section: 2,
    type: "文の文法",
    question: "日本へ 行く 前に、日本語を 勉強して（　　）つもりです。",
    options: ["いる", "ある", "おく", "みる"],
    answer: 2,
  },
  {
    id: 17,
    section: 2,
    type: "文の文法",
    question: "部長、こちらの 資料を ご覧に（　　）か。",
    options: ["なりました", "しました", "ありました", "いました"],
    answer: 0,
  },
  {
    id: 18,
    section: 2,
    type: "文の文法",
    question: "子どもの とき、母に きらいな 野菜を 食べ（　　）。",
    options: ["させました", "させられました", "られました", "たがりました"],
    answer: 1,
  },
  {
    id: 19,
    section: 2,
    type: "文の文法",
    question: "空が 暗く なって きました。雨が 降り（　　）ですね。",
    options: ["よう", "らしい", "みたい", "そう"],
    answer: 3,
  },
  {
    id: 20,
    section: 2,
    type: "文の組み立て",
    question: `${ORDER}あそこで ___ ___ _★_ ___ は 田中さんです。`,
    options: ["人", "本を", "いる", "読んで"],
    answer: 2,
  },
  {
    id: 21,
    section: 2,
    type: "文の組み立て",
    question: `${ORDER}わたしは ___ ___ _★_ ___ あります。`,
    options: ["ことが", "のぼった", "去年", "富士山に"],
    answer: 1,
  },
  {
    id: 22,
    section: 2,
    type: "文の組み立て",
    question: `${ORDER}友だちが この ___ ___ _★_ ___ 言いました。`,
    options: ["おもしろい", "と", "本は", "とても"],
    answer: 0,
  },

  // -------------------------------------------------------
  // 3. 読解
  // -------------------------------------------------------
  {
    id: 23,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_MAIL,
    question: "グエンさんは どうして この メールを 書きましたか。",
    options: [
      "月曜日の 授業を 休みたいから",
      "宿題が わからないから",
      "病院の 場所を 聞きたいから",
      "火曜日に 休みたいから",
    ],
    answer: 0,
    glossary: GLOSSARY_MAIL,
  },
  {
    id: 24,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_MAIL,
    question: "グエンさんは 宿題を どう しますか。",
    options: [
      "月曜日に 先生に わたす。",
      "火曜日の 授業で 出す。",
      "日曜日の 夜までに メールで 送る。",
      "出さない。",
    ],
    answer: 2,
    glossary: GLOSSARY_MAIL,
  },
  {
    id: 25,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_SATO,
    question: "はじめ、この 人は 何が 大変でしたか。",
    options: [
      "料理を 作ること",
      "アパートを さがすこと",
      "佐藤さんと 話すこと",
      "買い物を すること",
    ],
    answer: 3,
    glossary: GLOSSARY_SATO,
  },
  {
    id: 26,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_SATO,
    question: "この 人は 国へ 帰る 前に 何を したいですか。",
    options: [
      "日本の 料理を 習いたい。",
      "佐藤さんに 国の 料理を 作りたい。",
      "佐藤さんと 旅行したい。",
      "日本語の 勉強を したい。",
    ],
    answer: 1,
    glossary: GLOSSARY_SATO,
  },
  {
    id: 27,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_POOL,
    question: "小学生の 子どもが 一人で プールに 行きたいです。行けますか。",
    options: [
      "行けます。",
      "行けません。",
      "200円 はらえば 行けます。",
      "午前中なら 行けます。",
    ],
    answer: 1,
    glossary: GLOSSARY_POOL,
  },
  {
    id: 28,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_POOL,
    question: "大人 2人と 中学生 1人で 行きます。全部で いくらですか。",
    options: ["700円", "900円", "1,000円", "1,200円"],
    answer: 3,
    glossary: GLOSSARY_POOL,
  },
  {
    id: 29,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_PIZZA,
    question: "Mサイズを 1枚 配達して もらいます。全部で いくらですか。",
    options: ["1,800円", "2,000円", "2,100円", "2,400円"],
    answer: 2,
    glossary: GLOSSARY_PIZZA,
  },
  {
    id: 30,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_PIZZA,
    question: "午前10時に 配達して もらえますか。",
    options: [
      "もらえません。",
      "もらえます。",
      "2,000円 以上なら もらえます。",
      "Lサイズなら もらえます。",
    ],
    answer: 0,
    glossary: GLOSSARY_PIZZA,
  },

  // -------------------------------------------------------
  // 4. 聴解
  // -------------------------------------------------------
  {
    id: 31,
    section: 4,
    type: "課題理解",
    question: "男の 人は このあと まず 何を しますか。",
    options: [
      "いすを ならべる",
      "プロジェクターを 準備する",
      "資料を コピーする",
      "山田さんを よぶ",
    ],
    answer: 2,
    audio: "/audio/n4-1/31.mp3",
    script: [
      { speaker: "F", text: "会議の 準備、手伝って もらえますか。" },
      { speaker: "M", text: "はい。何を しましょうか。" },
      { speaker: "F", text: "資料を 二十部 コピーして ください。いすは 山田さんが ならべますから。" },
      { speaker: "M", text: "わかりました。あ、プロジェクターは？" },
      { speaker: "F", text: "それは わたしが やります。" },
    ],
    glossary: [
      { word: "準備", reading: "じゅんび", meaning: "tayyorgarlik" },
      { word: "資料", reading: "しりょう", meaning: "hujjatlar, material" },
    ],
  },
  {
    id: 32,
    section: 4,
    type: "課題理解",
    question: "女の 人は 何で 空港へ 行きますか。",
    options: ["タクシー", "電車", "友だちの 車", "バス"],
    answer: 3,
    audio: "/audio/n4-1/32.mp3",
    script: [
      { speaker: "M", text: "空港まで 何で 行きますか。" },
      {
        speaker: "F",
        text: "タクシーは 高いし、電車は 乗りかえが 大変だから、バスに しようと 思って います。",
      },
      { speaker: "M", text: "バスは 道が こむと、時間が かかりますよ。" },
      {
        speaker: "F",
        text: "そうですね…。でも、荷物が 多いので、やっぱり 乗りかえの ない バスに します。",
      },
    ],
    glossary: [{ word: "空港", reading: "くうこう", meaning: "aeroport" }],
  },
  {
    id: 33,
    section: 4,
    type: "課題理解",
    question: "学生は あした 何を 持って 行きますか。",
    options: [
      "ノートと ペンと 学生証",
      "カメラと ノート",
      "カメラと 学生証",
      "ノートと ペンだけ",
    ],
    answer: 0,
    audio: "/audio/n4-1/33.mp3",
    script: [
      {
        speaker: "M",
        text: "あしたの 見学では、工場の 中で 写真を とっては いけませんから、カメラは いりません。ノートと ペンを 持って きて ください。それから、工場の 人に 見せるので、学生証を わすれないで ください。",
      },
    ],
    glossary: [
      { word: "見学", reading: "けんがく", meaning: "tanishuv sayohati" },
      { word: "学生証", reading: "がくせいしょう", meaning: "talaba guvohnomasi" },
    ],
  },
  {
    id: 34,
    section: 4,
    type: "課題理解",
    question: "男の 人は 何時に 病院へ 行きますか。",
    options: ["9時", "11時", "11時半", "午後"],
    answer: 1,
    audio: "/audio/n4-1/34.mp3",
    script: [
      { speaker: "F", text: "はい、さくら病院です。" },
      { speaker: "M", text: "あしたの 午前中に 見て もらいたいんですが。" },
      { speaker: "F", text: "午前は、九時と 十一時が あいて います。" },
      { speaker: "M", text: "九時は 仕事が あるので…。十一時半でも いいですか。" },
      { speaker: "F", text: "すみません、十一時半は もう 予約が あります。" },
      { speaker: "M", text: "じゃあ、十一時で おねがいします。" },
    ],
    glossary: [{ word: "予約", reading: "よやく", meaning: "oldindan yozilish" }],
  },
  {
    id: 35,
    section: 4,
    type: "ポイント理解",
    question: "女の 人は どうして 引っ越しますか。",
    options: [
      "会社から 遠いから",
      "家賃が 高いから",
      "部屋が せまいから",
      "となりの 部屋が うるさいから",
    ],
    answer: 3,
    audio: "/audio/n4-1/35.mp3",
    script: [
      { speaker: "M", text: "引っ越すそうですね。会社から 遠いからですか。" },
      {
        speaker: "F",
        text: "いいえ、会社には 近いんですが、となりの 部屋が うるさくて、夜 ねられないんです。",
      },
      { speaker: "M", text: "それは 大変ですね。" },
    ],
    glossary: [
      { word: "引っ越す", reading: "ひっこす", meaning: "ko'chib o'tmoq" },
      { word: "家賃", reading: "やちん", meaning: "ijara haqi" },
    ],
  },
  {
    id: 36,
    section: 4,
    type: "ポイント理解",
    question: "男の 人は 週末 何を しましたか。",
    options: ["海へ 行った", "友だちと あそんだ", "家で ねて いた", "病院で 働いた"],
    answer: 2,
    audio: "/audio/n4-1/36.mp3",
    script: [
      { speaker: "F", text: "週末は 海へ 行ったんですか。" },
      {
        speaker: "M",
        text: "行く つもりでしたが、かぜを ひいて しまって、ずっと 家で ねて いました。",
      },
    ],
  },
  {
    id: 37,
    section: 4,
    type: "ポイント理解",
    question: "女の 人は 新しい アルバイトの 何が いいと 言って いますか。",
    options: [
      "時給が 高い こと",
      "店長が やさしくて、ご飯が おいしい こと",
      "仕事が かんたんな こと",
      "家から 近い こと",
    ],
    answer: 1,
    audio: "/audio/n4-1/37.mp3",
    script: [
      { speaker: "M", text: "新しい アルバイトは どうですか。" },
      {
        speaker: "F",
        text: "仕事は 大変ですが、店長が やさしいし、店で 食べる ご飯が おいしいんです。時給は 前より 安いですけど。",
      },
    ],
    glossary: [{ word: "時給", reading: "じきゅう", meaning: "soatbay haq" }],
  },
  {
    id: 38,
    section: 4,
    type: "即時応答",
    question: "何と 答えますか。",
    options: [
      "あ、それ、わたしのです。",
      "はい、かさを 持って います。",
      "いいえ、知りましょう。",
      "じゃあ、かして ください。",
    ],
    answer: 0,
    audio: "/audio/n4-1/38.mp3",
    script: [{ speaker: "F", text: "この かさ、だれのか 知って いますか。" }],
  },
  {
    id: 39,
    section: 4,
    type: "即時応答",
    question: "何と 答えますか。",
    options: ["ええ、開けました。", "いいえ、どういたしまして。", "ええ、どうぞ。", "窓が ありますよ。"],
    answer: 2,
    audio: "/audio/n4-1/39.mp3",
    script: [{ speaker: "M", text: "すみません、ちょっと 窓を 開けても いいですか。" }],
  },
  {
    id: 40,
    section: 4,
    type: "即時応答",
    question: "何と 答えますか。",
    options: [
      "映画を 見ました。",
      "はい、どうも。",
      "いいえ、行きませんでした。",
      "いいですね。何を 見ましょうか。",
    ],
    answer: 3,
    audio: "/audio/n4-1/40.mp3",
    script: [{ speaker: "M", text: "週末、いっしょに 映画でも どうですか。" }],
  },
];
