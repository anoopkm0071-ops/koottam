# Koottam brand guidelines

Live, interactive version: https://claude.ai/artifact/RXihiKye8tPD3s9baPF5eE (private until shared). Values: [`tokens.json`](tokens.json), CSS: [`tokens.css`](tokens.css), components: [`components.css`](components.css).

Koottam (കൂട്ടം, "the gang") is a people's movement with one mission: a job for every Mallu. It looks and talks like a protest poster, not a job portal: loud type, black borders, red for action, yellow for the words that matter. Everything below is how to keep it that way.

## The idea

- **Mission line:** "Every Mallu deserves a job." Use it as written, on the hero, the share card and the member card.
- **Rallying cry:** "No Mallu left jobless." Use it to close a page or a post.
- **Why we exist:** Kerala has talent. What it lacks is access. Three things keep people out, and every message maps to one of them:

| Enemy | What people feel | How Koottam fights back |
|---|---|---|
| 01 Nobody told you | "I never hear about the openings." | Domain groups and alerts, hidden openings from industry leads |
| 02 You can't crack it | "My CV gets ignored, I freeze in interviews." | Interview answers, mock interviews, CV template |
| 03 The skill gap | "College taught one thing, jobs want another." | Skill roadmaps per domain, study circles |

## Voice

Koottam talks like a friend who already got the job and is now pulling you in. Direct, warm, a little defiant.

- **Say "Mallu" and "Mallus",** never "Keralite". It is our word, and it is how our audience talks.
- **English only** on the site and in posts. Malayalam lives in the name and in the groups themselves.
- **"We" and "you".** We are a koottam, not a company: "We add you to the right group", never "Users will be onboarded".
- **Short sentences. Verb first on buttons:** "Join the mission →", "Post it →", "Get alerts", "Report it →".
- **Mission, not promise.** Say "a job for every Mallu" as the mission. Never "guaranteed job", "100% placement", or a salary figure we can't back.
- **Never ask for money.** "Never pay anyone for a job" appears in the footer of every page and in every group's rules.
- **Name the scam.** "If they ask for money, it's a scam." Plain words, no softening.

| Do | Don't |
|---|---|
| "Job kittanam? Join the Koottam." (in groups and posts) | "Unlock your career potential today!" |
| "Five questions. One group." | "Complete our onboarding questionnaire" |
| "Openings landing right now." | "Explore exciting opportunities" |
| "Nobody yet. Be the first to bring someone in." | "0 referrals" |

**Casing:** headlines, buttons and labels are UPPERCASE (set by the style, typed in sentence case). Body copy is sentence case. "Koottam" is written with a capital K; the wordmark is "KOOTTAM✦".

**Emoji:** functional only. One emoji per domain (💻 IT, 📣 Marketing, 🩺 Nursing, ✈️ Gulf…), ✊ for joining, 🔥 for today's count, 🔗 for referrals. Never in headlines, never as decoration.

## Visual foundations

**The look is a poster.** Square corners (`radius-none`), solid `stroke-thick` borders in `line`, and hard offset shadows (`shadow-md`, `shadow-lg`) with no blur. No gradients, no soft shadows, no rounded cards, no stock photos.

**Colour proportions.** `paper` carries most of every page, `ink` sets the type, then exactly two loud colours:
- `red` is action and urgency: the main button, the live counter, the member card, a key word in a headline. One red focal point per screen.
- `yellow` is the highlighter: a tilted `mark` behind one or two words (`tilt-mark`), the scam-alert band, the chat header, referral tags. Never a whole paragraph.
- `black` bands with `white` text break the rhythm (pledge, hiring, slogan ticker). Alternate `paper` and `card` for other sections.
- Text on `red` uses `on-red` at 19px bold or larger only. Text on `yellow` uses `on-yellow`.

**Type.** Anton (`display`) for anything that shouts: headlines, numbers, buttons, card titles, always uppercase with tight leading (0.92). Inter (`body`) for everything you read: `lead` for intros, `body` for paragraphs, `body-strong` in chat and lists, `kicker` and `label` for small uppercase tags. Never set body copy in Anton, never set a headline in Inter.

**Layout.** Sections are full-width bands separated by a `stroke-thick` rule, padded `space-8` top and bottom, content max 1180px with a `space-5` gutter (`space-4` on phones). Two-column sections stack below 940px. Every section opens with a `kicker` box, then a `display-l` headline, then a `lead` or `body` intro in `mute`.

**Rotation.** Only three things tilt: the yellow `mark` (`tilt-mark`), the hero stamp (`tilt-stamp`) and the hero counter (`tilt-counter`). Everything else is straight.

**Motion.** Buttons lift 2px on hover (shadow grows to 8px) and press down 4px (shadow shrinks to 2px). The live dot blinks. The slogan ticker scrolls. Numbers count up. Sections fade up once as they enter. All of it stops under `prefers-reduced-motion`.

**Focus.** Every interactive element shows a 4px solid `focus` outline with a 3px offset. On light `paper` the yellow ring is too faint (1.2:1); use `ink` for the ring on light grounds.

**Themes.** Paper (light) is the brand. Night (dark) swaps `paper`, `card`, `ink`, `mute` and `line`; `red`, `yellow`, `black` and `white` stay fixed so posters and share cards look the same everywhere.

## Logo

- **Mark:** a white K on a red square inside a black frame, with a yellow dot top right ([`assets/koottam-mark.svg`](assets/koottam-mark.svg)). Use it for app icons, favicons, WhatsApp group photos and profile pictures.
- **Wordmark:** "KOOTTAM" set in Anton followed by a red ✦. It is type, not a drawing: set it live in `display`, ink on paper or white on black.
- **Clear space:** at least the height of the K's arm on every side. Minimum mark size 24px.
- **Don't** recolour the mark, round its corners, add a shadow to it, stretch it, or put it on a busy photo.

## Iconography

There is no icon set. Use the domain emoji listed under Voice and the brand glyph ✦ (a separator in slogans and the wordmark). UI glyphs are plain text characters: → for forward, ← for back, ✕ to close, ↺ to restart, ☰ for the menu, ✓ for done.

## Imagery and social

- **Share card** ([`assets/share-card.png`](assets/share-card.png), 1200×630): red ground, "EVERY MALLU DESERVES A JOB." with JOB on a yellow mark, two black pills underneath. Every link preview uses it.
- **Member card:** red card, member number in `counter` style, name in `display-m`, group on a yellow tag. Members share it on WhatsApp, so keep it readable at phone size.
- **Photos:** only real members, real leads and real events, shot plainly. Never stock photos of handshakes or people in suits.

## Accessibility

- Body text is `ink` or `mute` on `paper`/`card` only (6.3:1 or better in both themes).
- Red text on `paper` (4.0:1) is for 24px+ headlines only. White on `red` is exactly 4.5:1: fine for buttons and the member card, never for small regular text.
- The yellow focus ring fails on light `paper` (1.2:1). Use `ink` there.
- Every form field has a visible label; every icon-only button has an accessible name.

## Components

Styles live in [`components.css`](components.css) and read the variables in [`tokens.css`](tokens.css). Load `tokens.css`, then `components.css`, then the Google Fonts link for Anton and Inter.

### Button

The only way to act on a Koottam page: a square, bordered button in Anton capitals with a hard shadow that presses in.

- **Primary** (`k-btn`): `red` with `on-red`. One per view: "Join the mission →", "Post it →", "Report it →".
- **Alt** (`k-btn k-btn--alt`): `yellow` with `on-yellow`, for the second most useful action on a dark or red band ("Get alerts", "I'm in →").
- **Ghost** (`k-btn k-btn--ghost`): `card` with `ink`, for secondary actions ("Why we exist", "Copy link").
- **Small** (`k-btn--sm`): inside rows and cards.

The consumer provides the label (verb first, short, an arrow → when it moves you forward). Use `<button>` for actions and `<a>` for navigation. Never round the corners or remove the border.

### Kicker

The section opener: a small uppercase label in a solid `ink` box, followed by a `display-l` headline with at most one yellow `k-mark` word.

The consumer provides the label (2–4 words: "Join in 30 seconds", "Scam alert") and the headline. Highlight one or two words with `<mark class="k-mark">`, never a whole line.

### Box

The basic container: `card` fill, `stroke-thick` border in `line`, `shadow-lg`, square corners. Used for the three enemies, forms, job rows and the chat window.

The consumer provides the content. An enemy box carries a red `display` numeral (01, 02, 03), a `display-m` title and a `mute` paragraph. Lay boxes out in a grid with a `space-6` gap. Never nest a box inside a box.

### Tag

A one- or two-word label beside a job or story: `yellow` for the kind of post ("Referral", "Full-time job"), `red` (`k-tag--new`) for "New" or "Example".

The consumer provides the word. Tags describe; they never act, so they never take a hover state.

### ChatBubble

The Koottam Guide's conversation: the guide speaks in `paper` bubbles on the left, the member answers in `red` bubbles on the right, and answer chips sit below.

The consumer provides the text. Guide messages ask one question at a time and use the member's first name once they have it. Chips (`k-chip`) are the answer options; they turn `yellow` on hover.

### MemberCard

The card every member gets after joining, built to be screenshotted and shared on WhatsApp: `red` ground, member number in the `counter` style, name in `display-m`, their group on a `yellow` tag.

The consumer provides the member number, name, group and join month. Keep the card under 440px wide so it reads on a phone, and always pair it with "Share on WhatsApp" and "Download card" buttons.

### LiveCounter

The hero's proof that the movement is real: a tilted `red` box with a blinking `yellow` dot, the member count in the `counter` style, and a meter towards the next milestone (100, 500, 1,000, 5,000…).

The consumer provides real numbers only: total members, joined today, next milestone. Never seed or simulate it on a public page.

## Token reference

### Colour

| Token | Paper (light) | Night (dark) | Use |
|---|---|---|---|
| `paper` | `#f5f0e6` | `#121110` | Page background. The poster paper every section sits on. |
| `card` | `#fffdf8` | `#1c1a18` | Boxes, forms, chat window and alternate section bands. |
| `ink` | `#0d0d0d` | `#f5f0e6` | Headlines and body copy on `paper` and `card` (17.1:1 on light paper, 16.6:1 on dark). |
| `mute` | `#5b5750` | `#aaa397` | Secondary copy, sub-heads and captions on `paper` and `card` (6.3:1 light, 7.5:1 dark). |
| `line` | `#0d0d0d` | `#f5f0e6` | Every border and every hard offset shadow. Always solid, never tinted. |
| `red` | `#e8202a` | `#e8202a` | Action and urgency: the main button, the live counter, the member card, key words in headlines. `on-red` text on it is exactly 4.5:1, so keep that text 19px bold or larger. Red text on `paper` is 4.0:1 light and 4.2:1 dark, so red type is for 24px+ headlines only. |
| `yellow` | `#ffd60a` | `#ffd60a` | Highlight: the tilted `mark` behind one or two words, the scam-alert band, referral tags, the chat header. Text on it is always `on-yellow`. |
| `black` | `#0d0d0d` | `#0d0d0d` | Fixed black for bands that stay dark in both themes (the pledge and hiring sections, the slogan ticker). |
| `white` | `#f5f0e6` | `#f5f0e6` | Fixed off-white for copy on `black` bands in both themes (17.1:1). |
| `on-red` | `#ffffff` | `#ffffff` | Text and icons on `red` fills (4.5:1, the minimum). Keep to 19px bold or larger. |
| `on-yellow` | `#0d0d0d` | `#0d0d0d` | Text and icons on `yellow` fills (13.8:1). |
| `focus` | `#ffd60a` | `#ffd60a` | Keyboard focus outline: 4px solid with a 3px offset. Strong on dark paper (13.4:1), black bands (13.8:1) and red (3.2:1). On light `paper` it is only 1.2:1, so the live site's focus ring is hard to see there: known gap, fix by switching to `ink` on light grounds. |

### Type

| Style | Family | Size / line height | Weight | Use |
|---|---|---|---|---|
| `display-xl` | display | 150px / 0.92 | 400 | Hero headline only, one per page. Uppercase. Scales down to 58px on phones. |
| `display-l` | display | 90px / 0.92 | 400 | Section headlines. Uppercase, two short lines at most. |
| `display-m` | display | 37px / 0.95 | 400 | Card and block titles. |
| `counter` | display | 93px / 1 | 400 | Live numbers: member count, member number. Tabular figures. |
| `button` | display | 20px / 1 | 400 | Button labels. Uppercase, verb first. |
| `lead` | body | 20px / 1.5 | 600 | Hero and section intros. |
| `body` | body | 17px / 1.55 | 400 | Running text. Keep lines near 65 characters. |
| `body-strong` | body | 17px / 1.45 | 600 | Chat bubbles, list items, form feedback. |
| `kicker` | body | 13px / 1 | 800 | Eyebrow label above a headline, set in a solid `ink` box. Uppercase. |
| `label` | body | 12px / 1.2 | 800 | Form labels and tags. Uppercase. |
| `small` | body | 14px / 1.5 | 600 | Footnotes, consent lines, captions. |

Families: `display` = Anton, Impact, "Arial Narrow Bold", sans-serif; `body` = Inter, system-ui, -apple-system, "Segoe UI", sans-serif. Both load from Google Fonts.

### Spacing

| Token | Value | Use |
|---|---|---|
| `space-1` | `4px` | Tight gaps inside tags. |
| `space-2` | `8px` | Icon-to-label gaps. |
| `space-3` | `12px` | Chip and chat-bubble gaps. |
| `space-4` | `16px` | Minimum page gutter on phones; form field gaps. |
| `space-5` | `24px` | Box padding; page gutter on desktop. |
| `space-6` | `28px` | Gap between cards in a grid. |
| `space-7` | `44px` | Gap between the two columns of a section. |
| `space-8` | `96px` | Vertical padding of every section. |

### Radius

| Token | Value | Use |
|---|---|---|
| `radius-none` | `0` | Everything: buttons, boxes, inputs, cards. Koottam is square. |
| `radius-dot` | `50%` | Only the blinking live dot and the launcher's notification dot. |

### Shadow

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `3px 3px 0 #0d0d0d (light) · 3px 3px 0 #f5f0e6 (dark)` | Chips and small buttons. |
| `shadow-md` | `6px 6px 0 #0d0d0d (light) · 6px 6px 0 #f5f0e6 (dark)` | Buttons and job rows. Grows to 8px on hover, drops to 2px on press. |
| `shadow-lg` | `8px 8px 0 #0d0d0d (light) · 8px 8px 0 #f5f0e6 (dark)` | Boxes, cards and the chat window. |
| `shadow-xl` | `12px 12px 0 #0d0d0d (light) · 12px 12px 0 #f5f0e6 (dark)` | The hero counter only. |

### Stroke

| Token | Value | Use |
|---|---|---|
| `stroke-thick` | `3px` | Borders on boxes, buttons, inputs and section dividers. |
| `stroke-mid` | `2.5px` | Chips, chat bubbles, small inputs. |
| `stroke-thin` | `2px` | Tags and leaderboard row dividers. |

### Rotation

| Token | Value | Use |
|---|---|---|
| `tilt-mark` | `-1.5deg` | The yellow highlight behind a word. |
| `tilt-stamp` | `-3deg` | The red outline stamp above the hero. |
| `tilt-counter` | `1.5deg` | The hero counter box. |
