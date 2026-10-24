/**
 * Koottam sign-up backend: a Google Sheet + this Apps Script web app.
 * GET  -> live public counts {members, today, byDomain}  (no personal data)
 * POST -> new sign-up {name, phone, education, domain, status, group}
 *         returns {ok, memberNo, members, today, byDomain}
 * Setup steps: see SETUP.md.
 */
const SHEET = 'Members';
const HEAD = ['Member #', 'Joined at', 'Name', 'Phone', 'Education', 'Domain', 'Status', 'Group'];
const TZ = 'Asia/Kolkata';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Stop spreadsheet formula injection (=, +, -, @) and cap lengths.
function clean_(v, max) {
  v = String(v == null ? '' : v).trim().slice(0, max);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function stats_(sh) {
  const last = sh.getLastRow();
  const rows = last > 1 ? sh.getRange(2, 1, last - 1, HEAD.length).getValues() : [];
  const today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  const byDomain = {};
  let t = 0;
  rows.forEach(r => {
    byDomain[r[5]] = (byDomain[r[5]] || 0) + 1;
    if (r[1] && Utilities.formatDate(new Date(r[1]), TZ, 'yyyy-MM-dd') === today) t++;
  });
  return { members: rows.length, today: t, byDomain: byDomain };
}

function doGet() {
  return json_(stats_(sheet_()));
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e.postData && e.postData.contents) || '{}');
    const phone = String(d.phone || '').replace(/\D/g, '').slice(-10);
    const name = clean_(d.name, 60);
    if (!/^[6-9]\d{9}$/.test(phone) || name.length < 2) return json_({ ok: false, error: 'invalid' });

    const sh = sheet_();
    const last = sh.getLastRow();
    if (last > 1) {
      const phones = sh.getRange(2, 4, last - 1, 1).getValues();
      const i = phones.findIndex(r => String(r[0]).replace(/\D/g, '').slice(-10) === phone);
      if (i > -1) return json_(Object.assign({ ok: true, existing: true, memberNo: sh.getRange(i + 2, 1).getValue() }, stats_(sh)));
    }
    const memberNo = last; // row 1 is the header, so the next member number equals the current last row
    sh.appendRow([
      memberNo, new Date(), name, "'" + phone,
      clean_(d.education, 40), clean_(d.domain, 60),
      d.status === 'employed' ? 'employed' : 'unemployed',
      clean_(d.group, 100)
    ]);
    return json_(Object.assign({ ok: true, memberNo: memberNo }, stats_(sh)));
  } catch (err) {
    return json_({ ok: false, error: 'server' });
  } finally {
    lock.releaseLock();
  }
}
