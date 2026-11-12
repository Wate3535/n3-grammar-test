import type { GlossaryItem, Question } from "@/questions";

export const TEST_9 = {
  name: "模擬テスト 9",
  slug: "test-9",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_MEMO = `マリアさんへ

あしたの朝、わたしは病院に行くので、10時ごろ会社に来ます。
9時の会議には出られません。
すみませんが、会議のあとで、内容を教えてください。
それから、会議室のかぎは、わたしのつくえの上にあります。

山本`;

const PASSAGE_FACTORY = `わたしはインドネシアから来ました。今、食品工場でパンを作る仕事をしています。仕事は朝6時から午後3時までです。
はじめは、日本語がよくわからなくて、大変でした。でも、工場の人たちはみんなやさしくて、わからないことをていねいに教えてくれます。
今は、毎週土曜日に日本語教室に行っています。来年、日本語の試験を受けたいです。`;

const PASSAGE_CLEANUP = `さくらアパートのみなさんへ

5月20日（土）の午前10時から、アパートの前の道をそうじします。
参加できる人は、10時に1階の入り口に来てください。
ほうきやごみ袋は、こちらで用意します。
そうじのあとで、みんなでお茶を飲みましょう。

管理人　田中`;

const PASSAGE_BUS = `さくら駅 → 市民病院　バスの時刻表（平日）

さくら駅発　 8:10　 8:40　 9:10　 9:40　10:10
市民病院着　 8:35　 9:05　 9:35　10:05　10:35

料金：大人 230円　子ども 120円
※土曜日・日曜日は、1時間に1本です。`;

const PASSAGE_CLASS = `みどり市　日本語教室のお知らせ

クラス　　　曜日　　　時間
はじめて　　火曜日　　18:30〜20:00
初級　　　　木曜日　　18:30〜20:00
会話　　　　土曜日　　10:00〜11:30

場所：みどり市国際センター 2階
参加費：1回 300円（はじめての人は、1回目は無料です）`;

const PASSAGE_SALE = `みどりスーパー　週末セール（6月14日・15日）

・たまご（10こ）　　　　198円
・牛乳（1L）　　　　　　160円
・バナナ（1ふさ）　　　 120円
・お米（5kg）　　　　 1,980円

※2,000円以上買った人に、ポイントを2倍あげます。
※14日（土）は、午前9時から開いています。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_MEMO: GlossaryItem[] = [
  { word: "会議", reading: "かいぎ", meaning: "majlis" },
  { word: "内容", reading: "ないよう", meaning: "mazmun" },
  { word: "会議室", reading: "かいぎしつ", meaning: "majlislar xonasi" },
];

const GLOSSARY_FACTORY: GlossaryItem[] = [
  { word: "食品工場", reading: "しょくひんこうじょう", meaning: "oziq-ovqat zavodi" },
  { word: "教室", reading: "きょうしつ", meaning: "kurs, dars xonasi" },
  { word: "試験を受ける", reading: "しけんをうける", meaning: "imtihon topshirmoq" },
];

const GLOSSARY_CLEANUP: GlossaryItem[] = [
  { word: "参加", reading: "さんか", meaning: "qatnashish" },
  { word: "入り口", reading: "いりぐち", meaning: "kirish joyi" },
  { word: "用意", reading: "ようい", meaning: "tayyorlab qo'yish" },
  { word: "管理人", reading: "かんりにん", meaning: "uy boshqaruvchisi" },
];

const GLOSSARY_BUS: GlossaryItem[] = [
  { word: "時刻表", reading: "じこくひょう", meaning: "jadval (qatnov vaqtlari)" },
  { word: "平日", reading: "へいじつ", meaning: "ish kunlari" },
  { word: "料金", reading: "りょうきん", meaning: "narx, to'lov" },
  { word: "〜発 / 〜着", reading: "はつ / ちゃく", meaning: "jo'nash / yetib kelish" },
];

const GLOSSARY_CLASS: GlossaryItem[] = [
  { word: "初級", reading: "しょきゅう", meaning: "boshlang'ich daraja" },
  { word: "会話", reading: "かいわ", meaning: "suhbat" },
  { word: "参加費", reading: "さんかひ", meaning: "qatnashish to'lovi" },
  { word: "無料", reading: "むりょう", meaning: "bepul" },
];

const GLOSSARY_SALE: GlossaryItem[] = [
  { word: "週末", reading: "しゅうまつ", meaning: "dam olish kunlari" },
  { word: "以上", reading: "いじょう", meaning: "va undan ko'p" },
  { word: "2倍", reading: "にばい", meaning: "ikki barobar" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions9: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "🧤",
    question: "寒いとき、手にします。これは何ですか。",
    options: ["マフラー", "くつした", "ぼうし", "てぶくろ"],
    answer: 3,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🪥",
    question: "歯をみがくときに使います。これは何ですか。",
    options: ["タオル", "はブラシ", "くし", "せっけん"],
    answer: 1,
    glossary: [{ word: "歯", reading: "は", meaning: "tish" }],
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「ひろい」と反対の意味のことばはどれですか。",
    options: ["せまい", "ひくい", "みじかい", "ほそい"],
    answer: 0,
    glossary: [{ word: "反対", reading: "はんたい", meaning: "qarama-qarshi" }],
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "おなかが（　　）ので、何か食べたいです。",
    options: ["いっぱいな", "おおきい", "すいた", "いたい"],
    answer: 2,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "シャワーを（　　）から、寝ます。",
    options: ["あびて", "はいって", "のんで", "あらって"],
    answer: 0,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "道が（　　）いて、バスがおくれました。",
    options: ["すいて", "ひらいて", "あいて", "こんで"],
    answer: 3,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "毎朝8時に＿会社＿に行きます。",
    options: ["がいしゃ", "かいじゃ", "かいしゃ", "あいしゃ"],
    answer: 2,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿病気＿で学校を休みました。",
    options: ["びょうぎ", "びょうき", "ぴょうき", "びょき"],
    answer: 1,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "＿毎日＿日本語を勉強しています。",
    options: ["まいび", "まいにち", "まいひ", "まいじつ"],
    answer: 1,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "トイレのドアに「使用中」と書いてあります。どういう意味ですか。",
    options: [
      "今、だれも使っていません。",
      "このトイレは使ってはいけません。",
      "今、だれかが使っています。",
      "このトイレはこわれています。",
    ],
    answer: 2,
    glossary: [{ word: "使用中", reading: "しようちゅう", meaning: "band (foydalanilmoqda)" }],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "のどがかわいたので、＿みず＿をのみます。",
    options: ["氷", "木", "永", "水"],
    answer: 3,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "駅に「出口」と書いてあります。どこですか。",
    options: [
      "駅から外に出るところ",
      "駅に入るところ",
      "電車に乗るところ",
      "きっぷを買うところ",
    ],
    answer: 0,
    glossary: [{ word: "出口", reading: "でぐち", meaning: "chiqish joyi" }],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "日本に来て、もう2年に（　　）。",
    options: ["なります", "します", "あります", "います"],
    answer: 0,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "このパソコンは古くて、もう（　　）。",
    options: ["つかいます", "つかいました", "つかえません", "つかいましょう"],
    answer: 2,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "ご飯を（　　）前に、手を洗います。",
    options: ["食べた", "食べる", "食べて", "食べない"],
    answer: 1,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "あした雨が降ったら、ピクニックには（　　）。",
    options: ["行きました", "行きませんでした", "行っています", "行きません"],
    answer: 3,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "わたしは日本の歌を歌う（　　）ができます。",
    options: ["もの", "こと", "ところ", "とき"],
    answer: 1,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "ここに自転車を止め（　　）いけません。",
    options: ["ては", "ても", "たら", "て"],
    answer: 0,
    glossary: [{ word: "止める", reading: "とめる", meaning: "to'xtatib qo'ymoq (velosiped, mashina)" }],
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "先生の部屋に入るとき、何と言いますか。",
    options: ["ただいま。", "いってきます。", "おかえりなさい。", "しつれいします。"],
    answer: 3,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "A「いっしょに昼ご飯を食べに行きませんか。」\nB「いいですね。（　　）」",
    options: ["行きませんでした。", "食べました。", "行きましょう。", "ごちそうさまでした。"],
    answer: 2,
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "友だちが日本語の試験に合格しました。何と言いますか。",
    options: [
      "おめでとうございます。",
      "おだいじに。",
      "おつかれさまでした。",
      "いただきます。",
    ],
    answer: 0,
    glossary: [{ word: "合格", reading: "ごうかく", meaning: "imtihondan o'tish" }],
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "コンビニで\n店員「お弁当、あたためますか。」\nあなた「（　　）」",
    options: [
      "はい、あたたかいです。",
      "はい、お願いします。",
      "はい、あたためました。",
      "いいえ、あたためます。",
    ],
    answer: 1,
    glossary: [{ word: "店員", reading: "てんいん", meaning: "sotuvchi" }],
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "電車で、となりの人のかばんがあなたの足の上にあります。何と言いますか。",
    options: [
      "すみません、かばんを持ちましょうか。",
      "すみません、かばんをください。",
      "すみません、足がいいです。",
      "すみません、かばんをどけてもらえませんか。",
    ],
    answer: 3,
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "A「日本の生活はどうですか。」\nB「（　　）」",
    options: [
      "はい、日本です。",
      "いいえ、生活しません。",
      "楽しいですが、ちょっと物が高いです。",
      "来年、日本へ行きます。",
    ],
    answer: 2,
    glossary: [{ word: "生活", reading: "せいかつ", meaning: "hayot, turmush" }],
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "女の人は、あした何時に起きますか。",
    options: ["5時半", "6時", "6時半", "7時"],
    answer: 1,
    audio: "/audio/test-9/25.mp3",
    script: [
      { speaker: "M", text: "あしたは何時に起きますか。" },
      { speaker: "F", text: "いつもは7時ですが、あしたは早く出かけるので、6時に起きます。" },
      { speaker: "M", text: "6時ですか。早いですね。" },
      { speaker: "F", text: "ええ。5時半は、ちょっと早すぎますから。" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "男の人は、週末に何をしましたか。",
    options: ["山に登りました", "映画を見ました", "買い物をしました", "料理を作りました"],
    answer: 3,
    audio: "/audio/test-9/26.mp3",
    script: [
      { speaker: "F", text: "週末は何をしましたか。" },
      {
        speaker: "M",
        text: "山に登るつもりでしたが、雨だったので、家で料理を作りました。",
      },
      { speaker: "F", text: "何を作ったんですか。" },
      { speaker: "M", text: "カレーです。おいしかったですよ。" },
    ],
    glossary: [{ word: "登る", reading: "のぼる", meaning: "chiqmoq (toqqa)" }],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "二人は、田中さんに何をあげますか。",
    options: ["コーヒーカップ", "花", "ケーキ", "本"],
    answer: 0,
    audio: "/audio/test-9/27.mp3",
    script: [
      { speaker: "F", text: "来週、田中さんの誕生日ですね。プレゼント、何がいいでしょうか。" },
      { speaker: "M", text: "花はどうですか。" },
      {
        speaker: "F",
        text: "花は先月あげましたから…。田中さんはコーヒーが好きですから、コーヒーカップはどうですか。",
      },
      { speaker: "M", text: "いいですね。そうしましょう。" },
    ],
    glossary: [{ word: "誕生日", reading: "たんじょうび", meaning: "tug'ilgan kun" }],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "女の人は、どうしてきのうのパーティーに来ませんでしたか。",
    options: [
      "かぜをひいたから",
      "パーティーを知らなかったから",
      "急に仕事が入ったから",
      "家族が来たから",
    ],
    answer: 2,
    audio: "/audio/test-9/28.mp3",
    script: [
      { speaker: "M", text: "きのうのパーティー、来ませんでしたね。" },
      { speaker: "F", text: "行きたかったんですが、急に仕事が入ってしまって…。" },
      { speaker: "M", text: "そうですか。残念でしたね。" },
    ],
    glossary: [{ word: "急に", reading: "きゅうに", meaning: "to'satdan" }],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、けっきょく何をたのみましたか。",
    options: ["コーヒーとサンドイッチ", "コーヒーとケーキ", "コーヒーだけ", "ケーキだけ"],
    answer: 2,
    audio: "/audio/test-9/29.mp3",
    script: [
      { speaker: "F", text: "いらっしゃいませ。ご注文は？" },
      { speaker: "M", text: "コーヒーとサンドイッチをお願いします。" },
      {
        speaker: "F",
        text: "すみません、サンドイッチはもう終わってしまいました。ケーキならありますが。",
      },
      { speaker: "M", text: "そうですか。じゃあ、コーヒーだけでいいです。" },
    ],
    glossary: [{ word: "注文", reading: "ちゅうもん", meaning: "buyurtma" }],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、まず何番の窓口へ行きますか。",
    options: ["2番", "3番", "5番", "7番"],
    answer: 0,
    audio: "/audio/test-9/30.mp3",
    script: [
      { speaker: "M", text: "次の方、どうぞ。" },
      { speaker: "F", text: "すみません、住所の変更をしたいんですが。" },
      { speaker: "M", text: "住所の変更は、2番の窓口です。" },
      { speaker: "F", text: "2番ですね。あ、それから、保険のことも聞きたいんですが。" },
      { speaker: "M", text: "保険は5番ですが、先に2番へ行ってください。" },
    ],
    glossary: [
      { word: "窓口", reading: "まどぐち", meaning: "xizmat darchasi" },
      { word: "住所", reading: "じゅうしょ", meaning: "manzil" },
      { word: "変更", reading: "へんこう", meaning: "o'zgartirish" },
      { word: "保険", reading: "ほけん", meaning: "sug'urta" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、くつをどうしますか。",
    options: [
      "返品する",
      "同じ色の小さいサイズにする",
      "そのままはく",
      "黒い大きいサイズと交換する",
    ],
    answer: 3,
    audio: "/audio/test-9/31.mp3",
    script: [
      { speaker: "F", text: "すみません、このくつ、きのう買ったんですが、少し小さくて。" },
      { speaker: "M", text: "大きいサイズと交換しましょうか。" },
      { speaker: "F", text: "はい、お願いします。" },
      { speaker: "M", text: "すみません、同じ色の大きいサイズはないんですが、黒ならあります。" },
      { speaker: "F", text: "じゃあ、黒でお願いします。" },
    ],
    glossary: [
      { word: "交換", reading: "こうかん", meaning: "almashtirish" },
      { word: "返品", reading: "へんぴん", meaning: "mahsulotni qaytarish" },
    ],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、この薬をいつ飲みますか。",
    options: ["ご飯の前", "ご飯のあと", "寝る前", "朝だけ"],
    answer: 1,
    audio: "/audio/test-9/32.mp3",
    script: [
      { speaker: "F", text: "この薬は、一日3回、ご飯を食べたあとに飲んでください。" },
      { speaker: "M", text: "寝る前にも飲みますか。" },
      { speaker: "F", text: "いいえ、寝る前は飲まないでください。" },
      { speaker: "M", text: "わかりました。" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "このデパートは、きょう何時に閉まりますか。",
    options: ["7時", "7時半", "8時", "8時半"],
    answer: 0,
    audio: "/audio/test-9/33.mp3",
    script: [
      {
        speaker: "F",
        text: "本日も、さくらデパートにお越しいただき、ありがとうございます。いつもは夜8時まで営業しておりますが、本日は工事のため、7時で閉店いたします。",
      },
    ],
    glossary: [
      { word: "営業", reading: "えいぎょう", meaning: "ish vaqti (do'kon ochiq)" },
      { word: "閉店", reading: "へいてん", meaning: "do'kon yopilishi" },
      { word: "工事", reading: "こうじ", meaning: "ta'mir ishlari" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "雨が降ったら、どこに集まりますか。",
    options: ["校庭", "教室", "体育館", "駅"],
    answer: 2,
    audio: "/audio/test-9/34.mp3",
    script: [
      {
        speaker: "M",
        text: "あしたの運動会について話します。朝8時半に校庭に集まってください。でも、雨が降ったら、体育館に集まってください。お弁当と水を忘れないでください。",
      },
    ],
    glossary: [
      { word: "運動会", reading: "うんどうかい", meaning: "sport bayrami" },
      { word: "校庭", reading: "こうてい", meaning: "maktab hovlisi" },
      { word: "体育館", reading: "たいいくかん", meaning: "sport zali" },
    ],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "電車は、どうして止まっていますか。",
    options: ["雪が降っているから", "風が強いから", "事故があったから", "工事をしているから"],
    answer: 1,
    audio: "/audio/test-9/35.mp3",
    script: [
      {
        speaker: "M",
        text: "お客様にお知らせいたします。ただいま、強い風のため、電車が止まっております。動くまで、もうしばらくお待ちください。",
      },
    ],
    glossary: [{ word: "事故", reading: "じこ", meaning: "baxtsiz hodisa" }],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "日曜日、図書館は何時まで開いていますか。",
    options: ["夜8時", "夜7時", "夕方6時", "夕方5時"],
    answer: 3,
    audio: "/audio/test-9/36.mp3",
    script: [
      {
        speaker: "F",
        text: "さくら図書館からのお知らせです。今月から、図書館は夜8時まで開いています。ただし、土曜日と日曜日は、夕方5時までです。",
      },
    ],
    glossary: [{ word: "図書館", reading: "としょかん", meaning: "kutubxona" }],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MEMO,
    question: "山本さんは、あした何時ごろ会社に来ますか。",
    options: ["8時ごろ", "9時ごろ", "10時ごろ", "11時ごろ"],
    answer: 2,
    glossary: GLOSSARY_MEMO,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MEMO,
    question: "山本さんは、マリアさんに何をお願いしていますか。",
    options: [
      "会議の内容を教えること",
      "会議室のかぎを買うこと",
      "いっしょに病院に行くこと",
      "9時の会議に出ないこと",
    ],
    answer: 0,
    glossary: GLOSSARY_MEMO,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_FACTORY,
    question: "この人の仕事は何ですか。",
    options: [
      "日本語を教える仕事",
      "パンを売る仕事",
      "工場の人に料理を作る仕事",
      "工場でパンを作る仕事",
    ],
    answer: 3,
    glossary: GLOSSARY_FACTORY,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_FACTORY,
    question: "この人は、来年何をするつもりですか。",
    options: [
      "インドネシアに帰りたい",
      "日本語の試験を受けたい",
      "新しい工場で働きたい",
      "土曜日に休みたい",
    ],
    answer: 1,
    glossary: GLOSSARY_FACTORY,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_CLEANUP,
    question: "そうじに参加する人は、どこに集まりますか。",
    options: ["田中さんの部屋", "1階の入り口", "アパートの前の公園", "駅の前"],
    answer: 1,
    glossary: GLOSSARY_CLEANUP,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_CLEANUP,
    question: "そうじに参加する人は、何を持って行かなければなりませんか。",
    options: ["ほうき", "ごみ袋", "お茶", "何も持って行かなくていい"],
    answer: 3,
    glossary: GLOSSARY_CLEANUP,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_BUS,
    question:
      "平日、9時半までに市民病院に着きたいです。いちばんおそいバスは、さくら駅を何時に出ますか。",
    options: ["8:40", "8:10", "9:10", "9:40"],
    answer: 0,
    glossary: GLOSSARY_BUS,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_BUS,
    question: "大人2人と子ども1人でバスに乗ります。全部でいくらですか。",
    options: ["350円", "460円", "580円", "690円"],
    answer: 2,
    glossary: GLOSSARY_BUS,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLASS,
    question: "平日は、仕事が夜7時までです。どのクラスに行けますか。",
    options: ["はじめて", "初級", "はじめてと初級", "会話"],
    answer: 3,
    glossary: GLOSSARY_CLASS,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLASS,
    question: "はじめて日本語教室に行きます。1回目の参加費はいくらですか。",
    options: ["0円", "100円", "300円", "600円"],
    answer: 0,
    glossary: GLOSSARY_CLASS,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SALE,
    question: "たまごと牛乳を1つずつ買います。全部でいくらですか。",
    options: ["318円", "358円", "378円", "398円"],
    answer: 1,
    glossary: GLOSSARY_SALE,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SALE,
    question: "ポイントを2倍もらいたいです。どうすればいいですか。",
    options: [
      "土曜日の朝9時に行く",
      "お米を買う",
      "2,000円以上買う",
      "バナナを2つ買う",
    ],
    answer: 2,
    glossary: GLOSSARY_SALE,
  },
];
