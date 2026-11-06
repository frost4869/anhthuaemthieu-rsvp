// ──────────────────────────────────────────────────────────────
//  All event details live here. Edit this file, nothing else, to change them.
// ──────────────────────────────────────────────────────────────
window.EVENT_CONFIG = {
  // Event name, shown as: <titleA> & <titleB>
  titleA: "Anh Thừa",
  titleB: "Em Thiếu",

  // Date (YYYY-MM-DD) and local time (24h, Vietnam time)
  date: "2026-12-19",
  startTime: "18:30",
  endTime: "20:30",
  utcOffsetMinutes: 7 * 60, // Asia/Ho_Chi_Minh, no daylight saving
  timeZone: "Asia/Ho_Chi_Minh",

  venue: "Oromia Coffee & Lounge",
  address: "85 Phan Kế Bính, P. Tân Định",
  city: "TP. Hồ Chí Minh",
  // What Google Maps searches for (embedded map + directions button).
  // If the pin lands in the wrong place, paste the exact place name/address from Google Maps.
  mapsQuery: "Oromia Coffee & Lounge, 85 Phan Kế Bính, Tân Định, Hồ Chí Minh",

  maxGuests: 10, // upper limit of "number of guests (including you)"

  // Google Apps Script web-app URL that stores RSVPs in a Google Sheet (see README.md).
  // While empty, the form runs in DEMO mode: nothing is saved anywhere.
  scriptUrl: "https://script.google.com/macros/s/AKfycbzXjGv7szCLTJmUtVqQ3mnhshLal5qd2RGJlcUCGcVfNdgIl40tLSQFkDXT2iJN09cu/exec",
};
