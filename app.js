(() => {
  "use strict";
  const C = window.EVENT_CONFIG;
  const $ = (id) => document.getElementById(id);

  /* ───────────────────────── i18n ───────────────────────── */
  const I18N = {
    en: {
      eyebrow: "Talk show",
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
      fMessage: "Question for the speaker (optional)",
      fMessagePh: "Questions are kept anonymous, and the speaker will answer them during the program",
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
      contactTitle: "Contact",
      contactSub: "Questions about the event? Give us a call.",
      talkTitle: "About the talk",
      talkQuote: "Because he has too much, and thanks to her lack, humankind has thirsted for love through all ages.",
      talkShow: "Discover what the talk is about",
      talk1: "What is this thirst for love, that keeps so many hearts forever yearning, searching, aching without rest?",
      talk2: "Perhaps, even after a thousand generations, we will still struggle to fully explain the longing for love between man and woman, just as we can never fully account for the wondrous pull between the two poles of yin and yang, between differences that seem opposed yet always turn toward one another.",
      talk3: "The only thing we can be sure of is this: as long as a longing for love still lives within us, we are still alive, still stirred, still part of life’s wondrous current. For deep within every person, however different in form or inner world, there is always a desire to be swept away in the intoxication of love.",
      talk4: "Out of that same restlessness, the talk “ANH THỪA, EM THIẾU” was born. It will be an occasion for us to explore together the art of connection between men and women: where lack raises its voice in a call, and surplus finds meaning in giving.",
      talkSign: "Sincerely, the Authors’ Club",
      speakerTitle: "Our speaker",
      speakerName: "Ngô Duy Cường",
      speakerRole: "Author & artist",
      speakerAlt: "Portrait of Ngô Duy Cường",
      bioShow: "Discover more about the speaker",
      collapseHide: "Show less",
      bio1: "Author of “Tôi Đi Tìm Ai”, “Không Gì Dễ Bằng Yêu”, “Lãng Mạn – Giải Mã Thơ Tình Solomon” and “Đẹp Như Hơi Thở”. He graduated from an art college in the United States and has exhibited his paintings in major cities. He completed his master’s degree at the Andrews University Theological Seminary in 2001 and wrote his doctoral dissertation in 2015. He often organizes charity programs at orphanages and leprosy villages, and is invited to speak at religious communities, monasteries and universities. Drawing on his own experience, he has brought healing to many people through depression-therapy classes built on nature therapy.",
      bio2: "His everyday happiness is wandering through nature, enjoying the brushstrokes on a canvas, sitting down to write, and savoring a warm cup of tea in the stillness of the four seasons. At sixteen, on his way to school, he suddenly saw a young girl walking toward him on the other side of the street. In that instant his soul reeled and his heart seemed to stop. He has loved her passionately ever since. It has now been 37 years, and the warmth of that love is as strong as on the first day.",
      bio3: "Author Ngô Duy Cường and his wife have three children: Thùy Trân, Duy Ân and Linh Ân. They live in the City of Roses, Oregon, USA.",
      footer: "See you there",
      eventTitle: "Anh Thừa & Em Thiếu – Talk show",
      eventDesc: "RSVP & details: {url}",
    },
    vi: {
      eyebrow: "Mạn đàm",
      lead: "Rất mong được đón tiếp quý khách mời.",
      when: "Thời gian",
      where: "Địa điểm",
      rsvpCta: "Xác nhận",
      directions: "Chỉ đường",
      addCal: "Thêm vào lịch",
      rsvpTitle: "Vui lòng xác nhận tham dự",
      rsvpSub: "Cho chúng tôi biết anh/chị có tham dự được không nhé.",
      fName: "Tên của anh/chị",
      fAttending: "Anh/chị có tham dự không?",
      fYes: "Có, tôi sẽ tham dự",
      fNo: "Tôi không tham dự được",
      fGuests: "Số khách (bao gồm anh/chị)",
      fMessage: "Câu hỏi dành cho diễn giả (không bắt buộc)",
      fMessagePh: "Câu hỏi sẽ được ẩn danh và diễn giả sẽ giải đáp trong chương trình",
      fSubmit: "Gửi xác nhận",
      sending: "Đang gửi…",
      errName: "Vui lòng nhập tên của anh/chị.",
      errAttending: "Vui lòng chọn có hoặc không.",
      errSend: "Có lỗi xảy ra. Vui lòng thử lại sau ít phút.",
      errBusy: "Đang có nhiều phản hồi. Vui lòng thử lại sau một phút.",
      errClosed: "Đã đóng nhận xác nhận. Vui lòng liên hệ trực tiếp chủ nhà.",
      thanksYes: "Cảm ơn {name}!",
      thanksYesText: "Chúng mình đã giữ chỗ cho {n}. Hẹn gặp anh/chị nhé!",
      thanksNo: "Cảm ơn {name}",
      thanksNoText: "Tiếc là anh/chị không tham dự được. Hẹn dịp khác nhé!",
      people: { one: "1 người", other: "{n} người" },
      editResponse: "Sửa câu trả lời",
      demoNote: "Chế độ thử: câu trả lời này chưa được lưu (chưa kết nối danh sách khách).",
      mapTitle: "Hướng dẫn đường đi",
      contactTitle: "Liên hệ",
      contactSub: "Cần hỗ trợ thêm? Xin vui lòng gọi cho chúng tôi.",
      talkTitle: "Về buổi mạn đàm",
      talkQuote: "Vì anh thừa, nhờ em thiếu – mà nhân thế muôn đời vẫn khát tình",
      talkShow: "Khám phá nội dung buổi mạn đàm",
      talk1: "Khát tình là gì, mà khiến bao trái tim cứ mãi khắc khoải, kiếm tìm, thổn thức khôn nguôi?",
      talk2: "Có lẽ, dẫu trải qua ngàn đời, con người vẫn khó lòng lý giải đến tận cùng khát vọng ái tình giữa người nam và người nữ; cũng như chẳng thể cắt nghĩa trọn vẹn sức hút diệu kỳ giữa hai cực âm – dương, giữa những khác biệt tưởng chừng đối nghịch mà lại luôn hướng về nhau.",
      talk3: "Điều duy nhất ta có thể chắc chắn, là: chừng nào trong ta vẫn còn một nỗi khát khao yêu thương, chừng ấy ta vẫn đang sống, vẫn rung động và vẫn hòa mình vào dòng chảy nhiệm màu của sự sống. Bởi sâu thẳm trong mỗi con người, dù khác biệt về hình hài hay thế giới nội tâm, vẫn luôn khát khao được đắm say trong men tình.",
      talk4: "Cũng từ niềm thao thức ấy mà buổi mạn đàm “ANH THỪA, EM THIẾU” được hình thành. Đây sẽ là dịp để chúng ta cùng nhau khám phá nghệ thuật tương giao giữa nam và nữ; nơi cái thiếu cất lên tiếng gọi, và cái thừa tìm thấy ý nghĩa của sự trao ban.",
      talkSign: "Trân trọng, CLB Tác giả",
      speakerTitle: "Diễn giả",
      speakerName: "Ngô Duy Cường",
      speakerRole: "Nhà văn · Họa sĩ",
      speakerAlt: "Chân dung Ngô Duy Cường",
      bioShow: "Khám phá thêm về diễn giả",
      collapseHide: "Thu gọn",
      bio1: "Là tác giả của những quyển sách Tôi Đi Tìm Ai, Không Gì Dễ Bằng Yêu, Lãng Mạn – Giải Mã Thơ Tình Solomon, Đẹp Như Hơi Thở. Ông tốt nghiệp trường Đại học Mỹ thuật tại Hoa Kỳ, từng triển lãm họa phẩm nghệ thuật tại các thành phố lớn. Ông hoàn thành chương trình thạc sĩ tại Viện Thần học Andrews University năm 2001 và viết luận án tiến sĩ năm 2015. Ông cũng thường tổ chức các chương trình từ thiện tại các cô nhi viện, làng phong và được mời thuyết giảng tại các đoàn thể tôn giáo, tu viện, trường đại học. Với sự trải nghiệm của bản thân, ông đã mang đến sự chữa lành cho nhiều người qua các lớp trị liệu trầm cảm bằng liệu pháp thiên nhiên.",
      bio2: "Niềm hạnh phúc thường ngày của ông là được tản bộ trong cảnh thiên nhiên, vui với nét cọ trên khung vải, ngồi viết lách, tĩnh lặng và thưởng thức tách trà ấm theo khung cảnh bốn mùa. Năm 16 tuổi, trong lúc dạo bước đến trường, bất chợt nhìn thấy một cô bé đang đi đối diện bên kia đường. Ngay tức khắc, thần hồn chao đảo, nhịp tim như dừng lại. Ông yêu mê say người con gái này kể từ ngày ấy. Nay đã 37 năm, mà độ thắm nồng vẫn như ngày nào.",
      bio3: "Vợ chồng Nhà văn Ngô Duy Cường có được ba người con, Thùy Trân, Duy Ân, và Linh Ân. Họ sinh sống tại thành phố Hoa Hồng, tiểu bang Oregon, Hoa Kỳ.",
      footer: "Hẹn gặp anh/chị nhé",
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
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
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
  $("contactList").replaceChildren(...(C.contacts || []).map((c) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.className = "contact-name";
    name.textContent = c.name;
    const a = document.createElement("a");
    a.href = `tel:${c.phone}`;
    a.textContent = c.phone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
    li.append(name, a);
    return li;
  }));
  $("btnDirections").href = dirUrl;
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
