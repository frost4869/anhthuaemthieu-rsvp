# Anh Thừa & Em Thiếu – RSVP

Static RSVP page (EN / VI) for GitHub Pages. No build step. RSVPs land in a Google Sheet.

```
index.html  styles.css  app.js   page
config.js                        ← event details + guest-list URL (edit this)
apps-script/Code.gs              paste into Google Sheets (guest list backend)
```

## 1. Guest list (Google Sheet), about 5 minutes, once

1. Create a new Google Sheet (name it e.g. *Anh Thừa & Em Thiếu – RSVP*).
2. **Extensions → Apps Script**. Delete the sample code, paste all of `apps-script/Code.gs`, save.
   (Optional: put your email in `NOTIFY_EMAIL` to get a mail per RSVP.)
3. **Deploy → New deployment → ⚙ Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, and approve the permission prompt ("Advanced → Go to project (unsafe)" is normal for your own script).
4. Copy the **Web app URL** (`https://script.google.com/macros/s/…/exec`) into `scriptUrl` in `config.js`.
5. Open the sheet: tab **RSVP** has one row per guest; tab **Summary** has headcount totals.
   Both tabs are created on the first RSVP.

> If you edit `Code.gs` later: **Deploy → Manage deployments → ✏ → New version → Deploy** (the URL stays the same).

Until `scriptUrl` is filled in, the form runs in **demo mode** (looks real, saves nothing).

## 2. Publish on GitHub Pages

1. Push these files to a GitHub repo (root of `main`).
2. **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.
3. Your link is `https://<user>.github.io/<repo>/`. Send it to guests. The default language is Vietnamese; guests can switch to English with the EN | VI toggle (or `?lang=en`). The choice is remembered.

## 3. Change details

Everything is in `config.js` (names, date/time, venue, map search, max guests).
Texts in both languages are at the top of `app.js`.

## Preview locally

```
python -m http.server 8080      # then open http://localhost:8080
```

## Notes

- Guests who reopen the link on the same device see their previous answer and can change it
  (it updates their row instead of adding a new one).
- The Apps Script URL is visible in the page source (unavoidable on a static site). It can only add or
  update RSVP rows; it cannot read the guest list. Spam protection built in:
  hidden honeypot field, length limits, formula-injection guard, a "time on page" check
  (the page waits until 3 s have passed; the script rejects anything under 2.5 s),
  a global limit of 20 writes/minute and a cap of 500 guest rows (existing guests can still edit).
  Tune `MAX_ROWS`, `MAX_PER_MINUTE`, `MIN_ELAPSED_MS` at the top of `Code.gs`.
- After editing `Code.gs`: **Deploy → Manage deployments → ✏ → Version: New version → Deploy**.
- Keep the Sheet itself private (never "anyone with the link"), and keep `NOTIFY_EMAIL` out of the repo.
- Calendar (no menu, picked from the guest's device): iPhone/iPad/Mac → `.ics` (opens Apple Calendar);
  Android, Windows, Linux → Google Calendar. To send Windows users an `.ics` instead, change `useIcs` in `app.js`.
  The event is 18:30–20:30 Vietnam time (UTC+7).
