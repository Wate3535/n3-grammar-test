// =========================================================
// JFT-BASIC A2 — MOCK TEST
// Format (Japan Foundation): 4 section, ~12 savoldan, 60 daqiqa.
//   1. 文字と語彙  — 語の意味 / 語の使い方 / 漢字の読み / 漢字の意味と使い方
//   2. 会話と表現  — 文法 / 表現
//   3. 聴解        — 会話 / 店・公共の場所での会話 / アナウンス・指示
//   4. 読解        — 内容理解 / 情報検索
// =========================================================

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

const PASSAGE_BBQ = `リンさんへ

来週の土曜日、私の家でバーベキューをします。12時からです。
飲み物は私が用意しますから、何か食べ物を一つ持ってきてください。
私の家は駅から遠いので、駅に着いたら電話してください。車で迎えに行きます。

さくら`;

const PASSAGE_WATER = `お知らせ

3月10日（水）午前9時から午後3時まで、水道の工事をします。
この時間は、水が使えません。
工事の前に、必要な水を用意しておいてください。

さくら荘 管理人`;

const PASSAGE_KAIGO = `私は去年の4月に日本に来ました。今、介護の仕事をしています。
最初は日本語がよくわからなくて、とても大変でした。でも、同じ施設の人たちがやさしく教えてくれました。
今は、お年寄りとたくさん話せるようになりました。
休みの日は、日本語学校で漢字を勉強しています。来年、介護福祉士の試験を受けたいです。`;

const PASSAGE_BUS = `みどり駅行き　バス時刻表（平日）

7:15　7:45　8:15　8:45　9:30　10:30

※土曜日・日曜日は1時間に1本です。`;

const PASSAGE_LUNCH = `ランチメニュー（11:00〜14:00）

A　ハンバーグ定食 ……… 850円
B　焼き魚定食 ………… 800円
C　カレーライス ……… 700円
D　ラーメン …………… 650円

※ランチには飲み物がつきます。
※＋100円でデザートもつきます。`;

const PASSAGE_CLASS = `日本語教室のお知らせ

場所：市民センター 2階
日時：毎週 火曜日・金曜日　18:30〜20:00
料金：1回 300円
　　　（テキスト代 1,000円は、初めての日だけ払ってください）
申し込み：初めての人は、教室の前の日までに電話してください。
TEL 012-345-6789`;

const PASSAGE_MEDICINE = `みどり薬局

アリ 様

かぜ薬
1日3回　朝・昼・晩　食後
1回に2錠ずつ飲んでください。
5日分`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_BBQ: GlossaryItem[] = [
  { word: "用意", reading: "ようい", meaning: "tayyorlash, hozirlab qo'yish" },
  { word: "迎える", reading: "むかえる", meaning: "kutib olmoq" },
];

const GLOSSARY_WATER: GlossaryItem[] = [
  { word: "水道", reading: "すいどう", meaning: "suv quvuri, vodoprovod" },
  { word: "工事", reading: "こうじ", meaning: "ta'mirlash / qurilish ishlari" },
  { word: "必要", reading: "ひつよう", meaning: "kerakli, zarur" },
  { word: "管理人", reading: "かんりにん", meaning: "uy boshqaruvchisi (komendant)" },
];

const GLOSSARY_KAIGO: GlossaryItem[] = [
  { word: "介護", reading: "かいご", meaning: "parvarish (keksalar, bemorlar)" },
  { word: "施設", reading: "しせつ", meaning: "muassasa" },
  { word: "お年寄り", reading: "おとしより", meaning: "keksalar, qariyalar" },
  { word: "福祉士", reading: "ふくしし", meaning: "ijtimoiy xizmat mutaxassisi" },
  { word: "試験", reading: "しけん", meaning: "imtihon" },
];

const GLOSSARY_BUS: GlossaryItem[] = [
  { word: "時刻表", reading: "じこくひょう", meaning: "qatnov jadvali" },
  { word: "平日", reading: "へいじつ", meaning: "ish kunlari (dush–jum)" },
  { word: "準備", reading: "じゅんび", meaning: "tayyorgarlik" },
];

const GLOSSARY_LUNCH: GlossaryItem[] = [
  { word: "定食", reading: "ていしょく", meaning: "kompleks ovqat (set)" },
  { word: "焼き魚", reading: "やきざかな", meaning: "qovurilgan baliq" },
];

const GLOSSARY_CLASS: GlossaryItem[] = [
  { word: "市民", reading: "しみん", meaning: "shahar aholisi, fuqarolar" },
  { word: "日時", reading: "にちじ", meaning: "sana va vaqt" },
  { word: "料金", reading: "りょうきん", meaning: "to'lov, narx" },
  { word: "申し込み", reading: "もうしこみ", meaning: "ro'yxatdan o'tish, ariza" },
];

const GLOSSARY_MEDICINE: GlossaryItem[] = [
  { word: "薬局", reading: "やっきょく", meaning: "dorixona" },
  { word: "食後", reading: "しょくご", meaning: "ovqatdan keyin" },
  { word: "錠", reading: "じょう", meaning: "tabletka (sanoq so'zi)" },
  { word: "5日分", reading: "いつかぶん", meaning: "5 kunlik" },
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
    image: "🧦",
    question: "これは何ですか。",
    options: ["てぶくろ", "くつした", "ぼうし", "ズボン"],
    answer: 1,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🚑",
    question: "これは何ですか。",
    options: ["しょうぼうしゃ", "パトカー", "きゅうきゅうしゃ", "タクシー"],
    answer: 2,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「しずかじゃない」と同じ意味のことばはどれですか。",
    options: ["せまい", "くらい", "つめたい", "うるさい"],
    answer: 3,
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "雨が降っているので、かさを（　　）ください。",
    options: ["かぶって", "さして", "はいて", "かけて"],
    answer: 1,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "熱があるので、今日は会社を（　　）。",
    options: ["休みます", "止まります", "やめます", "終わります"],
    answer: 0,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "このシャツは少し（　　）ので、もっと大きいのはありますか。",
    options: ["ひろい", "ふとい", "ながい", "きつい"],
    answer: 3,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "毎朝、＿電車＿で会社に行きます。",
    options: ["てんしゃ", "でんしゃ", "でんしや", "でんじゃ"],
    answer: 1,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿入口＿はあちらです。",
    options: ["にゅうくち", "はいりぐち", "いりぐち", "いりくち"],
    answer: 2,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "＿来週＿の月曜日に病院へ行きます。",
    options: ["らいしゅう", "らいしゅ", "こしゅう", "らいしょう"],
    answer: 0,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "店のドアに「禁煙」と書いてあります。どういう意味ですか。",
    options: [
      "ここで食べてはいけません。",
      "ここでたばこをすってはいけません。",
      "ここで写真をとってはいけません。",
      "ここに入ってはいけません。",
    ],
    answer: 1,
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "＿やすみ＿の日は何をしますか。",
    options: ["体み", "木み", "作み", "休み"],
    answer: 3,
  },
  {
    id: 12,
    glossary: [
      { word: "準備", reading: "じゅんび", meaning: "tayyorgarlik" },
    ],
    section: 1,
    type: "漢字の意味と使い方",
    question: "店の入口に「営業中」と書いてあります。どういう意味ですか。",
    options: [
      "今、店は閉まっています。",
      "今日、店は休みです。",
      "今、店は開いています。",
      "店は準備をしています。",
    ],
    answer: 2,
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    glossary: [
      { word: "映画", reading: "えいが", meaning: "kino, film" },
    ],
    section: 2,
    type: "文法",
    question:
      "A「日曜日、何をしましたか。」\nB「友だちと映画を（　　）、買い物をしたりしました。」",
    options: ["見て", "見たり", "見る", "見た"],
    answer: 1,
  },
  {
    id: 14,
    glossary: [
      { word: "富士山", reading: "ふじさん", meaning: "Fuji tog'i" },
    ],
    section: 2,
    type: "文法",
    question: "日本に来てから、まだ富士山に（　　）ことがありません。",
    options: ["のぼった", "のぼる", "のぼって", "のぼり"],
    answer: 0,
  },
  {
    id: 15,
    glossary: [
      { word: "薬", reading: "くすり", meaning: "dori" },
    ],
    section: 2,
    type: "文法",
    question: "この薬は、ご飯を（　　）あとで飲んでください。",
    options: ["食べる", "食べて", "食べた", "食べ"],
    answer: 2,
  },
  {
    id: 16,
    glossary: [
      { word: "降る", reading: "ふる", meaning: "(yomg'ir, qor) yog'moq" },
    ],
    section: 2,
    type: "文法",
    question: "明日は雨が（　　）かもしれません。",
    options: ["降って", "降った", "降ら", "降る"],
    answer: 3,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "A「この漢字、読めますか。」\nB「いいえ、むずかしくて（　　）。」",
    options: ["読みません", "読めません", "読みたいです", "読めます"],
    answer: 1,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "わからないところを、先生に教えて（　　）。",
    options: ["もらいました", "あげました", "くれました", "やりました"],
    answer: 0,
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "会社で、ほかの人より先に帰ります。何と言いますか。",
    options: [
      "お疲れさまでした。",
      "いってきます。",
      "お先に失礼します。",
      "いただきます。",
    ],
    answer: 2,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "友だちの家で、ごはんを食べる前に何と言いますか。",
    options: [
      "ごちそうさまでした。",
      "おじゃまします。",
      "おかえりなさい。",
      "いただきます。",
    ],
    answer: 3,
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「すみません、このいす、使ってもいいですか。」\nB「（　　）」",
    options: [
      "はい、どうぞ。",
      "いいえ、どういたしまして。",
      "はい、おかげさまで。",
      "ええ、いただきます。",
    ],
    answer: 0,
  },
  {
    id: 22,
    glossary: [
      { word: "注文", reading: "ちゅうもん", meaning: "buyurtma" },
      { word: "客", reading: "きゃく", meaning: "mijoz, mehmon" },
    ],
    section: 2,
    type: "表現",
    question: "店員「ご注文は？」\n客「（　　）」",
    options: [
      "コーヒーはいかがですか。",
      "コーヒーを一つお願いします。",
      "コーヒーをどうぞ。",
      "コーヒーでございます。",
    ],
    answer: 1,
  },
  {
    id: 23,
    glossary: [
      { word: "会議", reading: "かいぎ", meaning: "majlis, yig'ilish" },
      { word: "遅れる", reading: "おくれる", meaning: "kechikmoq" },
      { word: "上司", reading: "じょうし", meaning: "boshliq, rahbar" },
    ],
    section: 2,
    type: "表現",
    question: "会議に遅れました。上司に何と言いますか。",
    options: [
      "遅れてもいいですか。",
      "遅れないでください。",
      "遅れて申し訳ありません。",
      "遅れてよかったです。",
    ],
    answer: 2,
  },
  {
    id: 24,
    glossary: [
      { word: "食事", reading: "しょくじ", meaning: "ovqatlanish" },
    ],
    section: 2,
    type: "表現",
    question:
      "A「明日、いっしょに食事しませんか。」\nB「ありがとうございます。でも、（　　）」",
    options: [
      "ぜひ行きましょう。",
      "何時にしますか。",
      "明日は大丈夫です。",
      "明日はちょっと…。",
    ],
    answer: 3,
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    audio: "/audio/listening/25.mp3",
    glossary: [
      { word: "掃除", reading: "そうじ", meaning: "tozalash, yig'ishtirish" },
      { word: "料理", reading: "りょうり", meaning: "ovqat pishirish" },
    ],
    section: 3,
    type: "会話",
    question: "男の人は日曜日に何をしましたか。",
    options: ["テニスと買い物", "掃除と料理", "テニスと掃除", "料理と買い物"],
    answer: 1,
    script: [
      { speaker: "F", text: "田中さん、週末は何をしましたか。" },
      {
        speaker: "M",
        text: "土曜日は友だちとテニスをしました。日曜日は家で掃除をしてから、料理をしました。",
      },
      { speaker: "F", text: "そうですか。いいですね。" },
    ],
  },
  {
    id: 26,
    audio: "/audio/listening/26.mp3",
    glossary: [
      { word: "信号", reading: "しんごう", meaning: "svetofor" },
      { word: "曲がる", reading: "まがる", meaning: "burilmoq" },
    ],
    section: 3,
    type: "会話",
    question: "男の人はどこで曲がりますか。",
    options: [
      "一つ目の信号を右",
      "一つ目の信号を左",
      "二つ目の信号を左",
      "二つ目の信号を右",
    ],
    answer: 3,
    script: [
      { speaker: "M", text: "すみません、駅はどこですか。" },
      {
        speaker: "F",
        text: "この道をまっすぐ行って、二つ目の信号を右に曲がってください。駅は左にありますよ。",
      },
      { speaker: "M", text: "二つ目の信号を右ですね。ありがとうございます。" },
    ],
  },
  {
    id: 27,
    audio: "/audio/listening/27.mp3",
    section: 3,
    type: "会話",
    question: "男の人は何時ごろパーティーに行きますか。",
    options: ["6時", "6時半", "7時半", "7時"],
    answer: 2,
    script: [
      { speaker: "F", text: "マリアさんの誕生日パーティー、何時からですか。" },
      {
        speaker: "M",
        text: "6時からです。でも、ぼくは仕事があるので、7時半ごろ行きます。",
      },
      { speaker: "F", text: "そうですか。私は6時に行きます。" },
    ],
  },
  {
    id: 28,
    audio: "/audio/listening/28.mp3",
    section: 3,
    type: "会話",
    question: "二人はいつ山に行きますか。",
    options: ["あさって", "明日の午前", "明日の午後", "今日"],
    answer: 0,
    script: [
      { speaker: "M", text: "明日、山に行きませんか。" },
      {
        speaker: "F",
        text: "いいですね。でも、天気予報で、明日は午後から雨だと言っていましたよ。",
      },
      { speaker: "M", text: "じゃあ、あさってにしましょう。" },
      { speaker: "F", text: "そうしましょう。" },
    ],
  },
  {
    id: 29,
    audio: "/audio/listening/29.mp3",
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人はどのサイズを買いますか。",
    options: ["Sサイズ", "Mサイズ", "Lサイズ", "買いません"],
    answer: 2,
    script: [
      { speaker: "M", text: "いらっしゃいませ。" },
      { speaker: "F", text: "すみません、このTシャツのMサイズはありますか。" },
      {
        speaker: "M",
        text: "申し訳ありません。Mサイズは今ありません。SとLならあります。",
      },
      { speaker: "F", text: "じゃあ、Lをください。" },
    ],
  },
  {
    id: 30,
    audio: "/audio/listening/30.mp3",
    glossary: [
      { word: "食事", reading: "しょくじ", meaning: "ovqatlanish" },
    ],
    section: 3,
    type: "店・公共の場所での会話",
    question: "コーヒーはいつ来ますか。",
    options: ["食事のあと", "食事の前", "食事と一緒", "来ません"],
    answer: 0,
    script: [
      { speaker: "F", text: "ご注文はお決まりですか。" },
      { speaker: "M", text: "はい。カレーライスを一つと、コーヒーをお願いします。" },
      {
        speaker: "F",
        text: "コーヒーは、お食事と一緒にお持ちしますか。食後になさいますか。",
      },
      { speaker: "M", text: "食後にお願いします。" },
    ],
  },
  {
    id: 31,
    audio: "/audio/listening/31.mp3",
    glossary: [
      { word: "住所", reading: "じゅうしょ", meaning: "manzil, yashash joyi" },
      { word: "薬", reading: "くすり", meaning: "dori" },
    ],
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人はこのあと、まず何をしますか。",
    options: ["薬を飲む", "先生と話す", "紙に名前と住所を書く", "家に帰る"],
    answer: 2,
    script: [
      { speaker: "F", text: "今日はどうしましたか。" },
      { speaker: "M", text: "きのうの夜から頭が痛くて、熱もあります。" },
      {
        speaker: "F",
        text: "そうですか。では、この紙に名前と住所を書いて、少々お待ちください。",
      },
      { speaker: "M", text: "はい、わかりました。" },
    ],
  },
  {
    id: 32,
    audio: "/audio/listening/32.mp3",
    glossary: [
      { word: "荷物", reading: "にもつ", meaning: "yuk, posilka" },
      { word: "航空便", reading: "こうくうびん", meaning: "aviapochta" },
      { word: "船便", reading: "ふなびん", meaning: "dengiz pochtasi" },
    ],
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人はどうやって荷物を送りますか。",
    options: ["航空便で送る", "船便で送る", "今日は送らない", "自分で持っていく"],
    answer: 1,
    script: [
      { speaker: "F", text: "この荷物をベトナムに送りたいんですが。" },
      { speaker: "M", text: "船便と航空便がありますが。" },
      { speaker: "F", text: "どちらが安いですか。" },
      {
        speaker: "M",
        text: "船便のほうが安いですが、1か月ぐらいかかります。航空便は1週間ぐらいです。",
      },
      { speaker: "F", text: "急いでいないので、安いほうでお願いします。" },
    ],
  },
  {
    id: 33,
    audio: "/audio/listening/33.mp3",
    glossary: [
      { word: "番線", reading: "ばんせん", meaning: "platforma (yo'l) raqami" },
    ],
    section: 3,
    type: "アナウンス・指示",
    question: "東京行きの電車は何番線に来ますか。",
    options: ["1番線", "3番線", "4番線", "2番線"],
    answer: 3,
    script: [
      {
        speaker: "F",
        text: "まもなく、2番線に東京行きの電車がまいります。危ないですから、黄色い線の内側までお下がりください。",
      },
    ],
  },
  {
    id: 34,
    audio: "/audio/listening/34.mp3",
    glossary: [
      { word: "会議室", reading: "かいぎしつ", meaning: "majlislar xonasi" },
    ],
    section: 3,
    type: "アナウンス・指示",
    question: "明日、何時までに会議室に行かなければなりませんか。",
    options: ["8時半", "8時50分", "9時", "9時10分"],
    answer: 1,
    script: [
      {
        speaker: "M",
        text: "みなさん、明日の朝は9時から会議があります。会議室は3階です。8時50分までに来てください。それから、ノートとペンを持ってきてください。",
      },
    ],
  },
  {
    id: 35,
    audio: "/audio/listening/35.mp3",
    section: 3,
    type: "アナウンス・指示",
    question: "何が安くなりましたか。",
    options: ["肉と魚", "パンと牛乳", "トマトとキャベツ", "くだもの"],
    answer: 2,
    script: [
      {
        speaker: "F",
        text: "本日はご来店ありがとうございます。ただいまから、1階の野菜売り場で、トマトとキャベツを半額で販売いたします。どうぞご利用ください。",
      },
    ],
  },
  {
    id: 36,
    audio: "/audio/listening/36.mp3",
    section: 3,
    type: "アナウンス・指示",
    question: "プラスチックのごみは、いつ出しますか。",
    options: ["水曜日の朝", "月曜日の朝", "木曜日の朝", "水曜日の夜"],
    answer: 0,
    script: [
      {
        speaker: "M",
        text: "ごみの出し方を説明します。燃えるごみは月曜日と木曜日です。プラスチックは水曜日です。朝8時までに出してください。夜に出してはいけません。",
      },
    ],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    glossary: GLOSSARY_BBQ,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_BBQ,
    question: "リンさんは何を持っていきますか。",
    options: ["飲み物", "車", "何も持っていかない", "食べ物"],
    answer: 3,
  },
  {
    id: 38,
    glossary: GLOSSARY_BBQ,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_BBQ,
    question: "リンさんは駅に着いたら、何をしますか。",
    options: [
      "歩いてさくらさんの家へ行く",
      "さくらさんに電話する",
      "バスに乗る",
      "タクシーに乗る",
    ],
    answer: 1,
  },
  {
    id: 39,
    glossary: GLOSSARY_WATER,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_WATER,
    question: "3月10日の午後4時に、水を使うことができますか。",
    options: [
      "使えません。",
      "使えます。",
      "午後5時から使えます。",
      "一日中使えません。",
    ],
    answer: 1,
  },
  {
    id: 40,
    glossary: GLOSSARY_WATER,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_WATER,
    question: "このアパートに住んでいる人は、何をしておかなければなりませんか。",
    options: [
      "工事の前に水を用意する",
      "工事を手伝う",
      "午前9時に家にいる",
      "管理人に電話する",
    ],
    answer: 0,
  },
  {
    id: 41,
    glossary: GLOSSARY_KAIGO,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_KAIGO,
    question: "この人は、今どうですか。",
    options: [
      "日本語がよくわからない。",
      "漢字を教えている。",
      "お年寄りとたくさん話せる。",
      "介護福祉士の試験に合格した。",
    ],
    answer: 2,
  },
  {
    id: 42,
    glossary: GLOSSARY_KAIGO,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_KAIGO,
    question: "この人は、休みの日に何をしていますか。",
    options: [
      "施設で働いている。",
      "試験を受けている。",
      "お年寄りと話している。",
      "日本語学校で漢字を勉強している。",
    ],
    answer: 3,
  },
  {
    id: 43,
    glossary: GLOSSARY_BUS,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_BUS,
    question:
      "あなたは平日、8時に起きます。準備に20分かかります。家からバス停まで歩いて5分です。何時のバスに乗りますか。",
    options: ["7:45", "8:15", "8:45", "9:30"],
    answer: 2,
  },
  {
    id: 44,
    glossary: GLOSSARY_LUNCH,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_LUNCH,
    question: "魚が食べたいです。デザートも食べたいです。いくら払いますか。",
    options: ["800円", "900円", "850円", "950円"],
    answer: 1,
  },
  {
    id: 45,
    glossary: GLOSSARY_LUNCH,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_LUNCH,
    question: "ランチメニューは何時まで食べられますか。",
    options: ["午前11時まで", "午後3時まで", "午後2時まで", "一日中"],
    answer: 2,
  },
  {
    id: 46,
    glossary: GLOSSARY_CLASS,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLASS,
    question: "初めて日本語教室に行く日、いくら払いますか。",
    options: ["300円", "1,000円", "0円", "1,300円"],
    answer: 3,
  },
  {
    id: 47,
    glossary: GLOSSARY_CLASS,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLASS,
    question:
      "初めて、金曜日のクラスに行きたいです。いつまでに電話しなければなりませんか。",
    options: ["木曜日", "水曜日", "金曜日", "月曜日"],
    answer: 0,
  },
  {
    id: 48,
    glossary: GLOSSARY_MEDICINE,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_MEDICINE,
    question: "アリさんは1日に何錠飲みますか。",
    options: ["2錠", "3錠", "5錠", "6錠"],
    answer: 3,
  },
];
