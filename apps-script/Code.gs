/**
 * RSVP backend: stores each response as a row in this Google Sheet.
 * Paste into  Extensions → Apps Script  of the spreadsheet (see README.md), then Deploy → Web app.
 */

// Optional: get an email for every RSVP. Leave '' to disable.
// (Keep your address out of the public GitHub repo: set it only inside Apps Script.)
const NOTIFY_EMAIL = '';

// Anti-spam limits (the script URL is public, so anyone can POST to it).
const MAX_ROWS = 500;          // stop adding NEW guests beyond this many rows (existing guests can still update)
const MAX_PER_MINUTE = 20;     // max accepted writes per minute, all guests combined
const MIN_ELAPSED_MS = 2500;   // the page reports how long the form was open; scripted POSTs are usually instant

const RSVP_SHEET = 'RSVP';
const SUMMARY_SHEET = 'Summary';
const HEADERS = ['Updated at', 'Name', 'Attending', 'Guests', 'Message', 'Lang', 'ID'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents);

    if (d.website) return json_({ ok: true }); // honeypot filled → bot; pretend success

    // Submitted faster than a human can fill the form → scripted request.
    if (!(Number(d.elapsed) >= MIN_ELAPSED_MS)) return json_({ ok: false, error: 'too fast' });

    const name = clip_(d.name, 100);
    if (!name) return json_({ ok: false, error: 'name required' });
    if (d.attending !== 'yes' && d.attending !== 'no') return json_({ ok: false, error: 'attending required' });

    // Global rate limit (we already hold the script lock, so the counter can't race).
    const cache = CacheService.getScriptCache();
    const bucket = 'rl:' + Math.floor(Date.now() / 60000);
    const used = parseInt(cache.get(bucket), 10) || 0;
    if (used >= MAX_PER_MINUTE) return json_({ ok: false, error: 'busy' });
    cache.put(bucket, String(used + 1), 120);

    const attending = d.attending === 'yes' ? 'Yes' : 'No';
    const guests = attending === 'Yes' ? Math.min(Math.max(parseInt(d.guests, 10) || 1, 1), 20) : 0;
    const id = clip_(d.id, 64);

    const sheet = ensureSheets_();
    const row = [new Date(), safe_(name), attending, guests, safe_(clip_(d.message, 1000)), d.lang === 'vi' ? 'vi' : 'en', id];

    // Same device re-submitting → update its row instead of adding a duplicate.
    let target = 0;
    const last = sheet.getLastRow();
    if (id && last > 1) {
      const ids = sheet.getRange(2, HEADERS.length, last - 1, 1).getValues();
      for (let i = 0; i < ids.length; i++) if (ids[i][0] === id) { target = i + 2; break; }
    }
    if (target) {
      sheet.getRange(target, 1, 1, row.length).setValues([row]);
    } else {
      if (last - 1 >= MAX_ROWS) return json_({ ok: false, error: 'full' }); // cap new guests
      sheet.appendRow(row);
    }

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'RSVP: ' + name + ' – ' + attending + (guests ? ' (' + guests + ')' : ''),
        'Name: ' + name + '\nAttending: ' + attending + '\nGuests: ' + guests + '\nMessage: ' + (d.message || '-'));
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the URL in a browser just confirms it's alive (no guest data is exposed).
function doGet() { return json_({ ok: true, service: 'rsvp' }); }

function ensureSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RSVP_SHEET);
  if (!sheet) {
    sheet = ss.getActiveSheet().setName(RSVP_SHEET);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
  }
  if (!ss.getSheetByName(SUMMARY_SHEET)) {
    const s = ss.insertSheet(SUMMARY_SHEET);
    s.getRange('A1:B4').setValues([
      ['Coming (responses)', '=COUNTIF(RSVP!C:C,"Yes")'],
      ['Total headcount',    '=SUMIF(RSVP!C:C,"Yes",RSVP!D:D)'],
      ['Not coming',         '=COUNTIF(RSVP!C:C,"No")'],
      ['Total responses',    '=COUNTA(RSVP!B2:B)'],
    ]);
    s.getRange('A1:A4').setFontWeight('bold');
    s.setColumnWidth(1, 180);
    ss.setActiveSheet(sheet);
  }
  return sheet;
}

const clip_ = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
// Stop spreadsheet formula injection: text starting with = + - @ would be evaluated.
const safe_ = (s) => (/^[=+\-@]/.test(s) ? "'" + s : s);
const json_ = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
