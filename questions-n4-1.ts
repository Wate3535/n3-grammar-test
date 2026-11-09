// =========================================================
// JLPT N4 — MOCK TEST 1 (rasmiy format, 85 savol)
//   1-qism 言語知識（文字・語彙） 25分 — 問題1–5 (28)
//   2-qism 言語知識（文法）・読解 55分 — 問題1–6 (29)
//   3-qism 聴解 ~35分                 — 問題1–4 (28)
// =========================================================

import { buildTest, createPicker, type Draft } from "@/lib/jlpt";
import type { GlossaryItem } from "@/questions";

export const TEST_N4_1 = {
  name: "模擬テスト 1",
  slug: "n4-1",
};

const { pick, fixed } = createPicker();

// ---------------- 読解 matnlari ----------------

const BUNSHOU = `日本の 生活
　　　　　　　　　　　　　　　マイク・ブラウン

わたしは 去年の ９月に アメリカから 日本へ 来ました。日本に 来る 前は、日本語が ぜんぜん （１）。
はじめは 電車の 乗りかたも わかりませんでした。（２）、駅の 人が いつも ていねいに 教えて くれました。
今は 一人で どこへでも 行けます。週末は よく 電車で 近くの 町へ 行って、写真を （３）。
来年 国へ 帰ったら、日本で とった 写真を 家族に （４） と 思って います。`;

const MAIL = `（１）
山田先生

来週の 月曜日の 授業ですが、病院へ 行かなければ ならないので、休ませて いただけませんか。
宿題は、日曜日の 夜までに メールで 送ります。火曜日の 授業には 出席します。
どうぞ よろしく お願いします。

グエン`;

const NOTE = `（２）
ケンさんへ

きょうは 会社の 人と 食事を するので、晩ごはんは いりません。
帰りは 11時ごろに なると 思います。先に 寝て いて ください。

ゆき`;

const WATER = `（３）
アパートの みなさんへ

６月10日（水）の 午前９時から 12時まで、水道の 工事を します。
その 時間は 水が 使えません。
水が 必要な 人は、前の 日に 用意して おいて ください。

大家`;

const SATO = `わたしは 去年の 春に 日本へ 来ました。はじめは 日本語が あまり わからなくて、買い物も 大変でした。店の 人が 何を 言って いるか わからなくて、いつも こまって いました。
でも、アパートの となりに 住んで いる 佐藤さんが、よく 声を かけて くれました。いっしょに スーパーへ 行って、野菜の 名前を 教えて くれたり、日本の 料理の 作り方を 教えて くれたり しました。
今は 日本語で 話すのが 楽しいです。来月 国へ 帰りますが、その 前に 佐藤さんに 国の 料理を 作って あげたいと 思って います。`;

const PIZZA = `ピザ　マルコ　メニュー

Sサイズ　1,200円
Mサイズ　1,800円
Lサイズ　2,400円

・配達は 午前11時から 午後10時までです。
・2,000円 以上 注文すると、配達料は 無料です。
・2,000円より 少ない ときは、配達料が 300円 かかります。`;

const G_MAIL: GlossaryItem[] = [
  { word: "授業", reading: "じゅぎょう", meaning: "dars" },
  { word: "宿題", reading: "しゅくだい", meaning: "uy vazifasi" },
  { word: "出席", reading: "しゅっせき", meaning: "qatnashish" },
];
const G_WATER: GlossaryItem[] = [
  { word: "水道", reading: "すいどう", meaning: "suv quvuri" },
  { word: "工事", reading: "こうじ", meaning: "ta'mir ishlari" },
  { word: "用意", reading: "ようい", meaning: "tayyorlab qo'yish" },
  { word: "大家", reading: "おおや", meaning: "uy egasi" },
];
const G_SATO: GlossaryItem[] = [
  { word: "去年", reading: "きょねん", meaning: "o'tgan yil" },
  { word: "声を かける", reading: "こえをかける", meaning: "gapirib, hol so'rab turmoq" },
];
const G_PIZZA: GlossaryItem[] = [
  { word: "配達", reading: "はいたつ", meaning: "yetkazib berish" },
  { word: "注文", reading: "ちゅうもん", meaning: "buyurtma" },
  { word: "無料", reading: "むりょう", meaning: "bepul" },
];

// ---------------- savollar ----------------

const drafts: Draft[] = [
  // ===== 1-qism: 文字・語彙 =====
  // 問題1 漢字読み
  { section: 1, mondai: 1, type: "漢字読み", question: "この ＿池＿には 魚が たくさん います。", ...pick("いけ", "いし", "うみ", "かわ") },
  { section: 1, mondai: 1, type: "漢字読み", question: "＿屋上＿から 町が よく 見えます。", ...pick("おくじょう", "やじょう", "おくうえ", "やうえ") },
  { section: 1, mondai: 1, type: "漢字読み", question: "日本の ＿文化＿に きょうみが あります。", ...pick("ぶんか", "もんか", "ぶんが", "ぶんけ") },
  { section: 1, mondai: 1, type: "漢字読み", question: "毎朝 ＿運動＿を して います。", ...pick("うんどう", "うんど", "うんとう", "うんどお") },
  { section: 1, mondai: 1, type: "漢字読み", question: "来週 日本語の ＿試験＿が あります。", ...pick("しけん", "しっけん", "しげん", "じけん") },
  { section: 1, mondai: 1, type: "漢字読み", question: "山田さんは とても ＿親切＿な 人です。", ...pick("しんせつ", "しんせち", "しんぜつ", "おやせつ") },
  { section: 1, mondai: 1, type: "漢字読み", question: "ここに 名前を ＿書いて＿ ください。", ...pick("かいて", "きいて", "おいて", "はいて") },
  // 問題2 表記
  { section: 1, mondai: 2, type: "表記", question: "この 道を まっすぐ ＿すすんで＿ ください。", ...pick("進んで", "通んで", "運んで", "送んで") },
  { section: 1, mondai: 2, type: "表記", question: "駅の ＿ちかく＿に 住んで います。", ...pick("近く", "地く", "短く", "低く") },
  { section: 1, mondai: 2, type: "表記", question: "あなたの ＿いけん＿を 聞かせて ください。", ...pick("意見", "意建", "異見", "意県") },
  { section: 1, mondai: 2, type: "表記", question: "国の 友だちに 手紙を ＿おくりました＿。", ...pick("送りました", "返りました", "追りました", "通りました") },
  { section: 1, mondai: 2, type: "表記", question: "デパートへ ＿ようふく＿を 買いに 行きます。", ...pick("洋服", "羊服", "洋腹", "様服") },
  // 問題3 文脈規定
  { section: 1, mondai: 3, type: "文脈規定", question: "会議の 時間に（　　）しまって、すみません。", ...pick("おくれて", "まちがえて", "わすれて", "ねむって") },
  { section: 1, mondai: 3, type: "文脈規定", question: "この 薬は 一日 三回、食事の あとに（　　）ください。", ...pick("飲んで", "食べて", "入れて", "かけて") },
  { section: 1, mondai: 3, type: "文脈規定", question: "新しい ことばを おぼえるのは（　　）ですが、楽しいです。", ...pick("たいへん", "たいせつ", "ひま", "しんせつ") },
  { section: 1, mondai: 3, type: "文脈規定", question: "部屋が きたないので、（　　）を しましょう。", ...pick("そうじ", "せんたく", "りょうり", "しゅくだい") },
  { section: 1, mondai: 3, type: "文脈規定", question: "雨が 降りそうなので、かさを（　　）出かけます。", ...pick("持って", "着て", "はいて", "かぶって") },
  { section: 1, mondai: 3, type: "文脈規定", question: "電車の 中で 大きい 声で 話すのは（　　）です。", ...pick("めいわく", "ていねい", "ねっしん", "じょうず") },
  { section: 1, mondai: 3, type: "文脈規定", question: "道が わからなかったので、交番で（　　）を 聞きました。", ...pick("道", "天気", "ねだん", "しゅみ") },
  { section: 1, mondai: 3, type: "文脈規定", question: "この シャツは 大きいので、小さい サイズに（　　）もらえますか。", ...pick("とりかえて", "おくって", "はらって", "しらべて") },
  // 問題4 言い換え類義
  {
    section: 1, mondai: 4, type: "言い換え類義", question: "＿ここは 禁煙です。＿",
    ...pick("ここで たばこを 吸っては いけません。", "ここで たばこを 吸っても いいです。", "ここで たばこを 売って います。", "ここで たばこを 買えます。"),
  },
  {
    section: 1, mondai: 4, type: "言い換え類義", question: "＿兄は 銀行に つとめて います。＿",
    ...pick("兄は 銀行で 働いて います。", "兄は 銀行で お金を かりて います。", "兄は 銀行に 行く ところです。", "兄は 銀行が 好きです。"),
  },
  {
    section: 1, mondai: 4, type: "言い換え類義", question: "＿この 町は にぎやかです。＿",
    ...pick("この 町には 人や 店が たくさん あります。", "この 町は とても しずかです。", "この 町には 人が あまり いません。", "この 町は 古くて 小さいです。"),
  },
  {
    section: 1, mondai: 4, type: "言い換え類義", question: "＿きのうの テストは かんたんでした。＿",
    ...pick("きのうの テストは やさしかったです。", "きのうの テストは むずかしかったです。", "きのうの テストは 長かったです。", "きのうの テストは みじかかったです。"),
  },
  // 問題5 用法
  {
    section: 1, mondai: 5, type: "用法", question: "おれい",
    ...pick("友だちに 本を もらったので、おれいを 言いました。", "毎朝 おれいを して、学校へ 行きます。", "この 店の おれいは とても 高いです。", "雨の 日は おれいを 持って 出かけます。"),
  },
  {
    section: 1, mondai: 5, type: "用法", question: "さかん",
    ...pick("この 町は 昔から 野球が さかんです。", "この 部屋は さかんで、とても 暗いです。", "さかんな 声で 話して ください。", "きのうは さかんに 寝ました。"),
  },
  {
    section: 1, mondai: 5, type: "用法", question: "ひきだし",
    ...pick("はさみは つくえの ひきだしに 入って います。", "寒いので ひきだしを 着て 出かけます。", "駅で ひきだしに 乗りました。", "ひきだしで 手紙を 書きます。"),
  },
  {
    section: 1, mondai: 5, type: "用法", question: "すっかり",
    ...pick("約束を すっかり わすれて いました。", "すっかり 雨が 降って いますか。", "もっと すっかり 話して ください。", "あしたは すっかり 来て ください。"),
  },

  // ===== 2-qism: 文法・読解 =====
  // 問題1 文の文法1
  { section: 2, mondai: 1, type: "文の文法1", question: "雨が（　　）、試合は 中止に なりました。", ...pick("ふったので", "ふったら", "ふっても", "ふるのに") },
  { section: 2, mondai: 1, type: "文の文法1", question: "先生に 作文を（　　）もらいました。", ...pick("なおして", "なおす", "なおした", "なおさ") },
  { section: 2, mondai: 1, type: "文の文法1", question: "この 料理は 作り方が かんたん（　　）、おいしいです。", ...pick("で", "なのに", "だから", "でも") },
  { section: 2, mondai: 1, type: "文の文法1", question: "日本へ 行く 前に、日本語を 勉強して（　　）つもりです。", ...pick("おく", "いる", "ある", "みる") },
  { section: 2, mondai: 1, type: "文の文法1", question: "部長、こちらの 資料を ご覧に（　　）か。", ...pick("なりました", "しました", "ありました", "いました") },
  { section: 2, mondai: 1, type: "文の文法1", question: "子どもの とき、母に きらいな 野菜を 食べ（　　）。", ...pick("させられました", "させました", "られました", "たがりました") },
  { section: 2, mondai: 1, type: "文の文法1", question: "空が 暗く なって きました。雨が 降り（　　）ですね。", ...pick("そう", "よう", "らしい", "みたい") },
  { section: 2, mondai: 1, type: "文の文法1", question: "毎日 れんしゅうした（　　）、上手に なりました。", ...pick("ので", "のに", "けど", "ても") },
  { section: 2, mondai: 1, type: "文の文法1", question: "電気を（　　）まま、寝て しまいました。", ...pick("つけた", "つける", "つけて", "つけない") },
  { section: 2, mondai: 1, type: "文の文法1", question: "この 本は 字が 大きくて、（　　）やすいです。", ...pick("読み", "読む", "読んで", "読ま") },
  { section: 2, mondai: 1, type: "文の文法1", question: "ニュースに よると、あしたは 雪が 降る（　　）です。", ...pick("そう", "ため", "まま", "ばかり") },
  {
    section: 2, mondai: 1, type: "文の文法1",
    question: "A「あした、いっしょに 行きませんか。」\nB「すみません、あしたは ちょっと 用事が（　　）。」",
    ...pick("あるんです", "あったんです", "あるでしょうか", "あったら"),
  },
  { section: 2, mondai: 1, type: "文の文法1", question: "きのう、先生が 書いた 本を（　　）。とても おもしろかったです。", ...pick("拝見しました", "ご覧に なりました", "お読みに なりました", "まいりました") },
  // 問題2 文の文法2（並べ替え）
  { section: 2, mondai: 2, type: "文の文法2", question: "あそこで ___ ___ _★_ ___ は 田中さんです。", ...pick("いる", "人", "本を", "読んで") },
  { section: 2, mondai: 2, type: "文の文法2", question: "わたしは ___ ___ _★_ ___ あります。", ...pick("のぼった", "ことが", "去年", "富士山に") },
  { section: 2, mondai: 2, type: "文の文法2", question: "友だちが この ___ _★_ ___ ___ 言いました。", ...pick("とても", "おもしろい", "と", "本は") },
  { section: 2, mondai: 2, type: "文の文法2", question: "日本語が ___ ___ _★_ ___ 練習して います。", ...pick("ように", "毎日", "上手に", "話せる") },
  // 問題3 文章の文法
  { section: 2, mondai: 3, type: "文章の文法", passage: BUNSHOU, question: "（１）", ...pick("わかりませんでした", "わかりました", "わかって いました", "わかりたかったです") },
  { section: 2, mondai: 3, type: "文章の文法", passage: BUNSHOU, question: "（２）", ...pick("でも", "だから", "それに", "それで") },
  { section: 2, mondai: 3, type: "文章の文法", passage: BUNSHOU, question: "（３）", ...pick("とって います", "とって いました", "とりたいです", "とったら") },
  { section: 2, mondai: 3, type: "文章の文法", passage: BUNSHOU, question: "（４）", ...pick("見せたい", "見たい", "見せられる", "見られたい") },
  // 問題4 内容理解（短文）
  {
    section: 3, mondai: 4, type: "内容理解（短文）", passage: MAIL, glossary: G_MAIL,
    question: "グエンさんは どうして この メールを 書きましたか。",
    ...pick("月曜日の 授業を 休みたいから", "宿題が わからないから", "病院の 場所を 聞きたいから", "火曜日に 休みたいから"),
  },
  {
    section: 3, mondai: 4, type: "内容理解（短文）", passage: NOTE,
    question: "ゆきさんは ケンさんに 何を つたえたいですか。",
    ...pick("晩ごはんを 食べないで、おそく 帰ること", "晩ごはんを 作って ほしいこと", "11時に 駅まで 来て ほしいこと", "会社の 人と いっしょに 帰ること"),
  },
  {
    section: 3, mondai: 4, type: "内容理解（短文）", passage: WATER, glossary: G_WATER,
    question: "６月10日の 午前中、アパートの 人は 何が できませんか。",
    ...pick("水を 使うこと", "電気を 使うこと", "部屋に いること", "ごみを 出すこと"),
  },
  // 問題5 内容理解（中文）
  {
    section: 3, mondai: 5, type: "内容理解（中文）", passage: SATO, glossary: G_SATO,
    question: "日本に 来た とき、この 人は 何が 大変でしたか。",
    ...pick("買い物を すること", "料理を 作ること", "アパートを さがすこと", "佐藤さんと 話すこと"),
  },
  {
    section: 3, mondai: 5, type: "内容理解（中文）", passage: SATO, glossary: G_SATO,
    question: "佐藤さんは この 人に 何を して くれましたか。",
    ...pick("野菜の 名前や 料理の 作り方を 教えて くれた", "アパートを さがして くれた", "日本語の 本を くれた", "国の 料理を 作って くれた"),
  },
  {
    section: 3, mondai: 5, type: "内容理解（中文）", passage: SATO, glossary: G_SATO,
    question: "この 人は 国へ 帰る 前に 何を したいですか。",
    ...pick("佐藤さんに 国の 料理を 作りたい。", "日本の 料理を 習いたい。", "佐藤さんと 旅行したい。", "日本語の 勉強を したい。"),
  },
  // 問題6 情報検索
  {
    section: 3, mondai: 6, type: "情報検索", passage: PIZZA, glossary: G_PIZZA,
    question: "Mサイズの ピザを １まい 配達して もらいます。全部で いくらですか。",
    ...fixed(["1,800円", "2,000円", "2,100円", "2,400円"], 2),
  },
  {
    section: 3, mondai: 6, type: "情報検索", passage: PIZZA, glossary: G_PIZZA,
    question: "Sサイズを ２まい 注文しました。配達料は いくらですか。",
    ...fixed(["０円", "300円", "600円", "1,200円"], 0),
  },

  // ===== 3-qism: 聴解 =====
  // 問題1 課題理解
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "会社で 女の 人と 男の 人が 話して います。", question: "男の 人は このあと まず 何を しますか。",
    ...pick("資料を コピーする", "いすを ならべる", "プロジェクターを 準備する", "山田さんを よぶ"),
    script: [
      { speaker: "F", text: "会議の 準備、手伝って もらえますか。" },
      { speaker: "M", text: "はい。何を しましょうか。" },
      { speaker: "F", text: "資料を 二十部 コピーして ください。いすは 山田さんが ならべますから。" },
      { speaker: "M", text: "わかりました。あ、プロジェクターは？" },
      { speaker: "F", text: "それは わたしが やります。" },
    ],
    glossary: [{ word: "資料", reading: "しりょう", meaning: "hujjatlar" }],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "男の 人と 女の 人が 話して います。", question: "女の 人は 何で 空港へ 行きますか。",
    ...pick("バス", "タクシー", "電車", "友だちの 車"),
    script: [
      { speaker: "M", text: "空港まで 何で 行きますか。" },
      { speaker: "F", text: "タクシーは 高いし、電車は 乗りかえが 大変だから、バスに しようと 思って います。" },
      { speaker: "M", text: "バスは 道が こむと、時間が かかりますよ。" },
      { speaker: "F", text: "そうですね。でも、荷物が 多いので、やっぱり 乗りかえの ない バスに します。" },
    ],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "先生が 学生に 話して います。", question: "学生は あした 何を 持って 行きますか。",
    ...pick("ノートと ペンと 学生証", "カメラと ノート", "カメラと 学生証", "ノートと ペンだけ"),
    script: [
      {
        speaker: "M",
        text: "あしたの 工場見学では、工場の 中で 写真を とっては いけませんから、カメラは いりません。ノートと ペンを 持って きて ください。それから、工場の 人に 見せるので、学生証を わすれないで ください。",
      },
    ],
    glossary: [{ word: "学生証", reading: "がくせいしょう", meaning: "talaba guvohnomasi" }],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "病院の 受付の 人と 男の 人が 電話で 話して います。", question: "男の 人は 何時に 病院へ 行きますか。",
    ...fixed(["９時", "11時", "11時半", "午後２時"], 1),
    script: [
      { speaker: "F", text: "はい、さくら病院です。" },
      { speaker: "M", text: "あしたの 午前中に 見て もらいたいんですが。" },
      { speaker: "F", text: "午前は、九時と 十一時が あいて います。" },
      { speaker: "M", text: "九時は 仕事が あるので…。十一時半でも いいですか。" },
      { speaker: "F", text: "すみません、十一時半は もう 予約が あります。" },
      { speaker: "M", text: "じゃあ、十一時で おねがいします。" },
    ],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "大学の 事務室で 女の 人と 男の 学生が 話して います。", question: "男の 学生は まず 何を しますか。",
    ...pick("紙に 名前と 住所を 書く", "写真を はる", "写真を とりに 行く", "あした もう 一度 来る"),
    script: [
      { speaker: "F", text: "奨学金の 申し込みですね。この 紙に 名前と 住所を 書いて、写真を はって ください。" },
      { speaker: "M", text: "すみません、写真は 今 ないんですが。" },
      { speaker: "F", text: "じゃあ、写真は あした 持って きて ください。まず、紙に 書いて ください。" },
      { speaker: "M", text: "はい、わかりました。" },
    ],
    glossary: [{ word: "奨学金", reading: "しょうがくきん", meaning: "stipendiya" }],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "店で 女の 人と 店の 人が 話して います。", question: "女の 人は どの シャツを 買いますか。",
    ...pick("白い シャツの Mサイズ", "青い シャツの Mサイズ", "青い シャツの Lサイズ", "白い シャツの Lサイズ"),
    script: [
      { speaker: "F", text: "すみません、この 青い シャツ、Mサイズは ありますか。" },
      { speaker: "M", text: "すみません、青は Lしか ないんです。白なら Mが ありますよ。" },
      { speaker: "F", text: "そうですか。じゃあ、白の Mを ください。" },
    ],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "会社で 女の 人と 男の 人が 話して います。", question: "男の 人は 箱を どこに 置きますか。",
    ...pick("いすの 横", "つくえの 上", "窓の 前", "ドアの 前"),
    script: [
      { speaker: "F", text: "その 箱、つくえの 上に 置いて ください。あ、つくえの 上は いっぱいですね。じゃあ、いすの 横に お願いします。" },
      { speaker: "M", text: "窓の 前でも いいですか。" },
      { speaker: "F", text: "窓の 前は 人が 通るので、ちょっと…。" },
      { speaker: "M", text: "わかりました。" },
    ],
  },
  {
    section: 4, mondai: 1, type: "課題理解",
    intro: "男の 人と 女の 人が 話して います。", question: "二人は 何時に 会いますか。",
    ...fixed(["12時", "12時半", "１時半", "２時"], 1),
    script: [
      { speaker: "M", text: "土曜日の 映画、何時に 会いましょうか。" },
      { speaker: "F", text: "映画は 二時からですね。一時半に 駅で 会いましょうか。" },
      { speaker: "M", text: "その 前に、いっしょに 昼ごはんを 食べませんか。十二時半は どうですか。" },
      { speaker: "F", text: "いいですね。じゃあ、十二時半に。" },
    ],
  },
  // 問題2 ポイント理解
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "男の 人と 女の 人が 話して います。", question: "女の 人は どうして 引っ越しますか。",
    ...pick("となりの 部屋が うるさいから", "会社から 遠いから", "家賃が 高いから", "部屋が せまいから"),
    script: [
      { speaker: "M", text: "引っ越すそうですね。会社から 遠いからですか。" },
      { speaker: "F", text: "いいえ、会社には 近いんですが、となりの 部屋が うるさくて、夜 ねられないんです。" },
      { speaker: "M", text: "それは 大変ですね。" },
    ],
    glossary: [{ word: "家賃", reading: "やちん", meaning: "ijara haqi" }],
  },
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "女の 人と 男の 人が 話して います。", question: "男の 人は 週末 何を しましたか。",
    ...pick("家で ねて いた", "海へ 行った", "友だちと あそんだ", "病院で 働いた"),
    script: [
      { speaker: "F", text: "週末は 海へ 行ったんですか。" },
      { speaker: "M", text: "行く つもりでしたが、かぜを ひいて しまって、ずっと 家で ねて いました。" },
    ],
  },
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "男の 人と 女の 人が 話して います。", question: "女の 人は 新しい アルバイトの 何が いいと 言って いますか。",
    ...pick("店長が やさしくて、ご飯が おいしい こと", "時給が 高い こと", "仕事が かんたんな こと", "家から 近い こと"),
    script: [
      { speaker: "M", text: "新しい アルバイトは どうですか。" },
      { speaker: "F", text: "仕事は 大変ですが、店長が やさしいし、店で 食べる ご飯が おいしいんです。時給は 前より 安いですけど。" },
    ],
  },
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "男の 人と 女の 人が 話して います。", question: "女の 人は どうして おくれましたか。",
    ...pick("出かける 前に 電話が あったから", "電車が 止まったから", "道が わからなかったから", "寝坊したから"),
    script: [
      { speaker: "M", text: "おそかったですね。電車が 止まったんですか。" },
      { speaker: "F", text: "いいえ、電車は 大丈夫でした。出かける 前に、母から 電話が あって、長く 話して しまったんです。" },
      { speaker: "M", text: "そうでしたか。" },
    ],
  },
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "女の 人と 男の 人が 旅行の 話を して います。", question: "男の 人は 何が いちばん よかったと 言って いますか。",
    ...pick("着物を 着て 町を 歩いた こと", "お寺を 見た こと", "料理を 食べた こと", "写真を とった こと"),
    script: [
      { speaker: "F", text: "京都旅行、どうでしたか。" },
      { speaker: "M", text: "お寺も きれいでしたし、料理も おいしかったです。でも、いちばん よかったのは、着物を 着て 町を 歩いた ことです。" },
    ],
  },
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "男の 人と 女の 人が 話して います。", question: "女の 人は 今 どうやって 会社に 来て いますか。",
    ...pick("歩いて", "自転車で", "バスで", "電車で"),
    script: [
      { speaker: "M", text: "いつも 自転車で 来て いますよね。" },
      { speaker: "F", text: "前は そうでしたけど、先月から 歩いて 来て います。" },
      { speaker: "M", text: "健康の ためですか。" },
      { speaker: "F", text: "ええ。" },
    ],
  },
  {
    section: 4, mondai: 2, type: "ポイント理解",
    intro: "女の 人と 男の 人が 話して います。", question: "男の 人は いつ 国へ 帰りますか。",
    ...pick("９月", "８月の はじめ", "８月の おわり", "帰らない"),
    script: [
      { speaker: "F", text: "夏休みに 国へ 帰りますか。" },
      { speaker: "M", text: "八月の はじめに 帰る つもりでしたが、チケットが 高いので、九月に なってから 帰ります。" },
    ],
  },
  // 問題3 発話表現
  {
    section: 4, mondai: 3, type: "発話表現", spoken: true, speaker: "M", image: "🧳🙂",
    question: "友だちの 荷物が 重そうです。何と 言いますか。",
    ...pick("持ちましょうか。", "持って ください。", "持って いますか。"),
  },
  {
    section: 4, mondai: 3, type: "発話表現", spoken: true, speaker: "F", image: "📚🤫",
    question: "図書館で となりの 人の 声が 大きいです。何と 言いますか。",
    ...pick("すみません、少し 静かに して いただけませんか。", "すみません、静かですね。", "すみません、大きい 声で 話して ください。"),
  },
  {
    section: 4, mondai: 3, type: "発話表現", spoken: true, speaker: "M", image: "🏥🛏️",
    question: "病気の 友だちの 家から 帰ります。何と 言いますか。",
    ...pick("お大事に。", "おめでとう。", "お元気で。"),
  },
  {
    section: 4, mondai: 3, type: "発話表現", spoken: true, speaker: "F", image: "⏰🙇‍♀️",
    question: "約束の 時間に おくれました。何と 言いますか。",
    ...pick("おそく なって すみません。", "おそく なって よかったです。", "おそく して ください。"),
  },
  {
    section: 4, mondai: 3, type: "発話表現", spoken: true, speaker: "M", image: "📷🙏",
    question: "知らない 人に 写真を とって ほしいです。何と 言いますか。",
    ...pick("すみません、写真を とって もらえませんか。", "すみません、写真を とりましょうか。", "すみません、写真を とらないで ください。"),
  },
  // 問題4 即時応答
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "F", text: "この かさ、だれのか 知って いますか。" }], ...pick("あ、それ、わたしのです。", "はい、かさを 持って います。", "じゃあ、かして ください。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "M", text: "すみません、窓を 開けても いいですか。" }], ...pick("ええ、どうぞ。", "ええ、開けました。", "窓が ありますよ。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "M", text: "週末、いっしょに 映画でも どうですか。" }], ...pick("いいですね。何を 見ましょうか。", "映画を 見ました。", "いいえ、行きませんでした。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "F", text: "お茶を もう 一杯 いかがですか。" }], ...pick("ありがとうございます。いただきます。", "はい、いかがです。", "いいえ、どういたしまして。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "M", text: "あしたの 会議は 何時からでしたっけ。" }], ...pick("十時からですよ。", "会議室ですよ。", "はい、そうでした。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "F", text: "すみません、この 席、あいて いますか。" }], ...pick("ええ、どうぞ。", "はい、あけました。", "いいえ、すわります。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "M", text: "道が こんで いて、少し おくれそうです。" }], ...pick("わかりました。気を つけて 来て ください。", "じゃあ、早く 出かけましょう。", "はい、おくれませんでした。") },
  { section: 4, mondai: 4, type: "即時応答", spoken: true, question: "", script: [{ speaker: "F", text: "日本の 生活には もう なれましたか。" }], ...pick("ええ、だいぶ なれました。", "ええ、日本に 来ました。", "いいえ、なれて ください。") },
];

export const questionsN4_1 = buildTest(TEST_N4_1.slug, drafts);
