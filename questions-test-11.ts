import type { GlossaryItem, Question } from "@/questions";

export const TEST_11 = {
  name: "模擬テスト 11",
  slug: "test-11",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_SHODO = `学生のみなさんへ

来週の金曜日、学校で書道の体験をします。
時間は午後2時から4時までです。場所は2階の301教室です。
参加したい人は、水曜日までに事務室で名前を書いてください。
筆や紙は学校で用意しますが、よごれてもいい服で来てください。

さくら日本語学校`;

const PASSAGE_HOTEL = `わたしはミャンマーから来ました。今、東京のホテルで部屋のそうじの仕事をしています。一日に15部屋ぐらいそうじします。
最初は、ベッドをきれいに作るのがむずかしかったです。でも、先輩がていねいに教えてくれたので、今は早くできるようになりました。
お客さんから「ありがとう」と書いた紙をもらったとき、とてもうれしかったです。将来は、ホテルのフロントで働きたいです。`;

const PASSAGE_THANKS = `ケンさん

こんにちは。土曜日の引っ越し、手伝ってくれてありがとう。
とても助かりました。
新しい部屋は駅から近くて、とても便利です。
来週の日曜日に、手伝ってくれた友だちを呼んで、うちで食事をしようと思っています。
ケンさんも来られますか。

ナム`;

const PASSAGE_GYM = `さくら市民体育館　利用料金

　　　　　　　　　　　　1回　　　1か月
大人　　　　　　　　　 400円　　 3,000円
65歳以上・高校生　　　 200円　　 1,500円

・月曜日は休みです。
・シャワーを使う人は、1回 100円かかります。`;

const PASSAGE_ATM = `さくら銀行　ATM 手数料

　　　　　　　　　　 平日 8:45〜18:00　　平日 18:00〜21:00・土日
さくら銀行のカード　　　　0円　　　　　　　　　110円
ほかの銀行のカード　　　220円　　　　　　　　　330円`;

const PASSAGE_FESTIVAL = `みどり町　夏まつり

日時：8月3日（土）17:00〜21:00（雨の場合は 4日（日））
場所：みどり公園
・18:00〜　盆おどり（だれでも参加できます）
・20:30〜　花火
※ゆかたを着てきた人には、ジュースを1本プレゼントします。
※駐車場はありません。電車かバスで来てください。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_SHODO: GlossaryItem[] = [
  { word: "書道", reading: "しょどう", meaning: "yapon xattotligi" },
  { word: "体験", reading: "たいけん", meaning: "sinab ko'rish" },
  { word: "事務室", reading: "じむしつ", meaning: "ma'muriyat xonasi" },
  { word: "筆", reading: "ふで", meaning: "mo'yqalam" },
  { word: "用意", reading: "ようい", meaning: "tayyorlab qo'yish" },
];

const GLOSSARY_HOTEL: GlossaryItem[] = [
  { word: "最初", reading: "さいしょ", meaning: "boshida" },
  { word: "先輩", reading: "せんぱい", meaning: "katta hamkasb" },
  { word: "将来", reading: "しょうらい", meaning: "kelajakda" },
];

const GLOSSARY_THANKS: GlossaryItem[] = [
  { word: "引っ越し", reading: "ひっこし", meaning: "ko'chish" },
  { word: "手伝う", reading: "てつだう", meaning: "yordam bermoq" },
  { word: "助かる", reading: "たすかる", meaning: "yordam bo'lmoq, yengillashmoq" },
  { word: "便利", reading: "べんり", meaning: "qulay" },
];

const GLOSSARY_GYM: GlossaryItem[] = [
  { word: "体育館", reading: "たいいくかん", meaning: "sport zali" },
  { word: "利用料金", reading: "りようりょうきん", meaning: "foydalanish narxi" },
  { word: "以上", reading: "いじょう", meaning: "va undan katta" },
];

const GLOSSARY_ATM: GlossaryItem[] = [
  { word: "銀行", reading: "ぎんこう", meaning: "bank" },
  { word: "手数料", reading: "てすうりょう", meaning: "komissiya to'lovi" },
  { word: "平日", reading: "へいじつ", meaning: "ish kunlari" },
  { word: "土日", reading: "どにち", meaning: "shanba va yakshanba" },
];

const GLOSSARY_FESTIVAL: GlossaryItem[] = [
  { word: "場合", reading: "ばあい", meaning: "holatda" },
  { word: "盆おどり", reading: "ぼんおどり", meaning: "yozgi bayram raqsi" },
  { word: "花火", reading: "はなび", meaning: "mushakbozlik" },
  { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "avtoturargoh" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions11: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "🎒",
    question: "本やノートを入れて、学校に持っていきます。これは何ですか。",
    options: ["さいふ", "かばん", "はこ", "ふうとう"],
    answer: 1,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🧂",
    question: "料理に入れると、しょっぱくなります。これは何ですか。",
    options: ["さとう", "す", "こしょう", "しお"],
    answer: 3,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「おそい」と反対の意味のことばはどれですか。",
    options: ["はやい", "つよい", "あたらしい", "おおい"],
    answer: 0,
    glossary: [{ word: "反対", reading: "はんたい", meaning: "qarama-qarshi" }],
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "このスープは熱いので、少し（　　）から飲みます。",
    options: ["あたためて", "にて", "さまして", "やいて"],
    answer: 2,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "わからないことばは、辞書で（　　）ください。",
    options: ["わすれて", "おしえて", "しらべて", "かいて"],
    answer: 2,
    glossary: [{ word: "辞書", reading: "じしょ", meaning: "lug'at" }],
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "バスを（　　）ときは、ボタンをおしてください。",
    options: ["おりる", "のる", "まつ", "はしる"],
    answer: 0,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "＿先週＿、京都へ行きました。",
    options: ["らいしゅう", "こんしゅう", "せんしゅ", "せんしゅう"],
    answer: 3,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "ここに＿名前＿を書いてください。",
    options: ["めいまえ", "なまえ", "なまい", "なめえ"],
    answer: 1,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "この＿店＿は何時まで開いていますか。",
    options: ["いえ", "へや", "えき", "みせ"],
    answer: 3,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "スーパーの入り口に「本日休業」と書いてあります。どういう意味ですか。",
    options: [
      "今日は安いです。",
      "今日はお休みです。",
      "今日は早く閉まります。",
      "今日は新しい店です。",
    ],
    answer: 1,
    glossary: [
      { word: "本日", reading: "ほんじつ", meaning: "bugun (rasmiy)" },
      { word: "休業", reading: "きゅうぎょう", meaning: "ishlamaydi, dam olish" },
    ],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "毎朝、＿くるま＿で会社に行きます。",
    options: ["車", "東", "申", "単"],
    answer: 0,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "電車の中に「降り口　右側」と書いてあります。どういう意味ですか。",
    options: [
      "右のドアから乗ります。",
      "右の席にすわります。",
      "右のドアから降ります。",
      "右の窓を開けます。",
    ],
    answer: 2,
    glossary: [
      { word: "降り口", reading: "おりぐち", meaning: "tushish eshigi" },
      { word: "右側", reading: "みぎがわ", meaning: "o'ng tomon" },
    ],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "わたしは、まだ一度も富士山に登った（　　）がありません。",
    options: ["もの", "ところ", "こと", "とき"],
    answer: 2,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "すみません、この部屋で写真をとっても（　　）か。",
    options: ["いいです", "いけません", "なりません", "だめ"],
    answer: 0,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "日本へ来る前に、国で少し日本語を勉強し（　　）。",
    options: ["ています", "ましょう", "ません", "ました"],
    answer: 3,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "宿題が終わった（　　）、遊びに行ってもいいですよ。",
    options: ["のに", "ら", "ても", "ながら"],
    answer: 1,
    glossary: [{ word: "宿題", reading: "しゅくだい", meaning: "uy vazifasi" }],
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "空が暗いですね。あしたは雨が降る（　　）しれません。",
    options: ["かも", "でも", "から", "まで"],
    answer: 0,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "このかばんは、大きくて（　　）です。",
    options: ["重くて", "重さ", "重く", "重い"],
    answer: 3,
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "町で、知らない人に道を聞きたいです。最初に何と言いますか。",
    options: [
      "すみません、ありがとう。",
      "おじゃまします。",
      "すみません、ちょっといいですか。",
      "いってきます。",
    ],
    answer: 2,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "A「お先に失礼します。」\nB「（　　）」",
    options: ["いってらっしゃい。", "お疲れさまでした。", "いただきます。", "おかえりなさい。"],
    answer: 1,
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「あしたのパーティー、来られますか。」\nB「すみません、あしたは（　　）。」",
    options: ["ちょっと用事があるんです", "パーティーです", "行きました", "来ています"],
    answer: 0,
    glossary: [{ word: "用事", reading: "ようじ", meaning: "ish, yumush" }],
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "レストランで、たのんだ料理が30分たってもまだ来ません。店員に何と言いますか。",
    options: [
      "すみません、ごちそうさまでした。",
      "すみません、もう一つください。",
      "すみません、おいしかったです。",
      "すみません、注文した料理がまだ来ないんですが。",
    ],
    answer: 3,
    glossary: [{ word: "注文", reading: "ちゅうもん", meaning: "buyurtma" }],
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "A「新しい服を買ったんです。どうですか。」\nB「（　　）」",
    options: ["はい、服です。", "よく似合っていますね。", "いいえ、着ません。", "服を買いました。"],
    answer: 1,
    glossary: [{ word: "似合う", reading: "にあう", meaning: "yarashmoq" }],
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "あなた「熱があるので、今日は休ませてください。」\n上司「（　　）」",
    options: ["はい、行きます。", "おめでとう。", "わかりました。お大事に。", "いただきます。"],
    answer: 2,
    glossary: [{ word: "上司", reading: "じょうし", meaning: "boshliq" }],
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "女の人は、何を飲みますか。",
    options: ["温かいお茶", "冷たいお茶", "コーヒー", "水"],
    answer: 0,
    audio: "/audio/test-11/25.mp3",
    script: [
      { speaker: "M", text: "何か飲みますか。コーヒーとお茶がありますよ。" },
      { speaker: "F", text: "夜、コーヒーを飲むと寝られないので…。" },
      { speaker: "M", text: "じゃあ、お茶ですね。冷たいのと温かいの、どちらがいいですか。" },
      { speaker: "F", text: "温かいお茶をお願いします。" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "男の人は、何時の新幹線に乗りますか。",
    options: ["8時", "8時半", "9時", "9時半"],
    answer: 1,
    audio: "/audio/test-11/26.mp3",
    script: [
      { speaker: "F", text: "何時の新幹線に乗りますか。" },
      { speaker: "M", text: "9時のに乗るつもりでしたが、会議が早く終わったので、8時半のに乗ります。" },
      { speaker: "F", text: "あ、よかったですね。" },
    ],
    glossary: [{ word: "新幹線", reading: "しんかんせん", meaning: "tezyurar poyezd" }],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "女の人は、あしたどこへ買い物に行きますか。",
    options: ["デパート", "駅前の本屋", "スーパー", "新しいショッピングモール"],
    answer: 3,
    audio: "/audio/test-11/27.mp3",
    script: [
      { speaker: "M", text: "あした、買い物に行きますか。" },
      {
        speaker: "F",
        text: "はい。最初はデパートに行こうと思っていましたが、駅前に新しいショッピングモールができたので、そこへ行きます。",
      },
      { speaker: "M", text: "そうですか。いいですね。" },
    ],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "男の人がいちばん日本語を勉強したい理由は何ですか。",
    options: [
      "アニメが好きだから",
      "日本人の友だちがいるから",
      "日本の会社で働きたいから",
      "日本を旅行したいから",
    ],
    answer: 2,
    audio: "/audio/test-11/28.mp3",
    script: [
      { speaker: "F", text: "どうして日本語を勉強しているんですか。" },
      {
        speaker: "M",
        text: "アニメも好きですが、いちばんの理由は、日本の会社で働きたいからです。",
      },
      { speaker: "F", text: "そうですか。がんばってください。" },
    ],
    glossary: [{ word: "理由", reading: "りゆう", meaning: "sabab" }],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、何を送りますか。",
    options: ["服と本とお菓子", "服と本", "本とお菓子", "服だけ"],
    answer: 1,
    audio: "/audio/test-11/29.mp3",
    script: [
      { speaker: "F", text: "すみません、この荷物をベトナムに送りたいんですが。" },
      { speaker: "M", text: "中は何ですか。" },
      { speaker: "F", text: "服と本と、それからお菓子です。" },
      { speaker: "M", text: "すみません、お菓子は送れないんです。" },
      { speaker: "F", text: "そうですか。じゃあ、お菓子は出します。" },
    ],
    glossary: [{ word: "お菓子", reading: "おかし", meaning: "shirinlik" }],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、どのサイズのコーヒーを買いますか。",
    options: ["S", "M", "L", "LL"],
    answer: 2,
    audio: "/audio/test-11/30.mp3",
    script: [
      { speaker: "F", text: "コーヒーのサイズは、S、M、Lがございます。" },
      { speaker: "M", text: "Mをお願いします。あ、やっぱり大きいほうがいいです。" },
      { speaker: "F", text: "Lでよろしいですか。" },
      { speaker: "M", text: "はい、お願いします。" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、今日何番線の電車に乗りますか。",
    options: ["5番線", "3番線", "1番線", "7番線"],
    answer: 0,
    audio: "/audio/test-11/31.mp3",
    script: [
      { speaker: "F", text: "すみません、東京駅へ行きたいんですが、何番線ですか。" },
      { speaker: "M", text: "いつもは3番線です。でも、今は工事中なので、今日は5番線から出ます。" },
      { speaker: "F", text: "5番線ですね。ありがとうございます。" },
    ],
    glossary: [{ word: "工事中", reading: "こうじちゅう", meaning: "ta'mirlanmoqda" }],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、新しい本を何冊借りられますか。",
    options: ["1冊", "2冊", "3冊", "5冊"],
    answer: 1,
    audio: "/audio/test-11/32.mp3",
    script: [
      { speaker: "F", text: "本は、一度に5冊まで借りられます。でも、新しい本は2冊までです。" },
      { speaker: "M", text: "新しい本を3冊借りたいんですが。" },
      { speaker: "F", text: "すみません、新しい本は2冊までなんです。" },
      { speaker: "M", text: "わかりました。" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "あしたの朝、どうしますか。",
    options: [
      "朝ご飯を食べて来る",
      "水を飲まないで来る",
      "保険証を家に置いて来る",
      "朝ご飯を食べないで来る",
    ],
    answer: 3,
    audio: "/audio/test-11/33.mp3",
    script: [
      {
        speaker: "M",
        text: "あしたは健康診断です。朝ご飯は食べないで来てください。水は少しなら飲んでもいいです。保険証を忘れないでください。",
      },
    ],
    glossary: [
      { word: "健康診断", reading: "けんこうしんだん", meaning: "tibbiy ko'rik" },
      { word: "保険証", reading: "ほけんしょう", meaning: "sug'urta kartasi" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "たばこは、どこで吸うことができますか。",
    options: ["駅のホーム", "駅の中のトイレ", "電車の中", "駅を出た右側"],
    answer: 3,
    audio: "/audio/test-11/34.mp3",
    script: [
      {
        speaker: "F",
        text: "駅の中では、たばこを吸うことはできません。たばこを吸う方は、駅を出て、右側にある喫煙所をご利用ください。",
      },
    ],
    glossary: [{ word: "喫煙所", reading: "きつえんじょ", meaning: "chekish joyi" }],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "あしたの授業は、どうなりますか。",
    options: ["休みになる", "午後からになる", "いつもどおりある", "オンラインになる"],
    answer: 0,
    audio: "/audio/test-11/35.mp3",
    script: [
      {
        speaker: "M",
        text: "台風が来ているので、あしたの授業は休みにします。あさっては、いつもどおり授業があります。",
      },
    ],
    glossary: [
      { word: "台風", reading: "たいふう", meaning: "to'fon" },
      { word: "授業", reading: "じゅぎょう", meaning: "dars" },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "セールは、何時までですか。",
    options: ["午後5時", "午後5時半", "午後6時", "午後7時"],
    answer: 2,
    audio: "/audio/test-11/36.mp3",
    script: [
      {
        speaker: "F",
        text: "ご来店ありがとうございます。ただいま、3階の婦人服売り場で、セールを行っております。セールは午後6時までです。どうぞお越しください。",
      },
    ],
    glossary: [{ word: "婦人服", reading: "ふじんふく", meaning: "ayollar kiyimi" }],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SHODO,
    question: "書道の体験に参加したい人は、どうしなければなりませんか。",
    options: [
      "金曜日に事務室へ行く",
      "筆と紙を買う",
      "301教室に電話する",
      "水曜日までに事務室で名前を書く",
    ],
    answer: 3,
    glossary: GLOSSARY_SHODO,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SHODO,
    question: "当日、参加する人は何に気をつけますか。",
    options: [
      "筆を持ってくる",
      "よごれてもいい服を着てくる",
      "紙を買ってくる",
      "2時までに名前を書く",
    ],
    answer: 1,
    glossary: GLOSSARY_SHODO,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_HOTEL,
    question: "最初、この人は何がむずかしかったですか。",
    options: [
      "部屋の数をおぼえること",
      "お客さんと話すこと",
      "ベッドをきれいに作ること",
      "先輩に教えること",
    ],
    answer: 2,
    glossary: GLOSSARY_HOTEL,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_HOTEL,
    question: "この人は、将来どんな仕事がしたいですか。",
    options: [
      "ホテルのフロントの仕事",
      "部屋のそうじの仕事",
      "ベッドを作る仕事",
      "日本語を教える仕事",
    ],
    answer: 0,
    glossary: GLOSSARY_HOTEL,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_THANKS,
    question: "ナムさんは、どうしてこのメールを書きましたか。",
    options: [
      "引っ越しを手伝ってほしいから",
      "お礼を言って、食事にさそいたいから",
      "新しい部屋をさがしているから",
      "駅の場所を聞きたいから",
    ],
    answer: 1,
    glossary: GLOSSARY_THANKS,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_THANKS,
    question: "来週の日曜日、何がありますか。",
    options: ["引っ越し", "駅の見学", "ケンさんの誕生日", "ナムさんの家での食事"],
    answer: 3,
    glossary: GLOSSARY_THANKS,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_GYM,
    question: "大人が1回体育館を使って、シャワーも使います。全部でいくらですか。",
    options: ["300円", "400円", "500円", "600円"],
    answer: 2,
    glossary: GLOSSARY_GYM,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_GYM,
    question: "高校生が体育館を1か月使います。いくらですか。",
    options: ["1,500円", "3,000円", "200円", "400円"],
    answer: 0,
    glossary: GLOSSARY_GYM,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_ATM,
    question: "さくら銀行のカードで、土曜日にお金を出します。手数料はいくらですか。",
    options: ["0円", "220円", "330円", "110円"],
    answer: 3,
    glossary: GLOSSARY_ATM,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_ATM,
    question: "ほかの銀行のカードで、平日の午後7時にお金を出します。手数料はいくらですか。",
    options: ["220円", "330円", "110円", "0円"],
    answer: 1,
    glossary: GLOSSARY_ATM,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_FESTIVAL,
    question: "8月3日に雨が降ったら、まつりはいつになりますか。",
    options: ["8月4日", "8月3日の夜", "8月10日", "なくなる"],
    answer: 0,
    glossary: GLOSSARY_FESTIVAL,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_FESTIVAL,
    question: "ジュースをもらいたいです。どうすればいいですか。",
    options: ["盆おどりに参加する", "花火を見る", "ゆかたを着て行く", "車で行く"],
    answer: 2,
    glossary: GLOSSARY_FESTIVAL,
  },
];
