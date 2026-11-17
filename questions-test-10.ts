import type { GlossaryItem, Question } from "@/questions";

export const TEST_10 = {
  name: "模擬テスト 10",
  slug: "test-10",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_BBQ = `リンさん

明日のバーベキュー、雨が降りそうなので、場所を変えます。
公園ではなく、わたしのアパートの1階の部屋でやります。
時間は同じ12時からです。
飲み物は買ってあるので、何か食べ物を1つ持ってきてください。

アン`;

const PASSAGE_WORK = `わたしはベトナムから来て、2年前から建設会社で働いています。仕事は朝8時から夕方5時までで、外での仕事が多いです。夏はとても暑くて大変ですが、仲間といっしょに建物ができていくのを見るのが楽しいです。
休みの日は、会社の先輩に教えてもらったラーメン屋によく行きます。来月、国から妹が来るので、その店に連れて行きたいと思っています。`;

const PASSAGE_CAFETERIA = `社員のみなさんへ

来週の月曜日から、社員食堂の時間が変わります。
・昼ごはん　11:30〜13:30（今までは 12:00〜13:00）
・夜ごはん　なし（今までは 17:00〜19:00）
夜ごはんがなくなるので、残業する人はお弁当を持ってきてください。

総務課`;

const PASSAGE_CINEMA = `さくら映画館　料金

一般　　　　　1,800円
大学生　　　　1,500円
高校生以下　　1,000円

・毎週水曜日は、だれでも 1,200円です。
・夜8時からの映画は、一般・大学生は 1,300円です。`;

const PASSAGE_BIKE = `レンタサイクル　さくら

・料金：1時間 200円、1日（9:00〜18:00）800円
・借りるときに、在留カードかパスポートを見せてください。
・返すときは、18時までに店に返してください。
・雨の日は休みです。`;

const PASSAGE_JOB = `アルバイト募集　コンビニ　さくら店

時間：① 7:00〜12:00　② 12:00〜17:00　③ 22:00〜翌朝6:00
時給：①② 1,100円　③ 1,400円
・週3日以上働ける人
・日本語で簡単な会話ができる人
面接：電話で予約してください（03-1111-2222）`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_BBQ: GlossaryItem[] = [
  { word: "場所", reading: "ばしょ", meaning: "joy" },
  { word: "変える", reading: "かえる", meaning: "o'zgartirmoq" },
];

const GLOSSARY_WORK: GlossaryItem[] = [
  { word: "建設会社", reading: "けんせつがいしゃ", meaning: "qurilish kompaniyasi" },
  { word: "仲間", reading: "なかま", meaning: "hamkasblar, do'stlar" },
  { word: "建物", reading: "たてもの", meaning: "bino" },
  { word: "先輩", reading: "せんぱい", meaning: "katta hamkasb" },
  { word: "連れて行く", reading: "つれていく", meaning: "olib bormoq" },
];

const GLOSSARY_CAFETERIA: GlossaryItem[] = [
  { word: "社員食堂", reading: "しゃいんしょくどう", meaning: "xodimlar oshxonasi" },
  { word: "残業", reading: "ざんぎょう", meaning: "qo'shimcha ish (ish vaqtidan keyin)" },
  { word: "総務課", reading: "そうむか", meaning: "ma'muriy bo'lim" },
];

const GLOSSARY_CINEMA: GlossaryItem[] = [
  { word: "映画館", reading: "えいがかん", meaning: "kinoteatr" },
  { word: "料金", reading: "りょうきん", meaning: "narx, to'lov" },
  { word: "一般", reading: "いっぱん", meaning: "kattalar (umumiy)" },
  { word: "以下", reading: "いか", meaning: "va undan kichik" },
];

const GLOSSARY_BIKE: GlossaryItem[] = [
  { word: "借りる", reading: "かりる", meaning: "ijaraga olmoq" },
  { word: "返す", reading: "かえす", meaning: "qaytarmoq" },
  { word: "在留カード", reading: "ざいりゅうカード", meaning: "yashash kartasi" },
];

const GLOSSARY_JOB: GlossaryItem[] = [
  { word: "募集", reading: "ぼしゅう", meaning: "ishga qabul (e'lon)" },
  { word: "時給", reading: "じきゅう", meaning: "soatbay haq" },
  { word: "翌朝", reading: "よくあさ", meaning: "ertasi kuni ertalab" },
  { word: "面接", reading: "めんせつ", meaning: "suhbat (ishga qabulda)" },
  { word: "予約", reading: "よやく", meaning: "oldindan yozilish" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions10: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "⏰",
    question: "朝、起きるときに使います。これは何ですか。",
    options: ["カレンダー", "でんわ", "めざましどけい", "テレビ"],
    answer: 2,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🍳",
    question: "たまごをやくときに使います。これは何ですか。",
    options: ["フライパン", "コップ", "はし", "スプーン"],
    answer: 0,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「あたらしい」と反対の意味のことばはどれですか。",
    options: ["わかい", "ふるい", "ちいさい", "やすい"],
    answer: 1,
    glossary: [{ word: "反対", reading: "はんたい", meaning: "qarama-qarshi" }],
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "かぜをひいたので、病院で薬を（　　）。",
    options: ["かけました", "とりました", "すてました", "もらいました"],
    answer: 3,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "毎朝、犬と公園を（　　）します。",
    options: ["そうじ", "せんたく", "りょうり", "さんぽ"],
    answer: 3,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "雨にぬれたので、タオルで頭を（　　）。",
    options: ["あらいました", "ふきました", "きりました", "かきました"],
    answer: 1,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "友だちに＿電話＿をかけます。",
    options: ["でんわ", "てんわ", "でんは", "でんま"],
    answer: 0,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿午前＿中は家にいます。",
    options: ["ごご", "ごせん", "ごぜん", "こぜん"],
    answer: 2,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "日本の＿夏＿はとてもあついです。",
    options: ["なつ", "ふゆ", "はる", "あき"],
    answer: 0,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "公園の入り口に「ペット禁止」と書いてあります。どういう意味ですか。",
    options: [
      "ペットを売っています。",
      "ペットとあそべます。",
      "ペットのごはんがあります。",
      "ペットを連れて入ってはいけません。",
    ],
    answer: 3,
    glossary: [{ word: "禁止", reading: "きんし", meaning: "taqiqlangan" }],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "週末、友だちと＿やま＿にのぼります。",
    options: ["川", "田", "山", "石"],
    answer: 2,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "エレベーターに「定員8名」と書いてあります。どういう意味ですか。",
    options: [
      "8階まで行きます。",
      "8人まで乗れます。",
      "8時まで使えます。",
      "8人いないと動きません。",
    ],
    answer: 1,
    glossary: [{ word: "定員", reading: "ていいん", meaning: "sig'imi (necha kishilik)" }],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "毎日練習して、日本語が少し話せる（　　）なりました。",
    options: ["ために", "ように", "ことに", "ところに"],
    answer: 1,
    glossary: [{ word: "練習", reading: "れんしゅう", meaning: "mashq" }],
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "きのう母が（　　）ケーキは、とてもおいしかったです。",
    options: ["作り", "作って", "作る", "作った"],
    answer: 3,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "雨が降っています（　　）、出かけましょう。",
    options: ["が", "から", "ので", "と"],
    answer: 0,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "テストの前に、もう一度ノートを読んで（　　）。",
    options: ["いきます", "みせます", "おきます", "あります"],
    answer: 2,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "すみません、この漢字の読み方を（　　）ください。",
    options: ["教え", "教える", "教えて", "教えた"],
    answer: 2,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "家から駅まで、歩いて10分（　　）かかります。",
    options: ["ぐらい", "だけ", "しか", "まで"],
    answer: 0,
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "電車で、となりの人の足をふんでしまいました。何と言いますか。",
    options: ["どうぞ。", "すみません。", "ありがとう。", "いただきます。"],
    answer: 1,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "A「すみません、トイレはどこですか。」\nB「（　　）」",
    options: ["トイレです。", "はい、そうです。", "いいえ、行きません。", "あそこの階段の横です。"],
    answer: 3,
    glossary: [
      { word: "階段", reading: "かいだん", meaning: "zinapoya" },
      { word: "横", reading: "よこ", meaning: "yon tomon" },
    ],
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "友だちの家で晩ごはんを食べました。食べ終わったとき、何と言いますか。",
    options: ["ごちそうさまでした。", "いただきます。", "いってきます。", "おかえりなさい。"],
    answer: 0,
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "A「寒いですね。窓を閉めましょうか。」\nB「（　　）」",
    options: ["はい、閉めました。", "いいえ、どういたしまして。", "ええ、お願いします。", "窓です。"],
    answer: 2,
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "店で、電池がどこにあるかわかりません。店員に何と言いますか。",
    options: [
      "すみません、これをください。",
      "すみません、電池はどこにありますか。",
      "すみません、ありがとうございました。",
      "すみません、高いですね。",
    ],
    answer: 1,
    glossary: [{ word: "電池", reading: "でんち", meaning: "batareyka" }],
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "A「週末は、何をしましたか。」\nB「（　　）」",
    options: ["来週、行きます。", "はい、しました。", "週末です。", "友だちと買い物に行きました。"],
    answer: 3,
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "男の人は、何で駅まで行きますか。",
    options: ["バス", "自転車", "歩いて", "タクシー"],
    answer: 3,
    audio: "/audio/test-10/25.mp3",
    script: [
      { speaker: "F", text: "駅まで、バスで行きますか。" },
      { speaker: "M", text: "バスは時間がかかるので、自転車で行こうと思っています。" },
      { speaker: "F", text: "でも、今日は雨ですよ。" },
      { speaker: "M", text: "あ、そうですね。じゃあ、タクシーにします。" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "女の人は、どの部屋を借りますか。",
    options: [
      "駅から5分、7万円の部屋",
      "駅から15分、5万円の部屋",
      "駅から5分、5万円の部屋",
      "駅から15分、7万円の部屋",
    ],
    answer: 1,
    audio: "/audio/test-10/26.mp3",
    script: [
      { speaker: "M", text: "この部屋は駅から5分で、家賃は7万円です。こちらは駅から15分ですが、5万円です。" },
      { speaker: "F", text: "駅から近いほうがいいですが、7万円は高いですね…。" },
      { speaker: "F", text: "15分なら歩けますから、安いほうにします。" },
      { speaker: "M", text: "わかりました。" },
    ],
    glossary: [{ word: "家賃", reading: "やちん", meaning: "ijara haqi" }],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "二人は、いつ映画を見に行きますか。",
    options: ["土曜日の午前", "土曜日の午後", "日曜日の午後", "日曜日の午前"],
    answer: 2,
    audio: "/audio/test-10/27.mp3",
    script: [
      { speaker: "M", text: "土曜日、いっしょに映画に行きませんか。" },
      { speaker: "F", text: "土曜日はアルバイトがあるんです。日曜日はどうですか。" },
      { speaker: "M", text: "日曜日の午前中は用事がありますが、午後なら大丈夫です。" },
      { speaker: "F", text: "じゃあ、日曜日の午後にしましょう。" },
    ],
    glossary: [{ word: "用事", reading: "ようじ", meaning: "ish, yumush" }],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "男の人は、どうして元気がないですか。",
    options: ["さいふをなくしたから", "かぜをひいたから", "仕事が忙しいから", "よく寝られなかったから"],
    answer: 0,
    audio: "/audio/test-10/28.mp3",
    script: [
      { speaker: "F", text: "元気がないですね。どうしたんですか。" },
      { speaker: "M", text: "きのう、さいふをなくしてしまったんです。" },
      { speaker: "F", text: "えっ、警察には行きましたか。" },
      { speaker: "M", text: "はい、行きました。見つかるといいんですが。" },
    ],
    glossary: [{ word: "警察", reading: "けいさつ", meaning: "politsiya" }],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、荷物をいつ受け取りますか。",
    options: ["明日の夕方", "明日の午前中", "今日の夕方", "あさっての午前中"],
    answer: 0,
    audio: "/audio/test-10/29.mp3",
    script: [
      { speaker: "M", text: "宅配便です。お荷物のお届けは、明日の午前中でよろしいですか。" },
      { speaker: "F", text: "明日の午前中は出かけるので、夕方はどうですか。" },
      { speaker: "M", text: "夕方ですと、6時から8時になりますが。" },
      { speaker: "F", text: "じゃあ、それでお願いします。" },
    ],
    glossary: [
      { word: "宅配便", reading: "たくはいびん", meaning: "kuryerlik yetkazib berish" },
      { word: "受け取る", reading: "うけとる", meaning: "qabul qilib olmoq" },
    ],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、全部でいくら払いますか。",
    options: ["300円", "400円", "500円", "600円"],
    answer: 2,
    audio: "/audio/test-10/30.mp3",
    script: [
      { speaker: "M", text: "すみません、このノートとペンはいくらですか。" },
      { speaker: "F", text: "ノートは2冊で300円、ペンは1本100円です。" },
      { speaker: "M", text: "じゃあ、ノート2冊とペンを2本ください。" },
      { speaker: "F", text: "ありがとうございます。" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、このあとまず何をしますか。",
    options: ["熱をはかる", "紙に名前と住所を書く", "保険証をもらう", "医者と話す"],
    answer: 1,
    audio: "/audio/test-10/31.mp3",
    script: [
      { speaker: "M", text: "はじめてですか。では、この紙に名前と住所を書いてください。それから、保険証を出してください。" },
      { speaker: "F", text: "はい。熱もはかりますか。" },
      { speaker: "M", text: "熱は、紙を出したあとでお願いします。" },
      { speaker: "F", text: "わかりました。" },
    ],
    glossary: [
      { word: "保険証", reading: "ほけんしょう", meaning: "sug'urta kartasi" },
      { word: "熱をはかる", reading: "ねつをはかる", meaning: "harorat o'lchamoq" },
    ],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、何階へ行きますか。",
    options: ["2階", "3階", "4階", "5階"],
    answer: 3,
    audio: "/audio/test-10/32.mp3",
    script: [
      { speaker: "M", text: "すみません、くつ売り場は何階ですか。" },
      { speaker: "F", text: "くつは3階です。でも、スポーツのくつは5階にございます。" },
      { speaker: "M", text: "走るときにはくくつがほしいんですが。" },
      { speaker: "F", text: "それでしたら、5階です。" },
    ],
    glossary: [{ word: "売り場", reading: "うりば", meaning: "savdo bo'limi" }],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "ベルが鳴ったら、どうしますか。",
    options: ["エレベーターで1階に下りる", "部屋で待つ", "階段で1階に下りる", "窓を開ける"],
    answer: 2,
    audio: "/audio/test-10/33.mp3",
    script: [
      {
        speaker: "M",
        text: "これから避難訓練をします。ベルが鳴ったら、エレベーターは使わないで、階段で1階に下りてください。外に出たら、駐車場に集まってください。",
      },
    ],
    glossary: [
      { word: "避難訓練", reading: "ひなんくんれん", meaning: "evakuatsiya mashqi" },
      { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "avtoturargoh" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "工場の中に持って入ってはいけないものは何ですか。",
    options: ["ぼうし", "マスク", "タオル", "ケータイ"],
    answer: 3,
    audio: "/audio/test-10/34.mp3",
    script: [
      {
        speaker: "M",
        text: "工場の中では、必ずぼうしとマスクをしてください。それから、ケータイは更衣室のロッカーに入れてください。工場の中に持って入ってはいけません。",
      },
    ],
    glossary: [
      { word: "必ず", reading: "かならず", meaning: "albatta, shart" },
      { word: "更衣室", reading: "こういしつ", meaning: "kiyim almashtirish xonasi" },
    ],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "このバスが止まらないところはどこですか。",
    options: ["図書館前", "市役所前", "病院前", "さくら駅"],
    answer: 0,
    audio: "/audio/test-10/35.mp3",
    script: [
      {
        speaker: "F",
        text: "このバスは、さくら駅行きです。途中、市役所前と病院前に止まります。図書館前には止まりませんので、ご注意ください。",
      },
    ],
    glossary: [
      { word: "途中", reading: "とちゅう", meaning: "yo'l-yo'lakay" },
      { word: "注意", reading: "ちゅうい", meaning: "ehtiyot bo'lish" },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "男の子は、今どこにいますか。",
    options: ["2階のおもちゃ売り場", "1階のサービスカウンター", "店の入り口", "駐車場"],
    answer: 1,
    audio: "/audio/test-10/36.mp3",
    script: [
      {
        speaker: "F",
        text: "お客様にお知らせいたします。青いシャツを着た、5歳ぐらいの男の子が、お父さんをさがしています。お父様は、1階のサービスカウンターまでお越しください。",
      },
    ],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_BBQ,
    question: "明日のバーベキューは、どこでしますか。",
    options: ["公園", "アンさんのアパート", "リンさんの家", "駅の前"],
    answer: 1,
    glossary: GLOSSARY_BBQ,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_BBQ,
    question: "リンさんは、何を持っていきますか。",
    options: ["飲み物", "かさ", "食べ物", "何もいらない"],
    answer: 2,
    glossary: GLOSSARY_BBQ,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_WORK,
    question: "この人は、仕事のどんなことが楽しいと言っていますか。",
    options: [
      "仲間と建物を作っていくこと",
      "夏に外で働くこと",
      "朝早く起きること",
      "先輩とラーメンを食べること",
    ],
    answer: 0,
    glossary: GLOSSARY_WORK,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_WORK,
    question: "この人は、来月何をしたいと思っていますか。",
    options: [
      "ベトナムに帰りたい",
      "新しい仕事をしたい",
      "ラーメン屋で働きたい",
      "妹をラーメン屋に連れて行きたい",
    ],
    answer: 3,
    glossary: GLOSSARY_WORK,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_CAFETERIA,
    question: "来週から、昼ごはんは何時から食べられますか。",
    options: ["11時", "12時", "11時半", "12時半"],
    answer: 2,
    glossary: GLOSSARY_CAFETERIA,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_CAFETERIA,
    question: "残業する人は、来週からどうしますか。",
    options: [
      "食堂で夜ごはんを食べる",
      "お弁当を持ってくる",
      "総務課に電話する",
      "5時に帰る",
    ],
    answer: 1,
    glossary: GLOSSARY_CAFETERIA,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CINEMA,
    question: "大学生の友だちと2人で、土曜日の夜8時からの映画を見ます。全部でいくらですか。",
    options: ["2,400円", "3,000円", "3,600円", "2,600円"],
    answer: 3,
    glossary: GLOSSARY_CINEMA,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CINEMA,
    question: "大人が一人で、水曜日の午後に映画を見ます。いくらですか。",
    options: ["1,200円", "1,300円", "1,500円", "1,800円"],
    answer: 0,
    glossary: GLOSSARY_CINEMA,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_BIKE,
    question: "朝10時から午後3時まで自転車を借ります。いちばん安い料金はいくらですか。",
    options: ["200円", "1,000円", "800円", "1,200円"],
    answer: 2,
    glossary: GLOSSARY_BIKE,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_BIKE,
    question: "自転車を借りるとき、何が必要ですか。",
    options: ["お金だけ", "在留カードかパスポート", "ヘルメット", "電話番号"],
    answer: 1,
    glossary: GLOSSARY_BIKE,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_JOB,
    question: "夜に働きたいです。時給はいくらですか。",
    options: ["1,400円", "1,100円", "1,200円", "1,300円"],
    answer: 0,
    glossary: GLOSSARY_JOB,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_JOB,
    question: "このアルバイトをしたい人は、まず何をしますか。",
    options: [
      "店に行って働く",
      "週に1日だけ働く",
      "メールを送る",
      "電話で面接を予約する",
    ],
    answer: 3,
    glossary: GLOSSARY_JOB,
  },
];
