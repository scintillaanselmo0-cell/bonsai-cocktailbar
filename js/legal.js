/* ============================================================================
   BONSAI — legal.js
   Gestione consenso cookie + caricamento mappa Google solo dopo consenso.
   Nessun cookie di profilazione: la sola scelta è caricare o no Google Maps.
   La preferenza è salvata in localStorage (chiave "bonsai-cookie").
   ============================================================================ */
(function () {
  "use strict";
  var KEY = "bonsai-cookie";              // valori: "accept" | "reject"
  var $ = function (s) { return document.querySelector(s); };

  function getPref() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setPref(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  /* ---- Mappa Google: inserita solo quando serve ---- */
  function loadMap() {
    var box = $("#map-box");
    if (!box || box.dataset.loaded === "1") return;
    var src = box.getAttribute("data-map-src");
    if (!src) return;
    var ifr = document.createElement("iframe");
    ifr.title = "Mappa Bonsai Cocktail Bar — Via Sandro Botticelli 27, Aversa";
    ifr.src = src;
    ifr.loading = "lazy";
    ifr.referrerPolicy = "no-referrer-when-downgrade";
    box.innerHTML = "";
    box.appendChild(ifr);
    box.dataset.loaded = "1";
  }

  /* ---- Banner ---- */
  function showBanner() { var b = $("#cookie-banner"); if (b) b.hidden = false; }
  function hideBanner() { var b = $("#cookie-banner"); if (b) b.hidden = true; }

  function accept() { setPref("accept"); hideBanner(); loadMap(); }
  function reject() { setPref("reject"); hideBanner(); }

  document.addEventListener("DOMContentLoaded", function () {
    var pref = getPref();

    // Mostra il banner solo alla prima visita (nessuna scelta salvata)
    if (pref !== "accept" && pref !== "reject") showBanner();
    // Se già accettato in passato, carica subito la mappa
    if (pref === "accept") loadMap();

    var a = $("#cookie-accept"); if (a) a.addEventListener("click", accept);
    var r = $("#cookie-reject"); if (r) r.addEventListener("click", reject);

    // "Preferenze cookie" nel footer: riapre il banner per cambiare scelta
    var re = $("#cookie-reopen");
    if (re) re.addEventListener("click", function (e) { e.preventDefault(); showBanner(); });

    // Caricamento puntuale della mappa dal suo placeholder (consenso una tantum,
    // non modifica la scelta globale sui cookie)
    var ml = $("#map-load");
    if (ml) ml.addEventListener("click", loadMap);
  });
})();
