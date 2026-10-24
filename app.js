/* TogetherWeTri — site logic. You normally do not need to edit this file; update content in data.js. */

/* If data.js has a typo, show where instead of a half-broken page */
if (window.__dataError || typeof SITE === "undefined" || typeof EVENTS === "undefined" || typeof MEMBERS === "undefined" || typeof POSTS === "undefined" || typeof TOPICS === "undefined") {
  const err = window.__dataError;
  const bar = document.createElement("div");
  bar.className = "data-error"; bar.setAttribute("role", "alert");
  bar.innerHTML = "<b>The content cannot be shown because data.js has a mistake.</b>" +
    (err && err.line ? ` Check around line ${err.line}.` : "") +
    " Common causes are a missing or extra comma ( , ) or a missing closing quote (\"). You can also restore the previous version from History on GitHub.";
  document.body.prepend(bar);
  throw new Error("data.js could not be loaded" + (err ? ` (line ${err.line}: ${err.msg})` : ""));
}
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const LANGS = ["en", "ja", "ko"];
const PAGES = ["home", "about", "japan", "korea", "us", "contact"];
// Pages with sub-pages: each sub-page has its own address (#japan-events, #about-aeif …)
const SUBS = {
  about: ["about", "about-aeif"],
  japan: ["japan", "japan-events", "japan-news", "japan-members"],
  korea: ["korea", "korea-events", "korea-members"],
  us: ["us", "us-events", "us-members"]
};
const pageOf = (route) => Object.keys(SUBS).find((p) => SUBS[p].includes(route)) || route;
// Addresses used by the old sites keep working
const ALIASES = { aeif: "about-aeif", events: "japan-events", news: "japan-news", members: "japan-members", "about-members": "japan-members", branches: "home" };
let LANG = "en";
let evFilter = "upcoming";
let postFilter = "all";
const TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
// Event lists in data.js: "jp" = EVENTS (Japan), "kr" = KOREA_EVENTS (Korea), "us" = US_EVENTS, "aeif" = AEIF_EVENTS
const EV_SETS = {
  jp: { list: () => EVENTS, topic: "event" },
  kr: { list: () => (typeof KOREA_EVENTS !== "undefined" ? KOREA_EVENTS : []), topic: "korea" },
  us: { list: () => (typeof US_EVENTS !== "undefined" ? US_EVENTS : []), topic: "us" },
  aeif: { list: () => (typeof AEIF_EVENTS !== "undefined" ? AEIF_EVENTS : []), topic: "general" }
};
// Members of the Korea and U.S. branches (data.js: KOREA_MEMBERS, US_MEMBERS)
const BRANCH_MEMBERS = {
  kr: () => (typeof KOREA_MEMBERS !== "undefined" ? KOREA_MEMBERS : []),
  us: () => (typeof US_MEMBERS !== "undefined" ? US_MEMBERS : [])
};
const brFilter = {};
const evKey = (e) => { for (const k in EV_SETS) { const i = EV_SETS[k].list().indexOf(e); if (i > -1) return k + ":" + i; } return ""; };
const evByKey = (key) => { const [k, i] = String(key).split(":"); return EV_SETS[k] ? EV_SETS[k].list()[Number(i)] : null; };

const L = (en, ja, ko) => (LANG === "ja" ? ja : LANG === "ko" ? (ko ?? en) : en);
// text from data.js: { en, ja, ko } — falls back to English when a language is missing
const t = (o) => (o && typeof o === "object") ? (o[LANG] ?? o.en ?? o.ja ?? "") : (o ?? "");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- dates ---------- */
const parseDate = (s) => { const [y, m, d] = String(s).trim().slice(0, 10).split("-").map(Number); return new Date(y, m - 1, d); };
// Event dates: date: "2026-06-12", or a range date: "2026-06-12 ~ 2026-06-14" (or endDate: "2026-06-14")
const evStart = (e) => parseDate(e.date);
const evEnd = (e) => { const parts = String(e.date).split(/[~〜]/); const end = e.endDate || (parts[1] && parts[1].trim()); return end ? parseDate(end) : evStart(e); };
const MONTHS_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fmtDate = (d) => LANG === "ja" ? `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  : LANG === "ko" ? `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
  : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const fmtLong = (s) => fmtDate(parseDate(s));
function fmtRange(e) {
  const a = evStart(e), b = evEnd(e);
  if (+a === +b) return fmtDate(a);
  const sameY = a.getFullYear() === b.getFullYear(), sameM = sameY && a.getMonth() === b.getMonth();
  if (LANG === "ja") return `${fmtDate(a)}〜${sameY ? "" : b.getFullYear() + "年"}${sameM ? "" : (b.getMonth() + 1) + "月"}${b.getDate()}日`;
  if (LANG === "ko") return `${fmtDate(a)}~${sameY ? "" : b.getFullYear() + "년 "}${sameM ? "" : (b.getMonth() + 1) + "월 "}${b.getDate()}일`;
  const md = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return sameM ? `${md(a)}–${b.getDate()}, ${b.getFullYear()}` : sameY ? `${md(a)} – ${md(b)}, ${b.getFullYear()}` : `${fmtDate(a)} – ${fmtDate(b)}`;
}
const monthShort = (d) => LANG === "ja" ? (d.getMonth() + 1) + "月" : LANG === "ko" ? (d.getMonth() + 1) + "월" : MONTHS_EN[d.getMonth()];

/* ---------- events ---------- */
// Organizers, supporters and partners shown under each event
const CREDIT_KEYS = [
  ["organizer", "Organized by", "主催", "주최"],
  ["cohost", "Co-hosted by", "共催", "공동 주최"],
  ["support", "Supported by", "後援", "후원"],
  ["sponsor", "Sponsored by", "協賛", "협찬"],
  ["partners", "In collaboration with", "協力", "협력"],
  ["lead", "Program lead", "企画担当", "기획 담당"]
];
function creditText(v) {
  if (!v) return "";
  if (Array.isArray(v)) return v.map(creditText).filter(Boolean).join(LANG === "ja" ? "、" : ", ");
  if (typeof v === "object") return t(v);
  return String(v);
}
function creditsHTML(e) {
  const rows = CREDIT_KEYS.map(([k, en, ja, ko]) => { const v = creditText(e[k]); return v ? `<dt>${L(en, ja, ko)}</dt><dd>${esc(v)}</dd>` : ""; }).join("");
  return rows ? `<dl class="ev-credits">${rows}</dl>` : "";
}
function formatLabel(f) {
  const s = String(f || "").toLowerCase();
  const online = s.includes("online"), inPerson = s.includes("person");
  if (s.includes("hybrid") || (online && inPerson)) return L("Hybrid (in person + online)", "ハイブリッド（対面・オンライン）", "하이브리드 (대면 + 온라인)");
  return online ? L("Online", "オンライン", "온라인") : L("In person", "対面", "대면");
}
const DOC_ICON = '<svg class="ico-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/></svg>';
const posterBtn = (e, i, lazy) => `<button type="button" class="ev-poster" data-poster="${i}"><img src="${esc(e.poster || e.photo)}" alt="${esc(L("Poster: ", "ポスター：", "포스터: ") + t(e.title))}"${lazy ? ' loading="lazy"' : ""}><span>${L("View poster", "ポスターを拡大", "포스터 크게 보기")}</span></button>`;
function eventActions(e, past) {
  const report = e.report || "";
  const out = [];
  const topic = (EV_SETS[evKey(e).split(":")[0]] || EV_SETS.jp).topic;
  if (!past) out.push(`<a class="btn" href="#contact" data-nav="contact" data-topic="${topic}" data-event="${esc(t(e.title))}">${L("Register", "申し込む", "신청하기")}</a>`);
  if (report) out.push(`<a class="btn ${past ? "" : "ghost"}" href="${esc(report)}" target="_blank" rel="noopener">${DOC_ICON}${L("Event report", "イベントレポート", "행사 보고서")}${/\.pdf($|[?#])/i.test(report) ? " (PDF)" : ""}</a>`);
  return out;
}
const chipsHTML = (e, past) => `<div class="chips">
        <span class="chip">${formatLabel(e.format)}</span>${e.langs ? `<span class="chip">${esc(e.langs)}</span>` : ""}
        ${past ? `<span class="chip past">${L("Past", "終了", "종료")}</span>` : ""}
        ${e.sample ? `<span class="chip sample">${L("Sample", "サンプル", "샘플")}</span>` : ""}
      </div>`;

function eventHTML(e) {
  const i = evKey(e);
  const d = evStart(e);
  const past = evEnd(e) < TODAY;
  const poster = e.poster || e.photo || "";
  const n = (e.gallery || []).length;
  const actions = [`<button type="button" class="btn ghost" data-detail="${i}">${L("Details", "詳細を見る", "자세히 보기")}${n ? ` · ${L("Photos", "写真", "사진")} ${n}` : ""}</button>`, ...eventActions(e, past)];
  return `<article class="event${past ? " is-past" : ""}${poster ? " has-poster" : ""}">
    <div class="datebox" aria-hidden="true">
      <span class="m">${monthShort(d)}</span>
      <span class="d">${d.getDate()}</span>
      <span class="y">${d.getFullYear()}</span>
    </div>
    <div class="ev-body">
      ${chipsHTML(e, past)}
      <h3><button type="button" class="ev-title" data-detail="${i}">${esc(t(e.title))}</button></h3>
      <div class="ev-meta"><span>${fmtRange(e)}${e.time ? " · " + esc(e.time) : ""}</span><span>${esc(t(e.place))}</span></div>
      <p>${esc(t(e.desc))}</p>
      ${creditsHTML(e)}
      <div class="btns">${actions.join("")}</div>
    </div>
    ${poster ? posterBtn(e, i, true) : ""}
  </article>`;
}
const emptyHTML = (msg) => `<div class="empty"><img src="haru.png" alt=""><span>${msg}</span></div>`;

function renderEvents() {
  const up = EVENTS.filter((e) => evEnd(e) >= TODAY).sort((a, b) => a.date.localeCompare(b.date));
  const past = EVENTS.filter((e) => evEnd(e) < TODAY).sort((a, b) => b.date.localeCompare(a.date));
  const list = evFilter === "upcoming" ? up : past;
  $("#events-list").innerHTML = list.length ? list.map(eventHTML).join("")
    : emptyHTML(evFilter === "upcoming"
      ? L("No upcoming events yet. Check back soon or subscribe to the newsletter.", "現在予定されているイベントはありません。ニュースレターで最新情報をお届けします。", "현재 예정된 행사가 없습니다. 뉴스레터로 최신 소식을 전해 드립니다.")
      : L("No past events yet.", "過去のイベントはまだありません。", "아직 지난 행사가 없습니다."));
  $("#ev-count").textContent = LANG === "ja" ? `${list.length}件` : LANG === "ko" ? `${list.length}건` : `${list.length} ${list.length === 1 ? "event" : "events"}`;
  $$(".tabs [data-ev]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ev === evFilter)));
  $("#home-events").innerHTML = up.length ? up.slice(0, 2).map(eventHTML).join("")
    : emptyHTML(L("No upcoming events yet. Here are our most recent ones.", "現在予定されているイベントはありません。最近のイベントをご覧ください。", "현재 예정된 행사가 없습니다. 최근 행사를 확인해 보세요.")) + past.slice(0, 2).map(eventHTML).join("");
}
// Korea / U.S. branch events: same layout as the Japan Branch (upcoming / past)
function renderBranchEvents(prefix) {
  const all = EV_SETS[prefix].list();
  const up = all.filter((e) => evEnd(e) >= TODAY).sort((a, b) => a.date.localeCompare(b.date));
  const past = all.filter((e) => evEnd(e) < TODAY).sort((a, b) => b.date.localeCompare(a.date));
  if (!brFilter[prefix]) brFilter[prefix] = up.length ? "upcoming" : "past";
  const f = brFilter[prefix];
  const list = f === "upcoming" ? up : past;
  $("#" + prefix + "-events-list").innerHTML = list.length ? list.map(eventHTML).join("")
    : emptyHTML(f === "upcoming"
      ? L("No upcoming events yet. Check back soon.", "現在予定されているイベントはありません。決まり次第お知らせします。", "현재 예정된 행사가 없습니다. 정해지는 대로 알려 드리겠습니다.")
      : L("No past events yet.", "過去のイベントはまだありません。", "아직 지난 행사가 없습니다."));
  $("#" + prefix + "-ev-count").textContent = LANG === "ja" ? `${list.length}件` : LANG === "ko" ? `${list.length}건` : `${list.length} ${list.length === 1 ? "event" : "events"}`;
  $$(`[data-ev-branch="${prefix}"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.evf === f)));
  const home = $("#" + prefix + "-home-events");
  if (home) home.innerHTML = up.length ? up.slice(0, 2).map(eventHTML).join("")
    : past.length ? past.slice(0, 2).map(eventHTML).join("")
    : emptyHTML(L("Events will be announced here.", "イベントが決まったら、ここでお知らせします。", "행사가 정해지면 여기에서 알려 드립니다."));
}
function memberCard(m) {
  return `<article class="member">
    <div class="avatar">${m.photo ? `<img src="${esc(m.photo)}" alt="">` : `<img class="ph" src="mark.png" alt="">`}</div>
    <div>
      <span class="role">${esc(t(m.role))}</span>
      <h3>${esc(t(m.name))}</h3>
      <span class="aff">${esc(t(m.aff))}</span>
    </div>
    <p class="bio">${esc(t(m.bio))}</p>
  </article>`;
}
function renderBranchMembers(prefix) {
  const list = BRANCH_MEMBERS[prefix]();
  $("#" + prefix + "-members").innerHTML = list.length ? list.map(memberCard).join("")
    : `<div style="grid-column:1/-1">${emptyHTML(L("Member profiles are coming soon.", "メンバー紹介は準備中です。", "멤버 소개는 준비 중입니다."))}</div>`;
}

/* ---------- posts ---------- */
function postHTML(p, i) {
  const c = POST_CATS[p.cat] || {};
  return `<button type="button" class="post" data-post="${i}" style="--c:${c.color || "#2C538E"}">
    <span class="cat">${esc(t(c))}</span>
    <h3>${esc(t(p.title))}</h3>
    <p>${esc(t(p.excerpt))}</p>
    <span class="foot"><span>${fmtLong(p.date)}${p.sample ? " · " + L("Sample", "サンプル", "샘플") : ""}</span><span class="read">${L("Read", "読む", "읽기")} →</span></span>
  </button>`;
}
function renderPosts() {
  const sorted = POSTS.map((p, i) => [p, i]).sort((a, b) => b[0].date.localeCompare(a[0].date));
  const list = sorted.filter(([p]) => postFilter === "all" || p.cat === postFilter);
  $("#posts-list").innerHTML = list.length ? list.map(([p, i]) => postHTML(p, i)).join("")
    : `<div style="grid-column:1/-1">${emptyHTML(L("No posts in this category yet.", "このカテゴリーの記事はまだありません。", "이 카테고리에는 아직 글이 없습니다."))}</div>`;
  $("#home-posts").innerHTML = sorted.slice(0, 3).map(([p, i]) => postHTML(p, i)).join("");
  const cats = [["all", { en: "All", ja: "すべて", ko: "전체" }], ...Object.entries(POST_CATS)];
  $("#post-filters").innerHTML = cats.map(([id, label]) =>
    `<button type="button" id="pf-${id}" data-pf="${id}" aria-pressed="${id === postFilter}">${esc(t(label))}</button>`).join("");
}
function openPost(i) {
  const p = POSTS[i]; if (!p) return;
  $("#reader-cat").textContent = t(POST_CATS[p.cat]);
  $("#reader-cat").style.color = (POST_CATS[p.cat] || {}).color || "";
  $("#reader-title").textContent = t(p.title);
  $("#reader-meta").textContent = fmtLong(p.date) + (p.sample ? " · " + L("Sample post", "サンプル記事", "샘플 글") : "");
  $("#reader-body").innerHTML = [].concat(t(p.body) || []).map((para) => `<p>${esc(para)}</p>`).join("");
  openDialog($("#reader"));
}

/* ---------- members ---------- */
function renderMembers() {
  $("#members-note").hidden = !(typeof MEMBERS_ARE_PLACEHOLDERS !== "undefined" && MEMBERS_ARE_PLACEHOLDERS);
  $("#members").innerHTML = MEMBERS.map(memberCard).join("");
}

/* ---------- event details (schedule, photos, video) ---------- */
function openDialog(d) { if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", ""); }
function closeDialog(d) { d.close ? d.close() : d.removeAttribute("open"); }
const galleryItem = (g) => (typeof g === "string" ? { src: g } : (g || {}));
const capOf = (x) => (x.en || x.ja || x.ko) ? (x[LANG] || x.en || x.ja || x.ko) : "";
function youtubeId(url) {
  const m = String(url || "").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : "";
}
function scheduleHTML(e) {
  const rows = (e.schedule || []).map((r) => {
    if (r.day) return `<li class="ed-day">${esc(t(r.day))}</li>`;
    const label = capOf(r) || t(r.title);
    return `<li${r.time ? "" : ' class="no-time"'}><span class="ed-time">${esc(r.time || "")}</span><span>${esc(label)}</span></li>`;
  }).join("");
  return rows ? `<section class="ed-sec"><h3>${L("Schedule", "スケジュール", "일정")}</h3><ol class="ed-sched">${rows}</ol></section>` : "";
}
function videosHTML(e) {
  const list = [].concat(e.video || []).filter(Boolean);
  if (!list.length) return "";
  const items = list.map((v) => {
    const url = typeof v === "string" ? v : v.url;
    const id = youtubeId(url);
    return id ? `<div class="ed-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(t(e.title))}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
      : `<p><a class="btn ghost" href="${esc(url)}" target="_blank" rel="noopener">${L("Watch the video ↗", "動画を見る ↗", "영상 보기 ↗")}</a></p>`;
  }).join("");
  return `<section class="ed-sec"><h3>${L("Video", "動画", "영상")}</h3>${items}</section>`;
}
function linksHTML(e) {
  const list = (e.links || []).filter((x) => x && x.url);
  if (!list.length) return "";
  return `<section class="ed-sec"><h3>${L("Media & links", "メディア掲載・関連リンク", "언론 보도·관련 링크")}</h3><div class="ed-links">${list.map((x) =>
    `<a class="btn ghost" href="${esc(x.url)}" target="_blank" rel="noopener">${esc(capOf(x) || x.url)} ↗</a>`).join("")}</div></section>`;
}
function galleryHTML(e, i) {
  const g = (e.gallery || []).map(galleryItem).filter((x) => x.src);
  if (!g.length) return "";
  return `<section class="ed-sec"><h3>${L("Photos", "当日の写真", "현장 사진")}</h3><div class="ed-gallery">${g.map((x, k) => {
    const cap = capOf(x);
    return `<figure><button type="button" data-photo="${i}:${k}"><img src="${esc(x.src)}" alt="${esc(cap || t(e.title))}" loading="lazy"></button>${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;
  }).join("")}</div></section>`;
}
function openDetail(i) {
  const e = evByKey(i); if (!e) return;
  const past = evEnd(e) < TODAY;
  const poster = e.poster || e.photo || "";
  const actions = eventActions(e, past);
  const participants = e.participants ? `<p class="ed-participants">${esc(t(e.participants))}</p>` : "";
  $("#ed-body").innerHTML = `
    ${chipsHTML(e, past)}
    <h2 id="ed-title">${esc(t(e.title))}</h2>
    <div class="ev-meta"><span>${fmtRange(e)}${e.time ? " · " + esc(e.time) : ""}</span><span>${esc(t(e.place))}</span></div>
    <div class="ed-cols${poster ? "" : " no-poster"}">
      <div class="ed-main">
        ${participants}
        <p class="ed-desc">${esc(t(e.desc))}</p>
        ${creditsHTML(e)}
        ${actions.length ? `<div class="btns">${actions.join("")}</div>` : ""}
      </div>
      ${poster ? posterBtn(e, i, false) : ""}
    </div>
    ${scheduleHTML(e)}
    ${galleryHTML(e, i)}
    ${videosHTML(e)}
    ${linksHTML(e)}`;
  const d = $("#ev-detail");
  openDialog(d);
  d.scrollTop = 0;
}
function closeDetail() { closeDialog($("#ev-detail")); }
$("#ed-close").addEventListener("click", closeDetail);
$("#ev-detail").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeDetail(); });
// stop any playing video when the dialog closes
$("#ev-detail").addEventListener("close", () => { $("#ed-body").innerHTML = ""; });

function showImage(title, src, alt) {
  $("#pv-title").textContent = title;
  $("#pv-img").src = src; $("#pv-img").alt = alt;
  $("#pv-open").href = src;
  openDialog($("#poster-view"));
}
function openPhoto(i, k) {
  const e = evByKey(i); if (!e) return;
  const x = galleryItem((e.gallery || [])[k]); if (!x.src) return;
  const cap = capOf(x) || t(e.title);
  showImage(cap, x.src, cap);
}
function openPoster(i) {
  const e = evByKey(i); if (!e) return;
  showImage(t(e.title), e.poster || e.photo, L("Poster: ", "ポスター：", "포스터: ") + t(e.title));
}
$("#pv-close").addEventListener("click", () => closeDialog($("#poster-view")));
$("#poster-view").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeDialog(e.currentTarget); });
$("#reader-close").addEventListener("click", () => closeDialog($("#reader")));
$("#reader").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeDialog(e.currentTarget); });

/* ---------- contact ---------- */
// Topics marked to: "japan" in data.js go to the Japan Branch address
const generalEmail = () => SITE.email || SITE.japanEmail || "";
const japanEmail = () => SITE.japanEmail || SITE.email || "";
const koreaEmail = () => SITE.koreaEmail || SITE.email || SITE.japanEmail || "";
const currentTopic = () => TOPICS.find((x) => x.id === $("#c-topic").value) || TOPICS[0];
const recipient = (tp) => (tp && tp.to === "japan") ? japanEmail() : (tp && tp.to === "korea") ? koreaEmail() : generalEmail();
const subjectTag = (tp) => tp && tp.to === "japan" ? " Japan" : tp && tp.to === "korea" ? " Korea" : "";

function renderTopics(keep) {
  const sel = $("#c-topic");
  const cur = keep || sel.value || "general";
  sel.innerHTML = TOPICS.map((tp) => `<option value="${tp.id}">${esc(tp[LANG] || tp.en)}</option>`).join("");
  sel.value = TOPICS.some((tp) => tp.id === cur) ? cur : TOPICS[0].id;
}
function renderEmails() {
  // the general address is shown only when it is set; branch addresses are always labeled
  $("#email-addr").textContent = SITE.email || "";
  $("#email-addr-jp").textContent = japanEmail();
  $("#email-addr-kr").textContent = SITE.koreaEmail || "";
  $$("[data-gen-email]").forEach((el) => { el.hidden = !SITE.email; });
  $$("[data-jp-email]").forEach((el) => { el.hidden = !SITE.japanEmail; });
  $$("[data-kr-email]").forEach((el) => { el.hidden = !SITE.koreaEmail; });
}
function renderSubscribe() {
  const slot = $("#subscribe-slot");
  if (SITE.newsletterSignupUrl) {
    slot.innerHTML = `<a class="btn light" href="${esc(SITE.newsletterSignupUrl)}" target="_blank" rel="noopener">${L("Subscribe", "購読する", "구독하기")}</a>`;
  } else {
    slot.innerHTML = `<p style="font-size:var(--s-sm)">${L('Email us with the subject "Subscribe" and we will add you to the list.', "件名を「購読希望」としてメールをお送りください。配信リストに追加します。", '제목을 "구독 신청"으로 해서 이메일을 보내 주세요. 배포 목록에 추가해 드립니다.')}</p>
      <div class="copybox"><span class="addr">${esc(japanEmail())}</span><button type="button" class="copy-btn" data-copy="japan">${L("Copy", "コピー", "복사")}</button></div>`;
  }
}
function renderSocial() {
  const list = (SITE.social || []).filter((x) => x && x.url);
  $$("[data-social]").forEach((el) => { el.innerHTML = list.map((x) => `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.name || x.url)} ↗</a>`).join(""); });
  $$("[data-social-wrap]").forEach((w) => { w.hidden = !list.length; });
}
function setSubmitLabel() {
  $("#c-submit").textContent = SITE.formEndpoint ? L("Send message", "送信する", "보내기") : L("Prepare my message", "メッセージを作成", "메시지 작성");
}
async function copyText(text, btn) {
  const label = btn.innerHTML;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = L("Copied", "コピーしました", "복사됨");
  } catch (e) {
    const box = btn.closest(".copybox, .compose");
    const target = box && (box.querySelector(".addr") || box.querySelector("pre"));
    if (target) { const r = document.createRange(); r.selectNodeContents(target); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    btn.textContent = L("Selected. Press Ctrl/⌘+C", "選択しました。Ctrl/⌘+Cでコピー", "선택됨. Ctrl/⌘+C로 복사");
  }
  setTimeout(() => { btn.innerHTML = label; }, 2200);
}
function buildCompose() {
  const name = $("#c-name").value.trim(), email = $("#c-email").value.trim(), aff = $("#c-aff").value.trim(), msg = $("#c-msg").value.trim();
  const topic = currentTopic();
  const to = recipient(topic);
  const subject = `[TogetherWeTri${subjectTag(topic)}] ${topic[LANG] || topic.en} - ${name}`;
  const body = `${msg}\n\n${name}${aff ? "\n" + aff : ""}\n${email}`;
  $("#compose-text").textContent = `To: ${to}\nSubject: ${subject}\n\n${body}`;
  $("#mailto-compose").href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
$("#contact-form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const form = ev.currentTarget, err = $("#c-err");
  const name = $("#c-name").value.trim(), email = $("#c-email").value.trim(), msg = $("#c-msg").value.trim();
  const problems = [];
  if (!name) problems.push(L("Enter your name.", "お名前を入力してください。", "이름을 입력해 주세요."));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push(L("Enter a valid email address, like name@example.com.", "有効なメールアドレスを入力してください（例：name@example.com）。", "올바른 이메일 주소를 입력해 주세요 (예: name@example.com)."));
  if (!msg) problems.push(L("Write a short message.", "メッセージを入力してください。", "메시지를 입력해 주세요."));
  $("#sent").hidden = true;
  if (problems.length) { err.textContent = problems.join(" "); err.hidden = false; $("#compose").hidden = true; return; }
  err.hidden = true;
  if (SITE.formEndpoint) {
    const btn = $("#c-submit");
    btn.disabled = true; btn.textContent = L("Sending…", "送信中…", "전송 중…");
    try {
      const fd = new FormData(form);
      const topic = currentTopic();
      fd.append("_subject", `[TogetherWeTri${subjectTag(topic)}] ${topic.en} - ${name}`);
      fd.append("_to_branch", topic.to || "general");
      const res = await fetch(SITE.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset(); renderTopics("general");
      $("#compose").hidden = true; $("#sent").hidden = false;
      $("#sent").scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (e) {
      err.textContent = L("Your message could not be sent. Copy it below and email it to us instead.", "送信できませんでした。下のメッセージをコピーして、メールでお送りください。", "전송하지 못했습니다. 아래 메시지를 복사해 이메일로 보내 주세요.");
      err.hidden = false; buildCompose(); $("#compose").hidden = false;
    } finally { btn.disabled = false; setSubmitLabel(); }
    return;
  }
  buildCompose(); $("#compose").hidden = false;
  $("#compose").scrollIntoView({ behavior: "smooth", block: "nearest" });
});
$("#copy-compose").addEventListener("click", (e) => copyText($("#compose-text").textContent, e.currentTarget));
$("#c-topic").addEventListener("change", () => { if (!$("#compose").hidden) buildCompose(); });

/* ---------- language ---------- */
function applyLinks() {
  $$("[data-korea-link]").forEach((a) => {
    if (SITE.koreaUrl) { a.href = SITE.koreaUrl; a.hidden = false; } else { a.hidden = true; }
  });
}
function renderAll() {
  renderEvents(); renderBranchEvents("kr"); renderBranchEvents("us"); renderPosts(); renderMembers(); renderBranchMembers("kr"); renderBranchMembers("us");
  renderTopics(); renderEmails(); renderSubscribe(); setSubmitLabel(); renderSocial();
  $("#c-msg").placeholder = L("How can we help?", "ご用件をご記入ください。", "문의 내용을 입력해 주세요.");
}
function setLang(l) {
  LANG = LANGS.includes(l) ? l : "en";
  document.documentElement.dataset.lang = LANG;
  document.documentElement.lang = LANG;
  $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === LANG)));
  try { localStorage.setItem("twt-lang", LANG); } catch (e) {}
  renderAll();
  if (!$("#compose").hidden) buildCompose();
}

/* ---------- navigation ---------- */
const resolve = (h) => { h = ALIASES[h] || h; return PAGES.includes(pageOf(h)) ? h : "home"; };
let current = "";
function show(route, opts = {}) {
  route = resolve(route);
  const page = pageOf(route);
  const samePage = current && pageOf(current) === page;
  current = route;
  closeSecMenu();
  $$(".page").forEach((p) => { p.hidden = p.dataset.page !== page; });
  $$(".nav a").forEach((a) => { if (a.dataset.nav === page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  const pg = $("#page-" + page);
  if (SUBS[page]) {
    $$(".sub-view", pg).forEach((v) => { v.hidden = v.dataset.view !== route; });
    $$(".sub-tabs a", pg).forEach((a) => { if (a.dataset.nav === route) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }
  // hero buttons stay colored while their sub-page is open
  $$(".hero-btn").forEach((b) => b.classList.toggle("is-on", b.dataset.nav === route));
  $("#site-nav").classList.remove("open");
  $("#menu-btn").setAttribute("aria-expanded", "false");
  if (opts.keepScroll) return;
  // switching sub-pages keeps the tab bar in view
  const hero = pg && $(".branch-hero", pg);
  if (samePage && hero) {
    const top = hero.offsetTop + hero.offsetHeight - $(".site-header").offsetHeight;
    window.scrollTo({ top: Math.min(window.scrollY, top) });
  } else window.scrollTo({ top: 0 });
}
// Navigate and record the page in browser history so the back button works
function go(route) {
  route = resolve(route);
  if (location.hash !== "#" + route) { try { history.pushState(null, "", "#" + route); } catch (e) {} }
  show(route);
}

function tick() {
  const f = (tz) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());
  try { $("#t-seoul").textContent = f("Asia/Seoul"); $("#t-tokyo").textContent = f("Asia/Tokyo"); $("#t-dc").textContent = f("America/New_York"); } catch (e) {}
}

/* ---------- jump menu opened from the three-bar mark (About, AEIF) ---------- */
let secToggle = null;
function closeSecMenu() {
  $("#sec-menu").hidden = true;
  if (secToggle) { secToggle.setAttribute("aria-expanded", "false"); secToggle = null; }
}
function openSecMenu(btn) {
  const menu = $("#sec-menu");
  if (secToggle === btn) { closeSecMenu(); return; }
  closeSecMenu();
  // show only the sections of the page (or sub-page) the button is on
  const sv = btn.closest(".sub-view"), pg = btn.closest(".page");
  const page = sv ? sv.dataset.view : pg ? pg.dataset.page : "";
  $$("[data-menu-for]", menu).forEach((g) => { g.hidden = g.dataset.menuFor !== page; });
  menu.hidden = false;
  const r = btn.getBoundingClientRect();
  const maxLeft = document.documentElement.clientWidth - menu.offsetWidth - 16;
  menu.style.top = (window.scrollY + r.bottom + 8) + "px";
  menu.style.left = Math.max(16, Math.min(window.scrollX + r.left, maxLeft)) + "px";
  btn.setAttribute("aria-expanded", "true"); secToggle = btn;
  const first = menu.querySelector("button"); if (first) first.focus({ preventScroll: true });
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && secToggle) { const b = secToggle; closeSecMenu(); b.focus(); } });
window.addEventListener("resize", closeSecMenu);

/* ---------- clicks ---------- */
document.addEventListener("click", (ev) => {
  const tg = ev.target.closest(".sec-toggle"); if (tg) { openSecMenu(tg); return; }
  const jump = ev.target.closest("[data-jump]");
  if (jump) { closeSecMenu(); const el = document.getElementById(jump.dataset.jump); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  if (secToggle && !ev.target.closest("#sec-menu")) closeSecMenu();
  const pv = ev.target.closest("[data-poster]"); if (pv) { openPoster(pv.dataset.poster); return; }
  const ph = ev.target.closest("[data-photo]"); if (ph) { const p = ph.dataset.photo.split(":"); openPhoto(p[0] + ":" + p[1], Number(p[2])); return; }
  const dt = ev.target.closest("[data-detail]"); if (dt) { openDetail(dt.dataset.detail); return; }
  const nav = ev.target.closest("[data-nav]");
  if (nav) {
    ev.preventDefault();
    if ($("#ev-detail").open) closeDetail();
    go(nav.dataset.nav);
    if (nav.dataset.topic) {
      $("#sent").hidden = true;
      renderTopics(nav.dataset.topic);
      if (nav.dataset.event) $("#c-msg").value = L(`I'd like to register for: ${nav.dataset.event}`, `次のイベントに申し込みます：${nav.dataset.event}`, `다음 행사에 신청합니다: ${nav.dataset.event}`) + "\n\n";
      $("#compose").hidden = true;
    }
    return;
  }
  const lb = ev.target.closest(".lang button"); if (lb) { setLang(lb.dataset.lang); return; }
  const evb = ev.target.closest("[data-ev]"); if (evb) { evFilter = evb.dataset.ev; renderEvents(); return; }
  const bf = ev.target.closest("[data-evf]"); if (bf) { brFilter[bf.dataset.evBranch] = bf.dataset.evf; renderBranchEvents(bf.dataset.evBranch); return; }
  const pf = ev.target.closest("[data-pf]"); if (pf) { postFilter = pf.dataset.pf; renderPosts(); return; }
  const pb = ev.target.closest("[data-post]"); if (pb) { openPost(Number(pb.dataset.post)); return; }
  const cb = ev.target.closest("[data-copy]"); if (cb) { copyText(cb.dataset.copy === "japan" ? japanEmail() : cb.dataset.copy === "korea" ? koreaEmail() : generalEmail(), cb); return; }
});
$("#menu-btn").addEventListener("click", () => {
  const open = $("#site-nav").classList.toggle("open");
  $("#menu-btn").setAttribute("aria-expanded", String(open));
});

/* ---------- start ---------- */
let saved = "";
try { saved = localStorage.getItem("twt-lang") || ""; } catch (e) {}
// ?lang=ja / ?lang=ko in the address opens that language (used by the old Japan site's redirect)
const qLang = new URLSearchParams(location.search).get("lang");
if (LANGS.includes(qLang)) saved = qLang;
if (!saved) {
  const nl = (navigator.language || "en").toLowerCase();
  saved = nl.startsWith("ja") ? "ja" : nl.startsWith("ko") ? "ko" : "en";
}
$("#yr").textContent = new Date().getFullYear();
applyLinks();
setLang(saved);
const startHash = (location.hash || "").replace("#", "");
const startRoute = resolve(startHash);
if (startHash && startRoute !== startHash) { try { history.replaceState(null, "", location.pathname + location.search + "#" + startRoute); } catch (e) {} }
show(startRoute, { keepScroll: true });
tick(); setInterval(tick, 30000);
const fromHash = () => show(location.hash.replace("#", ""));
window.addEventListener("popstate", fromHash);
window.addEventListener("hashchange", fromHash);
