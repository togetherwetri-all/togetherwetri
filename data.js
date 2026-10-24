/* ==================================================================
   TogetherWeTri ― サイトの内容ファイル（data.js）
   ------------------------------------------------------------------
   日々の更新は、基本的にこのファイルだけを編集します。
   ・メールアドレスやフォームの設定 …………… SITE
   ・日本支部のメンバー紹介 ………………………… MEMBERS
   ・日本支部のイベント …………………………… EVENTS
   ・日本支部のニュース／ニュースレター記事 … POSTS
   ・韓国支部のイベント・メンバー …………… KOREA_EVENTS / KOREA_MEMBERS（ファイルの下のほう）
   ・米国支部のイベント・メンバー …………… US_EVENTS / US_MEMBERS（ファイルの一番下）
   ・問い合わせの種類 ………………………………… TOPICS

   書き方のルール
   1. 文字は必ず "ダブルクォート" で囲みます。文中に " を使うときは \" と書きます。
   2. 項目と項目の間は , （半角カンマ）で区切ります。カンマ忘れが一番多いミスです。
   3. 日付は "2026-11-14" の形（年-月-日、半角）で書きます。
      今日より前の日付のイベントは自動で「過去のイベント」に移ります。
   4. en が英語、ja が日本語、ko が韓国語です。
      ko を書かなかった項目は、韓国語表示のときに英語で表示されます（あとから足せます）。
      例： title: { en: "...", ja: "...", ko: "..." }
   5. 写真やPDFは index.html と同じ場所（リポジトリの一番上）にアップロードし、ファイル名だけを書きます。
   6. 一番簡単な追加方法は、既存の1件を丸ごとコピーして書き換えることです。

   保存後にサイトが真っ白になったり内容が消えたりしたら、
   画面上部の赤い表示に出る行番号のあたりで、カンマやクォートを確認してください。
   ================================================================== */

const SITE = {
  // TogetherWeTri 全体の問い合わせ先メールアドレス。
  // 空欄 "" のままだと、下の日本支部アドレスだけが表示され、すべての問い合わせがそちらに届きます。
  email: "",

  // 日本支部の問い合わせ先（日本支部・イベント申し込み・メンバー応募・ニュースレターなど）
  japanEmail: "togetherwetri.japan@gmail.com",

  // 韓国支部の問い合わせ先
  koreaEmail: "togetherwetri.dosaeif@gmail.com",

  // Formspree のフォームURL（例: "https://formspree.io/f/abcdwxyz"）
  // 入れると、問い合わせフォームから直接メールが届くようになります。
  // 空欄 "" のままだと、訪問者がメッセージをコピーして自分でメールする方式になります。
  formEndpoint: "",

  // ニュースレター登録用のURL（Googleフォームなど）。空欄ならメールでの申し込み案内を表示します。
  newsletterSignupUrl: "",

  // SNS のリンク。url を入れたものだけが、フッターとお問い合わせページに表示されます。
  // 使わないものは url を "" のままにするか、行ごと消してください。並び順もそのまま表示順になります。
  social: [
    { name: "LinkedIn",  url: "https://www.linkedin.com/company/togetherwetri-ytl/" },
    { name: "Instagram (All)", url: "https://www.instagram.com/togetherwetri_ytl" },
    { name: "Instagram (Japan)", url: "https://www.instagram.com/togetherwetri_japan/" }
    { name: "X",         url: "" },
    { name: "Facebook",  url: "" }
  ]
};

const MEMBERS = [
  { name: { en: "Sora Yamasaki", ja: "山﨑蒼空" }, role: { en: "ROLE", ja: "役職" }, aff: { en: "Japan Institue for Health Security · YTL 2025 Osaka", ja: "国立健康危機管理研究機構 · YTL 2025年" }, bio: { en: "One or two sentences about this person's focus and why they joined.", ja: "専門分野や参加のきっかけを1〜2文で紹介します。" }, photo: "member-sora.jpg" },
  { name: { en: "Mayu Kitahara", ja: "北原真悠" }, role: { en: "ROLE", ja: "役職" }, aff: { en: "Sophia University · YTL 2025 Osaka", ja: "所属 · YTL 2025年" }, bio: { en: "One or two sentences about this person's focus and why they joined.", ja: "専門分野や参加のきっかけを1〜2文で紹介します。" }, photo: "" },
  { name: { en: "Tamaki Hoshi", ja: "星たまき" }, role: { en: "ROLE", ja: "役職" }, aff: { en: "University / Organization · YTL 2024 Busan", ja: "所属 · YTL 2024年" }, bio: { en: "One or two sentences about this person's focus and why they joined.", ja: "専門分野や参加のきっかけを1〜2文で紹介します。" }, photo: "" },
  { name: { en: "Aruto Masuda", ja: "氏名" }, role: { en: "ROLE", ja: "役職" }, aff: { en: "University / Organization · YTL 20XX", ja: "所属 · YTL 20XX年" }, bio: { en: "One or two sentences about this person's focus and why they joined.", ja: "専門分野や参加のきっかけを1〜2文で紹介します。" }, photo: "" },
  { name: { en: "Member Name", ja: "氏名" }, role: { en: "Partnerships", ja: "渉外担当" }, aff: { en: "University / Organization · YTL 20XX", ja: "所属 · YTL 20XX年" }, bio: { en: "One or two sentences about this person's focus and why they joined.", ja: "専門分野や参加のきっかけを1〜2文で紹介します。" }, photo: "" },
  { name: { en: "Member Name", ja: "氏名" }, role: { en: "Community", ja: "コミュニティ担当" }, aff: { en: "University / Organization · YTL 20XX", ja: "所属 · YTL 20XX年" }, bio: { en: "One or two sentences about this person's focus and why they joined.", ja: "専門分野や参加のきっかけを1〜2文で紹介します。" }, photo: "" }
];
const MEMBERS_ARE_PLACEHOLDERS = false;  // 実際のメンバー情報に差し替えたら false にすると「テンプレート」表示が消えます

// sample: true の項目には「サンプル」表示が付きます。実際のイベントでは sample: false にするか、その行を消してください。
// イベントの詳細（タイトルを押すと開く画面）に表示できる項目（どれも省略できます）：
//   participants: { en: "...", ja: "..." }            参加者数など
//   schedule: [ { time: "14:00–14:20", en: "...", ja: "..." }, ... ]   スケジュール
//             日をまたぐときは { day: { en: "June 12 (Fri)", ja: "6月12日（金）" } } で見出しを入れる
//   gallery: [ { src: "写真.jpg", en: "説明", ja: "説明" }, ... ]       当日の写真
//   video: "https://youtu.be/..."                                     YouTube の動画（画面内で再生）
//   lead: "..."                                                       企画担当
const EVENTS = [
  { date: "2026-10-10", time: "14:00–17:00 JST", sample: false,
    title: { en: "Japan-U.S.-ROK Youth Dialogue: Innovation & Resilience", ja: "日米韓の次世代がつくるイノベーションとレジリエンス" },
    place: { en: "Sendai (INTILAQ Tohoku Innovation Center)", ja: "仙台（INTILAQ 東北イノベーションセンター）" }, format: "inperson / online", langs: "EN / JA",
    desc: { en: "This event brings together young people from Japan, the United States, and the Republic of Korea in Sendai to explore new forms of cooperation across national and cultural boundaries. Featuring experts and emerging leaders from the three countries, the event focuses on innovation, resilience, and regional revitalization across various fields. It provides an opportunity for participants to engage in dialogue and collectively envision new ways for the next generation to advance trilateral cooperation.", ja: "本イベントは、日本・米国・韓国の若者が仙台に集結し、国や立場の違いを越えて「協力」の新しいかたちを語り合う対話イベントです。様々な分野におけるイノベーション（革新）やレジリエンス（回復力）、地方創生をテーマに、日米韓の有識者や若手リーダーをお招きし、次世代の「協力」のあり方を参加者の皆さまと共に考える機会となっております。" }
   , organizer:{en:"INTILAQ Tohoku Innovation Center, zero to one, Inc.", ja: "INTILAQ東北イノベーションセンター, 株式会社 zero to one" }, support: {en:"Sendai City, United States Embassy, Consulate General of the Republic of Korea in Sendai", ja: "仙台市、在日米国大使館、駐仙台大韓民国総領事館"},
  participants: { en: "40 participants (24 on site, 16 online)", ja: "参加者40名（会場24名・オンライン16名）" },
     lead: { en: "Sora Yamasaki (TogetherWeTri Japan Branch)", ja: "山﨑蒼空（TogetherWeTri 日本支部）" }, 
   schedule: [
      { time: "14:00–14:20", en: "Opening and Congratulatory Remarks", ja: "開会・ご挨拶" },
      { time: "14:20–15:30", en: "Part I — Keynote Addresses (Claire Park; Takashi Takekawa)", ja: "第1部 基調講演（Claire Park氏、竹川隆司氏）" },
      { time: "15:40–16:20", en: "Part II — Panel Discussion: Beyond Borders — People, Innovation, and Resilience  (Robert Everman, Shosuke Hasegawa, Taichi Deguchi, Miku Narisawa)", ja: "第2部 パネルディスカッション「Beyond Borders — 人・イノベーション・レジリエンス」（Robert Everman氏, 長谷川翔亮氏, 出口敦智氏, 成澤みく氏)" },
      { time: "16:25–16:55", en: "Part III — Group Discussion: From Here to the World — Turning Ideas into Action", ja: "第3部 グループディスカッション「ここから世界へ — アイデアを行動に」" },
      { time: "16:55–17:00", en: "Closing", ja: "閉会" }
    ],
    gallery: [
      { src: "sendai1010-1.jpg", en: "TogetherWeTri members with speakers and panelists", ja: "登壇者・パネリストとTogetherWeTriメンバー" },
      { src: "sendai1010-2.jpg", en: "Opening remarks (Masahiro Yamaguchi, Executive Vice President, Tohoku University)", ja: "開会のご挨拶（東北大学 理事・副学長 山口昌弘氏）" },
      { src: "sendai1010-3.jpg", en: "Keynote I (Claire Park)", ja: "基調講演I（Claire Park氏）" },
      { src: "sendai1010-4.jpg", en: "Keynote II (Takashi Takekawa)", ja: "基調講演II（竹川隆司氏）" },
      { src: "sendai1010-5.jpg", en: "Panel discussion", ja: "パネルディスカッション" },
      { src: "sendai1010-6.jpg", en: "Group discussion", ja: "グループディスカッション" }
    ],
    photo: "poster-sendai1010.jpg", report: "report-sendai1010.pdf"},
   { date: "2026-06-13", time: "10:00 – 14:00 JST", sample: false,
    title: { en: "U.S.–ROK–Japan Professional x Youth Dialogue"},
    place: { en: "Hosei University Ichigaya Campus, Fujimi Gate G401"}, format: "inperson", langs: "EN",
    desc: { en: "Building on TogetherWeTri’s trilateral youth network and JASC’s student-led U.S.-Japan exchange legacy since 1934, this forum will expand people-to-people dialogue into a practical U.S.–ROK–Japan framework. The program will explore how next-generation leaders and experienced professionals can work together to strengthen public diplomacy, regional cooperation, and a secure and prosperous Indo-Pacific.", ja: "TogetherWeTriが築いてきた日米韓の若者ネットワークと、1934年以来、学生主体の日米交流を続けてきたJASCの伝統を基盤に、本フォーラムでは、人と人との対話を日米韓三か国の実践的な協力の枠組みへと発展させます。" }
   , participants: { en: "133 participants from 7 countries and regions", ja: "参加者133名（7か国・地域）" },
    cohost: { en: "Japan-America Student Conference (JASC), TogetherWeTri", ja: "日米学生会議（JASC）、TogetherWeTri" },
    support: "U.S. Embassy Seoul, The Federation of Korean Students in Japan, Korea Japan English Camp (KJEC), Hosei University",
    lead: { en: "Mayu Kitahara (TogetherWeTri Japan Branch)", ja: "北原真悠（TogetherWeTri 日本支部）" },
    schedule: [
      { en: "Keynote 1 — Ms. Kanako Date (Public Speaker, Youth Empowerment Producer)", ja: "基調講演1 — 伊達佳内子氏（パブリックスピーカー、ユース・エンパワーメント・プロデューサー）" },
      { en: "Keynote 2 — Ambassador Ichiro Fujisaki (President, America-Japan Society)", ja: "基調講演2 — 藤崎一郎 元駐米大使（日米協会会長）" },
      { en: "Keynote 3 — Ambassador Cheol Hee Park (Special Advisor, International House of Japan)", ja: "基調講演3 — 朴喆熙 前駐日韓国大使（国際文化会館 特別顧問）" },
      { en: "Group discussion in small groups", ja: "少人数でのグループディスカッション" },
      { en: "Networking reception", ja: "交流会" }
    ],
    gallery: [
      { src: "tokyo0613-1.jpg", en: "Participants and speakers", ja: "参加者と登壇者" },
      { src: "tokyo0613-2.jpg", en: "Keynote session", ja: "基調講演" },
      { src: "tokyo0613-3.jpg", en: "Keynote session", ja: "基調講演" },
      { src: "tokyo0613-4.jpg", en: "Group discussion", ja: "グループディスカッション" },
      { src: "tokyo0613-5.jpg", en: "Networking reception", ja: "交流会" },
      { src: "tokyo0613-6.jpg", en: "Organizing team", ja: "運営チーム" }
    ],
    photo: "poster-tokyo0613.jpg", report: "report-tokyo0613.pdf"},
    { date: "2026-06-12 ~ 2026-06-13", sample: false,
    title: { en: "Now It is your Turn"}, format: "inperson", langs: "EN",
    desc: { en: "A youth-led U.S.–ROK–Japan initiative building on the 2026 YTL Alumni Workshop in Honolulu to co-create practical counter-speech and media literacy learning tools for high school classrooms. Bringing together YTL and Trilateral Teacher Training (TTT) alumni, the project connects freedom of speech, responsible communication, and journalism with classroom practice and community-based learning.",
           ja: "2026年のホノルルYTL同窓生ワークショップを発展させ、日米韓の若者が協働し、高校で活用できるカウンタースピーチとメディアリテラシーの教材を共創する取り組みです。YTL・日韓合同英語教員養成プログラム(TTT)修了生が連携し、表現の自由や責任あるコミュニケーション、ジャーナリズムへの理解を、授業や地域社会での実践につなげます。" }
   ,support: {en:"U.S. Embassy Seoul, U.S. Embassy Tokyo, Korea Japan English Camp (KJEC), the East-West Center, the Future of Free Speech", ja: "在韓米国大使館, 在日米国大使館, Korea Japan English Camp (KJEC), the East-West Center, the Future of Free Speech"},
     place: { en: "Nikkei Inc. (June 12) / Hosei University, Ichigaya Campus (June 13)", ja: "日本経済新聞社（6/12）・法政大学 市ヶ谷キャンパス（6/13）" },
    lead: { en: "Seoyeong Lee (TogetherWeTri ROK Branch)", ja: "Seoyeong Lee（TogetherWeTri 韓国支部）" },
    schedule: [
      { day: { en: "June 12 (Fri), 2:00–5:00 PM · Nikkei Inc.", ja: "6月12日（金）14:00–17:00・日本経済新聞社" } },
      { en: "Site visit and briefing on generative AI, social media and journalism with Mr. Waichi Sekiguchi (Chairman, MM Research Institute) and Ms. Sachiko Murui (Nikkei Inc.)", ja: "生成AI・SNSとジャーナリズムに関する視察とブリーフィング（MM総研 関口和一会長、日本経済新聞社 Sachiko Murui氏）" },
      { en: "Visit to the NIKKEI MUSEUM", ja: "NIKKEI MUSEUM 見学" },
      { day: { en: "June 13 (Sat), 2:30–6:30 PM · Hosei University, Ichigaya Campus", ja: "6月13日（土）14:30–18:30・法政大学 市ヶ谷キャンパス" } },
      { en: "Keynote — Media & Journalism Perspective (Ms. Haruka Satake, YTL alumna and journalist)", ja: "基調講演：メディアとジャーナリズムの視点（YTL修了生・記者 Haruka Satake氏）" },
      { en: "Keynote — The Future of Free Speech (Dr. Natalie Alkiviadou, online)", ja: "基調講演：The Future of Free Speech（Natalie Alkiviadou博士、オンライン）" },
      { en: "Curriculum Development Co-Creation Workshop (Dr. L.G. Michael Brown, Tokyo International University)", ja: "教材づくり共創ワークショップ（東京国際大学 L.G. Michael Brown博士）" },
      { en: "Group presentations and final synthesis", ja: "グループ発表とまとめ" }
    ],
    gallery: [
      { src: "tokyo0612-1.jpg", en: "Group photo", ja: "集合写真" },
      { src: "tokyo0612-2.jpg", en: "Visit to the NIKKEI MUSEUM (June 12)", ja: "NIKKEI MUSEUM 見学（6/12）" },
      { src: "tokyo0612-3.jpg", en: "Keynote session", ja: "基調講演" },
      { src: "tokyo0612-4.jpg", en: "Co-creation workshop", ja: "共創ワークショップ" },
      { src: "tokyo0612-5.jpg", en: "Lesson planning in groups", ja: "グループでの授業案づくり" },
      { src: "tokyo0612-6.jpg", en: "Certificate of completion", ja: "修了証の授与" }
    ],
    photo: "poster-tokyo0612.jpg", report: "report-tokyo0612.pdf"},
  { date: "2026-03-08", time: "11:00 – 13:00 JST", sample: false,
    title: { en: "Trilateral Sports Diplomacy Dialogue in Tokyo – From Olympic Legacy to Sports Diplomacy"},
    place: { en: "Lakeland University Japan Conference Room (Muskie Hall)"}, format: "inperson", langs: "EN",
    desc: { en: "This session will explore how sports, Olympic legacy, and urban engagement can contribute to public diplomacy and future trilateral collaboration", ja: "本セッションでは、スポーツを通じた人と人とのつながりが、次世代の国際協力や公共外交にどのような可能性をもたらすのかをテーマに、専門家やリーダーとともに議論を行います。" }
   , participants: { en: "40+ participants", ja: "40名以上が参加" },
    video: "https://youtu.be/BWPahOFDPqM",
    gallery: [ { src: "tokyo0308-1.jpg", en: "Group photo", ja: "集合写真" } ],
    photo: "poster-tokyo0308.jpg", report: "report-tokyo0308.pdf"},
  { date: "2026-03-06", time: "14:00–17:00 JST", sample: false,
    title: { en: "YTL U.S.-ROK-Japan Cooperation Dialogue in Tokyo"},
    place: { en: "Lakeland University Japan Conference Room (Muskie Hall) "}, format: "inperson", langs: "EN",
    desc: { en: "This session will explore how strengthening Japan–ROK partnership can further advance U.S.–ROK–Japan collaboration in support of Indo-Pacific stability. Featuring speakers and panelists from diverse academic and professional backgrounds, the dialogue aims to foster thoughtful discussion, cross-border connections, and practical perspectives on youth-driven cooperation.", ja: "本セッションでは、日韓パートナーシップの強化を通じて、インド太平洋地域の安定に向けた日米韓協力をどのように発展させていけるかをテーマに、多様な分野で活躍するスピーカーやパネリストとともに議論を行います。" }
   , participants: { en: "80+ participants (hybrid)", ja: "80名以上が参加（ハイブリッド開催）" },
    video: "https://youtu.be/sIRlnjUECDs",
    gallery: [ { src: "tokyo0306-1.jpg", en: "Group photo", ja: "集合写真" } ],
    photo: "poster-tokyo0306.jpg", report: "report-tokyo0308.pdf"}
];

const POST_CATS = {
  newsletter: { en: "Newsletter", ja: "ニュースレター", ko: "뉴스레터", color: "#142F4C" },
  recap: { en: "Event recap", ja: "イベント報告", ko: "행사 보고", color: "#BE3431" },
  explainer: { en: "Explainer", ja: "解説", ko: "해설", color: "#2C538E" },
  story: { en: "Member story", ja: "メンバーの声", ko: "멤버 이야기", color: "#28356A" }
};
const POSTS = [
  { date: "2026-10-01", cat: "newsletter", sample: true,
    title: { en: "Japan Branch Newsletter, Issue 1", ja: "日本支部ニュースレター 第1号" },
    excerpt: { en: "Our first issue: who we are, what is coming this autumn, and how to get involved.", ja: "創刊号。私たちの紹介、今秋の予定、参加方法をお届けします。" },
    body: { en: ["Welcome to the first newsletter from the TogetherWeTri Japan Branch. Each issue will bring you upcoming events, short recaps and one explainer on trilateral policy.", "This autumn we are hosting a youth dialogue on economic security in Tokyo and an online workshop on semiconductors and AI with peers in Seoul and Washington.", "We are also looking for new team members to help with programs, communications and local projects. If that sounds like you, write to us through the contact page."],
            ja: ["TogetherWeTri日本支部の最初のニュースレターへようこそ。毎号、今後のイベント、活動報告、日米韓の政策解説をお届けします。", "今秋は、東京での経済安全保障をテーマにしたユースダイアローグと、ソウル・ワシントンの仲間と合同で行う半導体・AIのオンラインワークショップを予定しています。", "企画・広報・地域プロジェクトを担う運営メンバーも募集中です。関心のある方は、お問い合わせページからご連絡ください。"] } },
  { date: "2026-09-30", cat: "recap", sample: true,
    title: { en: "Recap: Japan Branch Kickoff Meetup", ja: "報告：日本支部キックオフ交流会" },
    excerpt: { en: "What we heard at our first gathering in Tokyo, and the three priorities we set for the year.", ja: "東京での最初の交流会で出た声と、今年の3つの重点テーマ。" },
    body: { en: ["Our kickoff brought together YTL alumni, students and young professionals in Tokyo for an evening of introductions and planning.", "Participants asked for more events outside Tokyo, more chances to work directly with Korean and American peers, and plain-language explanations of trilateral agreements.", "Those three requests now shape our plans for the year."],
            ja: ["キックオフ交流会には、YTL修了生、学生、若手社会人が東京に集まり、自己紹介と今後の企画について話し合いました。", "参加者からは、東京以外でのイベントを増やしてほしい、韓国・米国の仲間と直接協働する機会がほしい、日米韓の合意を分かりやすく解説してほしい、という声が寄せられました。", "この3つの要望が、今年の活動計画の柱になっています。"] } },
  { date: "2026-08-15", cat: "explainer", sample: true,
    title: { en: "From Camp David to campus: what the 2023 commitments mean for young people", ja: "キャンプ・デービッドからキャンパスへ：2023年の合意は若者にとって何を意味するか" },
    excerpt: { en: "A short guide to the three Camp David documents and where youth fit in.", ja: "キャンプ・デービッドで発表された3つの文書と、若者の関わり方をまとめました。" },
    body: { en: ["At Camp David in August 2023, the leaders of Japan, the United States and Korea released three documents: a joint statement known as the Spirit of Camp David, the Camp David Principles, and a Commitment to Consult.", "Together they set out regular trilateral meetings and cooperation across security, economic security, technology and people-to-people exchange.", "People-to-people ties are where young people come in. Agreements between governments last longer when the people of the three countries know and trust each other."],
            ja: ["2023年8月のキャンプ・デービッドで、日米韓の首脳は3つの文書を発表しました。「キャンプ・デービッドの精神」と呼ばれる共同声明、「キャンプ・デービッド原則」、そして「協議するとのコミットメント」です。", "これらは、定期的な三か国会合の開催と、安全保障、経済安全保障、技術、人的交流にわたる協力を打ち出しています。", "若者が関われるのが、この人的交流の分野です。政府間の合意は、三か国の人々が互いを知り信頼し合うことで、より長く続くものになります。"] } },
  { date: "2026-07-20", cat: "story", sample: true,
    title: { en: "Why I joined: notes from a YTL alum", ja: "参加した理由：YTL修了生の声" },
    excerpt: { en: "A member reflects on what changed after the summit, and why the work has to continue locally.", ja: "サミット後に何が変わったのか、そしてなぜ地域で活動を続けるのか。メンバーが振り返ります。" },
    body: { en: ["Replace this sample with a real member story. A good story covers what the person expected from the YTL Summit, one moment that changed their view, and what they are working on now.", "Keep it to four or five short paragraphs and add a photo if you have one."],
            ja: ["このサンプルを実際のメンバーのストーリーに差し替えてください。YTLサミットに参加する前の期待、考えが変わった瞬間、現在取り組んでいることを書くと伝わりやすくなります。", "4〜5段落程度の短い文章にまとめ、写真があれば添えてください。"] } }
];

// 問い合わせフォームの「お問い合わせ内容」の選択肢
// to: "japan" の項目は日本支部（SITE.japanEmail）、to: "korea" の項目は韓国支部（SITE.koreaEmail）宛てになります。
const TOPICS = [
  { id: "general",     en: "General question",          ja: "一般的なご質問",         ko: "일반 문의" },
  { id: "japan",       en: "Japan Branch",              ja: "日本支部について",       ko: "일본 지부 관련",       to: "japan" },
  { id: "korea",       en: "Korea Branch",              ja: "韓国支部について",       ko: "한국 지부 관련",       to: "korea" },
  { id: "us",          en: "U.S. Branch",               ja: "米国支部について",       ko: "미국 지부 관련" },
  { id: "event",       en: "Event registration",        ja: "イベント参加申し込み",   ko: "행사 참가 신청",       to: "japan" },
  { id: "join",        en: "Joining the team",          ja: "運営メンバーへの応募",   ko: "운영 멤버 지원",       to: "japan" },
  { id: "partnership", en: "Partnership or co-hosting", ja: "連携・共催のご相談",     ko: "협력·공동 개최 제안" },
  { id: "speaker",     en: "Speaking or mentoring",     ja: "登壇・メンター",         ko: "연사·멘토",            to: "japan" },
  { id: "media",       en: "Media",                     ja: "取材",                   ko: "언론 문의" },
  { id: "newsletter",  en: "Newsletter subscription",   ja: "ニュースレター購読",     ko: "뉴스레터 구독",        to: "japan" }
];

// ------------------------------------------------------------------
// 韓国支部のイベント（書き方は上の EVENTS と同じです。ko に韓国語を書けます）
//   links: [ { en: "...", ja: "...", ko: "...", url: "https://..." } ]   報道・関連リンク
// ------------------------------------------------------------------
const KOREA_EVENTS = [
  { date: "2025-12-19 ~ 2025-12-20", format: "In person", langs: "EN / KO",
    title: { en: "YTL Regional Cooperation Roundtable in Busan", ja: "YTL地域協力ラウンドテーブル in 釜山", ko: "YTL 지역 협력 라운드테이블 in 부산" },
    place: { en: "Busan American Corner, Pukyong National University", ja: "釜山アメリカン・コーナー（国立釜慶大学校）", ko: "부산 아메리칸 코너 (국립부경대학교)" },
    desc: { en: "Exploring U.S.–ROK–Japan cooperation in the global maritime city of Busan. Next-generation leaders, policy experts and local university students discussed maritime security, emerging technologies and value-based alliances through expert lectures, interactive roundtables and a policy proposal session.",
            ja: "海洋都市・釜山で日米韓協力を考えるワークショップ。次世代リーダー、政策専門家、地元の大学生が、専門家の講演、参加型ラウンドテーブル、政策提言セッションを通じて、海洋安全保障、新興技術、価値観に基づく同盟について議論しました。",
            ko: "글로벌 해양도시 부산에서 한미일 협력을 모색한 워크숍입니다. 차세대 리더, 정책 전문가, 지역 대학생들이 전문가 강연, 참여형 라운드테이블, 정책 제안 세션을 통해 해양 안보, 신기술, 가치 기반 동맹에 대해 논의했습니다." },
    participants: { en: "42 participants · about 120 online engagements", ja: "42名が参加・オンラインで約120件の反響", ko: "42명 참가 · 온라인 반응 약 120건" },
    organizer: { en: "TogetherWeTri Korea Branch", ja: "TogetherWeTri 韓国支部", ko: "TogetherWeTri 한국 지부" },
    partners: { en: "Busan American Corner, Pusan National University, Pukyong National University, Korea Maritime and Ocean University, U.S. Consulate in Busan", ja: "釜山アメリカン・コーナー、釜山大学校、釜慶大学校、韓国海洋大学校、在釜山米国領事館", ko: "부산 아메리칸 코너, 부산대학교, 부경대학교, 한국해양대학교, 주부산 미국영사관" },
    schedule: [
      { day: { en: "December 19 (Fri) · Workshop, 14:00–16:00", ja: "12月19日（金）ワークショップ 14:00–16:00", ko: "12월 19일 (금) 워크숍 14:00–16:00" } },
      { time: "", en: "Opening — Gabi Kim (moderator)", ja: "開会 — Gabi Kim（司会）", ko: "개회 — Gabi Kim (사회)" },
      { time: "", en: "Why the Sea Matters: Trilateral Maritime Security Cooperation — Jinwan Park", ja: "なぜ海が重要か：日米韓の海洋安全保障協力 — Jinwan Park", ko: "왜 바다가 중요한가: 한미일 해양안보 협력 — Jinwan Park" },
      { time: "", en: "Korea's SSN Debate and the East Asian AUKUS — SeungHwan Kim", ja: "韓国の原子力潜水艦論争と「東アジア版AUKUS」 — SeungHwan Kim", ko: "한국의 핵추진잠수함 논쟁과 동아시아판 AUKUS — SeungHwan Kim" },
      { time: "", en: "Understanding consensus of democratic value for advanced trilateral relations — JoongEon An", ja: "日米韓関係の深化に向けた民主主義的価値の共通理解 — JoongEon An", ko: "한미일 관계 발전을 위한 민주주의 가치의 공감대 — JoongEon An" },
      { time: "", en: "Panel and roundtable with local students — Ji-Yun Park, Seoyeong Lee, Seungbeom Ryan Son, Daehan Lee, Joseph Sejin Kim", ja: "パネル・地元学生とのラウンドテーブル — Ji-Yun Park、Seoyeong Lee、Seungbeom Ryan Son、Daehan Lee、Joseph Sejin Kim", ko: "패널 토론 및 지역 학생 라운드테이블 — Ji-Yun Park, Seoyeong Lee, Seungbeom Ryan Son, Daehan Lee, Joseph Sejin Kim" },
      { day: { en: "December 20 (Sat)", ja: "12月20日（土）", ko: "12월 20일 (토)" } },
      { time: "", en: "Closed-door meeting with Consul Dewey Moore, U.S. Consulate in Busan", ja: "在釜山米国領事館 デューイ・ムーア領事との非公開ミーティング", ko: "주부산 미국영사관 듀이 무어 영사와의 비공개 미팅" },
      { time: "", en: "Policy proposal meeting", ja: "政策提言ミーティング", ko: "정책 제안 미팅" }
    ],
    gallery: [
      { src: "busan1219-1.jpg", en: "Group photo", ja: "集合写真", ko: "단체 사진" },
      { src: "busan1219-2.jpg", en: "Gabi Kim (moderator)", ja: "Gabi Kim（司会）", ko: "Gabi Kim (사회)" },
      { src: "busan1219-3.jpg", en: "Jinwan Park", ja: "Jinwan Park", ko: "Jinwan Park" },
      { src: "busan1219-4.jpg", en: "Panel: Daehan Lee and Joseph Sejin Kim", ja: "パネル：Daehan Lee、Joseph Sejin Kim", ko: "패널: Daehan Lee, Joseph Sejin Kim" },
      { src: "busan1219-5.jpg", en: "Roundtable with local university students", ja: "地元の大学生とのラウンドテーブル", ko: "지역 대학생과의 라운드테이블" },
      { src: "busan1219-6.jpg", en: "Meeting with Consul Dewey Moore", ja: "デューイ・ムーア領事とのミーティング", ko: "듀이 무어 영사와의 미팅" }
    ],
    video: "https://drive.google.com/file/d/1yHC5_UxoXDRwLEDXUXRKrssu14qtksHz/view?usp=drive_link",
    links: [
      { en: "BeFM “Busan Worldwide” (Jan 16, 2026)", ja: "BeFM「Busan Worldwide」（2026年1月16日）", ko: "BeFM ‘Busan Worldwide’ (2026년 1월 16일)", url: "https://www.youtube.com/live/aPqa5k5ALpE" },
      { en: "BeFM “Morning Wave in Busan” (Dec 18, 2025)", ja: "BeFM「Morning Wave in Busan」（2025年12月18日）", ko: "BeFM ‘Morning Wave in Busan’ (2025년 12월 18일)", url: "https://www.youtube.com/live/CTQ5f2fELKA" },
      { en: "Pukyong National University Press", ja: "釜慶大学校 学内新聞", ko: "부경대신문", url: "https://press.pknu.ac.kr/news/articleView.html?idxno=789" }
    ],
    poster: "poster-busan1219.jpg", report: "report-busan1219.pdf" },

  { date: "2025-11-15 ~ 2025-11-16", format: "In person", langs: "EN / KO",
    title: { en: "YTL Regional Cooperation Roundtable in Gwangju", ja: "YTL地域協力ラウンドテーブル in 光州", ko: "YTL 지역 협력 라운드테이블 in 광주" },
    place: { en: "Gwangju American Corner", ja: "光州アメリカン・コーナー", ko: "광주 아메리칸 코너" },
    desc: { en: "The first TogetherWeTri convening. YTL alumni and Gwangju-based young people examined how locally anchored engagement can reinforce U.S.–ROK–Japan cooperation, and proposed ideas ranging from a Gwangju–San Antonio–Sendai youth congress to cooperation on energy storage, AI and drones.",
            ja: "TogetherWeTri最初のワークショップ。YTL修了生と光州の若者が、地域に根ざした取り組みが日米韓協力をどう支えられるかを議論し、光州・サンアントニオ・仙台の三都市ユース会議から、エネルギー貯蔵・AI・ドローン分野での協力まで、さまざまな提案をまとめました。",
            ko: "TogetherWeTri의 첫 워크숍입니다. YTL 수료생과 광주 지역 청년들이 지역에 뿌리내린 참여가 한미일 협력을 어떻게 뒷받침할 수 있는지 논의하고, 광주–샌안토니오–센다이 청년 회의부터 에너지 저장장치·AI·드론 분야 협력까지 다양한 제안을 도출했습니다." },
    participants: { en: "14 participants · 8 YTL alumni speakers · 93.3% high satisfaction", ja: "14名が参加・YTL修了生8名が登壇・満足度93.3%", ko: "14명 참가 · YTL 수료생 연사 8명 · 만족도 93.3%" },
    organizer: { en: "TogetherWeTri Korea Branch", ja: "TogetherWeTri 韓国支部", ko: "TogetherWeTri 한국 지부" },
    partners: { en: "Gwangju American Corner", ja: "光州アメリカン・コーナー", ko: "광주 아메리칸 코너" },
    schedule: [
      { day: { en: "Day 1", ja: "1日目", ko: "1일 차" } },
      { time: "", en: "Opening — Seungbeom Ryan Son (moderator)", ja: "開会 — Seungbeom Ryan Son（司会）", ko: "개회 — Seungbeom Ryan Son (사회)" },
      { time: "", en: "YTL alumni presentations — Jaewon Kim, Soren Israel Dickson, Hyoseo Nam, Byungjoon You, SeungHwan Kim, Gabi Kim", ja: "YTL修了生による発表 — Jaewon Kim、Soren Israel Dickson、Hyoseo Nam、Byungjoon You、SeungHwan Kim、Gabi Kim", ko: "YTL 수료생 발표 — Jaewon Kim, Soren Israel Dickson, Hyoseo Nam, Byungjoon You, SeungHwan Kim, Gabi Kim" },
      { time: "", en: "Roundtable with local participants", ja: "地元参加者とのラウンドテーブル", ko: "지역 참가자와의 라운드테이블" },
      { day: { en: "Day 2", ja: "2日目", ko: "2일 차" } },
      { time: "", en: "Policy proposal session", ja: "政策提言セッション", ko: "정책 제안 세션" },
      { time: "", en: "Cultural visit to the Asia Culture Center (ACC)", ja: "国立アジア文化殿堂（ACC）見学", ko: "국립아시아문화전당(ACC) 문화 탐방" }
    ],
    gallery: [
      { src: "gwangju1115-1.jpg", en: "Group photo", ja: "集合写真", ko: "단체 사진" },
      { src: "gwangju1115-2.jpg", en: "Opening", ja: "開会", ko: "개회" },
      { src: "gwangju1115-3.jpg", en: "Soren Israel Dickson", ja: "Soren Israel Dickson", ko: "Soren Israel Dickson" },
      { src: "gwangju1115-4.jpg", en: "Group photo", ja: "集合写真", ko: "단체 사진" },
      { src: "gwangju1115-5.jpg", en: "Policy proposal meeting", ja: "政策提言ミーティング", ko: "정책 제안 미팅" },
      { src: "gwangju1115-6.jpg", en: "Policy proposal meeting", ja: "政策提言ミーティング", ko: "정책 제안 미팅" }
    ],
    video: "https://youtu.be/43I2Fiacp_0",
    poster: "poster-gwangju1115.jpg", report: "report-gwangju1115.pdf" }
];

// 한국지부 멤버
// 예시: { name: { en: "Name", ja: "氏名", ko: "이름" }, role: { en: "Co-founder", ja: "共同創設者", ko: "공동 창립자" }, aff: { en: "...", ja: "...", ko: "..." }, bio: { en: "...", ja: "...", ko: "..." }, photo: "" },
const KOREA_MEMBERS = [ { name: { en: "Seungbeom Ryan Son", ja: "Seungbeom Ryan Son", ko: "손승범" }, role: { en: "Co-founder", ja: "共同創設者", ko: "공동 창립자" }, aff: { en: "...", ja: "...", ko: "..." }, bio: { en: "...", ja: "...", ko: "..." }, photo: ""},
  { name: { en: "Seoyeong Lee", ja: "Seoyeong Lee", ko: "이서영" }, role: { en: "Co-founder", ja: "共同創設者", ko: "공동 창립자" }, aff: { en: "...", ja: "...", ko: "..." }, bio: { en: "...", ja: "...", ko: "..." }, photo: "" },
  { name: { en: "Gabi Kim", ja: "Gabi Kim", ko: "김가빈" }, role: { en: "Co-founder", ja: "共同創設者", ko: "공동 창립자" }, aff: { en: "...", ja: "...", ko: "..." }, bio: { en: "...", ja: "...", ko: "..." }, photo: "" },
  { name: { en: "Name", ja: "氏名", ko: "이름" }, role: { en: "Role", ja: "役割", ko: "역할" }, aff: { en: "...", ja: "...", ko: "..." }, bio: { en: "...", ja: "...", ko: "..." }, photo: ""  }                     
];

// 米国支部のイベントとメンバー（書き方は EVENTS・MEMBERS と同じです）
const US_EVENTS = [
];
const US_MEMBERS = [
];
