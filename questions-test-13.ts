import type { GlossaryItem, Question } from "@/questions";

export const TEST_13 = {
  name: "模擬テスト 13",
  slug: "test-13",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_SHIFT = `アリさん

来週の土曜日、田中さんが休むので、代わりに働いてもらえませんか。
時間は朝9時から午後3時までです。
もし大丈夫なら、水曜日までに返事をください。
むずかしい場合は、ほかの人に頼みます。

店長　木村`;

const PASSAGE_FACTORY = `わたしはフィリピンから来て、自動車の部品を作る工場で働いています。毎日、同じ作業をくりかえすので、最初は時間がとても長く感じました。
でも、自分が作った部品が車に使われていると思うと、うれしくなります。工場には、ほかの国から来た人もたくさんいて、みんな日本語で話しています。
休みの日には、みんなでバスケットボールをします。日本に来て、たくさん友だちができました。`;

const PASSAGE_NOISE = `マンションのみなさんへ

最近、夜遅くに大きな音を出す人がいて、困っている人がいます。
夜10時から朝7時までは、洗濯機やそうじ機を使わないでください。
また、ベランダで大きな声で話すのも、やめてください。
みなさんが気持ちよく生活できるように、ご協力をお願いします。

管理会社`;

const PASSAGE_KARAOKE = `カラオケ　ドレミ　料金（1人・30分）

　　　　　　　　　　　　平日　　　土日・祝日
昼（11:00〜18:00）　　 150円　　　250円
夜（18:00〜翌5:00）　 300円　　　400円

・学生は、学生証を見せると、いつでも半額です。
・飲み物は、1杯 200円です。`;

const PASSAGE_SODAI = `粗大ごみの出し方

1. 電話かインターネットで申し込んでください。
2. コンビニで「粗大ごみ処理券」を買ってください。
　　いす　　　300円
　　机　　　　800円
　　自転車　　500円
3. 決められた日の朝8時までに、券をはって出してください。`;

const PASSAGE_SPEECH = `第5回　日本語スピーチ大会

日時：12月7日（土）13:00〜16:00
場所：さくら市民ホール
テーマ：「日本でおどろいたこと」
・スピーチは5分以内です。
・申し込みは、11月20日までにメールで送ってください。
・1位の人には、新幹線のチケットをプレゼントします。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_SHIFT: GlossaryItem[] = [
  { word: "代わりに", reading: "かわりに", meaning: "o'rniga" },
  { word: "返事", reading: "へんじ", meaning: "javob" },
  { word: "場合", reading: "ばあい", meaning: "holatda" },
  { word: "頼む", reading: "たのむ", meaning: "iltimos qilmoq" },
];

const GLOSSARY_FACTORY: GlossaryItem[] = [
  { word: "自動車", reading: "じどうしゃ", meaning: "avtomobil" },
  { word: "部品", reading: "ぶひん", meaning: "ehtiyot qism, detal" },
  { word: "作業", reading: "さぎょう", meaning: "ish jarayoni" },
  { word: "感じる", reading: "かんじる", meaning: "his qilmoq" },
];

const GLOSSARY_NOISE: GlossaryItem[] = [
  { word: "最近", reading: "さいきん", meaning: "so'nggi paytda" },
  { word: "困る", reading: "こまる", meaning: "qiynalmoq" },
  { word: "洗濯機", reading: "せんたくき", meaning: "kir yuvish mashinasi" },
  { word: "協力", reading: "きょうりょく", meaning: "hamkorlik" },
  { word: "管理会社", reading: "かんりがいしゃ", meaning: "uy-joy boshqaruv kompaniyasi" },
];

const GLOSSARY_KARAOKE: GlossaryItem[] = [
  { word: "料金", reading: "りょうきん", meaning: "narx" },
  { word: "祝日", reading: "しゅくじつ", meaning: "bayram kuni" },
  { word: "学生証", reading: "がくせいしょう", meaning: "talaba guvohnomasi" },
  { word: "半額", reading: "はんがく", meaning: "yarim narx" },
];

const GLOSSARY_SODAI: GlossaryItem[] = [
  { word: "粗大ごみ", reading: "そだいごみ", meaning: "katta hajmli chiqindi (mebel va h.k.)" },
  { word: "処理券", reading: "しょりけん", meaning: "chiqindi uchun to'lov yorlig'i" },
  { word: "申し込む", reading: "もうしこむ", meaning: "ariza bermoq" },
  { word: "決める", reading: "きめる", meaning: "belgilamoq" },
];

const GLOSSARY_SPEECH: GlossaryItem[] = [
  { word: "大会", reading: "たいかい", meaning: "tanlov, musobaqa" },
  { word: "以内", reading: "いない", meaning: "...dan oshmagan holda" },
  { word: "申し込み", reading: "もうしこみ", meaning: "ariza" },
  { word: "1位", reading: "いちい", meaning: "birinchi o'rin" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions13: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "💡",
    question: "これをつけると、部屋が明るくなります。これは何ですか。",
    options: ["まど", "カーテン", "かがみ", "でんき"],
    answer: 3,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "✉️",
    question: "手紙を入れて送ります。これは何ですか。",
    options: ["ふうとう", "はがき", "きって", "ノート"],
    answer: 0,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「やさしい」（かんたん）と反対の意味のことばはどれですか。",
    options: ["かわいい", "ひくい", "むずかしい", "わるい"],
    answer: 2,
    glossary: [{ word: "反対", reading: "はんたい", meaning: "qarama-qarshi" }],
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "暑いので、上着を（　　）。",
    options: ["きました", "ぬぎました", "はきました", "かぶりました"],
    answer: 1,
    glossary: [{ word: "上着", reading: "うわぎ", meaning: "ustki kiyim" }],
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "毎日、ねる前に日記を（　　）います。",
    options: ["つけて", "よんで", "かえて", "とって"],
    answer: 0,
    glossary: [{ word: "日記", reading: "にっき", meaning: "kundalik" }],
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "いつもの電車に（　　）、会社におくれました。",
    options: ["のぼって", "まがって", "のりおくれて", "おりて"],
    answer: 2,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "＿来月＿、国に帰ります。",
    options: ["らいがつ", "きげつ", "らいつき", "らいげつ"],
    answer: 3,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "これは、とても＿古い＿車ですね。",
    options: ["たかい", "ふるい", "ながい", "やすい"],
    answer: 1,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "＿入口＿はあちらです。",
    options: ["でぐち", "いりぐち", "いれぐち", "はいりぐち"],
    answer: 1,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "トイレのドアに「故障中」と書いてあります。どういう意味ですか。",
    options: [
      "今、そうじしています。",
      "今、だれかが使っています。",
      "新しいトイレです。",
      "こわれていて使えません。",
    ],
    answer: 3,
    glossary: [{ word: "故障中", reading: "こしょうちゅう", meaning: "buzilgan, ishlamaydi" }],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "外は＿あめ＿がふっています。",
    options: ["雨", "両", "雲", "電"],
    answer: 0,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "レストランのドアに「準備中」と書いてあります。どういう意味ですか。",
    options: [
      "今、セールをしています。",
      "今、店はとてもこんでいます。",
      "今は、まだ店が開いていません。",
      "この店は、なくなりました。",
    ],
    answer: 2,
    glossary: [{ word: "準備中", reading: "じゅんびちゅう", meaning: "tayyorlanmoqda (hali ochilmagan)" }],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "この映画は、とても（　　）そうですね。",
    options: ["おもしろい", "おもしろく", "おもしろ", "おもしろくて"],
    answer: 2,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "わたしは、日本に来た（　　）、ずっとこのアパートに住んでいます。",
    options: ["まで", "までに", "ので", "ときから"],
    answer: 3,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "暗くなる（　　）、家に帰りましょう。",
    options: ["あとで", "前に", "ながら", "のに"],
    answer: 1,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "母は、毎日わたしに野菜を食べ（　　）。",
    options: ["させます", "られます", "たいです", "ています"],
    answer: 0,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "もう12時ですね。そろそろ（　　）。",
    options: ["寝ました", "寝ています", "寝ませんでした", "寝ましょう"],
    answer: 3,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "すみません、この手紙を英語に（　　）くれませんか。",
    options: ["訳して", "訳す", "訳した", "訳さ"],
    answer: 0,
    glossary: [{ word: "訳す", reading: "やくす", meaning: "tarjima qilmoq" }],
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "友だちが風邪で学校を休んでいます。電話で何と言いますか。",
    options: ["おめでとう。", "いってらっしゃい。", "大丈夫？お大事にね。", "ごちそうさま。"],
    answer: 2,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "A「すみません、ここにすわってもいいですか。」\nB「（　　）」",
    options: ["はい、すわりました。", "ええ、どうぞ。", "いいえ、すわります。", "すわりましょう。"],
    answer: 1,
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "友だちに借りた本を返します。何と言いますか。",
    options: [
      "いただきます。",
      "おかえりなさい。",
      "いってきます。",
      "これ、ありがとう。とてもおもしろかったです。",
    ],
    answer: 3,
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "A「お茶とコーヒー、どちらがいいですか。」\nB「（　　）」",
    options: ["じゃあ、お茶をお願いします。", "はい、そうです。", "どういたしまして。", "いいえ、ちがいます。"],
    answer: 0,
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "スーパーのレジで\n店員「袋はご利用ですか。」\nあなた「（　　）」",
    options: ["はい、そうです。", "いいえ、けっこうです。", "袋です。", "はい、使いました。"],
    answer: 1,
    glossary: [{ word: "利用", reading: "りよう", meaning: "foydalanish" }],
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "A「あした、ひまですか。」\nB「（　　）」",
    options: ["はい、ひまでした。", "いいえ、ひまです。", "午後ならひまですよ。", "あしたです。"],
    answer: 2,
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "女の人は、何で京都へ行きますか。",
    options: ["新幹線", "夜行バス", "飛行機", "車"],
    answer: 1,
    audio: "/audio/test-13/25.mp3",
    script: [
      { speaker: "M", text: "京都へは、新幹線で行きますか。" },
      { speaker: "F", text: "新幹線は高いので、夜行バスで行きます。" },
      { speaker: "M", text: "夜行バスは疲れませんか。" },
      { speaker: "F", text: "大丈夫です。安いですから。" },
    ],
    glossary: [{ word: "夜行バス", reading: "やこうバス", meaning: "tungi avtobus" }],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "男の人は、何を忘れましたか。",
    options: ["ケータイ", "さいふ", "かさ", "かぎ"],
    answer: 3,
    audio: "/audio/test-13/26.mp3",
    script: [
      { speaker: "F", text: "どうしたんですか。" },
      { speaker: "M", text: "家にかぎを忘れてしまったんです。ケータイとさいふはあるんですが。" },
      { speaker: "F", text: "それは困りましたね。" },
    ],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "女の人は、あした何時に会社に行きますか。",
    options: ["8時半", "8時", "9時", "9時半"],
    answer: 0,
    audio: "/audio/test-13/27.mp3",
    script: [
      { speaker: "M", text: "あしたは9時から会議ですよね。" },
      { speaker: "F", text: "はい。でも、準備があるので、8時半に行きます。" },
      { speaker: "M", text: "そうですか。早いですね。" },
    ],
    glossary: [{ word: "準備", reading: "じゅんび", meaning: "tayyorgarlik" }],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "二人は、今晩何を食べに行きますか。",
    options: ["すし", "ラーメン", "焼き肉", "カレー"],
    answer: 2,
    audio: "/audio/test-13/28.mp3",
    script: [
      { speaker: "F", text: "今晩、何を食べに行きましょうか。" },
      { speaker: "M", text: "すしはどうですか。" },
      { speaker: "F", text: "すしは先週食べたので、焼き肉はどうですか。" },
      { speaker: "M", text: "いいですね。そうしましょう。" },
    ],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、シャツをいつ受け取りますか。",
    options: ["あさって", "あしたの朝", "あしたの夕方", "今日"],
    answer: 0,
    audio: "/audio/test-13/29.mp3",
    script: [
      { speaker: "M", text: "このシャツ、クリーニングをお願いします。" },
      { speaker: "F", text: "はい。あしたの夕方にできます。" },
      { speaker: "M", text: "あしたは来られないので、あさってでもいいですか。" },
      { speaker: "F", text: "はい、大丈夫ですよ。" },
    ],
    glossary: [{ word: "受け取る", reading: "うけとる", meaning: "olib ketmoq" }],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、どの切手を買いますか。",
    options: ["85円を1枚", "110円を5枚", "85円を5枚", "110円を1枚"],
    answer: 2,
    audio: "/audio/test-13/30.mp3",
    script: [
      { speaker: "F", text: "はがきを出したいんですが、いくらの切手ですか。" },
      { speaker: "M", text: "はがきは85円です。" },
      { speaker: "F", text: "じゃあ、85円の切手を5枚ください。" },
      { speaker: "M", text: "はい、どうぞ。" },
    ],
    glossary: [{ word: "切手", reading: "きって", meaning: "pochta markasi" }],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、髪をどうしますか。",
    options: [
      "全部短くする",
      "前は少しだけ切って、ほかは短くする",
      "前だけ短くする",
      "切らない",
    ],
    answer: 1,
    audio: "/audio/test-13/31.mp3",
    script: [
      { speaker: "F", text: "今日は、どうしますか。" },
      { speaker: "M", text: "短く切ってください。でも、前は少しだけでいいです。" },
      { speaker: "F", text: "わかりました。" },
    ],
    glossary: [{ word: "髪", reading: "かみ", meaning: "soch" }],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、何を借りますか。",
    options: ["ブランケット", "かさとブランケット", "何も借りない", "かさ"],
    answer: 3,
    audio: "/audio/test-13/32.mp3",
    script: [
      { speaker: "F", text: "すみません、かさを貸していただけますか。" },
      { speaker: "M", text: "はい、どうぞ。外はとても寒いので、ブランケットもありますが。" },
      { speaker: "F", text: "ありがとうございます。でも、かさだけで大丈夫です。" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "フリーマーケットは、どこで行いますか。",
    options: ["駅前広場", "市民センターの1階", "公園", "市民センターの2階"],
    answer: 3,
    audio: "/audio/test-13/33.mp3",
    script: [
      {
        speaker: "M",
        text: "今週の土曜日、駅前広場でフリーマーケットを行う予定でしたが、雨の予報のため、市民センターの2階で行います。",
      },
    ],
    glossary: [
      { word: "広場", reading: "ひろば", meaning: "maydon" },
      { word: "予定", reading: "よてい", meaning: "reja" },
      { word: "予報", reading: "よほう", meaning: "prognoz" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "あしたの午前中、何が使えませんか。",
    options: ["階段", "エレベーター", "水道", "駐車場"],
    answer: 1,
    audio: "/audio/test-13/34.mp3",
    script: [
      {
        speaker: "F",
        text: "マンションのみなさんにお知らせします。あしたの午前9時から12時まで、エレベーターの工事をします。その間、エレベーターは使えません。階段をご利用ください。",
      },
    ],
    glossary: [{ word: "工事", reading: "こうじ", meaning: "ta'mir ishlari" }],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "何時までにバスに戻りますか。",
    options: ["1時", "2時", "1時50分", "2時10分"],
    answer: 2,
    audio: "/audio/test-13/35.mp3",
    script: [
      {
        speaker: "M",
        text: "みなさん、ここで1時間、自由時間です。バスは2時に出発しますので、1時50分までにバスに戻ってきてください。",
      },
    ],
    glossary: [
      { word: "自由時間", reading: "じゆうじかん", meaning: "bo'sh vaqt" },
      { word: "出発", reading: "しゅっぱつ", meaning: "jo'nash" },
      { word: "戻る", reading: "もどる", meaning: "qaytmoq" },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "東京行きの飛行機は、どうなりましたか。",
    options: ["1時間おくれる", "中止になった", "早く出発する", "ほかの空港から出発する"],
    answer: 0,
    audio: "/audio/test-13/36.mp3",
    script: [
      {
        speaker: "F",
        text: "お客様にご案内いたします。東京行き305便は、天気が悪いため、出発が1時間おくれます。新しい出発時刻は、午後4時です。",
      },
    ],
    glossary: [{ word: "時刻", reading: "じこく", meaning: "vaqt (soat)" }],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SHIFT,
    question: "店長は、アリさんに何をお願いしていますか。",
    options: [
      "来週の土曜日に働くこと",
      "田中さんに電話すること",
      "水曜日に店に来ること",
      "ほかの人に頼むこと",
    ],
    answer: 0,
    glossary: GLOSSARY_SHIFT,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SHIFT,
    question: "アリさんは、いつまでに返事をしますか。",
    options: ["来週の土曜日", "今日", "水曜日", "木曜日"],
    answer: 2,
    glossary: GLOSSARY_SHIFT,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_FACTORY,
    question: "この人は、最初、仕事についてどう感じましたか。",
    options: [
      "とても楽しい",
      "友だちがたくさんできた",
      "日本語がむずかしい",
      "時間がとても長い",
    ],
    answer: 3,
    glossary: GLOSSARY_FACTORY,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_FACTORY,
    question: "この人は、休みの日に何をしますか。",
    options: [
      "部品を作る",
      "みんなでバスケットボールをする",
      "日本語を勉強する",
      "車を運転する",
    ],
    answer: 1,
    glossary: GLOSSARY_FACTORY,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_NOISE,
    question: "このお知らせは、何について書いてありますか。",
    options: ["ごみの出し方", "ベランダのそうじ", "夜の音", "洗濯機の使い方"],
    answer: 2,
    glossary: GLOSSARY_NOISE,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_NOISE,
    question: "夜11時に、してはいけないことは何ですか。",
    options: [
      "そうじ機を使う",
      "シャワーを浴びる",
      "テレビを小さい音で見る",
      "電気をつける",
    ],
    answer: 0,
    glossary: GLOSSARY_NOISE,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_KARAOKE,
    question: "土曜日の昼に、大人2人で1時間歌います。全部でいくらですか。",
    options: ["600円", "1,000円", "500円", "1,200円"],
    answer: 1,
    glossary: GLOSSARY_KARAOKE,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_KARAOKE,
    question: "学生が一人で、平日の夜に30分歌います。いくらですか。",
    options: ["300円", "75円", "200円", "150円"],
    answer: 3,
    glossary: GLOSSARY_KARAOKE,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SODAI,
    question: "いすと自転車を出します。処理券は全部でいくらですか。",
    options: ["800円", "500円", "1,100円", "1,300円"],
    answer: 0,
    glossary: GLOSSARY_SODAI,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SODAI,
    question: "粗大ごみを出したい人は、まず何をしますか。",
    options: [
      "処理券をはる",
      "朝8時までに出す",
      "電話かインターネットで申し込む",
      "コンビニで机を買う",
    ],
    answer: 2,
    glossary: GLOSSARY_SODAI,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SPEECH,
    question: "スピーチは、何分までできますか。",
    options: ["3分", "10分", "15分", "5分"],
    answer: 3,
    glossary: GLOSSARY_SPEECH,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SPEECH,
    question: "1位になった人は、何をもらえますか。",
    options: ["日本語の本", "新幹線のチケット", "お金", "市民ホールのチケット"],
    answer: 1,
    glossary: GLOSSARY_SPEECH,
  },
];
