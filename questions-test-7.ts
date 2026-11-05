import type { GlossaryItem, Question } from "@/questions";

export const TEST_7 = {
  name: "模擬テスト 7",
  slug: "test-7",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_SHIFT = `リーさんへ

来週の勤務のことです。
水曜日の朝、私は病院に行かなければなりません。
すみませんが、水曜日と木曜日の勤務を交換してもらえませんか。
リーさんが水曜日に出て、私が木曜日に出ます。
だめなときは、今日の5時までに教えてください。

高橋`;

const PASSAGE_FARM = `私はタイから来て、北海道の農家で働いています。仕事は、野菜を育てることです。
夏は朝5時から仕事が始まるので、とても早く起きなければなりません。でも、午後は2時に終わるので、そのあと、近くの川で釣りをしたり、日本語を勉強したりしています。
冬は雪が多くて、外の仕事ができません。それで、冬の間は、ビニールハウスの中で働いています。`;

const PASSAGE_BIKE = `自転車置き場について

5月1日から、自転車置き場を使う人は、管理人室でシールをもらってください。
シールは1台100円です。自転車の後ろにはってください。
シールがない自転車は、5月15日に片付けます。

さくらマンション　管理人`;

const PASSAGE_DELIVERY = `ご不在連絡票

アリ 様
お荷物をお届けにまいりましたが、お留守でした。

お届け日：6月12日（月）午後2時
お荷物：箱 1個

【再配達の受付】
電話：0120-123-456（午前8時〜午後9時）
・再配達の時間は、次から選んでください。
　① 午前中　② 午後2時〜4時　③ 午後4時〜6時　④ 午後6時〜9時
・午後7時までにお電話いただければ、今日の再配達ができます。`;

const PASSAGE_COOKING = `やさしい日本料理教室

日にち：毎月 第1・第3土曜日
時間：午前10時〜午後1時
場所：中央公民館 2階 調理室
参加費：1回 800円（材料費をふくみます）
持ち物：エプロン、タオル
定員：15人（先着順）
※作った料理は、みんなで食べます。`;

const PASSAGE_CLINIC = `さくら歯科クリニック

診療時間
　月・火・木・金　9:00〜12:00 / 14:00〜19:00
　土　　　　　　　9:00〜13:00
休診日：水曜日・日曜日・祝日

※予約の方が優先です。お電話で予約してください。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_SHIFT: GlossaryItem[] = [
  { word: "勤務", reading: "きんむ", meaning: "ish smenasi, ishda bo'lish" },
  { word: "交換", reading: "こうかん", meaning: "almashtirish" },
];

const GLOSSARY_FARM: GlossaryItem[] = [
  { word: "農家", reading: "のうか", meaning: "fermer xo'jaligi" },
  { word: "育てる", reading: "そだてる", meaning: "o'stirmoq, yetishtirmoq" },
  { word: "釣り", reading: "つり", meaning: "baliq ovi" },
  { word: "ビニールハウス", reading: "—", meaning: "issiqxona (plyonkali)" },
];

const GLOSSARY_BIKE: GlossaryItem[] = [
  { word: "自転車置き場", reading: "じてんしゃおきば", meaning: "velosiped turargohi" },
  { word: "管理人室", reading: "かんりにんしつ", meaning: "uy boshqaruvchisi xonasi" },
  { word: "片付ける", reading: "かたづける", meaning: "olib tashlamoq, yig'ishtirmoq" },
];

const GLOSSARY_DELIVERY: GlossaryItem[] = [
  { word: "不在", reading: "ふざい", meaning: "uyda yo'qlik" },
  { word: "留守", reading: "るす", meaning: "uyda hech kim yo'q" },
  { word: "再配達", reading: "さいはいたつ", meaning: "qayta yetkazib berish" },
  { word: "受付", reading: "うけつけ", meaning: "qabul qilish" },
];

const GLOSSARY_COOKING: GlossaryItem[] = [
  { word: "参加費", reading: "さんかひ", meaning: "ishtirok to'lovi" },
  { word: "材料費", reading: "ざいりょうひ", meaning: "masalliqlar narxi" },
  { word: "定員", reading: "ていいん", meaning: "joylar soni" },
  { word: "先着順", reading: "せんちゃくじゅん", meaning: "kim oldin kelsa" },
];

const GLOSSARY_CLINIC: GlossaryItem[] = [
  { word: "歯科", reading: "しか", meaning: "stomatologiya" },
  { word: "診療時間", reading: "しんりょうじかん", meaning: "qabul vaqti" },
  { word: "休診日", reading: "きゅうしんび", meaning: "qabul bo'lmaydigan kun" },
  { word: "祝日", reading: "しゅくじつ", meaning: "bayram kuni" },
  { word: "優先", reading: "ゆうせん", meaning: "navbatsiz, ustunlik" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions7: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "🧣",
    question: "寒いとき、首に巻きます。これは何ですか。",
    options: ["マフラー", "ネクタイ", "てぶくろ", "ベルト"],
    answer: 0,
    glossary: [{ word: "巻く", reading: "まく", meaning: "o'ramoq" }],
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "✂️",
    question: "紙を切るときに使います。これは何ですか。",
    options: ["のり", "ホッチキス", "はさみ", "ペン"],
    answer: 2,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「からい」と反対の意味のことばはどれですか。",
    options: ["にがい", "すっぱい", "しょっぱい", "あまい"],
    answer: 3,
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "テレビの音が大きいので、少し（　　）ください。",
    options: ["小さくして", "短くして", "低くなって", "弱くなって"],
    answer: 0,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "ここに車を（　　）はいけません。",
    options: ["やめて", "とめて", "しめて", "おりて"],
    answer: 1,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "部屋が暗いので、電気を（　　）。",
    options: ["けしました", "つけました", "いれました", "かけました"],
    answer: 1,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "＿荷物＿をここに置いてください。",
    options: ["かもつ", "にもつ", "にぶつ", "にもの"],
    answer: 1,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿地図＿を見て、店をさがしました。",
    options: ["じず", "ちと", "ちず", "じと"],
    answer: 2,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "明日は＿天気＿がいいでしょう。",
    options: ["でんき", "てんぎ", "てっき", "てんき"],
    answer: 3,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "エレベーターの前に「点検中」と書いてあります。どういう意味ですか。",
    options: [
      "今、エレベーターを調べているので、使えません。",
      "今、エレベーターは無料で使えます。",
      "今、エレベーターはとてもこんでいます。",
      "今、エレベーターは新しくなりました。",
    ],
    answer: 0,
    glossary: [{ word: "調べる", reading: "しらべる", meaning: "tekshirmoq" }],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "＿あさ＿ごはんを食べましたか。",
    options: ["期", "潮", "朝", "胡"],
    answer: 2,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "薬の袋に「食前」と書いてあります。いつ飲みますか。",
    options: [
      "ご飯を食べたあと",
      "寝る前",
      "ご飯を食べながら",
      "ご飯を食べる前",
    ],
    answer: 3,
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "A「田中さんはどこですか。」\nB「今、会議室で会議を（　　）。」",
    options: ["しています", "しました", "します", "していました"],
    answer: 0,
    glossary: [{ word: "会議室", reading: "かいぎしつ", meaning: "majlislar xonasi" }],
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "このかばんは重くて、一人で（　　）。",
    options: ["持ちません", "持てません", "持ってください", "持ちたいです"],
    answer: 1,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "音楽を聞き（　　）、勉強します。",
    options: ["ても", "たら", "ので", "ながら"],
    answer: 3,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "このボタンを（　　）と、お湯が出ます。",
    options: ["おして", "おした", "おす", "おさない"],
    answer: 2,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "先生に名前を（　　）、「はい」と返事をしました。",
    options: ["呼んで", "呼ばれて", "呼ばせて", "呼んだら"],
    answer: 1,
    glossary: [{ word: "返事", reading: "へんじ", meaning: "javob berish" }],
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "ここにごみを（　　）でください。",
    options: ["すてる", "すてて", "すてた", "すてない"],
    answer: 3,
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "店でほしいものを見つけました。店員に値段を聞きます。何と言いますか。",
    options: [
      "これ、いくらですか。",
      "これ、何ですか。",
      "これ、どこですか。",
      "これ、だれのですか。",
    ],
    answer: 0,
    glossary: [{ word: "値段", reading: "ねだん", meaning: "narx" }],
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "仕事が終わりました。先に帰る同僚に何と言いますか。",
    options: [
      "お先に失礼します。",
      "いってきます。",
      "お疲れさまでした。",
      "いただきます。",
    ],
    answer: 2,
    glossary: [{ word: "同僚", reading: "どうりょう", meaning: "hamkasb" }],
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「すみません、ちょっと手伝ってもらえませんか。」\nB「（　　）」",
    options: [
      "ええ、いいですよ。",
      "いいえ、どういたしまして。",
      "はい、手伝ってもらいました。",
      "ええ、おかげさまで。",
    ],
    answer: 0,
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "A「明日の会議、何時からでしたか。」\nB「（　　）」",
    options: [
      "会議室でしますよ。",
      "10時からですよ。",
      "部長が来ますよ。",
      "1時間ぐらいですよ。",
    ],
    answer: 1,
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "電話で、相手の声がよく聞こえません。何と言いますか。",
    options: [
      "もう少し小さい声でお願いします。",
      "もう一度電話を切ってください。",
      "もう少し大きい声でお願いします。",
      "もう少しゆっくり来てください。",
    ],
    answer: 2,
    glossary: [{ word: "相手", reading: "あいて", meaning: "suhbatdosh" }],
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question:
      "A「この仕事、明日までにできますか。」\nB「すみません、明日は（　　）。あさってでもいいですか。」",
    options: [
      "だいじょうぶです",
      "できました",
      "やりましょう",
      "ちょっとむずかしいです",
    ],
    answer: 3,
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "男の人は明日、何を持っていきますか。",
    options: ["飲み物", "お菓子", "お弁当", "シート"],
    answer: 1,
    audio: "/audio/test-7/25.mp3",
    script: [
      { speaker: "F", text: "明日のお花見、何か持ってきてくれますか。" },
      { speaker: "M", text: "いいですよ。じゃあ、飲み物を持っていきましょうか。" },
      {
        speaker: "F",
        text: "飲み物は山田さんが持ってくるので、お菓子をお願いできますか。",
      },
      { speaker: "M", text: "わかりました。" },
    ],
    glossary: [{ word: "お菓子", reading: "おかし", meaning: "shirinlik, pechenye" }],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "女の人は何時の電車に乗りますか。",
    options: ["10時", "10時20分", "10時40分", "11時"],
    answer: 1,
    audio: "/audio/test-7/26.mp3",
    script: [
      { speaker: "F", text: "すみません、空港行きの電車は何時にありますか。" },
      { speaker: "M", text: "10時と、10時20分と、10時40分です。" },
      {
        speaker: "F",
        text: "今、9時58分ですね。10時の電車には間に合わないので、次の電車にします。",
      },
      { speaker: "M", text: "わかりました。2番線ですよ。" },
    ],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "二人は明日、どこで会いますか。",
    options: [
      "駅の改札",
      "駅の前の本屋",
      "本屋の隣のコンビニ",
      "駅の前のバス停",
    ],
    answer: 2,
    audio: "/audio/test-7/27.mp3",
    script: [
      {
        speaker: "M",
        text: "明日、どこで会いましょうか。駅の改札はどうですか。",
      },
      {
        speaker: "F",
        text: "改札は人が多いですから、駅の前の本屋はどうですか。",
      },
      { speaker: "M", text: "でも、あの本屋は10時からですよ。" },
      { speaker: "F", text: "あ、そうですね。じゃあ、本屋の隣のコンビニにしましょう。" },
      { speaker: "M", text: "いいですよ。" },
    ],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "男の人は、新しい仕事の何が大変だと言っていますか。",
    options: [
      "仕事がむずかしいこと",
      "みんながきびしいこと",
      "給料が安いこと",
      "会社が遠いこと",
    ],
    answer: 3,
    audio: "/audio/test-7/28.mp3",
    script: [
      { speaker: "F", text: "新しい仕事はどうですか。" },
      {
        speaker: "M",
        text: "仕事は簡単で、みんな親切です。でも、家から会社まで1時間半かかるんです。それが大変ですね。",
      },
      { speaker: "F", text: "そうですか。それは大変ですね。" },
    ],
    glossary: [{ word: "給料", reading: "きゅうりょう", meaning: "maosh, ish haqi" }],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、次にいつ来ますか。",
    options: ["火曜日の3時", "水曜日の3時", "水曜日の11時", "火曜日の11時"],
    answer: 2,
    audio: "/audio/test-7/29.mp3",
    script: [
      { speaker: "M", text: "次は、来週の火曜日の3時はいかがですか。" },
      { speaker: "F", text: "火曜日は仕事があるので、水曜日はどうですか。" },
      {
        speaker: "M",
        text: "水曜日は午前中だけ空いています。11時はいかがですか。",
      },
      { speaker: "F", text: "はい、11時でお願いします。" },
    ],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、このあと何をしますか。",
    options: [
      "印鑑を買いに行く",
      "紙に書く",
      "家に帰る",
      "在留カードを作る",
    ],
    answer: 1,
    audio: "/audio/test-7/30.mp3",
    script: [
      { speaker: "M", text: "すみません、銀行の口座を作りたいんですが。" },
      { speaker: "F", text: "在留カードと印鑑はお持ちですか。" },
      {
        speaker: "M",
        text: "在留カードはありますが、印鑑は持っていません。",
      },
      {
        speaker: "F",
        text: "印鑑がなくても、サインで大丈夫ですよ。では、この紙に書いてください。",
      },
      { speaker: "M", text: "はい、わかりました。" },
    ],
    glossary: [
      { word: "口座", reading: "こうざ", meaning: "bank hisobi" },
      { word: "印鑑", reading: "いんかん", meaning: "shaxsiy muhr" },
      { word: "在留カード", reading: "ざいりゅうカード", meaning: "yashash kartasi" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、シャツをどうしますか。",
    options: [
      "Mサイズと交換する",
      "Lサイズと交換する",
      "返品する",
      "そのまま着る",
    ],
    answer: 2,
    audio: "/audio/test-7/31.mp3",
    script: [
      {
        speaker: "M",
        text: "すみません、昨日このシャツを買ったんですが、少し小さかったんです。",
      },
      { speaker: "F", text: "では、大きいサイズと交換しましょうか。" },
      { speaker: "M", text: "お願いします。あ、でも、Lサイズは色が違いますね。" },
      { speaker: "F", text: "申し訳ありません。この色は、Mサイズまでなんです。" },
      { speaker: "M", text: "そうですか。じゃあ、返品してもいいですか。" },
      { speaker: "F", text: "はい。レシートはお持ちですか。" },
    ],
    glossary: [
      { word: "交換", reading: "こうかん", meaning: "almashtirish" },
      { word: "返品", reading: "へんぴん", meaning: "tovarni qaytarish" },
    ],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、まず何を出しますか。",
    options: ["保険証", "問診票", "在留カード", "お金"],
    answer: 0,
    audio: "/audio/test-7/32.mp3",
    script: [
      { speaker: "F", text: "すみません、この病院は初めてなんですが。" },
      {
        speaker: "M",
        text: "では、まず保険証を出してください。それから、この問診票に書いてください。",
      },
      { speaker: "F", text: "はい。" },
      { speaker: "M", text: "お金は、帰るときに払ってください。" },
    ],
    glossary: [
      { word: "保険証", reading: "ほけんしょう", meaning: "tibbiy sug'urta kartasi" },
      { word: "問診票", reading: "もんしんひょう", meaning: "bemor so'rovnomasi" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "工場に入るとき、自分で何をつけますか。",
    options: ["手袋とマスク", "帽子とマスク", "帽子と手袋", "めがねとマスク"],
    answer: 1,
    audio: "/audio/test-7/33.mp3",
    script: [
      {
        speaker: "M",
        text: "みなさん、明日から、工場に入るときは、必ず帽子とマスクをつけてください。手袋は、工場の中で渡します。",
      },
    ],
    glossary: [
      { word: "工場", reading: "こうじょう", meaning: "zavod, fabrika" },
      { word: "手袋", reading: "てぶくろ", meaning: "qo'lqop" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "明日の午後の天気はどうですか。",
    options: ["晴れ", "くもり", "雨", "雪"],
    answer: 2,
    audio: "/audio/test-7/34.mp3",
    script: [
      {
        speaker: "F",
        text: "明日の天気です。午前中は晴れますが、午後から雨が降るでしょう。夜は風も強くなります。出かけるときは、かさを持っていってください。",
      },
    ],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "お年寄りの部屋に入る前に、何をしますか。",
    options: [
      "手を洗う",
      "お年寄りに電話する",
      "部屋のそうじをする",
      "ノックをして名前を言う",
    ],
    answer: 3,
    audio: "/audio/test-7/35.mp3",
    script: [
      {
        speaker: "F",
        text: "新しいスタッフのみなさん、お年寄りの部屋に入るときは、必ずノックをして、名前を言ってから入ってください。それから、部屋を出るときは、手を洗ってください。",
      },
    ],
    glossary: [{ word: "お年寄り", reading: "おとしより", meaning: "keksalar" }],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "このバスは、どこへ行きますか。",
    options: ["中央公園", "駅", "市役所", "市民病院"],
    answer: 3,
    audio: "/audio/test-7/36.mp3",
    script: [
      {
        speaker: "M",
        text: "ご乗車ありがとうございます。このバスは、市民病院行きです。次は、中央公園前です。お降りの方は、ボタンを押してください。",
      },
    ],
    glossary: [
      { word: "市民病院", reading: "しみんびょういん", meaning: "shahar kasalxonasi" },
      { word: "市役所", reading: "しやくしょ", meaning: "shahar hokimligi" },
    ],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SHIFT,
    question: "高橋さんは、リーさんに何をお願いしていますか。",
    options: [
      "水曜日に病院へ行くこと",
      "水曜日と木曜日の勤務を交換すること",
      "木曜日に休むこと",
      "5時に電話すること",
    ],
    answer: 1,
    glossary: GLOSSARY_SHIFT,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SHIFT,
    question: "交換できないとき、リーさんはどうしますか。",
    options: [
      "水曜日に休む",
      "木曜日に病院へ行く",
      "何もしない",
      "今日の5時までに高橋さんに言う",
    ],
    answer: 3,
    glossary: GLOSSARY_SHIFT,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_FARM,
    question: "夏、この人は仕事のあとで何をしていますか。",
    options: [
      "釣りや日本語の勉強をしている",
      "野菜を売っている",
      "雪の中で働いている",
      "川で野菜を洗っている",
    ],
    answer: 0,
    glossary: GLOSSARY_FARM,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_FARM,
    question: "冬、この人はどこで働いていますか。",
    options: ["川の近く", "店の中", "ビニールハウスの中", "畑"],
    answer: 2,
    glossary: GLOSSARY_FARM,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_BIKE,
    question: "自転車置き場を使いたい人は、何をしなければなりませんか。",
    options: [
      "管理人室でシールをもらう",
      "新しい自転車を買う",
      "自転車を片付ける",
      "管理人に電話する",
    ],
    answer: 0,
    glossary: GLOSSARY_BIKE,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_BIKE,
    question: "シールは、自転車のどこにはりますか。",
    options: ["前", "後ろ", "かご", "ハンドル"],
    answer: 1,
    glossary: GLOSSARY_BIKE,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_DELIVERY,
    question:
      "アリさんは仕事から帰って、午後6時半に電話しました。今日、荷物を受け取れますか。",
    options: [
      "受け取れます。",
      "受け取れません。",
      "明日の午前中だけ受け取れます。",
      "電話では申し込めません。",
    ],
    answer: 0,
    glossary: GLOSSARY_DELIVERY,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_DELIVERY,
    question:
      "アリさんは明日、午後5時に家に帰ります。何番の時間を選べばいいですか。",
    options: ["①", "②", "③", "④"],
    answer: 3,
    glossary: GLOSSARY_DELIVERY,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_COOKING,
    question: "料理教室に行くとき、何を持っていきますか。",
    options: ["エプロンとタオル", "料理の材料", "お弁当", "はしとさら"],
    answer: 0,
    glossary: GLOSSARY_COOKING,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_COOKING,
    question: "料理教室に2回参加しました。全部でいくら払いましたか。",
    options: ["800円", "1,000円", "1,600円", "2,400円"],
    answer: 2,
    glossary: GLOSSARY_COOKING,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLINIC,
    question: "土曜日の午後3時に、このクリニックに行けますか。",
    options: [
      "行けません。",
      "行けます。",
      "予約すれば行けます。",
      "午後3時から開きます。",
    ],
    answer: 0,
    glossary: GLOSSARY_CLINIC,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CLINIC,
    question:
      "仕事は毎日午後6時に終わります。仕事のあとで行きたいです。何曜日に行けますか。",
    options: ["水曜日", "土曜日", "日曜日", "金曜日"],
    answer: 3,
    glossary: GLOSSARY_CLINIC,
  },
];
