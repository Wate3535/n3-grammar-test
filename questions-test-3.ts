import type { Question } from "@/questions";

export const TEST_3 = {
  name: "模擬テスト 3",
  slug: "test-3",
};

const PASSAGE_MESSAGE = `サトウさんへ

明日の朝、会社の会議があります。いつものバスは工事のため、駅の前を通りません。
7時45分のバスに乗って、市役所の前で降りてください。そこから会社まで歩いて10分です。
会議は9時に始まります。遅れないでください。

田中`;

const PASSAGE_CENTER = `みなみ町健康センターのお知らせ

利用時間：午前9時〜午後6時
休み：毎週水曜日

・初めて利用する人は、受付で名前と住所を書いてください。
・運動する人は、運動しやすい服と室内用のくつを持ってきてください。
・プールは午後5時までです。`;

const PASSAGE_CAFE = `カフェさくら　メニュー

コーヒー …………… 300円
紅茶 ………………… 280円
サンドイッチ ……… 450円
カレーライス ……… 650円
ケーキセット ……… 600円

※午後2時から午後5時まで、飲み物とケーキのセットは100円引きです。
※月曜日は休みです。`;

const PASSAGE_SCHOOL = `日本語学校の遠足のお知らせ

日にち：10月12日（土）
集合時間：午前8時30分
集合場所：学校の入口
行き先：海の近くの水族館

お昼ごはんは学校で用意します。飲み物は自分で持ってきてください。
雨のときも行きます。帰りは午後4時ごろです。`;

export const questions3: Question[] = [
  // 1. 文字と語彙
  {
    id: 1,
    section: 1,
    type: "語の意味",
    image: "🍱",
    question: "これは何ですか。",
    options: ["べんとう", "さら", "コップ", "はし"],
    answer: 0,
  },
  {
    id: 2,
    section: 1,
    type: "語の意味",
    image: "🔑",
    question: "これは何ですか。",
    options: ["さいふ", "かぎ", "かさ", "とけい"],
    answer: 1,
  },
  {
    id: 3,
    section: 1,
    type: "語の意味",
    question: "「便利」と反対の意味のことばはどれですか。",
    options: ["安全", "有名", "不便", "簡単"],
    answer: 2,
  },
  {
    id: 4,
    section: 1,
    type: "語の使い方",
    question: "信号が青になってから、道を（　　）ください。",
    options: ["わたって", "まがって", "おりて", "のぼって"],
    answer: 0,
  },
  {
    id: 5,
    section: 1,
    type: "語の使い方",
    question: "熱があるので、今日は会社を（　　）ことにしました。",
    options: ["つづける", "やすむ", "あつめる", "はじめる"],
    answer: 1,
  },
  {
    id: 6,
    section: 1,
    type: "語の使い方",
    question: "レストランに電話して、土曜日の席を（　　）。",
    options: ["しょうかいしました", "しゅっせきしました", "よやくしました", "せつめいしました"],
    answer: 2,
  },
  {
    id: 7,
    section: 1,
    type: "漢字の読み",
    question: "＿住所＿を書いてください。",
    options: ["じゅしょう", "じゅうしょ", "じゅしょ", "じゅうしょう"],
    answer: 1,
  },
  {
    id: 8,
    section: 1,
    type: "漢字の読み",
    question: "来年、家族と＿旅行＿します。",
    options: ["りょこう", "りょうこう", "りょこ", "りょうこ"],
    answer: 0,
  },
  {
    id: 9,
    section: 1,
    type: "漢字の読み",
    question: "この店は＿午前＿10時に開きます。",
    options: ["ごぜん", "ごご", "ごせん", "こぜん"],
    answer: 0,
  },
  {
    id: 10,
    section: 1,
    type: "漢字の意味と使い方",
    question: "公園の入口に「自転車禁止」と書いてあります。どういう意味ですか。",
    options: [
      "自転車をここに置いてください。",
      "自転車に乗って入ってはいけません。",
      "自転車を借りることができます。",
      "自転車をゆっくり走らせてください。",
    ],
    answer: 1,
  },
  {
    id: 11,
    section: 1,
    type: "漢字の意味と使い方",
    question: "「きょう」の正しい漢字はどれですか。",
    options: ["今週", "今日", "今年", "今月"],
    answer: 1,
  },
  {
    id: 12,
    section: 1,
    type: "漢字の意味と使い方",
    question: "天気予報に「雨天中止」とあります。どういう意味ですか。",
    options: [
      "雨が降っても、予定どおりします。",
      "雨が降ったら、時間を早くします。",
      "雨が降ったら、ありません。",
      "雨が降ったら、場所を変えます。",
    ],
    answer: 2,
  },

  // 2. 会話と表現
  {
    id: 13,
    section: 2,
    type: "文法",
    question: "A「宿題はもう終わりましたか。」\nB「いいえ、まだ（　　）。」",
    options: ["終わります", "終わっていません", "終わりました", "終わっています"],
    answer: 1,
  },
  {
    id: 14,
    section: 2,
    type: "文法",
    question: "ここで写真を（　　）もいいですか。",
    options: ["撮る", "撮った", "撮って", "撮り"],
    answer: 2,
  },
  {
    id: 15,
    section: 2,
    type: "文法",
    question: "毎日練習したので、少しずつ日本語が（　　）なりました。",
    options: ["上手に", "上手で", "上手な", "上手くて"],
    answer: 0,
  },
  {
    id: 16,
    section: 2,
    type: "文法",
    question: "ご飯を（　　）から、薬を飲んでください。",
    options: ["食べる", "食べて", "食べた", "食べ"],
    answer: 1,
  },
  {
    id: 17,
    section: 2,
    type: "文法",
    question: "かぜをひいたので、今日は早く帰った（　　）いいです。",
    options: ["ほうが", "のが", "ことが", "ために"],
    answer: 0,
  },
  {
    id: 18,
    section: 2,
    type: "文法",
    question: "あした友だちに会う（　　）です。",
    options: ["つもり", "ところ", "予定", "はず"],
    answer: 2,
  },
  {
    id: 19,
    section: 2,
    type: "文法",
    question: "天気が（　　）、サッカーの試合をします。",
    options: ["悪いから", "悪くても", "悪いので", "悪かったら"],
    answer: 1,
  },
  {
    id: 20,
    section: 2,
    type: "文法",
    question: "出かける前に、窓を（　　）ください。",
    options: ["閉めて", "閉める", "閉めた", "閉め"],
    answer: 0,
  },
  {
    id: 21,
    section: 2,
    type: "表現",
    question: "A「このケーキ、おいしいですね。だれが作ったんですか。」\nB「（　　）」",
    options: ["友だちが作りました。", "友だちに作りました。", "友だちを作りました。", "友だちで作りました。"],
    answer: 0,
  },
  {
    id: 22,
    section: 2,
    type: "表現",
    question: "A「すみません、駅へ行きたいんですが。」\nB「（　　）」",
    options: [
      "駅は昨日休みでした。",
      "この道をまっすぐ行ってください。",
      "駅で友だちに会いました。",
      "駅まで何分かかりましたか。",
    ],
    answer: 1,
  },
  {
    id: 23,
    section: 2,
    type: "表現",
    question: "A「もう昼ごはんを食べましたか。」\nB「いいえ、まだです。（　　）」",
    options: [
      "おなかがいっぱいです。",
      "おなかがすいています。",
      "のどがかわいていません。",
      "ねむくありません。",
    ],
    answer: 1,
  },
  {
    id: 24,
    section: 2,
    type: "表現",
    question: "友だちから電話がありましたが、出られませんでした。あとで友だちに会ったとき、何と言いますか。",
    options: [
      "昨日は電話に出られなくて、すみませんでした。",
      "昨日は電話をかけて、ありがとうございました。",
      "昨日は電話を買って、すみませんでした。",
      "昨日は電話を切って、お願いします。",
    ],
    answer: 0,
  },

  // 3. 聴解
  {
    id: 25,
    section: 3,
    type: "会話",
    question: "女の人は店で何を買いますか。",
    options: ["かさ", "ぼうし", "くつ", "かばん"],
    answer: 0,
    script: [
      { speaker: "M", text: "その帽子、買うんですか。" },
      { speaker: "F", text: "いいえ、今日は雨が降りそうですから、傘を買います。" },
      { speaker: "M", text: "そうですか。気をつけて帰ってください。" },
    ],
  },
  {
    id: 26,
    section: 3,
    type: "会話",
    question: "二人は何時に駅で会いますか。",
    options: ["6時", "6時半", "7時", "7時半"],
    answer: 1,
    script: [
      { speaker: "F", text: "明日の映画、何時に始まりますか。" },
      { speaker: "M", text: "7時です。駅で会ってから行きましょう。" },
      { speaker: "F", text: "じゃあ、6時半に駅の前で会いましょう。" },
      { speaker: "M", text: "はい、わかりました。" },
    ],
  },
  {
    id: 27,
    section: 3,
    type: "会話",
    question: "男の人はいつ会社を出ますか。",
    options: ["今日の午後", "明日の朝", "明日の午後", "今日の朝"],
    answer: 2,
    script: [
      { speaker: "F", text: "明日の出張は何時に出ますか。" },
      { speaker: "M", text: "朝は会議があるので、午後2時ごろ会社を出ます。" },
      { speaker: "F", text: "駅まで車で行きますか。" },
      { speaker: "M", text: "いいえ、電車で行きます。" },
    ],
  },
  {
    id: 28,
    section: 3,
    type: "会話",
    question: "女の人はどうして遅れましたか。",
    options: ["バスが来なかったから", "道に迷ったから", "電車が遅れたから", "寝坊したから"],
    answer: 2,
    script: [
      { speaker: "M", text: "遅かったですね。何かありましたか。" },
      { speaker: "F", text: "すみません。電車が駅と駅の間で止まってしまったんです。" },
      { speaker: "M", text: "それは大変でしたね。" },
      { speaker: "F", text: "はい、20分ぐらい待ちました。" },
    ],
  },
  {
    id: 29,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は何を注文しますか。",
    options: ["コーヒーとケーキ", "紅茶とサンドイッチ", "コーヒーとサンドイッチ", "紅茶とケーキ"],
    answer: 3,
    script: [
      { speaker: "F", text: "ご注文はお決まりですか。" },
      { speaker: "M", text: "紅茶とケーキをお願いします。" },
      { speaker: "F", text: "ケーキセットですね。ありがとうございます。" },
    ],
  },
  {
    id: 30,
    section: 3,
    type: "店・公共の場所での会話",
    question: "男の人は何時に朝ごはんを食べますか。",
    options: ["6時", "6時半", "7時", "7時半"],
    answer: 2,
    script: [
      { speaker: "M", text: "朝ごはんは何時からですか。" },
      { speaker: "F", text: "6時半から9時までです。" },
      { speaker: "M", text: "では、7時に食べに行きます。" },
      { speaker: "F", text: "レストランは1階です。" },
    ],
  },
  {
    id: 31,
    section: 3,
    type: "店・公共の場所での会話",
    question: "女の人は忘れ物をどこで受け取りますか。",
    options: ["駅の事務室", "ホテルの入口", "バスの中", "警察署"],
    answer: 0,
    script: [
      { speaker: "F", text: "電車にかばんを忘れてしまいました。" },
      { speaker: "M", text: "どの電車に乗りましたか。" },
      { speaker: "F", text: "3時に駅を出た電車です。" },
      { speaker: "M", text: "かばんは駅の事務室に届いています。そこで受け取ってください。" },
    ],
  },
  {
    id: 32,
    section: 3,
    type: "店・公共の場所での会話",
    question: "何人で予約しましたか。",
    options: ["2人", "3人", "4人", "5人"],
    answer: 2,
    script: [
      { speaker: "F", text: "お電話ありがとうございます。何名様ですか。" },
      { speaker: "M", text: "はじめは3人でしたが、友だちが一人来ることになりました。" },
      { speaker: "F", text: "では、4名様でご用意します。" },
      { speaker: "M", text: "お願いします。" },
    ],
  },
  {
    id: 33,
    section: 3,
    type: "アナウンス・指示",
    question: "次の電車は何番線から出ますか。",
    options: ["1番線", "2番線", "3番線", "4番線"],
    answer: 2,
    script: [
      { speaker: "F", text: "お客様にお知らせします。東京行きの電車は、事故のため3番線から出ます。" },
      { speaker: "F", text: "次の電車は、午後4時15分に出発します。" },
    ],
  },
  {
    id: 34,
    section: 3,
    type: "アナウンス・指示",
    question: "客はどうしたらいいですか。",
    options: ["レジでカードを作る", "入口で名前を書く", "店員に電話する", "商品を受付に持っていく"],
    answer: 0,
    script: [
      { speaker: "M", text: "ポイントカードをお持ちでないお客様にお知らせします。" },
      { speaker: "M", text: "カードをお作りになる方は、レジでお名前を書いてください。すぐにお作りします。" },
    ],
  },
  {
    id: 35,
    section: 3,
    type: "アナウンス・指示",
    question: "図書館はいつ休みですか。",
    options: ["今週の月曜日", "今週の火曜日", "来週の月曜日", "来週の火曜日"],
    answer: 1,
    script: [
      { speaker: "F", text: "図書館からのお知らせです。今週は月曜日も開館します。" },
      { speaker: "F", text: "かわりに、火曜日は休みますので、ご注意ください。" },
    ],
  },
  {
    id: 36,
    section: 3,
    type: "アナウンス・指示",
    question: "プールに入る前に、何をしなければなりませんか。",
    options: ["受付でお金を払う", "水を飲む", "シャワーを浴びる", "くつを買う"],
    answer: 2,
    script: [
      { speaker: "M", text: "プールを利用する方にお願いします。" },
      { speaker: "M", text: "プールに入る前に、必ずシャワーを浴びてください。水泳帽は受付で借りることができます。" },
    ],
  },

  // 4. 読解
  {
    id: 37,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MESSAGE,
    question: "サトウさんは明日の朝、どこでバスを降りますか。",
    options: ["会社の前", "駅の前", "市役所の前", "工場の前"],
    answer: 2,
  },
  {
    id: 38,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MESSAGE,
    question: "会社まで、市役所からどのくらい歩きますか。",
    options: ["5分", "10分", "15分", "20分"],
    answer: 1,
  },
  {
    id: 39,
    section: 4,
    type: "内容理解",
    passage: PASSAGE_MESSAGE,
    question: "会議は何時に始まりますか。",
    options: ["7時45分", "8時", "8時30分", "9時"],
    answer: 3,
  },
  {
    id: 40,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CENTER,
    question: "健康センターは何曜日に休みですか。",
    options: ["月曜日", "火曜日", "水曜日", "木曜日"],
    answer: 2,
  },
  {
    id: 41,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CENTER,
    question: "運動する人は何を持っていきますか。",
    options: ["運動しやすい服と室内用のくつ", "住所がわかるカード", "昼ごはんと飲み物", "水着とタオル"],
    answer: 0,
  },
  {
    id: 42,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CENTER,
    question: "プールは何時まで利用できますか。",
    options: ["午後3時", "午後4時", "午後5時", "午後6時"],
    answer: 2,
  },
  {
    id: 43,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CAFE,
    question: "月曜日にカフェへ行きます。店は開いていますか。",
    options: ["午前中だけ開いています。", "午後だけ開いています。", "開いていません。", "一日中開いています。"],
    answer: 2,
  },
  {
    id: 44,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CAFE,
    question: "火曜日の午後3時に、ケーキセットを注文します。いくらですか。",
    options: ["400円", "500円", "600円", "700円"],
    answer: 1,
  },
  {
    id: 45,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_CAFE,
    question: "サンドイッチと紅茶を注文します。いくらですか。",
    options: ["580円", "650円", "730円", "750円"],
    answer: 2,
  },
  {
    id: 46,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SCHOOL,
    question: "遠足の日、何時に学校に集まりますか。",
    options: ["午前8時", "午前8時30分", "午前9時", "午後4時"],
    answer: 1,
  },
  {
    id: 47,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SCHOOL,
    question: "お昼ごはんはどうしますか。",
    options: ["自分で作ります。", "学校が用意します。", "水族館で買います。", "持っていきません。"],
    answer: 1,
  },
  {
    id: 48,
    section: 4,
    type: "情報検索",
    passage: PASSAGE_SCHOOL,
    question: "雨が降ったら、遠足はどうなりますか。",
    options: ["中止になります。", "次の週にします。", "水族館に行きます。", "学校で勉強します。"],
    answer: 2,
  },
];
