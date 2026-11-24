import type { GlossaryItem, Question } from "@/questions";

export const TEST_12 = {
  name: "模擬テスト 12",
  slug: "test-12",
};

// =========================================================
// READING PASSAGES
// =========================================================

const PASSAGE_NOTE = `サラさんへ

今日、わたしは友だちの家に泊まるので、帰りません。
台所にカレーがあるので、晩ごはんに食べてください。
それから、あしたは燃えるごみの日です。朝、ごみを出してくれませんか。
よろしくお願いします。

ユキ`;

const PASSAGE_SUSHI = `わたしはネパールから来て、すし屋で働いています。仕事は、魚を切ったり、お皿を洗ったりすることです。
はじめは、生の魚を食べたことがなかったので、少しこわかったです。でも、店長が作ったすしを食べてみたら、とてもおいしかったです。
今は、休みの日に家ですしを作る練習をしています。いつか、自分の国ですしの店を開きたいです。`;

const PASSAGE_DRILL = `みどり町のみなさんへ

9月1日（日）の午前10時から、防災訓練をします。
集まる場所は、みどり小学校の校庭です。
消火器の使い方や、地震のときに気をつけることを練習します。
参加した人には、水を1本プレゼントします。
雨の場合は、体育館で行います。

みどり町内会`;

const PASSAGE_PARKING = `さくら駅前駐車場

料金：最初の1時間　　　　300円
　　　そのあと30分ごとに　100円
・1日の最大料金　1,200円
・お店で2,000円以上買い物をした人は、2時間無料です。`;

const PASSAGE_MOBILE = `さくらモバイル　料金プラン（1か月）

プラン　　データ　　　料金
S　　　　 3GB　　　 1,500円
M　　　　 10GB　　　2,500円
L　　　　 30GB　　　3,800円

・学生は、どのプランも 500円安くなります。
・家族で2人以上入ると、一人 300円安くなります。`;

const PASSAGE_MUSEUM = `みどり市美術館

開館時間：9:30〜17:00（入館は 16:30まで）
休館日：月曜日（月曜日が祝日のときは、火曜日）
入館料：大人 600円　大学生 400円　高校生以下 無料
※毎月第3日曜日は、だれでも無料です。`;

// =========================================================
// PASSAGE GLOSSARIES — matndagi N3 kanjilar
// =========================================================

const GLOSSARY_NOTE: GlossaryItem[] = [
  { word: "泊まる", reading: "とまる", meaning: "tunab qolmoq" },
  { word: "台所", reading: "だいどころ", meaning: "oshxona" },
  { word: "燃えるごみ", reading: "もえるごみ", meaning: "yonadigan chiqindi" },
];

const GLOSSARY_SUSHI: GlossaryItem[] = [
  { word: "生", reading: "なま", meaning: "xom" },
  { word: "店長", reading: "てんちょう", meaning: "do'kon mudiri" },
  { word: "練習", reading: "れんしゅう", meaning: "mashq" },
  { word: "開く", reading: "ひらく", meaning: "ochmoq (do'kon)" },
];

const GLOSSARY_DRILL: GlossaryItem[] = [
  { word: "防災訓練", reading: "ぼうさいくんれん", meaning: "favqulodda holat mashqi" },
  { word: "校庭", reading: "こうてい", meaning: "maktab hovlisi" },
  { word: "消火器", reading: "しょうかき", meaning: "o't o'chirgich" },
  { word: "地震", reading: "じしん", meaning: "zilzila" },
  { word: "体育館", reading: "たいいくかん", meaning: "sport zali" },
];

const GLOSSARY_PARKING: GlossaryItem[] = [
  { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "avtoturargoh" },
  { word: "最大", reading: "さいだい", meaning: "eng ko'p" },
  { word: "以上", reading: "いじょう", meaning: "va undan ko'p" },
  { word: "無料", reading: "むりょう", meaning: "bepul" },
];

const GLOSSARY_MOBILE: GlossaryItem[] = [
  { word: "料金", reading: "りょうきん", meaning: "narx, to'lov" },
  { word: "家族", reading: "かぞく", meaning: "oila" },
];

const GLOSSARY_MUSEUM: GlossaryItem[] = [
  { word: "美術館", reading: "びじゅつかん", meaning: "san'at muzeyi" },
  { word: "開館", reading: "かいかん", meaning: "ochilish (ish vaqti)" },
  { word: "入館", reading: "にゅうかん", meaning: "kirish" },
  { word: "休館日", reading: "きゅうかんび", meaning: "dam olish kuni" },
  { word: "祝日", reading: "しゅくじつ", meaning: "bayram kuni" },
];

// =========================================================
// QUESTIONS
// =========================================================

export const questions12: Question[] = [
  // -------------------------------------------------------
  // 1. 文字と語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "👓",
    question: "目がよく見えないとき、かけます。これは何ですか。",
    options: ["めがね", "マスク", "ぼうし", "とけい"],
    answer: 0,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🗑️",
    question: "いらないものをすてるときに使います。これは何ですか。",
    options: ["たな", "はこ", "ごみばこ", "かばん"],
    answer: 2,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「つよい」と反対の意味のことばはどれですか。",
    options: ["ひくい", "おもい", "ほそい", "よわい"],
    answer: 3,
    glossary: [{ word: "反対", reading: "はんたい", meaning: "qarama-qarshi" }],
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "手紙に切手を（　　）、ポストに入れました。",
    options: ["かけて", "はって", "おいて", "いれて"],
    answer: 1,
    glossary: [{ word: "切手", reading: "きって", meaning: "marka" }],
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "毎晩、11時ごろ（　　）。",
    options: ["おきます", "ねます", "でかけます", "つきます"],
    answer: 1,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "あついので、エアコンの温度を少し（　　）ください。",
    options: ["あけて", "しめて", "つけて", "さげて"],
    answer: 3,
    glossary: [{ word: "温度", reading: "おんど", meaning: "harorat" }],
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "＿今年＿の夏は、とてもあつかったです。",
    options: ["こんねん", "いまとし", "ことし", "こねん"],
    answer: 2,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "＿父＿は会社員です。",
    options: ["ちち", "はは", "あに", "あね"],
    answer: 0,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "この＿道＿をまっすぐ行ってください。",
    options: ["まち", "かど", "みち", "はし"],
    answer: 2,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "ドアに「関係者以外立入禁止」と書いてあります。どういう意味ですか。",
    options: [
      "そこで働いている人しか入れません。",
      "だれでも入れます。",
      "入る前にお金を払います。",
      "今日は休みです。",
    ],
    answer: 0,
    glossary: [
      { word: "関係者", reading: "かんけいしゃ", meaning: "aloqador shaxslar (xodimlar)" },
      { word: "以外", reading: "いがい", meaning: "...dan boshqa" },
      { word: "立入禁止", reading: "たちいりきんし", meaning: "kirish taqiqlangan" },
    ],
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "わたしは＿にほん＿のアニメがすきです。",
    options: ["日木", "日本", "目本", "白本"],
    answer: 1,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "コンビニの前に「24時間営業」と書いてあります。どういう意味ですか。",
    options: [
      "24時から開きます。",
      "24時に閉まります。",
      "24日は休みです。",
      "いつでも開いています。",
    ],
    answer: 3,
    glossary: [{ word: "営業", reading: "えいぎょう", meaning: "ish vaqti (ochiq)" }],
  },

  // -------------------------------------------------------
  // 2. 会話と表現
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "日本語が上手になる（　　）、毎日練習しています。",
    options: ["のに", "から", "ので", "ように"],
    answer: 3,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "わたしの趣味は、写真を（　　）ことです。",
    options: ["とって", "とる", "とった", "とり"],
    answer: 1,
    glossary: [{ word: "趣味", reading: "しゅみ", meaning: "qiziqish, xobbi" }],
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "雪が（　　）、電車がおくれました。",
    options: ["降ったので", "降っても", "降るのに", "降りながら"],
    answer: 0,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "先生に「あしたまでにレポートを出し（　　）」と言われました。",
    options: ["ませんか", "ましょう", "なさい", "ています"],
    answer: 2,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "この料理はやわらかいので、子どもでも（　　）やすいです。",
    options: ["食べる", "食べて", "食べ", "食べた"],
    answer: 2,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "電車の中で、電話で話しては（　　）。",
    options: ["いけません", "いいです", "ください", "あります"],
    answer: 0,
  },
  {
    id: 19,
    section: 2,
    type: "表現",
    question: "お客さんが店に入ってきました。店員は何と言いますか。",
    options: ["ありがとうございました。", "いらっしゃいませ。", "しつれいします。", "おじゃまします。"],
    answer: 1,
  },
  {
    id: 20,
    section: 2,
    type: "表現",
    question: "A「すみません、写真をとっていただけませんか。」\nB「（　　）」",
    options: [
      "はい、とりました。",
      "いいえ、写真です。",
      "とってください。",
      "いいですよ。ここを押せばいいですか。",
    ],
    answer: 3,
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「その荷物、重そうですね。一つ持ちましょうか。」\nB「（　　）」",
    options: [
      "はい、持ちました。",
      "いいえ、どういたしまして。",
      "ありがとうございます。助かります。",
      "荷物を持ってください。",
    ],
    answer: 2,
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "会社で、上司に書類をわたします。何と言いますか。",
    options: [
      "こちら、お願いします。",
      "いただきます。",
      "おかえりなさい。",
      "どうぞ、おだいじに。",
    ],
    answer: 0,
    glossary: [
      { word: "上司", reading: "じょうし", meaning: "boshliq" },
      { word: "書類", reading: "しょるい", meaning: "hujjat" },
    ],
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "A「日本語、上手ですね。」\nB「（　　）」",
    options: ["はい、上手です。", "どういたしまして。", "上手ですね。", "いいえ、まだまだです。"],
    answer: 3,
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "初めて会った人に、何と言いますか。",
    options: [
      "おひさしぶりです。",
      "はじめまして。どうぞよろしく。",
      "またね。",
      "おやすみなさい。",
    ],
    answer: 1,
  },

  // -------------------------------------------------------
  // 3. 聴解
  // -------------------------------------------------------
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "男の人は、昼ごはんに何を食べますか。",
    options: ["ラーメン", "うどん", "カレー", "そば"],
    answer: 2,
    audio: "/audio/test-12/25.mp3",
    script: [
      { speaker: "F", text: "お昼、何にしますか。" },
      { speaker: "M", text: "ラーメンが食べたかったんですが、きのうも食べたので…。今日はカレーにします。" },
      { speaker: "F", text: "わたしはうどんにします。" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "女の人は、今日何時ごろ家に帰りますか。",
    options: ["8時ごろ", "6時ごろ", "7時ごろ", "9時ごろ"],
    answer: 0,
    audio: "/audio/test-12/26.mp3",
    script: [
      { speaker: "M", text: "今日は何時ごろ帰りますか。" },
      { speaker: "F", text: "いつもは6時ですが、今日は残業があるので、8時ごろになると思います。" },
      { speaker: "M", text: "そうですか。気をつけて。" },
    ],
    glossary: [{ word: "残業", reading: "ざんぎょう", meaning: "qo'shimcha ish" }],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "男の人の今の趣味は何ですか。",
    options: ["サッカー", "料理", "映画", "つり"],
    answer: 1,
    audio: "/audio/test-12/27.mp3",
    script: [
      { speaker: "F", text: "趣味は何ですか。" },
      { speaker: "M", text: "前はサッカーでしたが、けがをしてからは、料理です。週末によくパンを焼きます。" },
      { speaker: "F", text: "へえ、すごいですね。" },
    ],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "男の人は、何を手伝いますか。",
    options: ["服を箱に入れる", "箱を買いに行く", "部屋をそうじする", "本を箱に入れる"],
    answer: 3,
    audio: "/audio/test-12/28.mp3",
    script: [
      { speaker: "F", text: "引っ越しの準備、手伝ってくれる？" },
      { speaker: "M", text: "いいよ。何をすればいい？" },
      { speaker: "F", text: "本を箱に入れてほしいの。服はもう入れたから。" },
      { speaker: "M", text: "わかった。" },
    ],
    glossary: [{ word: "準備", reading: "じゅんび", meaning: "tayyorgarlik" }],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、何を買いましたか。",
    options: ["パン2つとケーキ1つ", "ケーキだけ", "パン1つ", "パン2つ"],
    answer: 3,
    audio: "/audio/test-12/29.mp3",
    script: [
      { speaker: "F", text: "このパンを2つと、そのケーキを1つください。" },
      { speaker: "M", text: "すみません、そのケーキは予約のお客様のものなんです。" },
      { speaker: "F", text: "そうですか。じゃあ、パンだけでいいです。" },
    ],
    glossary: [{ word: "予約", reading: "よやく", meaning: "oldindan buyurtma" }],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、どこでタクシーを降りますか。",
    options: ["さくら病院の前", "病院の手前のコンビニ", "駅", "病院の後ろ"],
    answer: 1,
    audio: "/audio/test-12/30.mp3",
    script: [
      { speaker: "M", text: "さくら病院までお願いします。" },
      { speaker: "F", text: "さくら病院ですね。" },
      { speaker: "M", text: "あ、すみません。病院の手前のコンビニで降ります。" },
      { speaker: "F", text: "わかりました。" },
    ],
    glossary: [{ word: "手前", reading: "てまえ", meaning: "oldida, yetmasdan" }],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は、どの部屋を予約しますか。",
    options: ["禁煙のシングル", "喫煙のシングル", "禁煙のツイン", "喫煙のツイン"],
    answer: 0,
    audio: "/audio/test-12/31.mp3",
    script: [
      { speaker: "M", text: "お部屋は、ツインとシングルがございます。" },
      { speaker: "F", text: "一人なので、シングルでお願いします。たばこは吸いません。" },
      { speaker: "M", text: "では、禁煙のシングルですね。" },
    ],
    glossary: [
      { word: "禁煙", reading: "きんえん", meaning: "chekish taqiqlangan" },
      { word: "喫煙", reading: "きつえん", meaning: "chekish mumkin" },
    ],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は、何で払いますか。",
    options: ["現金", "カード", "スマホ", "払わない"],
    answer: 2,
    audio: "/audio/test-12/32.mp3",
    script: [
      { speaker: "F", text: "お支払いは、現金ですか、カードですか。" },
      { speaker: "M", text: "カードで…あ、カードを忘れました。スマホで払えますか。" },
      { speaker: "F", text: "はい、できますよ。" },
    ],
    glossary: [
      { word: "支払い", reading: "しはらい", meaning: "to'lov" },
      { word: "現金", reading: "げんきん", meaning: "naqd pul" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "マラソン大会は、どうなりましたか。",
    options: ["中止になった", "来週の日曜日になった", "時間が変わった", "場所が変わった"],
    answer: 1,
    audio: "/audio/test-12/33.mp3",
    script: [
      {
        speaker: "M",
        text: "あしたのマラソン大会ですが、雪のため、来週の日曜日に変更になりました。時間と場所は同じです。",
      },
    ],
    glossary: [
      { word: "大会", reading: "たいかい", meaning: "musobaqa" },
      { word: "変更", reading: "へんこう", meaning: "o'zgartirish" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "映画が始まる前に、何をしなければなりませんか。",
    options: ["飲み物を買う", "写真をとる", "携帯電話の電源を切る", "前の席にすわる"],
    answer: 2,
    audio: "/audio/test-12/34.mp3",
    script: [
      {
        speaker: "F",
        text: "本日はご来場ありがとうございます。まもなく映画が始まります。携帯電話の電源をお切りください。映画の間、写真をとることはできません。",
      },
    ],
    glossary: [
      { word: "携帯電話", reading: "けいたいでんわ", meaning: "mobil telefon" },
      { word: "電源を切る", reading: "でんげんをきる", meaning: "o'chirib qo'ymoq" },
    ],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "さいふは、どこに取りに行きますか。",
    options: ["2階のトイレ", "2階の案内所", "1階のトイレ", "1階の案内所"],
    answer: 3,
    audio: "/audio/test-12/35.mp3",
    script: [
      {
        speaker: "M",
        text: "お客様にお知らせいたします。2階のトイレで、黒いさいふのお忘れ物がありました。お心当たりのお客様は、1階の案内所までお越しください。",
      },
    ],
    glossary: [
      { word: "忘れ物", reading: "わすれもの", meaning: "unutilgan narsa" },
      { word: "案内所", reading: "あんないじょ", meaning: "ma'lumot bo'limi" },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "あした、何を持ってきますか。",
    options: ["水筒とタオル", "ごみ袋と手袋", "お弁当", "ごみ袋とタオル"],
    answer: 0,
    audio: "/audio/test-12/36.mp3",
    script: [
      {
        speaker: "M",
        text: "あしたは、公園でごみ拾いをします。ごみ袋と手袋は、学校で用意します。水筒とタオルを持ってきてください。",
      },
    ],
    glossary: [
      { word: "ごみ拾い", reading: "ごみひろい", meaning: "axlat terish" },
      { word: "手袋", reading: "てぶくろ", meaning: "qo'lqop" },
      { word: "水筒", reading: "すいとう", meaning: "suv idishi (flyaga)" },
    ],
  },

  // -------------------------------------------------------
  // 4. 読解
  // -------------------------------------------------------
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_NOTE,
    question: "ユキさんは、今日どうしますか。",
    options: [
      "家で晩ごはんを作る",
      "友だちの家に泊まる",
      "ごみを出す",
      "サラさんとカレーを食べる",
    ],
    answer: 1,
    glossary: GLOSSARY_NOTE,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_NOTE,
    question: "ユキさんは、サラさんに何をお願いしていますか。",
    options: [
      "カレーを作ること",
      "友だちの家に行くこと",
      "台所をそうじすること",
      "あしたの朝、ごみを出すこと",
    ],
    answer: 3,
    glossary: GLOSSARY_NOTE,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SUSHI,
    question: "この人は、どうしてはじめ生の魚がこわかったですか。",
    options: [
      "食べたことがなかったから",
      "魚がきらいだったから",
      "店長がきびしかったから",
      "魚を切るのがむずかしかったから",
    ],
    answer: 0,
    glossary: GLOSSARY_SUSHI,
  },
  {
    id: 40,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_SUSHI,
    question: "この人の夢は何ですか。",
    options: [
      "日本ですし屋の店長になること",
      "魚を切る仕事をすること",
      "自分の国ですしの店を開くこと",
      "ネパール料理を作ること",
    ],
    answer: 2,
    glossary: GLOSSARY_SUSHI,
  },
  {
    id: 41,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_DRILL,
    question: "雨が降ったら、防災訓練はどこでしますか。",
    options: ["校庭", "町内会の事務所", "公園", "体育館"],
    answer: 3,
    glossary: GLOSSARY_DRILL,
  },
  {
    id: 42,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_DRILL,
    question: "防災訓練では、何をしますか。",
    options: [
      "消火器の使い方を練習する",
      "水を買う",
      "小学校をそうじする",
      "地震の映画を見る",
    ],
    answer: 0,
    glossary: GLOSSARY_DRILL,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_PARKING,
    question: "車を2時間とめました。買い物はしていません。いくらですか。",
    options: ["300円", "400円", "500円", "600円"],
    answer: 2,
    glossary: GLOSSARY_PARKING,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_PARKING,
    question: "お店で3,000円買い物をして、車を2時間とめました。いくらですか。",
    options: ["300円", "0円", "500円", "1,200円"],
    answer: 1,
    glossary: GLOSSARY_PARKING,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_MOBILE,
    question: "学生が一人で、10GBのプランに入ります。1か月いくらですか。",
    options: ["2,000円", "2,500円", "2,200円", "3,000円"],
    answer: 0,
    glossary: GLOSSARY_MOBILE,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_MOBILE,
    question: "毎月、データを20GBぐらい使います。どのプランがいいですか。",
    options: ["S", "M", "SとM", "L"],
    answer: 3,
    glossary: GLOSSARY_MOBILE,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_MUSEUM,
    question: "月曜日が祝日のとき、美術館は何曜日が休みですか。",
    options: ["月曜日", "日曜日", "火曜日", "水曜日"],
    answer: 2,
    glossary: GLOSSARY_MUSEUM,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_MUSEUM,
    question: "美術館に入れるのは、何時までですか。",
    options: ["16時", "16時半", "17時", "17時半"],
    answer: 1,
    glossary: GLOSSARY_MUSEUM,
  },
];
