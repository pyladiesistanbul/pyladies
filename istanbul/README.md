# PyLadies İstanbul — Website

Static website for the PyLadies İstanbul community. Four pages, no build step, no framework. Content is managed through Google Sheets so that organisers can publish events and learning resources without touching code.

## How it works

The site is plain HTML, CSS and vanilla JavaScript. Open any `.html` file in a browser and it runs — there is nothing to compile or install.

All content lives in **Google Sheets**. Pages fetch it on load, so editing a cell updates the site — publishing an event or a video never requires a code change.

The site uses no uploaded images. Event cards show a generated date block; video cards use YouTube thumbnails, fetched automatically from the video URL. This is deliberate: it means there is no image hosting to maintain, no storage to pay for, and nothing for a future organiser to inherit and keep alive.

## Project structure

```
├── index.html          Home
├── education.html      Learning resources (videos)
├── events.html         Upcoming and past events, suggestion form
├── contact.html        Contact page
├── css/
│   └── style.css       All styles, including light/dark theming
├── js/
│   ├── core.js         Shared: i18n, dark mode, nav, text formatting
│   ├── home.js         Home page
│   ├── education.js    Education page + resource modal
│   ├── events.js       Events page + event modal + suggestion form
│   └── contact.js      Contact page
└── assets/
    ├── logos/
    └── videos/
```

`core.js` loads on every page and must be included before the page-specific script.

`js/index.js` and `js/main.js` are leftovers from an earlier version and are not referenced by any page. `main.js` in particular contains an older dark-mode and language implementation that conflicts conceptually with `core.js` — it stores the theme under `darkMode` instead of `pl_theme` and toggles a `dark-mode` class instead of `data-theme`. Editing it has no effect on the live site. Both files can be deleted.

## Managing content

### Events

Data source: a Google Sheet read through `opensheet.elk.sh`, configured in `js/events.js`.

| Column | Required | Notes |
|---|---|---|
| `event_name` | yes | Rows with an empty name are skipped |
| `date` | yes | `YYYY-MM-DD` is safest. `DD/MM/YYYY` also works |
| `info` | no | Description shown in the modal. Supports formatting (see below) |

Events are sorted into **Upcoming** and **Past** automatically by comparing `date` against today. There is no manual switch.

Event cards do not use photographs. The card header shows a generated date block — day, month and year set in large type over the brand gradient, dark grey for past events. The date is an event's most important attribute and differs on every card, so the grid stays varied with nothing to upload.

If the sheet cannot be reached, the page falls back to two placeholder events hardcoded in `js/events.js`. If you ever see "Intro to FastAPI" on the live site, the sheet fetch failed.

### Education

Data source: the Google Sheets CSV export, configured in `js/education.js`. Parsed with PapaParse, which correctly handles commas and line breaks inside cells.

| Column | Required | Notes |
|---|---|---|
| `is_blog` | no | See below. Rows marked `TRUE`, `yes`, `1` or `evet` are currently **skipped** |
| `title` | no | Falls back to "Untitled resource" |
| `content` | yes | The URL. Rows with an empty `content` are skipped |
| `description` | no | Shown in the modal. Supports formatting |
| `author` | no | Falls back to "PyLadies İstanbul" |
| `author_contact_info` | no | Renders as a mail link when it contains `@` |

**The page currently shows videos only.** Blog posts are planned for a later stage, and the `is_blog` column exists for exactly that — it is not dead weight. Rows marked as blog posts are filtered out at render time rather than deleted, so anything written now stays in the sheet and appears the moment blog support is switched back on. Keep filling the column as normal.

Bringing blogs back means restoring three things in `js/education.js` and `education.html`: the blog branch in `thumbHtml`, the blog branch in the modal, and the All / Blog Posts / Videos filter buttons. The translation keys they need (`filter_all`, `filter_blog`, `filter_video`, `ed_badge_blog`, `ed_read_post`) are still in `DICT` and were left there on purpose.

Cards pull their thumbnail from YouTube automatically, so there is nothing to upload. A link that is not a YouTube URL (Vimeo, for example) gets a plain gradient cover instead.

Both sheets must be shared as **"anyone with the link can view"**, otherwise the pages will silently show empty or fallback content.

## The suggestion form

The form on the Events page posts directly to a Google Form. Two things about it are easy to break and give no error when broken.

**The `entry.` numbers in `js/events.js` must match the form's fields.** To find the real ones: open the form in edit mode → three-dot menu → *Get pre-filled link* → fill anything → *Get link*. The resulting URL contains each question's true `entry.` number.

**The `<option value="...">` strings in `events.html` must match the form's multiple-choice options character for character.** If the form's option reads `Geri Bildirim / Share Feedback`, the value must be exactly that. A single differing character makes Google reject the **entire** submission, not just that field — and the site still shows the thank-you message.

That last part matters: Google Forms does not allow the browser to read the response, so the request is sent in `no-cors` mode and JavaScript can never tell whether it succeeded. The success message appears either way. **The only way to verify a submission is to check the form's Responses tab.**

To debug, submit the form directly through the browser with a URL built by hand — Google accepts `GET` submissions and will show you the actual error:

```
https://docs.google.com/forms/d/e/<FORM_ID>/formResponse?entry.<id>=Test&...&submit=Submit
```

The form URL must not contain an account segment like `/u/1/`. That appears when you copy the address while signed in, and it breaks submissions for signed-out visitors.

If the form's settings have *Collect email addresses* or an organisation restriction enabled, anonymous visitors cannot submit at all and no code change will fix it. Test in a private browsing window to be sure.

## Formatting text in the sheet

Google Sheets' own formatting (bold, italic, colours) is lost on export. To format a description, type the markers as characters:

```
**bold**
*italic*
[link text](https://example.com)
[email us](mailto:istanbul@pyladies.com)
```

Press **Alt+Enter** inside a cell for a line break. Leave a blank line for a new paragraph.

Only `http`, `https` and `mailto` links are accepted. HTML typed into a cell is escaped and displayed as plain text rather than rendered — this is deliberate, since anyone with edit access to the sheet would otherwise be able to inject code into the site.

Formatting applies to modal descriptions only. Card previews are plain text and clamped to three lines.

## Languages

Three languages are available: Turkish, English and Spanish. English is the default. The choice is stored in `localStorage` under `pl_lang`.

All interface strings live in the `DICT` object in `js/core.js` — 96 keys per language. To add a string, add the key to all three languages and reference it in HTML:

```html
<span data-i18n="my_key">Fallback text</span>
```

For text generated in JavaScript, read the dictionary at render time rather than at page load, so the text updates when the language changes:

```js
var d = window.PL.getDict();
element.textContent = d.my_key;
```

Dates are localised automatically.

**Event and resource content is not translated.** Whatever is typed in the sheet appears identically in all three languages. The language switcher only affects the interface. If translated content is wanted later, the cleanest approach is optional `_en` columns that fall back to the base column when empty.

## Theme

Light and dark are handled through CSS custom properties on `:root` and `[data-theme="dark"]`. The preference is stored in `localStorage` under `pl_theme`. New components should use the existing tokens (`--ink`, `--bg`, `--card`, `--line`, `--accent`, `--muted`) rather than hardcoded colours, so dark mode works without extra work.

## Design tokens

| Role | Value |
|---|---|
| Accent | `#DC143C` |
| Ink | `#1F2937` |
| Soft gray | `#D1D5DB` |
| Background | `#FFFFFF` |
| Headings | Space Grotesk |
| Body | Work Sans |

Education and Events share the same card and modal classes on purpose. Changing `.modal-card` or the card styles affects both pages — this is intended, and new pages should reuse these classes rather than duplicate them.

## External dependencies

- Google Fonts — Space Grotesk, Work Sans
- PapaParse 5.4.1 via cdnjs — CSV parsing, education page only
- Google Calendar embed — events page
- Substack embed — home page
- Google Forms — suggestion form on the events page
- `opensheet.elk.sh` — third-party Google Sheets to JSON proxy, events page only

## Known issues

**The events page depends on a third-party proxy.** `opensheet.elk.sh` is a free service run by an individual. If it goes down, the events page falls back to the two hardcoded placeholder events. The education page already reads Google's CSV export directly and does not have this dependency. Migrating the events page to the same approach would remove the third party and make both pages consistent.

**Some strings are hardcoded in English** and do not translate: the empty-state messages ("No upcoming events right now", "No past events yet."), the five form validation errors in `js/events.js`, and the thank-you message in `events.html`. These need to move into `DICT`.

**Content is single-language.** See the Languages section above.

## Local development

No build step. Open the HTML files directly, or serve the folder to avoid any file-protocol issues:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Sheet fetches require an internet connection. Without one, the events page shows fallback data and the education page shows an empty state.