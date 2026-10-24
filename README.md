# TogetherWeTri website (English · 日本語 · 한국어)

One site for TogetherWeTri and its Japan, Korea and U.S. branches.
Live at https://togetherwetri-all.github.io/togetherwetri/

## Pages

| Menu | Address | Contents |
|---|---|---|
| Home | `#home` | Introduction, the three branches |
| About us | `#about` / `#about-aeif` | Two tabs: "About us" and "AEIF Project" |
| Japan Branch | `#japan` | Overview, Events (`#japan-events`), News (`#japan-news`), Members (`#japan-members`) |
| Korea Branch | `#korea` | Overview, Events (`#korea-events`), Members (`#korea-members`) |
| U.S. Branch | `#us` | Overview, Events (`#us-events`), Members (`#us-members`) |
| Contact | `#contact` | Contact form, branch email addresses, ways to get involved, FAQ |

Old addresses such as `#aeif`, `#events` and `#news` still work and open the matching page.

## Updating content

For everyday updates, edit **data.js only**. Instructions are written at the top of the file.

- Email addresses, form, social media: `SITE` (`email` general, `japanEmail` Japan Branch, `koreaEmail` Korea Branch)
- Japan Branch members, events, news: `MEMBERS`, `EVENTS`, `POSTS`
- Korea Branch events and members: `KOREA_EVENTS`, `KOREA_MEMBERS`
- U.S. Branch events and members: `US_EVENTS`, `US_MEMBERS`
- AEIF activities with a detail pop-up (Tokyo program): `AEIF_EVENTS`
- Contact form topics: `TOPICS` (`to: "japan"` goes to the Japan Branch address, `to: "korea"` to the Korea Branch address)

Text can be written in `en` (English), `ja` (Japanese) and `ko` (Korean). If `ko` is missing, the Korean version shows the English text.

Upload photos and PDFs to the top level of the repository (next to index.html) and write only the file name in data.js.
GitHub's browser upload accepts files up to 25 MB, so compress large PDFs before uploading.

**General email address:** while `SITE.email` is empty, general questions (general, partnership, media, etc.) go to the Japan Branch address. Add the general address when you have one.

## Files

- `index.html` — page layout and fixed text (in three languages)
- `app.js` — site logic (normally no need to edit)
- `data.js` — content you update regularly
- images (`.jpg`, `.png`, `.webp`) and reports (`.pdf`)

## Publishing (GitHub Pages, free)

1. Upload or edit files in the repository (Add file → Upload files, or the pencil icon to edit).
2. Settings → Pages → Branch: `main`, folder: `/ (root)` → Save (only needed once).
3. Changes appear on the live site within a few minutes.

## Redirect from the old Japan Branch site

To send visitors of the old site (togetherwetri-japan repository) to this site, replace the `index.html` of the old repository with `redirect-for-old-japan-site/index.html`. The destination is already set. Each old page opens the matching Japan Branch page here.
