import type { GlossaryItem, Question } from "@/questions";

export const TEST_8 = {
  name: "模擬テスト 8",
  slug: "test-8",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_MEMO = `グエンさんへ

明日の朝、新しいアルバイトの人が来ます。
9時に来るので、店の中を案内してください。
それから、レジの使い方も教えてあげてください。
私は午前中、本社の会議に出ます。昼ごろ店に戻ります。

店長`;

const PASSAGE_MOUNTAIN = `私はネパールから来ました。今、介護の仕事をしています。
休みの日は、よく近くの山に登ります。日本の山はきれいで、ネパールの山を思い出します。
先月、会社の人たちと富士山に登りました。とても大変でしたが、上から見た朝日は本当にきれいでした。来年は、家族といっしょに富士山に登りたいです。`;

const PASSAGE_GARBAGE = `ごみの出し方が変わります

4月から、ごみを出す日が変わります。
・燃えるごみ：月曜日と木曜日
・プラスチック：水曜日
・びん・かん：第2・第4金曜日
ごみは、その日の朝8時までに出してください。
前の日の夜に出さないでください。

みどり町 町内会`;

const PASSAGE_POOL = `市民プール

利用時間：9:00〜21:00（月曜日は休み）
料金：
　大人（高校生以上）　400円
　子ども（中学生以下）200円
　※6歳以下は無料
・水泳ぼうしをかぶってください。
　（受付で1つ150円で売っています）`;

const PASSAGE_JOB = `アルバイト募集　パン工場

仕事：パンを箱に入れる仕事
時間：① 6:00〜10:00　② 10:00〜15:00　③ 18:00〜22:00
時給：1,100円（③は1,300円）
・週2日からOK
・日本語が少しできる人
連絡：電話 03-1234-5678（担当：木村）`;

const PASSAGE_LUNCH = `ランチメニュー（11:00〜14:00）

Aランチ　ハンバーグ・ご飯・スープ　900円
Bランチ　魚フライ・ご飯・サラダ　　850円
Cランチ　カレー・サラダ　　　　　　800円
※ご飯の大盛りは無料です。
※コーヒーは＋150円です。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_MEMO: GlossaryItem[] = [
  { word: "案内", reading: "あんない", meaning: "ko'rsatib, tanishtirib chiqish" },
  { word: "本社", reading: "ほんしゃ", meaning: "bosh ofis" },
  { word: "会議", reading: "かいぎ", meaning: "majlis" },
  { word: "戻る", reading: "もどる", meaning: "qaytmoq" },
];

const GLOSSARY_MOUNTAIN: GlossaryItem[] = [
  { word: "介護", reading: "かいご", meaning: "parvarish (keksalarga qarash)" },
  { word: "登る", reading: "のぼる", meaning: "chiqmoq (toqqa)" },
  { word: "思い出す", reading: "おもいだす", meaning: "eslamoq" },
  { word: "朝日", reading: "あさひ", meaning: "tong quyoshi" },
];

const GLOSSARY_GARBAGE: GlossaryItem[] = [
  { word: "燃える", reading: "もえる", meaning: "yonmoq" },
  { word: "第2", reading: "だいに", meaning: "ikkinchi" },
  { word: "町内会", reading: "ちょうないかい", meaning: "mahalla qo'mitasi" },
];

const GLOSSARY_POOL: GlossaryItem[] = [
  { word: "利用", reading: "りよう", meaning: "foydalanish" },
  { word: "料金", reading: "りょうきん", meaning: "narx, to'lov" },
  { word: "以上", reading: "いじょう", meaning: "va undan yuqori" },
  { word: "以下", reading: "いか", meaning: "va undan past" },
  { word: "無料", reading: "むりょう", meaning: "bepul" },
  { word: "受付", reading: "うけつけ", meaning: "qabulxona" },
];

const GLOSSARY_JOB: GlossaryItem[] = [
  { word: "募集", reading: "ぼしゅう", meaning: "ishga qabul (e'lon)" },
  { word: "工場", reading: "こうじょう", meaning: "zavod, sex" },
  { word: "時給", reading: "じきゅう", meaning: "soatbay haq" },
  { word: "連絡", reading: "れんらく", meaning: "bog'lanish" },
  { word: "担当", reading: "たんとう", meaning: "mas'ul shaxs" },
];

const GLOSSARY_LUNCH: GlossaryItem[] = [
  { word: "大盛り", reading: "おおもり", meaning: "katta porsiya" },
  { word: "無料", reading: "むりょう", meaning: "bepul" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions8: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "🧹",
    question: "部屋をそうじするときに使います。これは何ですか。",
    options: ["ほうき", "かさ", "はし", "くし"],
    answer: 0,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🔑",
    question: "ドアを開けたり、閉めたりするときに使います。これは何ですか。",
    options: ["さいふ", "めがね", "とけい", "かぎ"],
    answer: 3,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「おもい」と反対の意味のことばはどれですか。",
    options: ["ほそい", "かるい", "うすい", "よわい"],
    answer: 1,
    glossary: [{ word: "反対", reading: "はんたい", meaning: "qarama-qarshi" }],
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "暑いので、窓を（　　）ください。",
    options: ["あけて", "きって", "はいって", "のって"],
    answer: 0,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "毎朝、6時に（　　）、会社へ行きます。",
    options: ["あいて", "ついて", "おきて", "できて"],
    answer: 2,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "このくつは小さいです。（　　）サイズはありますか。",
    options: ["もっと高い", "もっと長い", "もっと太い", "もっと大きい"],
    answer: 3,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "かぜをひいたので、＿病院＿に行きました。",
    options: ["びょういん", "びよういん", "びょうき", "ぴょういん"],
    answer: 0,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿駅＿の前で待っています。",
    options: ["いき", "えき", "えぎ", "やく"],
    answer: 1,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "＿来週＿、国へ帰ります。",
    options: ["らいしゅ", "きしゅう", "らいしゅう", "こんしゅう"],
    answer: 2,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "店のドアに「押」と書いてあります。どうしますか。",
    options: [
      "ドアを引いて開けます。",
      "ドアを押して開けます。",
      "ドアを横に開けます。",
      "このドアから入ってはいけません。",
    ],
    answer: 1,
    glossary: [
      { word: "押す", reading: "おす", meaning: "itarmoq" },
      { word: "引く", reading: "ひく", meaning: "tortmoq" },
      { word: "横", reading: "よこ", meaning: "yon tomon" },
    ],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "＿やすみ＿の日は何をしますか。",
    options: ["体", "木", "休", "作"],
    answer: 2,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "電車の中に「優先席」と書いてあります。どんな人のための席ですか。",
    options: [
      "子どもだけの席",
      "駅員のための席",
      "お金を払った人の席",
      "お年寄りや体の不自由な人などの席",
    ],
    answer: 3,
    glossary: [
      { word: "優先席", reading: "ゆうせんせき", meaning: "imtiyozli o'rindiq" },
      { word: "お年寄り", reading: "おとしより", meaning: "keksalar" },
      { word: "不自由", reading: "ふじゆう", meaning: "imkoniyati cheklangan" },
    ],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "A「日曜日、何をしましたか。」\nB「友だちと映画を（　　）。」",
    options: ["見ます", "見ました", "見ています", "見ましょう"],
    answer: 1,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "この部屋で、たばこを吸っては（　　）。",
    options: ["いけません", "ありません", "しません", "ください"],
    answer: 0,
    glossary: [{ word: "吸う", reading: "すう", meaning: "chekmoq" }],
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "明日、雨が（　　）、サッカーの試合は中止です。",
    options: ["ふっても", "ふるのに", "ふったら", "ふりながら"],
    answer: 2,
    glossary: [
      { word: "試合", reading: "しあい", meaning: "o'yin, musobaqa" },
      { word: "中止", reading: "ちゅうし", meaning: "bekor qilish" },
    ],
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "このかばんは、軽くて（　　）。",
    options: ["便利な", "便利で", "便利に", "便利です"],
    answer: 3,
    glossary: [{ word: "便利", reading: "べんり", meaning: "qulay" }],
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "A「もう昼ご飯を食べましたか。」\nB「いいえ、（　　）食べていません。」",
    options: ["もう", "まだ", "すぐ", "よく"],
    answer: 1,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "姉は私（　　）3さい年上です。",
    options: ["から", "まで", "より", "ほど"],
    answer: 2,
    glossary: [{ word: "年上", reading: "としうえ", meaning: "yoshi katta" }],
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "友だちの家で、ご飯を食べる前に何と言いますか。",
    options: [
      "ごちそうさまでした。",
      "いただきます。",
      "おじゃまします。",
      "いってきます。",
    ],
    answer: 1,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "電車がおくれて、会社に遅刻しそうです。上司に電話で何と言いますか。",
    options: [
      "すみません、10分ぐらい遅れます。",
      "すみません、早く着きました。",
      "お先に失礼します。",
      "おかえりなさい。",
    ],
    answer: 0,
    glossary: [
      { word: "遅刻", reading: "ちこく", meaning: "kechikish" },
      { word: "上司", reading: "じょうし", meaning: "boshliq" },
    ],
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「すみません、この席、空いていますか。」\nB「（　　）」",
    options: [
      "ええ、どうぞ。",
      "ええ、空きました。",
      "いいえ、どうぞ。",
      "ええ、座りましょう。",
    ],
    answer: 0,
    glossary: [{ word: "席", reading: "せき", meaning: "o'rindiq" }],
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question:
      "A「週末、いっしょに買い物に行きませんか。」\nB「すみません、週末はちょっと…。」\nA「（　　）」",
    options: [
      "はい、行きましょう。",
      "いいえ、行きません。",
      "それはよかったですね。",
      "そうですか。じゃあ、また今度。",
    ],
    answer: 3,
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "店で、ほしいくつを見つけました。はいてみたいです。店員に何と言いますか。",
    options: [
      "これ、はいてください。",
      "これ、はきましょうか。",
      "これ、はいてみてもいいですか。",
      "これ、はいたことがあります。",
    ],
    answer: 2,
    glossary: [{ word: "店員", reading: "てんいん", meaning: "sotuvchi" }],
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "入院している友だちのお見舞いに行きました。帰るとき、何と言いますか。",
    options: [
      "おめでとうございます。",
      "いらっしゃいませ。",
      "失礼しました。",
      "お大事に。",
    ],
    answer: 3,
    glossary: [
      { word: "入院", reading: "にゅういん", meaning: "kasalxonaga yotish" },
      { word: "お見舞い", reading: "おみまい", meaning: "bemorni ko'rgani borish" },
    ],
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "女の人は、何を買って帰りますか。",
    options: ["牛乳だけ", "牛乳とパン", "牛乳と卵", "卵とパン"],
    answer: 1,
    audio: "/audio/test-8/25.mp3",
    script: [
      { speaker: "M", text: "帰りに、スーパーで牛乳を買ってきてくれる？" },
      { speaker: "F", text: "いいよ。卵は？" },
      { speaker: "M", text: "卵はまだあるから、いいよ。あ、パンもお願い。" },
      { speaker: "F", text: "わかった。牛乳とパンね。" },
    ],
    glossary: [
      { word: "牛乳", reading: "ぎゅうにゅう", meaning: "sut" },
      { word: "卵", reading: "たまご", meaning: "tuxum" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "男の人は、今日、何で会社に行きますか。",
    options: ["自転車", "電車", "歩いて", "バス"],
    answer: 3,
    audio: "/audio/test-8/26.mp3",
    script: [
      { speaker: "F", text: "今日は雪ですね。いつも自転車で会社に行っていますよね。" },
      { speaker: "M", text: "ええ。でも、今日は危ないので、バスで行きます。" },
      { speaker: "F", text: "電車のほうが早くないですか。" },
      { speaker: "M", text: "うちから駅まで遠いんです。だから、バスにします。" },
    ],
    glossary: [{ word: "危ない", reading: "あぶない", meaning: "xavfli" }],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "女の人は、どうして昨日、仕事を休みましたか。",
    options: [
      "子どもが病気だったから",
      "風邪をひいたから",
      "用事があったから",
      "病院で働いたから",
    ],
    answer: 0,
    audio: "/audio/test-8/27.mp3",
    script: [
      { speaker: "M", text: "昨日、休みでしたね。風邪ですか。" },
      {
        speaker: "F",
        text: "いいえ、子どもが熱を出したので、病院に連れて行ったんです。",
      },
      { speaker: "M", text: "そうですか。お子さんは大丈夫ですか。" },
      { speaker: "F", text: "ええ、もう元気になりました。" },
    ],
    glossary: [
      { word: "熱", reading: "ねつ", meaning: "isitma" },
      { word: "連れて行く", reading: "つれていく", meaning: "olib bormoq" },
    ],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "金曜日のパーティーには、何人来ますか。",
    options: ["8人", "9人", "10人", "11人"],
    answer: 1,
    audio: "/audio/test-8/28.mp3",
    script: [
      { speaker: "F", text: "金曜日のパーティー、何人来ますか。" },
      {
        speaker: "M",
        text: "はじめは10人でしたが、2人来られなくなりました。",
      },
      { speaker: "F", text: "じゃあ、8人ですね。" },
      {
        speaker: "M",
        text: "あ、でも、リンさんが友だちを1人連れてくるそうです。",
      },
      { speaker: "F", text: "わかりました。" },
    ],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、どのケーキを買いますか。",
    options: [
      "いちごのケーキを2つ",
      "チョコレートのケーキを2つ",
      "いちごとチョコレートを1つずつ",
      "チーズケーキを1つ",
    ],
    answer: 2,
    audio: "/audio/test-8/29.mp3",
    script: [
      { speaker: "M", text: "すみません、このいちごのケーキを2つください。" },
      {
        speaker: "F",
        text: "申し訳ありません。いちごのケーキは、あと1つしかないんです。",
      },
      {
        speaker: "M",
        text: "そうですか。じゃあ、いちごを1つと、チョコレートを1つください。",
      },
      { speaker: "F", text: "かしこまりました。" },
    ],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、荷物をどうやって送りますか。",
    options: ["航空便", "船便", "自分で持っていく", "来月送る"],
    answer: 0,
    audio: "/audio/test-8/30.mp3",
    script: [
      { speaker: "F", text: "すみません、この荷物を中国に送りたいんですが。" },
      {
        speaker: "M",
        text: "船便と航空便があります。船便は安いですが、1か月ぐらいかかります。航空便なら1週間です。",
      },
      {
        speaker: "F",
        text: "来週、母の誕生日なので、早いほうがいいです。",
      },
      { speaker: "M", text: "では、航空便ですね。" },
    ],
    glossary: [
      { word: "航空便", reading: "こうくうびん", meaning: "havo pochtasi" },
      { word: "船便", reading: "ふなびん", meaning: "dengiz pochtasi" },
      { word: "誕生日", reading: "たんじょうび", meaning: "tug'ilgan kun" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、何を注文しましたか。",
    options: [
      "ラーメンとギョーザ",
      "ラーメンだけ",
      "ラーメンと小さいチャーハン",
      "チャーハンとギョーザ",
    ],
    answer: 2,
    audio: "/audio/test-8/31.mp3",
    script: [
      { speaker: "F", text: "ご注文はお決まりですか。" },
      { speaker: "M", text: "ラーメンとギョーザをお願いします。" },
      {
        speaker: "F",
        text: "すみません、ギョーザは今日はもう終わってしまいました。",
      },
      {
        speaker: "M",
        text: "そうですか。じゃあ、ラーメンとチャーハンにします。チャーハンは小さいのでお願いします。",
      },
      { speaker: "F", text: "かしこまりました。" },
    ],
    glossary: [{ word: "注文", reading: "ちゅうもん", meaning: "buyurtma" }],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、まず何をしますか。",
    options: [
      "写真をとる",
      "紙に名前と住所を書く",
      "3番の窓口に並ぶ",
      "新しい家に行く",
    ],
    answer: 1,
    audio: "/audio/test-8/32.mp3",
    script: [
      { speaker: "M", text: "すみません、引っ越しの手続きをしたいんですが。" },
      {
        speaker: "F",
        text: "では、まず、この紙に名前と新しい住所を書いてください。書いたら、3番の窓口に出してください。",
      },
      { speaker: "M", text: "わかりました。写真はいりますか。" },
      { speaker: "F", text: "いいえ、写真はいりません。" },
    ],
    glossary: [
      { word: "引っ越し", reading: "ひっこし", meaning: "ko'chish" },
      { word: "手続き", reading: "てつづき", meaning: "rasmiylashtirish" },
      { word: "住所", reading: "じゅうしょ", meaning: "manzil" },
      { word: "窓口", reading: "まどぐち", meaning: "darcha (xizmat)" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "明日、何時に、どこに集まりますか。",
    options: [
      "8時に会社の前",
      "8時半に会社の前",
      "8時に駅の北口",
      "8時半に駅の北口",
    ],
    answer: 3,
    audio: "/audio/test-8/33.mp3",
    script: [
      {
        speaker: "M",
        text: "明日の工場見学について話します。朝8時半に、会社の前ではなく、駅の北口に集まってください。そこからバスで工場へ行きます。遅れないでください。",
      },
    ],
    glossary: [
      { word: "見学", reading: "けんがく", meaning: "tanishuv sayohati" },
      { word: "北口", reading: "きたぐち", meaning: "shimoliy chiqish" },
      { word: "集まる", reading: "あつまる", meaning: "yig'ilmoq" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "今、安くなっているものは何ですか。",
    options: ["肉と魚", "野菜", "肉と野菜", "全部"],
    answer: 0,
    audio: "/audio/test-8/34.mp3",
    script: [
      {
        speaker: "F",
        text: "本日も、さくらスーパーにお越しいただき、ありがとうございます。ただいまから1時間、お肉とお魚が全部2割引きです。野菜は、午後5時から安くなります。",
      },
    ],
    glossary: [{ word: "2割引き", reading: "にわりびき", meaning: "20% chegirma" }],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "明日の天気はどうですか。",
    options: [
      "一日中晴れ",
      "朝から雨",
      "朝はくもりで、昼から雨",
      "朝は雨で、昼から晴れ",
    ],
    answer: 2,
    audio: "/audio/test-8/35.mp3",
    script: [
      {
        speaker: "F",
        text: "明日の天気です。朝はくもりですが、昼ごろから雨が降るでしょう。雨は夜にはやむでしょう。出かけるときは、かさを持っていってください。",
      },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "この電車は、次にどの駅に止まりますか。",
    options: ["山下", "大川", "東京", "中山"],
    answer: 3,
    audio: "/audio/test-8/36.mp3",
    script: [
      {
        speaker: "M",
        text: "本日もご乗車ありがとうございます。この電車は、急行、東京行きです。次は、中山に止まります。中山の次は、大川に止まります。山下には止まりませんので、ご注意ください。",
      },
    ],
    glossary: [
      { word: "急行", reading: "きゅうこう", meaning: "tezyurar (poyezd)" },
      { word: "注意", reading: "ちゅうい", meaning: "ehtiyot bo'lish" },
    ],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MEMO,
    question: "グエンさんは明日、新しいアルバイトの人に何をしますか。",
    options: [
      "本社の会議に連れていく",
      "店の中を案内して、レジの使い方を教える",
      "9時に電話する",
      "昼ご飯をいっしょに食べる",
    ],
    answer: 1,
    glossary: GLOSSARY_MEMO,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MEMO,
    question: "店長は、明日の午前中、どこにいますか。",
    options: ["店", "駅", "家", "本社"],
    answer: 3,
    glossary: GLOSSARY_MEMO,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MOUNTAIN,
    question: "この人は休みの日に、よく何をしますか。",
    options: [
      "近くの山に登る",
      "家族と旅行する",
      "介護の勉強をする",
      "ネパールに帰る",
    ],
    answer: 0,
    glossary: GLOSSARY_MOUNTAIN,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MOUNTAIN,
    question: "この人は、来年何をしたいと言っていますか。",
    options: [
      "会社の人と山に登りたい",
      "ネパールの山に登りたい",
      "家族と富士山に登りたい",
      "朝日の写真をとりたい",
    ],
    answer: 2,
    glossary: GLOSSARY_MOUNTAIN,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_GARBAGE,
    question: "4月から、プラスチックは何曜日に出しますか。",
    options: ["月曜日", "木曜日", "金曜日", "水曜日"],
    answer: 3,
    glossary: GLOSSARY_GARBAGE,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_GARBAGE,
    question: "ごみは、いつ出さなければなりませんか。",
    options: [
      "その日の朝8時までに",
      "前の日の夜",
      "その日の夜8時までに",
      "いつでもいい",
    ],
    answer: 0,
    glossary: GLOSSARY_GARBAGE,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_POOL,
    question: "大人1人と8歳の子ども1人でプールに行きます。全部でいくらですか。",
    options: ["400円", "500円", "600円", "800円"],
    answer: 2,
    glossary: GLOSSARY_POOL,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_POOL,
    question: "水泳ぼうしを持っていません。どうすればいいですか。",
    options: [
      "ぼうしをかぶらないで入る",
      "受付で買う",
      "家に取りに帰る",
      "プールに入れない",
    ],
    answer: 1,
    glossary: GLOSSARY_POOL,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_JOB,
    question: "夜、働きたいです。時給はいくらですか。",
    options: ["1,000円", "1,100円", "1,200円", "1,300円"],
    answer: 3,
    glossary: GLOSSARY_JOB,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_JOB,
    question:
      "毎日、朝9時から12時まで学校があります。学校のあとで働きたいです。何番の時間で働けますか。",
    options: ["①", "②", "③", "①と②"],
    answer: 2,
    glossary: GLOSSARY_JOB,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_LUNCH,
    question: "魚が食べたいです。どれを注文しますか。",
    options: ["Aランチ", "Bランチ", "Cランチ", "魚のランチはない"],
    answer: 1,
    glossary: GLOSSARY_LUNCH,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_LUNCH,
    question: "Aランチとコーヒーを注文しました。全部でいくらですか。",
    options: ["1,050円", "900円", "950円", "1,000円"],
    answer: 0,
    glossary: GLOSSARY_LUNCH,
  },
];
