# Koottam: go-live setup

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
6. In `index.html`, find `CONFIG` and paste the URL into `API_URL: '...'`. Commit the change, and the live site picks it up.

Each sign-up becomes a row in the **Members** tab: member number, time, name, phone, education, domain, status and group. The website can only read the totals, never anyone's name or number.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → Version: New version**, so the URL stays the same.

## 3. Add WhatsApp group invite links
Create the groups in WhatsApp (**Group → Invite via link → Copy link**), then fill in `CONFIG.GROUP_LINKS` in `index.html`:

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

## Custom domain (optional)
To use your own domain, go to **Settings → Pages → Custom domain**, enter it, and add the DNS record GitHub shows you.
