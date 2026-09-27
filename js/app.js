/* ============================================================================
   BONSAI — app.js  (vanilla, nessuna dipendenza)
   Legge tutto da window.BONSAI (data.js). Non contiene dati di business.
   ============================================================================ */
(function () {
  "use strict";
  var B = window.BONSAI;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- helpers ---------- */
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  var GIORNI = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];

  /* =========================================================================
     STATO APERTO / CHIUSO  (gestisce chiusura oltre la mezzanotte, es. 02:00)
     ========================================================================= */
  function computeStatus(now) {
    now = now || new Date();
    var day = now.getDay();
    var nowMin = now.getHours() * 60 + now.getMinutes();

    // 1) sessione iniziata OGGI
    var today = B.hours[day];
    if (today) {
      var o = toMin(today.open), c = toMin(today.close);
      if (c <= o) c += 1440; // oltre mezzanotte
      if (nowMin >= o && nowMin < c) return { open: true, until: today.close };
    }
    // 2) sessione iniziata IERI e ancora in corso dopo mezzanotte
    var prev = (day + 6) % 7;
    var y = B.hours[prev];
    if (y) {
      var yo = toMin(y.open), yc = toMin(y.close);
      if (yc <= yo) { // chiude il giorno dopo
        if (nowMin < (yc)) return { open: true, until: y.close };
      }
    }
    // chiuso — trova prossima apertura
    var next = null;
    for (var i = 0; i < 7; i++) {
      var d = (day + i) % 7, h = B.hours[d];
      if (!h) continue;
      if (i === 0 && nowMin < toMin(h.open)) { next = { day: d, open: h.open, same: true }; break; }
      if (i > 0) { next = { day: d, open: h.open, same: false }; break; }
    }
    return { open: false, next: next };
  }

  function renderStatus() {
    var s = computeStatus();
    var pills = $$("[data-status]");
    var text, cls;
    if (s.open) { text = "Aperto ora · fino alle " + s.until; cls = "open"; }
    else if (s.next) {
      text = s.next.same ? ("Chiuso · apre oggi alle " + s.next.open)
                         : ("Chiuso · apre " + GIORNI[s.next.day] + " alle " + s.next.open);
      cls = "closed";
    } else { text = "Chiuso"; cls = "closed"; }
    pills.forEach(function (p) {
      p.querySelector(".dot").className = "dot " + cls;
      p.querySelector(".status-text").textContent = text;
    });
  }

  /* =========================================================================
     MENU  (tabs + liste, dalle lists di B.menu)
     ========================================================================= */
  function priceEl(price) {
    var multi = /[·\/]/.test(price) || price.length > 4; // vini "7 · 28"
    var p = el("span", "menu-item__price" + (multi ? " noeuro" : ""), esc(price) + (multi ? " €" : ""));
    return p;
  }
  function tagEl(t) {
    var cls = "tag";
    if (t === "piccante") cls += " hot";
    if (t === "signature") cls += " star";
    return el("span", cls, esc(t));
  }
  function itemEl(it) {
    var row = el("div", "menu-item");
    var left = el("div");
    left.appendChild(el("div", "menu-item__name", esc(it.name)));
    if (it.desc) left.appendChild(el("div", "menu-item__desc", esc(it.desc)));
    if (it.tags && it.tags.length) {
      var tg = el("div", "tags");
      it.tags.forEach(function (t) { tg.appendChild(tagEl(t)); });
      left.appendChild(tg);
    }
    row.appendChild(left);
    row.appendChild(priceEl(it.price));
    return row;
  }
  function listEl(items) {
    var ul = el("div", "menu-list");
    items.forEach(function (it) { ul.appendChild(itemEl(it)); });
    return ul;
  }

  function buildMenu() {
    var tabsScroll = $("#menu-tabs");
    var panels = $("#menu-panels");
    if (!tabsScroll || !panels) return; // menu ora è un link esterno: niente da costruire
    B.menu.forEach(function (list, i) {
      // tab
      var tab = el("button", "tab", esc(list.title));
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.setAttribute("aria-controls", "panel-" + list.id);
      tab.id = "tab-" + list.id;
      tab.dataset.idx = i;
      tabsScroll.appendChild(tab);

      // panel
      var panel = el("div", "menu-panel");
      panel.id = "panel-" + list.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "tab-" + list.id);
      if (i !== 0) panel.hidden = true;
      if (list.note) panel.appendChild(el("p", "menu-panel__note", esc(list.note)));

      if (list.groups) {
        list.groups.forEach(function (g) {
          var grp = el("div", "menu-group");
          grp.appendChild(el("div", "menu-group__title", esc(g.subtitle)));
          grp.appendChild(listEl(g.items));
          panel.appendChild(grp);
        });
      } else {
        panel.appendChild(listEl(list.items));
      }
      panels.appendChild(panel);
    });

    tabsScroll.addEventListener("click", function (e) {
      var t = e.target.closest(".tab"); if (!t) return;
      $$(".tab", tabsScroll).forEach(function (x) { x.setAttribute("aria-selected", "false"); });
      $$(".menu-panel", panels).forEach(function (p) { p.hidden = true; });
      t.setAttribute("aria-selected", "true");
      $("#panel-" + B.menu[+t.dataset.idx].id).hidden = false;
      t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
  }

  /* =========================================================================
     SIGNATURE (hero cards)
     ========================================================================= */
  function buildSignature() {
    var track = $("#sig-track"); if (!track) return;
    var imgs = (B.gallery && B.gallery.length) ? B.gallery : [];
    if (!imgs.length) return;
    function slide(src) {
      var fig = el("figure", "marquee__item");
      fig.innerHTML = '<img src="' + src + '" loading="lazy" alt="" width="720" height="960">';
      return fig;
    }
    for (var pass = 0; pass < 2; pass++) {
      imgs.forEach(function (src) { track.appendChild(slide(src)); });
    }
    track.style.animationDuration = (imgs.length * 5) + "s";
  }

  /* =========================================================================
     PRENOTAZIONE  →  WhatsApp
     ========================================================================= */
  function pad(n){ return (n < 10 ? "0" : "") + n; }

  function slotsForDate(dateStr) {
    // genera slot 30' dentro gli orari del giorno scelto
    var d = new Date(dateStr + "T00:00:00");
    var h = B.hours[d.getDay()];
    if (!h) return null; // chiuso
    var o = toMin(h.open), c = toMin(h.close);
    if (c <= o) c += 1440;
    var out = [];
    for (var m = o; m <= c - 30; m += 30) {
      var mm = m % 1440;
      out.push(pad(Math.floor(mm / 60)) + ":" + pad(mm % 60));
    }
    return out;
  }

  function buildBooking() {
    var form = $("#book-form"); if (!form) return;
    var dateI = $("#b-data"), timeS = $("#b-orario");

    // data minima = oggi
    var t = new Date();
    dateI.min = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());

    function fillTimes() {
      timeS.innerHTML = '<option value="">Seleziona un orario</option>';
      if (!dateI.value) return;
      var slots = slotsForDate(dateI.value);
      var fld = timeS.closest(".field");
      if (!slots) {
        setErr(fld, "Siamo chiusi in questa data. Scegli un altro giorno.");
        return;
      } else { clearErr(fld); }
      slots.forEach(function (s) {
        var op = document.createElement("option"); op.value = s; op.textContent = s;
        timeS.appendChild(op);
      });
    }
    dateI.addEventListener("change", fillTimes);

    function setErr(fld, msg) { fld.classList.add("invalid"); var e = fld.querySelector(".err"); if (e) e.textContent = msg; }
    function clearErr(fld) { fld.classList.remove("invalid"); }

    function validate() {
      var ok = true;
      var nome = $("#b-nome"), pers = $("#b-persone");

      if (!nome.value.trim()) { setErr(nome.closest(".field"), "Inserisci il tuo nome."); ok = false; }
      else clearErr(nome.closest(".field"));

      var n = parseInt(pers.value, 10);
      if (!n || n < 1 || n > 20) { setErr(pers.closest(".field"), "Indica da 1 a 20 persone."); ok = false; }
      else clearErr(pers.closest(".field"));

      if (!dateI.value) { setErr(dateI.closest(".field"), "Scegli una data."); ok = false; }
      else {
        var sel = new Date(dateI.value + "T00:00:00"), today = new Date(); today.setHours(0,0,0,0);
        if (sel < today) { setErr(dateI.closest(".field"), "La data non può essere nel passato."); ok = false; }
        else if (!B.hours[sel.getDay()]) { setErr(dateI.closest(".field"), "Siamo chiusi in questa data."); ok = false; }
        else clearErr(dateI.closest(".field"));
      }

      if (!timeS.value) { setErr(timeS.closest(".field"), "Scegli un orario."); ok = false; }
      else clearErr(timeS.closest(".field"));

      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) { form.querySelector(".invalid input,.invalid select").focus(); return; }

      var nome = $("#b-nome").value.trim();
      var pers = $("#b-persone").value;
      var data = $("#b-data").value.split("-").reverse().join("/");
      var ora = $("#b-orario").value;

      var msg = "Ciao Bonsai! Vorrei prenotare un tavolo.%0A" +
        "Nome: " + encodeURIComponent(nome) + "%0A" +
        "Persone: " + encodeURIComponent(pers) + "%0A" +
        "Data: " + encodeURIComponent(data) + "%0A" +
        "Orario: " + encodeURIComponent(ora);
      var url = "https://wa.me/" + B.business.whatsapp + "?text=" + msg;

      $("#book-confirm").classList.add("show");
      window.open(url, "_blank", "noopener");
    });
  }

  /* =========================================================================
     NAV / scroll / reveal
     ========================================================================= */
  function initChrome() {
    var header = $(".site-header");
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      $$(".reveal").forEach(function (n) { io.observe(n); });
    } else { $$(".reveal").forEach(function (n){ n.classList.add("in"); }); }
  }

  /* =========================================================================
     LINK dinamici (telefono, whatsapp, indirizzo, social) da data.js
     ========================================================================= */
  function wireLinks() {
    var b = B.business;
    var wa = "https://wa.me/" + b.whatsapp + "?text=" +
      "Ciao%20Bonsai!%20Vorrei%20prenotare%20un%20tavolo%20per%E2%80%A6";
    $$("[data-tel]").forEach(function (a) { a.href = "tel:" + b.phone.replace(/\s/g, ""); });
    $$("[data-wa]").forEach(function (a) { a.href = wa; });
    $$("[data-ig]").forEach(function (a) { a.href = b.socials.instagram; });
    $$("[data-map]").forEach(function (a) { a.href = b.mapLink; });

    // Feste & compleanni → WhatsApp del bar con messaggio dedicato
    var festeWa = "https://wa.me/" + b.whatsapp + "?text=" +
      "Ciao%20Bonsai!%20Vorrei%20organizzare%20una%20festa%2Fcompleanno%20da%20voi.%20Potete%20darmi%20informazioni%20sul%20pacchetto%20feste%3F";
    $$("[data-feste-wa]").forEach(function (a) { a.href = festeWa; });

    // Padel Club → contatti dedicati (data.js business.padel)
    var pad = b.padel || {};
    if (pad.whatsapp) {
      var padWa = "https://wa.me/" + pad.whatsapp + "?text=" +
        "Ciao!%20Vorrei%20prenotare%20un%20campo%20da%20padel%20al%20Bonsai%20Padel%20Club.";
      $$("[data-padel-wa]").forEach(function (a) { a.href = padWa; });
    }
    if (pad.instagram) $$("[data-padel-ig]").forEach(function (a) { a.href = pad.instagram; });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildSignature();
    buildMenu();
    buildBooking();
    renderStatus();
    setInterval(renderStatus, 60000);
    wireLinks();
    initChrome();
  });
})();
