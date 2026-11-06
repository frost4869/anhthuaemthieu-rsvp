(() => {
  "use strict";
  const C = window.EVENT_CONFIG;
  const $ = (id) => document.getElementById(id);

  /* ───────────────────────── i18n ───────────────────────── */
  const I18N = {
    en: {
      eyebrow: "Casual get-together",
      lead: "We'd love to see you.",
      when: "When",
      where: "Where",
      rsvpCta: "RSVP",
      directions: "Directions",
      addCal: "Add to calendar",
      rsvpTitle: "Will you join us?",
      rsvpSub: "Let us know if you can make it.",
      fName: "Your name",
      fAttending: "Will you attend?",
      fYes: "Yes, I'll be there",
      fNo: "Sorry, I can't make it",
      fGuests: "Number of guests (including you)",
      fMessage: "Message to the host (optional)",
      fMessagePh: "Anything you'd like us to know…",
      fSubmit: "Send RSVP",
      sending: "Sending…",
      errName: "Please enter your name.",
      errAttending: "Please choose yes or no.",
      errSend: "Something went wrong. Please try again in a moment.",
      errBusy: "Lots of replies right now. Please try again in a minute.",
      errClosed: "RSVPs are closed. Please contact the host directly.",
      thanksYes: "Thank you, {name}!",
      thanksYesText: "We've saved your spot for {n}. See you there!",
      thanksNo: "Thank you, {name}",
      thanksNoText: "Sorry you can't make it. You'll be missed!",
      people: { one: "1 person", other: "{n} people" },
      editResponse: "Change my response",
      demoNote: "Demo mode: this response was not saved anywhere (guest list not connected yet).",
      mapTitle: "Find us",
      openMaps: "Open in Google Maps",
      footer: "See you there",
      eventTitle: "Anh Thừa & Em Thiếu – Casual get-together",
      eventDesc: "RSVP & details: {url}",
    },
    vi: {
      eyebrow: "Mạn đàm",
      lead: "Rất mong được đón bạn.",
      when: "Thời gian",
      where: "Địa điểm",
      rsvpCta: "Xác nhận",
      directions: "Chỉ đường",
      addCal: "Thêm vào lịch",
      rsvpTitle: "Bạn sẽ đến chứ?",
      rsvpSub: "Cho chúng mình biết bạn có đến được không nhé.",
      fName: "Tên của bạn",
      fAttending: "Bạn có tham dự không?",
      fYes: "Có, mình sẽ đến",
      fNo: "Mình không đến được",
      fGuests: "Số khách (bao gồm bạn)",
      fMessage: "Lời nhắn đến chủ nhà (không bắt buộc)",
      fMessagePh: "Bạn muốn nhắn gì với chúng mình…",
      fSubmit: "Gửi xác nhận",
      sending: "Đang gửi…",
      errName: "Vui lòng nhập tên của bạn.",
      errAttending: "Vui lòng chọn có hoặc không.",
      errSend: "Có lỗi xảy ra. Vui lòng thử lại sau ít phút.",
      errBusy: "Đang có nhiều phản hồi. Vui lòng thử lại sau một phút.",
      errClosed: "Đã đóng nhận xác nhận. Vui lòng liên hệ trực tiếp chủ nhà.",
      thanksYes: "Cảm ơn {name}!",
      thanksYesText: "Chúng mình đã giữ chỗ cho {n}. Hẹn gặp bạn nhé!",
      thanksNo: "Cảm ơn {name}",
      thanksNoText: "Tiếc là bạn không đến được. Hẹn dịp khác nhé!",
      people: { one: "1 người", other: "{n} người" },
      editResponse: "Sửa câu trả lời",
      demoNote: "Chế độ thử: câu trả lời này chưa được lưu (chưa kết nối danh sách khách).",
      mapTitle: "Chỉ đường",
      openMaps: "Mở trong Google Maps",
      footer: "Hẹn gặp bạn nhé",
      eventTitle: "Anh Thừa & Em Thiếu – Mạn đàm",
      eventDesc: "Chi tiết & xác nhận: {url}",
    },
  };

  /* ───────────────────────── helpers ───────────────────────── */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode etc. */ } },
  };
  const PAGE_LOADED = Date.now();
  const MIN_FORM_MS = 3000; // anti-bot: the script rejects submissions faster than ~2.5s, so wait this out first
  const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : ""));

  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "vi") return q;
    const saved = store.get("lang");
    if (saved === "en" || saved === "vi") return saved;
    return "vi"; // default language is Vietnamese (EN via the toggle or ?lang=en)
  }
  let lang = pickLang();
  const t = (k, vars) => fill(I18N[lang][k] ?? k, vars || {});

  /* ───────────────────────── date / time ───────────────────────── */
  const [Y, M, D] = C.date.split("-").map(Number);
  const hm = (s) => s.split(":").map(Number);
  const startLocalMs = Date.UTC(Y, M - 1, D, ...hm(C.startTime));    // wall-clock as if UTC
  const endLocalMs = Date.UTC(Y, M - 1, D, ...hm(C.endTime));
  const pad = (n) => String(n).padStart(2, "0");
  const fmtLocal = (ms) => {                                          // YYYYMMDDTHHMMSS
    const d = new Date(ms);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00`;
  };
  const fmtUtc = (ms) => fmtLocal(ms - C.utcOffsetMinutes * 60000) + "Z";

  function dateLine() {
    const weekday = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-US", { weekday: "long", timeZone: "UTC" })
      .format(new Date(Date.UTC(Y, M - 1, D)));
    return `${weekday} – ${pad(D)}.${pad(M)}.${Y}`;
  }

  /* ───────────────────────── map links ───────────────────────── */
  const q = encodeURIComponent(C.mapsQuery);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  /* ───────────────────────── calendar ───────────────────────── */
  function detectPlatform() {
    const ua = navigator.userAgent || "";
    const plat = navigator.platform || "";
    const iPadOS = plat === "MacIntel" && navigator.maxTouchPoints > 1;
    if (/iPhone|iPad|iPod/.test(ua) || iPadOS) return "ios";
    if (/Android/i.test(ua)) return "android";
    if (/Mac/i.test(plat)) return "mac";
    return "other"; // Windows, Linux, ChromeOS…
  }
  const platform = detectPlatform();
  const location_ = () => `${C.venue}, ${C.address}, ${C.city}`;
  const evTitle = () => t("eventTitle");
  const evDesc = () => t("eventDesc", { url: location.href.split("#")[0] });

  function googleCalUrl() {
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: evTitle(),
      dates: `${fmtLocal(startLocalMs)}/${fmtLocal(endLocalMs)}`,
      ctz: C.timeZone,
      location: location_(),
      details: evDesc(),
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  }
  const icsEsc = (s) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  const icsFold = (line) => {                      // RFC 5545: max 75 octets/line; fold on chars (safe margin)
    const out = [];
    for (let i = 0; i < line.length; i += 60) out.push((i ? " " : "") + line.slice(i, i + 60));
    return out.join("\r\n");
  };
  function downloadIcs() {
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//anhthuaemthieu-rsvp//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:anhthua-emthieu-${C.date}@rsvp`,
      `DTSTAMP:${fmtUtc(Date.now() + C.utcOffsetMinutes * 60000)}`,
      `DTSTART:${fmtUtc(startLocalMs)}`,
      `DTEND:${fmtUtc(endLocalMs)}`,
      `SUMMARY:${icsEsc(evTitle())}`,
      `LOCATION:${icsEsc(location_())}`,
      `DESCRIPTION:${icsEsc(evDesc())}`,
      `URL:${location.href.split("#")[0]}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsEsc(evTitle())}`, "TRIGGER:-PT2H", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ];
    const blob = new Blob([lines.map(icsFold).join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: "anh-thua-em-thieu.ics" });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  // No choice for the guest: Apple devices → .ics (opens Apple Calendar); everything else → Google Calendar.
  const useIcs = platform === "ios" || platform === "mac";
  const calBtn = $("btnCal");
  calBtn.addEventListener("click", () => {
    if (useIcs) downloadIcs();
    else window.open(googleCalUrl(), "_blank", "noopener");
  });

  /* ───────────────────────── render / language ───────────────────────── */
  let submitted = null; // { name, attending, guests } once answered

  function renderThanks() {
    if (!submitted) return;
    const yes = submitted.attending === "yes";
    const ppl = I18N[lang].people;
    const n = submitted.guests === 1 ? ppl.one : fill(ppl.other, { n: submitted.guests });
    $("thanksTitle").textContent = t(yes ? "thanksYes" : "thanksNo", { name: submitted.name });
    $("thanksText").textContent = yes ? t("thanksYesText", { n }) : t("thanksNoText");
    $("demoNote").hidden = !!C.scriptUrl;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

    $("dateText").textContent = dateLine();
    $("timeText").textContent = `${C.startTime} – ${C.endTime}`;
    calBtn.textContent = t("addCal");

    document.title = `${C.titleA} & ${C.titleB} · ${t("eyebrow")}`;
    renderThanks();
    renderErrors();
    if (!$("btnSubmit").disabled) $("btnSubmit").textContent = t("fSubmit");
  }

  document.querySelectorAll(".lang button").forEach((b) =>
    b.addEventListener("click", () => { lang = b.dataset.lang; store.set("lang", lang); applyLang(); }));

  // static content from config
  $("titleA").textContent = C.titleA;
  $("titleB").textContent = C.titleB;
  $("venueText").textContent = C.venue;
  // keep each comma-separated part together, so the address only wraps between parts ("P. Tân Định" never splits)
  const addrParts = `${C.address}, ${C.city}`.split(", ");
  $("addressText").replaceChildren(...addrParts.flatMap((part, i) => {
    const s = document.createElement("span");
    s.className = "nw";
    s.textContent = part + (i < addrParts.length - 1 ? "," : "");
    // the separating space lives OUTSIDE the nowrap span, so it stays a legal line-break point
    return i < addrParts.length - 1 ? [s, document.createTextNode(" ")] : [s];
  }));
  $("btnDirections").href = dirUrl;
  $("btnOpenMaps").href = mapsUrl;
  $("mapFrame").src = `https://www.google.com/maps?q=${q}&z=16&output=embed`;

  /* ───────────────────────── RSVP form ───────────────────────── */
  const form = $("rsvpForm");
  const guests = $("guests");
  guests.max = String(C.maxGuests);
  const clampGuests = () => {
    const n = Math.min(C.maxGuests, Math.max(1, parseInt(guests.value, 10) || 1));
    guests.value = n;
    return n;
  };
  $("gMinus").addEventListener("click", () => { guests.value = clampGuests() - 1; clampGuests(); });
  $("gPlus").addEventListener("click", () => { guests.value = clampGuests() + 1; clampGuests(); });
  guests.addEventListener("change", clampGuests);

  const attendingVal = () => (form.querySelector('input[name="attending"]:checked') || {}).value;
  form.querySelectorAll('input[name="attending"]').forEach((r) =>
    r.addEventListener("change", () => {
      $("guestsField").hidden = attendingVal() !== "yes";
      $("errAttending").hidden = true;
    }));

  const showErr = (id, key) => { const el = $(id); el.textContent = key ? t(key) : ""; el.hidden = !key; };
  let errState = { name: false, attending: false, send: false };
  function renderErrors() {
    showErr("errName", errState.name && "errName");
    showErr("errAttending", errState.attending && "errAttending");
    showErr("errForm", errState.send); // false, or an i18n key: errSend / errBusy / errClosed
    $("name").closest(".field").classList.toggle("invalid", errState.name);
  }

  function rsvpId() {
    let id = store.get("rsvp.id");
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
      store.set("rsvp.id", id);
    }
    return id;
  }

  async function send(payload) {
    if (!C.scriptUrl) { // demo mode
      console.info("[RSVP demo mode] not saved:", payload);
      await new Promise((r) => setTimeout(r, 500));
      return;
    }
    // Body is a plain string → "text/plain" → no CORS preflight (Apps Script can't answer one).
    const res = await fetch(C.scriptUrl, { method: "POST", body: JSON.stringify(payload) });
    const data = await res.json();
    if (!data || data.ok !== true) throw new Error((data && data.error) || "save failed");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("name").value.trim();
    const attending = attendingVal();
    errState = { name: !name, attending: !attending, send: false };
    renderErrors();
    if (errState.name) return void $("name").focus();
    if (errState.attending) return;

    const payload = {
      id: rsvpId(),
      name,
      attending,
      guests: attending === "yes" ? clampGuests() : 0,
      message: $("message").value.trim(),
      lang,
      website: form.elements.website.value, // honeypot
      elapsed: 0, // ms the page was open, filled in just before sending
    };

    const btn = $("btnSubmit");
    btn.disabled = true;
    btn.textContent = t("sending");
    try {
      const remaining = MIN_FORM_MS - (Date.now() - PAGE_LOADED);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      payload.elapsed = Date.now() - PAGE_LOADED;
      await send(payload);
      submitted ={ name, attending, guests: payload.guests };
      store.set("rsvp.last", JSON.stringify({ ...payload, website: undefined }));
      showThanks();
    } catch (err) {
      console.error(err);
      const m = String(err && err.message);
      errState.send = m === "busy" ? "errBusy" : m === "full" ? "errClosed" : "errSend";
      renderErrors();
    } finally {
      btn.disabled = false;
      btn.textContent = t("fSubmit");
    }
  });

  function showThanks() {
    renderThanks();
    form.hidden = true;
    $("thanks").hidden = false;
    document.querySelector(".panel-sub").hidden = true;
    $("thanks").scrollIntoView({ block: "center", behavior: "smooth" });
  }
  $("btnEdit").addEventListener("click", () => {
    $("thanks").hidden = true;
    form.hidden = false;
    document.querySelector(".panel-sub").hidden = false;
    $("name").focus();
  });

  // Returning guest on the same device: restore the previous answer.
  try {
    const last = JSON.parse(store.get("rsvp.last") || "null");
    if (last && last.name && (last.attending === "yes" || last.attending === "no")) {
      $("name").value = last.name;
      $("message").value = last.message || "";
      form.querySelector(`input[name="attending"][value="${last.attending}"]`).checked = true;
      $("guestsField").hidden = last.attending !== "yes";
      guests.value = Math.min(C.maxGuests, Math.max(1, last.guests || 1));
      submitted = { name: last.name, attending: last.attending, guests: last.attending === "yes" ? Number(guests.value) : 0 };
      applyLang();
      renderThanks();
      form.hidden = true;
      $("thanks").hidden = false;
      document.querySelector(".panel-sub").hidden = true;
    }
  } catch { /* ignore corrupted storage */ }

  applyLang();
})();
