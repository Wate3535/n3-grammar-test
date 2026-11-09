// =========================================================
// JLPT N3 — MOCK TEST 1
//   1. 文字・語彙 — 漢字読み / 表記 / 文脈規定 / 言い換え類義
//   2. 文法       — 文の文法 / 文の組み立て
//   3. 読解       — 内容理解 / 情報検索
//   4. 聴解       — 課題理解 / ポイント理解 / 即時応答
// =========================================================

import type { GlossaryItem, Question } from "@/questions";

export const TEST_N3_1 = {
  name: "模擬テスト 1",
  slug: "n3-1",
};

const PASSAGE_PARKING = `社員のみなさんへ

来月から、会社の駐車場が工事のため使えなくなります。工事は約2か月の予定です。
その間、車で通勤する人は、駅前の市営駐車場を利用してください。料金は会社が払います。
ただし、利用するには、今月25日までに総務課に申し込む必要があります。

総務課`;

const PASSAGE_BOOKS = `最近、スマートフォンで本を読む人が増えている。重い本を持ち歩かなくてもいいし、夜でも明かりをつけずに読めるので、便利だ。
しかし、わたしは今でも紙の本のほうが好きだ。紙の本は、ページをめくる楽しさがあるし、読み終わったあとで本棚に並べると、自分が読んだ本が一目でわかる。
もちろん、スマートフォンの便利さもわかる。だから、旅行のときだけはスマートフォンで読むことにしている。`;

const PASSAGE_PARTY = `国際交流パーティーのお知らせ

日時：10月14日（土）18:00〜20:30
場所：みなと市国際センター 3階ホール
参加費：一般 1,000円／学生 500円（学生証を見せてください）
　　　　※小学生以下は無料
申し込み：10月7日（土）までに、メールで申し込んでください。
※当日、国の料理を一品持ってきてくださった方は、参加費が半額になります。`;

const PASSAGE_MOVING = `さくら引っ越しセンター　料金表

　　　　　　　　　　　　　　　　市内　　　　市外
単身パック（荷物が少ない方）　25,000円　　40,000円
家族パック（2〜3人）　　　　　60,000円　　90,000円

※土・日・祝日は 5,000円プラスになります。
※エアコンの取り外しは 1台 8,000円です。`;

const GLOSSARY_PARKING: GlossaryItem[] = [
  { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "avtoturargoh" },
  { word: "工事", reading: "こうじ", meaning: "qurilish/ta'mir ishlari" },
  { word: "通勤", reading: "つうきん", meaning: "ishga qatnash" },
  { word: "市営", reading: "しえい", meaning: "shahar tasarrufidagi" },
  { word: "総務課", reading: "そうむか", meaning: "ma'muriy bo'lim" },
  { word: "申し込む", reading: "もうしこむ", meaning: "ariza bermoq, yozilmoq" },
];

const GLOSSARY_BOOKS: GlossaryItem[] = [
  { word: "増える", reading: "ふえる", meaning: "ko'paymoq" },
  { word: "持ち歩く", reading: "もちあるく", meaning: "o'zi bilan olib yurmoq" },
  { word: "本棚", reading: "ほんだな", meaning: "kitob javoni" },
  { word: "一目で", reading: "ひとめで", meaning: "bir qarashda" },
];

const GLOSSARY_PARTY: GlossaryItem[] = [
  { word: "国際交流", reading: "こくさいこうりゅう", meaning: "xalqaro almashinuv" },
  { word: "参加費", reading: "さんかひ", meaning: "ishtirok to'lovi" },
  { word: "一般", reading: "いっぱん", meaning: "umumiy (kattalar)" },
  { word: "当日", reading: "とうじつ", meaning: "o'sha kuni" },
  { word: "半額", reading: "はんがく", meaning: "yarim narx" },
];

const GLOSSARY_MOVING: GlossaryItem[] = [
  { word: "単身", reading: "たんしん", meaning: "yolg'iz (bir kishi)" },
  { word: "市外", reading: "しがい", meaning: "shahar tashqarisi" },
  { word: "祝日", reading: "しゅくじつ", meaning: "bayram kuni" },
  { word: "取り外し", reading: "とりはずし", meaning: "yechib olish" },
];

const ORDER = "★に入るものはどれですか。\n";

export const questionsN3_1: Question[] = [
  // -------------------------------------------------------
  // 1. 文字・語彙
  // -------------------------------------------------------
  {
    id: 1,
    section: 1,
    type: "漢字読み",
    question: "工場で新しい＿機械＿を使い始めた。",
    options: ["きかく", "きがい", "きけい", "きかい"],
    answer: 3,
  },
  {
    id: 2,
    section: 1,
    type: "漢字読み",
    question: "駅の＿周辺＿には店が多い。",
    options: ["しゅうべん", "しゅうへん", "しゅへん", "しゅうべ"],
    answer: 1,
  },
  {
    id: 3,
    section: 1,
    type: "漢字読み",
    question: "この問題は＿複雑＿で、すぐには答えられない。",
    options: ["ふくざつ", "ふくさつ", "ふくざい", "ふくせつ"],
    answer: 0,
  },
  {
    id: 4,
    section: 1,
    type: "漢字読み",
    question: "毎月の＿収入＿をノートに書いている。",
    options: ["しゅにゅう", "しゅうにゅ", "しゅうにゅう", "しゅうにう"],
    answer: 2,
  },
  {
    id: 5,
    section: 1,
    type: "表記",
    question: "会議の日を＿へんこう＿しました。",
    options: ["返更", "変校", "変更", "偏更"],
    answer: 2,
  },
  {
    id: 6,
    section: 1,
    type: "表記",
    question: "使ったものは、ちゃんと＿かたづけて＿ください。",
    options: ["片付けて", "方付けて", "片着けて", "方着けて"],
    answer: 0,
  },
  {
    id: 7,
    section: 1,
    type: "表記",
    question: "今年から＿きゅうりょう＿が上がった。",
    options: ["級料", "給量", "級量", "給料"],
    answer: 3,
  },
  {
    id: 8,
    section: 1,
    type: "文脈規定",
    question: "電車が遅れたので、約束の時間に（　　）。",
    options: ["間に合った", "間に合わなかった", "間違えた", "待ち合わせた"],
    answer: 1,
  },
  {
    id: 9,
    section: 1,
    type: "文脈規定",
    question: "夏休みの旅行の（　　）を立てているところです。",
    options: ["予約", "予報", "予習", "計画"],
    answer: 3,
  },
  {
    id: 10,
    section: 1,
    type: "文脈規定",
    question: "この道は夜になると車が（　　）ので、静かだ。",
    options: ["ほとんど通らない", "よく通る", "たくさん通る", "急に増える"],
    answer: 0,
  },
  {
    id: 11,
    section: 1,
    type: "言い換え類義",
    question: "「彼はいつも文句ばかり言っている。」とだいたい同じ意味の文はどれですか。",
    options: [
      "彼はいつも冗談を言っている。",
      "彼はいつも人をほめている。",
      "彼はいつも不満を言っている。",
      "彼はいつもあやまっている。",
    ],
    answer: 2,
  },
  {
    id: 12,
    section: 1,
    type: "言い換え類義",
    question: "「ここでしばらくお待ちください。」とだいたい同じ意味の文はどれですか。",
    options: [
      "ここでずっと待ってください。",
      "ここで少し待ってください。",
      "ここで急いで待ってください。",
      "ここで一人で待ってください。",
    ],
    answer: 1,
  },

  // -------------------------------------------------------
  // 2. 文法
  // -------------------------------------------------------
  {
    id: 13,
    section: 2,
    type: "文の文法",
    question: "雨が降り出した（　　）、試合は続けられた。",
    options: ["ので", "にもかかわらず", "から", "ために"],
    answer: 1,
  },
  {
    id: 14,
    section: 2,
    type: "文の文法",
    question: "この店は値段が安い（　　）、料理もおいしいので、いつも込んでいる。",
    options: ["のに", "ので", "ために", "うえに"],
    answer: 3,
  },
  {
    id: 15,
    section: 2,
    type: "文の文法",
    question: "日本に来て3年になる（　　）、まだ富士山を見たことがない。",
    options: ["のに", "ので", "から", "ため"],
    answer: 0,
  },
  {
    id: 16,
    section: 2,
    type: "文の文法",
    question: "子どもの（　　）、よくこの川で泳いだものだ。",
    options: ["うちに", "あいだ", "ころ", "まえに"],
    answer: 2,
  },
  {
    id: 17,
    section: 2,
    type: "文の文法",
    question: "医者にたばこをやめる（　　）言われた。",
    options: ["ために", "ように", "ことに", "ばかりに"],
    answer: 1,
  },
  {
    id: 18,
    section: 2,
    type: "文の文法",
    question: "この仕事は明日（　　）終わらせなければならない。",
    options: ["までに", "まで", "までで", "までは"],
    answer: 0,
  },
  {
    id: 19,
    section: 2,
    type: "文の文法",
    question: "疲れていたので、電気をつけた（　　）寝てしまった。",
    options: ["ながら", "ばかり", "うちに", "まま"],
    answer: 3,
  },
  {
    id: 20,
    section: 2,
    type: "文の組み立て",
    question: `${ORDER}昨日 ___ ___ _★_ ___ がとてもおもしろかった。`,
    options: ["本", "友だちに", "読んだ", "すすめられて"],
    answer: 2,
  },
  {
    id: 21,
    section: 2,
    type: "文の組み立て",
    question: `${ORDER}わたしは ___ ___ _★_ ___ ことにした。`,
    options: ["公園で", "走る", "来月から", "毎朝"],
    answer: 0,
  },
  {
    id: 22,
    section: 2,
    type: "文の組み立て",
    question: `${ORDER}この料理は ___ ___ _★_ ___ 作れる。`,
    options: ["だれでも", "あれば", "さえ", "材料"],
    answer: 1,
  },

  // -------------------------------------------------------
  // 3. 読解
  // -------------------------------------------------------
  {
    id: 23,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_PARKING,
    question: "車で通勤している人は、まず何をしなければなりませんか。",
    options: [
      "駐車場の料金を払う。",
      "電車で通勤する。",
      "25日までに総務課に申し込む。",
      "工事を手伝う。",
    ],
    answer: 2,
    glossary: GLOSSARY_PARKING,
  },
  {
    id: 24,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_PARKING,
    question: "市営駐車場の料金について、正しいものはどれですか。",
    options: [
      "会社が払う。",
      "自分で払う。",
      "会社と社員が半分ずつ払う。",
      "2か月目から自分で払う。",
    ],
    answer: 0,
    glossary: GLOSSARY_PARKING,
  },
  {
    id: 25,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_BOOKS,
    question: "筆者が紙の本を好きな理由の一つは何ですか。",
    options: [
      "軽くて持ち歩きやすいから",
      "ページをめくるのが楽しいから",
      "夜でも明かりなしで読めるから",
      "値段が安いから",
    ],
    answer: 1,
    glossary: GLOSSARY_BOOKS,
  },
  {
    id: 26,
    section: 3,
    type: "内容理解",
    passage: PASSAGE_BOOKS,
    question: "筆者は、どんなときにスマートフォンで本を読みますか。",
    options: ["夜寝る前", "毎日の通勤", "本棚がいっぱいのとき", "旅行のとき"],
    answer: 3,
    glossary: GLOSSARY_BOOKS,
  },
  {
    id: 27,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_PARTY,
    question:
      "大学生のリーさんは、国の料理を一品持って参加します。参加費はいくらですか。",
    options: ["1,000円", "500円", "無料", "250円"],
    answer: 3,
    glossary: GLOSSARY_PARTY,
  },
  {
    id: 28,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_PARTY,
    question: "パーティーに参加したい人は、どうしなければなりませんか。",
    options: [
      "当日、会場で申し込む。",
      "10月7日までにメールで申し込む。",
      "国際センターに電話で申し込む。",
      "10月14日までに学生証を送る。",
    ],
    answer: 1,
    glossary: GLOSSARY_PARTY,
  },
  {
    id: 29,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_MOVING,
    question: "一人暮らしの人が、平日に市内で引っ越します。料金はいくらですか。",
    options: ["25,000円", "30,000円", "40,000円", "45,000円"],
    answer: 0,
    glossary: GLOSSARY_MOVING,
  },
  {
    id: 30,
    section: 3,
    type: "情報検索",
    passage: PASSAGE_MOVING,
    question:
      "3人家族が日曜日に市外へ引っ越します。エアコンを1台外してもらいます。全部でいくらですか。",
    options: ["95,000円", "98,000円", "103,000円", "108,000円"],
    answer: 2,
    glossary: GLOSSARY_MOVING,
  },

  // -------------------------------------------------------
  // 4. 聴解
  // -------------------------------------------------------
  {
    id: 31,
    section: 4,
    type: "課題理解",
    question: "女の人はこのあとまず何をしますか。",
    options: [
      "資料を印刷する",
      "いすを並べる",
      "会場を予約する",
      "参加者にメールを送る",
    ],
    answer: 3,
    audio: "/audio/n3-1/31.mp3",
    script: [
      { speaker: "M", text: "明日の説明会の準備はどう？" },
      {
        speaker: "F",
        text: "資料はもう印刷しました。これから会場のいすを並べようと思っているんですが。",
      },
      {
        speaker: "M",
        text: "いすは明日の朝でいいよ。それより、参加者に確認のメールを送ってほしいんだ。まだ送ってないでしょう？",
      },
      { speaker: "F", text: "あ、はい。すぐ送ります。" },
    ],
    glossary: [
      { word: "説明会", reading: "せつめいかい", meaning: "tanishtiruv yig'ilishi" },
      { word: "確認", reading: "かくにん", meaning: "tasdiqlash" },
    ],
  },
  {
    id: 32,
    section: 4,
    type: "課題理解",
    question: "男の人は何を買って帰りますか。",
    options: ["かぜ薬と目薬", "かぜ薬とマスク", "マスクと目薬", "かぜ薬だけ"],
    answer: 0,
    audio: "/audio/n3-1/32.mp3",
    script: [
      { speaker: "F", text: "薬局に寄るなら、かぜ薬とマスクを買ってきてくれない？" },
      { speaker: "M", text: "いいよ。でも、マスクはまだ家になかったっけ？" },
      {
        speaker: "F",
        text: "あ、そうだ、昨日買ったんだった。じゃあ、そのかわりに目薬をお願い。",
      },
      { speaker: "M", text: "わかった。" },
    ],
    glossary: [
      { word: "薬局", reading: "やっきょく", meaning: "dorixona" },
      { word: "目薬", reading: "めぐすり", meaning: "ko'z tomchisi" },
    ],
  },
  {
    id: 33,
    section: 4,
    type: "課題理解",
    question: "学生はレポートをどうやって出しますか。",
    options: [
      "紙で先生に出す",
      "メールで送る",
      "大学のホームページから出す",
      "授業のときに出す",
    ],
    answer: 2,
    audio: "/audio/n3-1/33.mp3",
    script: [
      {
        speaker: "M",
        text: "レポートは金曜日までに出してください。先週は紙で出してもらいましたが、今回は大学のホームページから出してください。メールでは受け付けませんので、注意してください。",
      },
    ],
    glossary: [{ word: "受け付ける", reading: "うけつける", meaning: "qabul qilmoq" }],
  },
  {
    id: 34,
    section: 4,
    type: "課題理解",
    question: "男の人は何時の電車に乗りますか。",
    options: ["10時15分", "11時", "10時20分", "12時半"],
    answer: 1,
    audio: "/audio/n3-1/34.mp3",
    script: [
      { speaker: "M", text: "すみません、東京行きの次の特急は何時ですか。" },
      {
        speaker: "F",
        text: "10時15分です。でも、もう席がありません。次の11時の特急なら、席がありますよ。",
      },
      {
        speaker: "M",
        text: "会議が12時半からなので…。普通電車だと、どのくらいかかりますか。",
      },
      { speaker: "F", text: "10時20分発の普通電車で、東京に12時40分に着きます。" },
      { speaker: "M", text: "それだと間に合いませんね。じゃあ、11時の特急でお願いします。" },
    ],
    glossary: [
      { word: "特急", reading: "とっきゅう", meaning: "tezyurar poyezd" },
      { word: "普通電車", reading: "ふつうでんしゃ", meaning: "oddiy poyezd" },
    ],
  },
  {
    id: 35,
    section: 4,
    type: "ポイント理解",
    question: "女の人はどうして新しい会社に行かないことにしましたか。",
    options: [
      "給料が安いから",
      "仕事がつまらなそうだから",
      "海外出張が多いから",
      "会社が遠いから",
    ],
    answer: 2,
    audio: "/audio/n3-1/35.mp3",
    script: [
      { speaker: "M", text: "新しい会社から誘われたって聞いたけど、行かないの？" },
      {
        speaker: "F",
        text: "うん。給料は今よりいいし、仕事もおもしろそうだったんだけど、毎月海外出張があるって言われて。子どもがまだ小さいから、家を長く空けられないのよ。",
      },
      { speaker: "M", text: "そうか。それじゃ、しかたないね。" },
    ],
    glossary: [
      { word: "誘う", reading: "さそう", meaning: "taklif qilmoq" },
      { word: "出張", reading: "しゅっちょう", meaning: "xizmat safari" },
    ],
  },
  {
    id: 36,
    section: 4,
    type: "ポイント理解",
    question: "男の人は、何がいちばんつらかったと言っていますか。",
    options: [
      "長い距離を走ったこと",
      "足が痛くなったこと",
      "道をまちがえたこと",
      "雨で体が冷えたこと",
    ],
    answer: 3,
    audio: "/audio/n3-1/36.mp3",
    script: [
      { speaker: "F", text: "マラソン大会、お疲れさま。どうだった？" },
      {
        speaker: "M",
        text: "走るのは思ったより楽だったんだけど、雨で体が冷えて、それがいちばんつらかったよ。あと、ゴールのあとで足が痛くなった。",
      },
    ],
    glossary: [{ word: "冷える", reading: "ひえる", meaning: "sovqotmoq" }],
  },
  {
    id: 37,
    section: 4,
    type: "ポイント理解",
    question: "店員は、何が問題だと言っていますか。",
    options: [
      "コートが小さいこと",
      "お直しに時間がかかること",
      "お直しができないこと",
      "コートが高いこと",
    ],
    answer: 1,
    audio: "/audio/n3-1/37.mp3",
    script: [
      { speaker: "M", text: "このコート、すそを短くしてもらえますか。" },
      {
        speaker: "F",
        text: "はい。ただ、今お直しが込んでおりまして、お渡しが来週の土曜日になりますが。",
      },
      { speaker: "M", text: "金曜日の旅行に着て行きたいんですが…。" },
      { speaker: "F", text: "申し訳ありません。どうしても間に合わないんです。" },
    ],
    glossary: [{ word: "お直し", reading: "おなおし", meaning: "kiyimni tuzatish (bichish)" }],
  },
  {
    id: 38,
    section: 4,
    type: "即時応答",
    question: "何と答えますか。",
    options: [
      "ええ、どうぞ。お疲れさまでした。",
      "はい、帰らせました。",
      "いいえ、どういたしまして。",
      "ええ、先にいただきます。",
    ],
    answer: 0,
    audio: "/audio/n3-1/38.mp3",
    script: [
      { speaker: "F", text: "今日は先に帰らせていただいてもよろしいでしょうか。" },
    ],
  },
  {
    id: 39,
    section: 4,
    type: "即時応答",
    question: "何と答えますか。",
    options: [
      "はい、通りました。",
      "明日見てもいいですよ。",
      "はい、それは目です。",
      "わかりました。今日中に読んでおきます。",
    ],
    answer: 3,
    audio: "/audio/n3-1/39.mp3",
    script: [{ speaker: "M", text: "この書類、明日までに目を通しておいてもらえる？" }],
  },
  {
    id: 40,
    section: 4,
    type: "即時応答",
    question: "何と答えますか。",
    options: [
      "いえいえ、どういたしまして。",
      "うん、また留守にしてね。",
      "ううん、こっちこそ急に来てごめん。",
      "そう、来なくてよかった。",
    ],
    answer: 2,
    audio: "/audio/n3-1/40.mp3",
    script: [{ speaker: "F", text: "せっかく来てくれたのに、留守にしていてごめんね。" }],
  },
];
