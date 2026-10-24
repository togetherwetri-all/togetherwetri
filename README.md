# TogetherWeTri 統合サイト（英語・日本語・韓国語）

TogetherWeTri 全体と、日本・韓国・米国の各支部のページをまとめた1つのサイトです。

## ページ構成

| メニュー | アドレス | 内容 |
|---|---|---|
| ホーム | `#home` | 全体の紹介、三か国の支部 |
| 私たちについて | `#about` / `#about-aeif` | 「私たちについて」と「AEIF採択事業」の2タブ |
| 日本支部 | `#japan` ほか | 概要・イベント（`#japan-events`）・ニュース（`#japan-news`）・メンバー（`#japan-members`） |
| 韓国支部 | `#korea` / `#korea-events` | 概要・イベント |
| 米国支部 | `#us` | 準備中のお知らせ・参加の呼びかけ |
| お問い合わせ | `#contact` | フォーム、各支部のメール、参加の方法、よくある質問 |

旧アドレス（`#aeif` `#events` `#news` など）も、自動で新しいページに移動します。

## 更新のしかた

ふだん編集するのは **data.js だけ** です。

- メールアドレス・フォーム・SNS …… `SITE`（`email` 全体／`japanEmail` 日本支部／`koreaEmail` 韓国支部）
- 日本支部のメンバー・イベント・ニュース …… `MEMBERS` `EVENTS` `POSTS`
- 韓国支部のイベント …… `KOREA_EVENTS`（ファイルの一番下）
- 問い合わせの種類 …… `TOPICS`（`to: "japan"` は日本支部、`to: "korea"` は韓国支部のアドレス宛て）

文章は `en`（英語）・`ja`（日本語）・`ko`（韓国語）で書けます。`ko` がない項目は、韓国語表示のときに英語で表示されます。

写真・PDF はリポジトリの一番上（index.html と同じ場所）にアップロードし、ファイル名だけを data.js に書きます。
ブラウザからアップロードできるのは1ファイル25MBまでなので、大きいPDFは圧縮してからアップロードしてください。

**全体のメールアドレス**：`SITE.email` が空欄の間は、全体宛ての問い合わせ（一般・連携・取材など）は日本支部のアドレスに届きます。全体用のアドレスができたら入れてください。

## 公開のしかた（GitHub Pages・無料）

1. 全体用の GitHub アカウントで、新しいリポジトリ（Public）を作ります。
2. 「Add file」→「Upload files」で、このフォルダの中身を**すべて**アップロードします（フォルダごとではなく、中のファイルを一番上に）。
3. 「Settings」→「Pages」→ Branch を `main`、フォルダを `/ (root)` にして Save。
4. 数分後、`https://アカウント名.github.io/リポジトリ名/` で公開されます。

## 旧日本支部サイトからの転送

旧サイト（togetherwetri-japan リポジトリ）の訪問者を新サイトに送るには：

1. 同梱の `redirect-for-old-japan-site/index.html` で、旧リポジトリ（togetherwetri-japan）の `index.html` を置き換えます。転送先（https://togetherwetri-all.github.io/togetherwetri/）は設定済みです。
2. 他のファイルは残しても消してもかまいません。

旧サイトの各ページは、新サイトの日本支部タブの対応するページに自動で移動します。
