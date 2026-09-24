/* home.js — Home page interactions */
(function () {
  'use strict';

  /* ── Newsletter ───────────────────────────────────────────────────── */
  function initNewsletter() {
    const form = document.getElementById('nl-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const d = window.PL ? window.PL.getDict() : {};
      const thanks = document.getElementById('nl-thanks');
      if (thanks) {
        thanks.textContent = d.nl_thanks || "You're in! Check your inbox.";
        thanks.hidden = false;
      }
      form.hidden = true;
    });
  }

  /* ── Baklava cat ──────────────────────────────────────────────────── */
  function initBaklavaCat() {
    var catImg  = document.getElementById('cat-img');
    var counter = document.getElementById('cat-counter');
    if (!catImg) return;

    var clicks = 0;
    catImg.addEventListener('click', function () {
      clicks++;
      catImg.src = 'assets/cat-fed.png';
      if (counter) {
        var d = window.PL ? window.PL.getDict() : {};
        counter.textContent = clicks === 1
          ? (d.cat_nom_one || 'Nom nom, 1 baklava eaten!')
          : (d.cat_nom_many || 'Nom nom, {n} baklavas eaten!').replace('{n}', clicks);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNewsletter();
    initBaklavaCat();
  });
})();
