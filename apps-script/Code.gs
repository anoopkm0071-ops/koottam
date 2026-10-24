/**
 * Koottam backend: a Google Sheet + this Apps Script web app.
 *
 * GET               -> public totals {members, today, byDomain, jobs, stories}  (no personal data)
 * GET ?ref=<no>     -> {referrals} for a member's invite link
 * POST (no type)    -> new member  {name, phone, education, domain, status, group, ref}
 * POST type=job     -> job post / referral / industry lead
 * POST type=story   -> success story
 * POST type=scam    -> scam report
 *
 * Jobs and stories only appear on the site after you type "yes" in their "Show on site" column.
 * Setup steps: see SETUP.md.
 */
const TZ = 'Asia/Kolkata';
const SHEETS = {
  Members: ['Member #', 'Joined at', 'Name', 'Phone', 'Education', 'Domain', 'Status', 'Group', 'Referred by'],
  Jobs:    ['Posted at', 'Name', 'Contact', 'Company', 'Role', 'Domain', 'Location', 'Type', 'Link', 'Details', 'Wants to be lead', 'Show on site'],
  Stories: ['Sent at', 'Name', 'Contact', 'Domain', 'Role', 'Company', 'Story', 'Consent', 'Show on site'],
  Scams:   ['Reported at', 'Agent / company', 'Their phone or website', 'What happened', 'Amount asked', 'Reporter contact']
};

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(SHEETS[name]); sh.setFrozenRows(1); }
  return sh;
}

function rows_(sh) {
  const last = sh.getLastRow();
  return last > 1 ? sh.getRange(2, 1, last - 1, sh.getLastColumn()).getValues() : [];
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Stop spreadsheet formula injection (=, +, -, @) and cap lengths.
function clean_(v, max) {
  v = String(v == null ? '' : v).trim().slice(0, max);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

const yes_ = v => /^(y|yes|true|1)$/i.test(String(v).trim());
const https_ = v => /^https:\/\//.test(String(v)) ? String(v) : '';

function stats_() {
  const rows = rows_(sheet_('Members'));
  const today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  const byDomain = {};
  let t = 0;
  rows.forEach(r => {
    byDomain[r[5]] = (byDomain[r[5]] || 0) + 1;
    if (r[1] && Utilities.formatDate(new Date(r[1]), TZ, 'yyyy-MM-dd') === today) t++;
  });
  return { members: rows.length, today: t, byDomain: byDomain };
}

function publicJobs_() {
  return rows_(sheet_('Jobs')).filter(r => yes_(r[11])).slice(-6).reverse()
    .map(r => ({ company: r[3], role: r[4], domain: r[5], location: r[6], type: r[7], link: https_(r[8]) }));
}

function publicStories_() {
  return rows_(sheet_('Stories')).filter(r => yes_(r[8]) && yes_(r[7])).slice(-6).reverse()
    .map(r => ({ name: String(r[1]).split(' ')[0], domain: r[3], role: r[4], company: r[5], story: r[6] }));
}

function doGet(e) {
  const ref = e && e.parameter && String(e.parameter.ref || '');
  if (/^\d{1,7}$/.test(ref)) {
    const n = rows_(sheet_('Members')).filter(r => String(r[8]) === ref).length;
    return json_({ referrals: n });
  }
  return json_(Object.assign(stats_(), { jobs: publicJobs_(), stories: publicStories_() }));
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');
    if (d.website) return json_({ ok: true }); // honeypot: bots fill hidden fields
    const now = new Date();
    if (d.type === 'job') {
      if (!d.name || !d.contact || !d.company || !d.role || !d.domain || !d.location) return json_({ ok: false, error: 'invalid' });
      sheet_('Jobs').appendRow([now, clean_(d.name, 60), clean_(d.contact, 80), clean_(d.company, 80), clean_(d.role, 80),
        clean_(d.domain, 40), clean_(d.location, 60), clean_(d.jobType, 40), clean_(https_(d.link), 300), clean_(d.details, 1000),
        d.lead ? 'yes' : '', '']);
      return json_({ ok: true });
    }
    if (d.type === 'story') {
      if (!d.name || !d.role || !d.story || !d.consent) return json_({ ok: false, error: 'invalid' });
      sheet_('Stories').appendRow([now, clean_(d.name, 60), clean_(d.contact, 80), clean_(d.domain, 40), clean_(d.role, 80),
        clean_(d.company, 80), clean_(d.story, 400), 'yes', '']);
      return json_({ ok: true });
    }
    if (d.type === 'scam') {
      if (!d.agent || !d.agentContact || !d.details) return json_({ ok: false, error: 'invalid' });
      sheet_('Scams').appendRow([now, clean_(d.agent, 100), clean_(d.agentContact, 120), clean_(d.details, 1000),
        clean_(d.amount, 40), clean_(d.contact, 80)]);
      return json_({ ok: true });
    }

    // New member
    const phone = String(d.phone || '').replace(/\D/g, '').slice(-10);
    const name = clean_(d.name, 60);
    if (!/^[6-9]\d{9}$/.test(phone) || name.length < 2) return json_({ ok: false, error: 'invalid' });
    const sh = sheet_('Members');
    const last = sh.getLastRow();
    if (last > 1) {
      const phones = sh.getRange(2, 4, last - 1, 1).getValues();
      const i = phones.findIndex(r => String(r[0]).replace(/\D/g, '').slice(-10) === phone);
      if (i > -1) return json_(Object.assign({ ok: true, existing: true, memberNo: sh.getRange(i + 2, 1).getValue() }, stats_()));
    }
    const memberNo = last; // row 1 is the header, so the next member number equals the current last row
    const ref = /^\d{1,7}$/.test(String(d.ref || '')) && Number(d.ref) < memberNo ? String(d.ref) : '';
    sh.appendRow([
      memberNo, now, name, "'" + phone,
      clean_(d.education, 40), clean_(d.domain, 60),
      d.status === 'employed' ? 'employed' : 'unemployed',
      clean_(d.group, 100), ref
    ]);
    return json_(Object.assign({ ok: true, memberNo: memberNo }, stats_()));
  } catch (err) {
    return json_({ ok: false, error: 'server' });
  } finally {
    lock.releaseLock();
  }
}
