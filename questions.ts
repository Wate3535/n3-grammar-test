// =========================================================
// JFT-BASIC A2 — MOCK TEST 2
// Format (Japan Foundation): 4 section, ~12 savoldan, 60 daqiqa.
//   1. 文字と語彙  — 語の意味 / 語の使い方 / 漢字の読み / 漢字の意味と使い方
//   2. 会話と表現  — 文法 / 表現
//   3. 聴解        — 会話 / 店・公共の場所での会話 / アナウンス・指示
//   4. 読解        — 内容理解 / 情報検索
// 1-test git tarixida (commit f880021) va pdf/JFT-Basic-A2-test-1-*.pdf da.
// =========================================================

export const TEST = {
  name: "模擬テスト 2",
  slug: "test-2",
};

export type SectionId = 1 | 2 | 3 | 4;

export type ScriptLine = {
  speaker: "M" | "F";
  text: string;
};

// Savol ostida ko'rsatiladigan N3 darajadagi kanji va ma'nosi.
export type GlossaryItem = {
  word: string;
  reading: string;
  meaning: string;
};

export type Question = {
  id: number;
  section: SectionId;
  type: string;
  question: string;
  options: string[];
  answer: number;
  image?: string;
  passage?: string;
  audio?: string;
  script?: ScriptLine[];
  glossary?: GlossaryItem[];
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_MAIL = `グエンさんへ

会社の車が壊れたので、明日、修理に出します。
明日の朝は、8時のバスに乗って、工場の前で降りてください。
帰りは、車が直ったら、私が駅まで送ります。

山田`;

const PASSAGE_DIARY = `私は日本に来て、半年になります。今、レストランの台所で働いています。
はじめは、仕事のことばがわからなくて、よく失敗しました。それで、毎日、新しいことばをノートに書いて、覚えるようにしました。
今は、店長に「仕事が早くなったね」と言われて、うれしいです。
来月から、お客さんの注文も受けることになりました。少し心配ですが、がんばります。`;

const PASSAGE_NOTE = `アパートのみなさまへ

来週の日曜日に、引っ越しをします。
朝9時から昼12時ごろまで、トラックが駐車場に止まります。
少しうるさくなるかもしれません。ご迷惑をおかけしますが、よろしくお願いします。

201号室　キム`;

const PASSAGE_LIBRARY = `みどり図書館のお知らせ

開館時間：午前9時〜午後7時
休館日：毎週月曜日

・本は一人10冊まで、2週間借りることができます。
・本を借りるときは、図書館カードが必要です。
・図書館カードを作るときは、住所がわかるもの
　（在留カードなど）を持ってきてください。`;

const PASSAGE_CLEANING = `さくらクリーニング　料金表

ワイシャツ ……………… 200円
ズボン …………………… 400円
スーツ（上下）………… 1,000円
コート …………………… 1,200円

※月曜日と木曜日は、全部1割引きです。
※出した次の日の午後5時から受け取れます。`;

const PASSAGE_FESTIVAL = `夏祭りのお知らせ

日にち：8月3日（土）・4日（日）
時間：午後4時〜午後9時
場所：みなみ公園

・3日の午後7時から、ダンス大会があります。
・4日の午後8時から、花火があります。
※雨のときは、花火は8月10日（土）の同じ時間にします。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_MAIL: GlossaryItem[] = [
  { word: "壊れる", reading: "こわれる", meaning: "buzilmoq, sinmoq" },
  { word: "修理", reading: "しゅうり", meaning: "ta'mirlash" },
  { word: "工場", reading: "こうじょう", meaning: "zavod, fabrika" },
  { word: "直る", reading: "なおる", meaning: "tuzalmoq, ta'mirlanmoq" },
];

const GLOSSARY_DIARY: GlossaryItem[] = [
  { word: "半年", reading: "はんとし", meaning: "yarim yil" },
  { word: "台所", reading: "だいどころ", meaning: "oshxona" },
  { word: "失敗", reading: "しっぱい", meaning: "xato, muvaffaqiyatsizlik" },
  { word: "覚える", reading: "おぼえる", meaning: "yodlamoq" },
  { word: "店長", reading: "てんちょう", meaning: "do'kon / restoran boshlig'i" },
  { word: "注文", reading: "ちゅうもん", meaning: "buyurtma" },
];

const GLOSSARY_NOTE: GlossaryItem[] = [
  { word: "引っ越し", reading: "ひっこし", meaning: "ko'chib o'tish" },
  { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "avtoturargoh" },
  { word: "迷惑", reading: "めいわく", meaning: "noqulaylik, bezovtalik" },
];

const GLOSSARY_LIBRARY: GlossaryItem[] = [
  { word: "図書館", reading: "としょかん", meaning: "kutubxona" },
  { word: "開館", reading: "かいかん", meaning: "ochilish (bino)" },
  { word: "休館日", reading: "きゅうかんび", meaning: "dam olish kuni (bino yopiq)" },
  { word: "必要", reading: "ひつよう", meaning: "kerakli, zarur" },
  { word: "在留カード", reading: "ざいりゅうカード", meaning: "yashash kartasi (chet elliklar)" },
];

const GLOSSARY_CLEANING: GlossaryItem[] = [
  { word: "料金表", reading: "りょうきんひょう", meaning: "narxlar jadvali" },
  { word: "上下", reading: "うえした", meaning: "ustki va pastki (komplekt)" },
  { word: "割引き", reading: "わりびき", meaning: "chegirma (1割 = 10%)" },
  { word: "受け取る", reading: "うけとる", meaning: "olib ketmoq, qabul qilmoq" },
];

const GLOSSARY_FESTIVAL: GlossaryItem[] = [
  { word: "夏祭り", reading: "なつまつり", meaning: "yozgi bayram (festival)" },
  { word: "大会", reading: "たいかい", meaning: "musobaqa, tanlov" },
  { word: "花火", reading: "はなび", meaning: "salyut, mushakbozlik" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "☂️",
    question: "これは何ですか。",
    options: ["かさ", "かばん", "めがね", "とけい"],
    answer: 0,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🍳",
    question: "これは何ですか。",
    options: ["なべ", "フライパン", "やかん", "おさら"],
    answer: 1,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「あたらしくない」と同じ意味のことばはどれですか。",
    options: ["わかい", "やすい", "ふるい", "おそい"],
    answer: 2,
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "寒いので、コートを（　　）出かけます。",
    options: ["かぶって", "しめて", "はいて", "きて"],
    answer: 3,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "電気を（　　）から、部屋を出てください。",
    options: ["けして", "しめて", "とめて", "おわって"],
    answer: 0,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "道がわからないので、駅員に（　　）。",
    options: ["こたえました", "たずねました", "しらせました", "おしえました"],
    answer: 1,
    glossary: [
      { word: "駅員", reading: "えきいん", meaning: "stansiya xodimi" },
    ],
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "＿病院＿は駅の前にあります。",
    options: ["びよういん", "ぴょういん", "びょうい", "びょういん"],
    answer: 3,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿毎日＿、日本語を勉強しています。",
    options: ["まいび", "まいにち", "まいじつ", "めいにち"],
    answer: 1,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "この部屋には＿窓＿が二つあります。",
    options: ["かど", "かべ", "まど", "とびら"],
    answer: 2,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "駅のトイレに「故障中」と書いてあります。どういう意味ですか。",
    options: [
      "今、そうじをしています。",
      "今、こわれていて使えません。",
      "今、だれかが使っています。",
      "今、無料で使えます。",
    ],
    answer: 1,
    glossary: [
      { word: "無料", reading: "むりょう", meaning: "bepul" },
    ],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "＿たかい＿山にのぼりました。",
    options: ["京い", "商い", "亭い", "高い"],
    answer: 3,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "工事の場所に「立入禁止」と書いてあります。どういう意味ですか。",
    options: [
      "ここに入ってはいけません。",
      "ここで立ってはいけません。",
      "ここで待ってください。",
      "ここから出てください。",
    ],
    answer: 0,
    glossary: [
      { word: "工事", reading: "こうじ", meaning: "qurilish / ta'mirlash ishlari" },
    ],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "A「この本、もう読みましたか。」\nB「いいえ、まだ（　　）。」",
    options: ["読みません", "読んでいません", "読みました", "読んでいます"],
    answer: 1,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "雨が降っていますから、窓を（　　）ください。",
    options: ["しめる", "しめた", "しめ", "しめて"],
    answer: 3,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "日本語が上手に（　　）ように、毎日練習しています。",
    options: ["話して", "話した", "話せる", "話す"],
    answer: 2,
    glossary: [
      { word: "練習", reading: "れんしゅう", meaning: "mashq qilish" },
    ],
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "疲れたので、少し（　　）たいです。",
    options: ["休む", "休み", "休んで", "休ま"],
    answer: 1,
    glossary: [
      { word: "疲れる", reading: "つかれる", meaning: "charchamoq" },
    ],
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "すみません、この部屋で写真を（　　）もいいですか。",
    options: ["とる", "とった", "とり", "とって"],
    answer: 3,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "私は母に誕生日のプレゼントを（　　）。",
    options: ["くれました", "もらいました", "あげました", "いただきました"],
    answer: 2,
    glossary: [
      { word: "誕生日", reading: "たんじょうび", meaning: "tug'ilgan kun" },
    ],
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "友だちの家に入るとき、何と言いますか。",
    options: [
      "おじゃまします。",
      "失礼しました。",
      "いってらっしゃい。",
      "ただいま。",
    ],
    answer: 0,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "友だちが病気で休んでいます。電話で最後に何と言いますか。",
    options: [
      "おめでとうございます。",
      "お大事に。",
      "いただきます。",
      "お疲れさまでした。",
    ],
    answer: 1,
    glossary: [
      { word: "病気", reading: "びょうき", meaning: "kasallik" },
    ],
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「すみません、お手洗いはどこですか。」\nB「（　　）」",
    options: [
      "わかりました。",
      "はい、どうぞ。",
      "いいえ、けっこうです。",
      "あちらです。",
    ],
    answer: 3,
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question:
      "A「コーヒーをもう一杯いかがですか。」\nB「（　　）もうおなかがいっぱいなので。」",
    options: [
      "はい、おねがいします。",
      "いいえ、どういたしまして。",
      "いいえ、けっこうです。",
      "はい、いただきます。",
    ],
    answer: 2,
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "仕事中に気分が悪くなりました。上司に何と言いますか。",
    options: [
      "休まないでください。",
      "すみません、少し休ませていただけませんか。",
      "休んではいけません。",
      "休んだほうがいいですよ。",
    ],
    answer: 1,
    glossary: [
      { word: "気分", reading: "きぶん", meaning: "o'zini his qilish, kayfiyat" },
      { word: "上司", reading: "じょうし", meaning: "boshliq, rahbar" },
    ],
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question:
      "A「週末、いっしょに買い物に行きませんか。」\nB「いいですね。（　　）」",
    options: [
      "ぜひ行きましょう。",
      "行きませんでした。",
      "行ってください。",
      "行ったことがあります。",
    ],
    answer: 0,
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "女の人は昨日、何を買いましたか。",
    options: ["シャツとかばん", "くつとかばん", "くつとぼうし", "シャツとぼうし"],
    answer: 2,
    audio: "/audio/test-2/25.mp3",
    script: [
      { speaker: "M", text: "その靴、新しいですね。" },
      {
        speaker: "F",
        text: "ええ、昨日デパートで買いました。かばんも買いたかったんですが、高かったので、帽子を買いました。",
      },
      { speaker: "M", text: "そうですか。どちらもいいですね。" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "二人は何で駅へ行きますか。",
    options: ["タクシー", "バス", "電車", "歩いて"],
    answer: 0,
    audio: "/audio/test-2/26.mp3",
    script: [
      { speaker: "F", text: "駅まで歩いて行きましょうか。" },
      {
        speaker: "M",
        text: "でも、歩くと20分ぐらいかかりますよ。バスで行きませんか。",
      },
      {
        speaker: "F",
        text: "あ、バスは今出たところですね。次のバスは30分後ですよ。",
      },
      { speaker: "M", text: "じゃあ、タクシーにしましょう。" },
      { speaker: "F", text: "そうですね。" },
    ],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "女の人はいつ病院へ行きますか。",
    options: ["今日の午後", "月曜日の朝", "日曜日の朝", "月曜日の午後"],
    answer: 1,
    audio: "/audio/test-2/27.mp3",
    script: [
      { speaker: "M", text: "顔色が悪いですね。大丈夫ですか。" },
      {
        speaker: "F",
        text: "ちょっと頭が痛いんです。今日の午後、病院へ行こうと思っています。",
      },
      { speaker: "M", text: "今日は土曜日ですから、病院は午前中だけですよ。" },
      {
        speaker: "F",
        text: "そうですか。明日は日曜日で病院が休みなので、月曜日の朝、行きます。",
      },
    ],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "男の人はどうしてパーティーに行きませんか。",
    options: [
      "仕事があるから",
      "かぜをひいたから",
      "国から両親が来るから",
      "お金がないから",
    ],
    answer: 2,
    audio: "/audio/test-2/28.mp3",
    script: [
      { speaker: "F", text: "土曜日のパーティー、来ますよね。" },
      {
        speaker: "M",
        text: "行きたいんですが、その日は国から両親が来るので、空港へ迎えに行かなければならないんです。",
      },
      { speaker: "F", text: "そうですか。残念ですね。" },
    ],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は何をいくつ買いますか。",
    options: ["みかんを5つ", "りんごを5つ", "りんごを3つ", "みかんを3つ"],
    answer: 0,
    audio: "/audio/test-2/29.mp3",
    script: [
      { speaker: "M", text: "すみません、りんごを5つください。" },
      {
        speaker: "F",
        text: "申し訳ありません。りんごは今日、3つしかないんです。",
      },
      {
        speaker: "M",
        text: "そうですか。じゃあ、りんごはいいです。かわりに、みかんを5つください。",
      },
      { speaker: "F", text: "はい、みかん5つですね。" },
    ],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は明日、何時ごろ朝ごはんを食べますか。",
    options: ["6時半", "7時", "8時", "9時"],
    answer: 1,
    audio: "/audio/test-2/30.mp3",
    script: [
      { speaker: "M", text: "すみません、朝ごはんは何時からですか。" },
      {
        speaker: "F",
        text: "6時半から9時までです。1階のレストランでどうぞ。",
      },
      {
        speaker: "M",
        text: "明日は8時にホテルを出るので、7時ごろ食べます。",
      },
      { speaker: "F", text: "かしこまりました。" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人はこのあと、まず何をしますか。",
    options: [
      "紙に住所を書く",
      "在留カードを見せる",
      "家に帰る",
      "手続きをする",
    ],
    answer: 2,
    audio: "/audio/test-2/31.mp3",
    script: [
      {
        speaker: "F",
        text: "すみません、住所が変わったので、手続きをしたいんですが。",
      },
      {
        speaker: "M",
        text: "では、この紙に新しい住所を書いてください。それから、在留カードを見せてください。",
      },
      { speaker: "F", text: "あ、在留カードを家に忘れてしまいました。" },
      {
        speaker: "M",
        text: "そうですか。カードがないと、手続きができないんですが。",
      },
      { speaker: "F", text: "わかりました。じゃあ、今から家に取りに帰ります。" },
    ],
    glossary: [
      { word: "住所", reading: "じゅうしょ", meaning: "manzil, yashash joyi" },
      { word: "手続き", reading: "てつづき", meaning: "rasmiylashtirish (hujjat)" },
      { word: "在留カード", reading: "ざいりゅうカード", meaning: "yashash kartasi" },
    ],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "何人で予約しましたか。",
    options: ["3人", "4人", "5人", "6人"],
    answer: 2,
    audio: "/audio/test-2/32.mp3",
    script: [
      { speaker: "F", text: "はい、レストランさくらでございます。" },
      {
        speaker: "M",
        text: "もしもし、土曜日の夜7時に予約したいんですが。",
      },
      { speaker: "F", text: "何名様ですか。" },
      {
        speaker: "M",
        text: "4人です。あ、すみません。子どもも1人いるので、5人でお願いします。",
      },
      { speaker: "F", text: "かしこまりました。5名様ですね。" },
    ],
    glossary: [
      { word: "予約", reading: "よやく", meaning: "oldindan band qilish (bron)" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "何階でセールをしていますか。",
    options: ["3階", "4階", "5階", "6階"],
    answer: 0,
    audio: "/audio/test-2/33.mp3",
    script: [
      {
        speaker: "F",
        text: "本日は、みどりデパートにご来店いただき、ありがとうございます。ただいま、3階のくつ売り場でセールを行っております。5階のかばん売り場ではございません。どうぞご利用ください。",
      },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "ベルが鳴ったら、どこに集まりますか。",
    options: ["教室", "駐車場", "体育館", "エレベーターの前"],
    answer: 1,
    audio: "/audio/test-2/34.mp3",
    script: [
      {
        speaker: "M",
        text: "明日は避難訓練があります。10時にベルが鳴ったら、すぐに外に出て、駐車場に集まってください。エレベーターは使わないでください。",
      },
    ],
    glossary: [
      { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "avtoturargoh" },
      { word: "体育館", reading: "たいいくかん", meaning: "sport zali" },
    ],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "電車はどうして遅れていますか。",
    options: [
      "事故があったから",
      "雪が降っているから",
      "人が多いから",
      "電車がこわれたから",
    ],
    answer: 1,
    audio: "/audio/test-2/35.mp3",
    script: [
      {
        speaker: "F",
        text: "お客様にお知らせいたします。ただいま、雪のため、電車が15分ほど遅れております。ご迷惑をおかけして、申し訳ございません。",
      },
    ],
    glossary: [
      { word: "遅れる", reading: "おくれる", meaning: "kechikmoq" },
      { word: "事故", reading: "じこ", meaning: "avariya, baxtsiz hodisa" },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "プールに入る前に、何をしなければなりませんか。",
    options: ["帽子を買う", "水を飲む", "名前を書く", "シャワーを浴びる"],
    answer: 3,
    audio: "/audio/test-2/36.mp3",
    script: [
      {
        speaker: "M",
        text: "プールを使う方にお知らせします。プールは午後6時までです。プールに入る前に、必ずシャワーを浴びてください。帽子を持っていない方は、受付で借りることができます。",
      },
    ],
    glossary: [
      { word: "浴びる", reading: "あびる", meaning: "(dush) qabul qilmoq" },
    ],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MAIL,
    question: "グエンさんは明日の朝、どうやって工場へ行きますか。",
    options: [
      "会社の車で行く",
      "山田さんの車で行く",
      "歩いて行く",
      "バスで行く",
    ],
    answer: 3,
    glossary: GLOSSARY_MAIL,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MAIL,
    question: "グエンさんは、帰りはどうしますか。",
    options: [
      "一人でバスで帰る",
      "工場から歩いて帰る",
      "車が直ったら、山田さんに駅まで送ってもらう",
      "工場に泊まる",
    ],
    answer: 2,
    glossary: GLOSSARY_MAIL,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_DIARY,
    question: "この人は、はじめ、どうしてよく失敗しましたか。",
    options: [
      "料理が下手だったから",
      "台所がせまかったから",
      "店長がきびしかったから",
      "仕事のことばがわからなかったから",
    ],
    answer: 3,
    glossary: GLOSSARY_DIARY,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_DIARY,
    question: "この人は、来月から何をしますか。",
    options: [
      "お客さんの注文を受ける",
      "新しい店で働く",
      "料理を教える",
      "日本語学校に通う",
    ],
    answer: 0,
    glossary: GLOSSARY_DIARY,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_NOTE,
    question: "キムさんは、来週の日曜日に何をしますか。",
    options: [
      "引っ越しをする",
      "トラックを買う",
      "駐車場を掃除する",
      "パーティーをする",
    ],
    answer: 0,
    glossary: GLOSSARY_NOTE,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_NOTE,
    question: "トラックはいつ駐車場に止まりますか。",
    options: [
      "来週の日曜日の夜",
      "来週の土曜日の朝",
      "来週の日曜日の午前",
      "今週の日曜日の午後",
    ],
    answer: 2,
    glossary: GLOSSARY_NOTE,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_LIBRARY,
    question:
      "初めて図書館で本を借りたいです。図書館カードはまだありません。何を持っていきますか。",
    options: ["在留カード", "写真", "お金", "図書館カード"],
    answer: 0,
    glossary: GLOSSARY_LIBRARY,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_LIBRARY,
    question: "図書館で、一人何冊まで本を借りることができますか。",
    options: ["2冊", "7冊", "9冊", "10冊"],
    answer: 3,
    glossary: GLOSSARY_LIBRARY,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLEANING,
    question:
      "火曜日に、ワイシャツを2枚とズボンを1本出します。いくら払いますか。",
    options: ["600円", "1,000円", "800円", "1,200円"],
    answer: 2,
    glossary: GLOSSARY_CLEANING,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLEANING,
    question: "水曜日の朝に出しました。いつから受け取れますか。",
    options: [
      "水曜日の午後5時",
      "木曜日の朝",
      "金曜日の午後5時",
      "木曜日の午後5時",
    ],
    answer: 3,
    glossary: GLOSSARY_CLEANING,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_FESTIVAL,
    question: "花火を見たいです。いつ行けばいいですか。",
    options: [
      "4日の午後8時",
      "3日の午後7時",
      "3日の午後8時",
      "4日の午後4時",
    ],
    answer: 0,
    glossary: GLOSSARY_FESTIVAL,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_FESTIVAL,
    question: "4日は雨でした。花火を見たいです。いつ行けばいいですか。",
    options: [
      "8月5日の午後8時",
      "8月11日の午後8時",
      "8月10日の午後7時",
      "8月10日の午後8時",
    ],
    answer: 3,
    glossary: GLOSSARY_FESTIVAL,
  },
];
