# Koottam: go-live setup

All settings live in one file, `config.js`. Every page reads it.

The site is a single file, `index.html`, served by GitHub Pages. Sign-ups go to a Google Sheet through a small Apps Script, which also serves the live member counts.

## 1. Switch on GitHub Pages (1 minute)
1. Open the repo on GitHub, then **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Pick branch **main** and folder **/ (root)**, then click **Save**.
4. After about a minute the site is live at `https://<your-github-username>.github.io/koottam/`.

## 2. Connect the sign-up sheet (5 minutes)
1. Create a new Google Sheet, for example "Koottam Members".
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the sample code, paste in everything from [`apps-script/Code.gs`](apps-script/Code.gs) and click **Save**.
4. Click **Deploy → New deployment**. Under **Select type**, choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, approve the Google permissions prompt, then copy the **Web app URL**. It ends in `/exec`.
6. Open `config.js` and paste the URL into `API_URL: '...'`. Commit the change, and every page picks it up.

The script creates four tabs on its own:

| Tab | What lands there |
|---|---|
| **Members** | Every sign-up: member number, time, name, phone, education, domain, status, group, and who invited them |
| **Jobs** | Posts from the "Hiring?" form, including people who want to be industry leads |
| **Stories** | Success stories sent from the site |
| **Scams** | Scam reports |

The website can only read totals, approved jobs and approved stories. It never sees anyone's phone number.

**Approving posts:** a job or story only appears on the site after you type `yes` in its **Show on site** column. Check the **Scams** tab regularly and warn the groups about repeat names.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → Version: New version**, so the URL stays the same.

## 2b. Send every new member a WhatsApp thank-you (optional)

WhatsApp only lets a business message someone first through the **WhatsApp Business Platform** (Meta Cloud API), using a message template Meta has approved. Meta charges a small fee per template message.

1. Go to https://business.facebook.com and create a Meta Business account (free).
2. Go to https://developers.facebook.com → **My Apps → Create app** → type **Business** → add the **WhatsApp** product.
3. Under **WhatsApp → API Setup**, add your business phone number. It must be a number that is **not** already on the normal WhatsApp or WhatsApp Business app. Verify it by SMS, and add a payment method when asked.
4. Copy the **Phone number ID** from that page.
5. Create a permanent token: **Business settings → Users → System users → Add** (Admin) → **Add assets** (your app, full control) → **Generate token** with `whatsapp_business_messaging` and `whatsapp_business_management`. Copy it.
6. Create the template: **WhatsApp Manager → Message templates → Create** → category **Utility**, name `koottam_welcome`, language **English**, body:

   > Hi {{1}}, thanks for joining Koottam! ✊ You're member #{{2}} in {{3}}. We'll share job openings, referrals and interview prep with you here. Never pay anyone for a job. Not a vazha anymore 🪓

   Add sample values (Anoop, 1, Marketing · Job seekers) and submit. Approval usually takes minutes to a few hours.
7. In your sheet, open **Extensions → Apps Script → Project Settings (⚙️) → Script properties** and add:
   - `WA_TOKEN` = the token from step 5
   - `WA_PHONE_ID` = the Phone number ID from step 4
8. Paste the latest `apps-script/Code.gs` into the editor, **Save**, then **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**, and allow the new permission (it now sends web requests to WhatsApp).

The **Members** tab's last column shows `sent`, `failed (code)` or `off` for every new member.

## 3. Add WhatsApp group invite links
Create the groups in WhatsApp (**Group → Invite via link → Copy link**), then fill in `GROUP_LINKS` in `config.js`:

```js
GROUP_LINKS:{
  'marketing-job-seekers':'https://chat.whatsapp.com/XXXX',
  'marketing-working-professionals':'https://chat.whatsapp.com/YYYY',
},
DOMAIN_LINKS:{ mkt:'https://chat.whatsapp.com/ZZZZ' },  // fallback for a whole domain
DEFAULT_LINK:'https://chat.whatsapp.com/AAAA'           // everyone else
```

Group names follow the pattern `<domain>-job-seekers` and `<domain>-working-professionals`:
`it-software`, `marketing`, `sales`, `founder-s-office`, `nursing-healthcare`, `banking-finance`, `gulf-abroad`, `teaching`, `engineering-construction`, `hospitality-tourism`, `psc-government`, `design-creative`.

Until a link is set, members see "Invite on the way", and you can add them by hand from the sheet.

## 4. "Who's behind this" section
People trust a face. In `config.js`, fill in `FOUNDER`. The section stays hidden until `name` is set.

```js
FOUNDER:{
  name:'Your Name',
  role:'Founder, Koottam',
  photo:'founder.jpg',            // upload a square photo to the repo, or use an https:// link
  story:'Why you started Koottam, in 2–4 sentences.',
  instagram:'https://instagram.com/yourhandle',
  whatsapp:'98XXXXXXXX',
  email:'you@example.com'
},
INSTAGRAM:'https://instagram.com/koottam',   // adds an Instagram link to the footer
```

## 5. Visitor stats (optional, free)
1. Sign up at https://www.goatcounter.com and pick a code, for example `koottam`.
2. Set `GOATCOUNTER:'koottam'` in `config.js`.
3. See visits, top pages and where people came from (WhatsApp, Instagram and so on) at `https://koottam.goatcounter.com`.

## 6. Invite links
Every member gets a personal link like `…/koottam/?ref=42`. Anyone who joins through it is recorded in the **Referred by** column, and the member sees "🔗 N Mallus joined through your link". To find your top recruiters, sort the **Members** tab by **Referred by** and count.

If you move to a custom domain, update `SITE_URL` in `config.js` so invite links use it.

## Custom domain (optional)
To use your own domain, go to **Settings → Pages → Custom domain**, enter it, and add the DNS record GitHub shows you. Then update `SITE_URL` in `config.js`, plus the `og:url` and `og:image` tags at the top of each `.html` page, so WhatsApp previews keep working.
