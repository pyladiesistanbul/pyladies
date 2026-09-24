/* events.js — Events page
   Sheet columns expected: event_name | date | info
*/
(function () {
  'use strict';

  const SHEET_URL = 'https://opensheet.elk.sh/1Wroy8gpD2KI66FlVywGadImVl-JavzhhSTj2GcqN8m0/1';

  /* ── Fallback data (shown if sheet is unreachable) ────────────────── */
  const FALLBACK_EVENTS = [
    {
      id: 1,
      upcoming: true,
      tag: 'workshop',
      date: '2026-07-12',
      dateLabel: { en: 'July 12, 2026', tr: '12 Temmuz 2026', es: '12 de julio de 2026' },
      location: { en: 'İstanbul', tr: 'İstanbul', es: 'İstanbul' },
      title: { en: 'Intro to FastAPI', tr: 'FastAPI\'ye Giriş', es: 'Introducción a FastAPI' },
      desc: { en: 'A hands-on workshop covering REST API design with FastAPI and Pydantic.', tr: 'FastAPI ve Pydantic ile REST API tasarımı workshop\'u.', es: 'Un taller práctico de diseño de API REST con FastAPI y Pydantic.' },
      calUrl: '',
      signupUrl: '',
    },
    {
      id: 2,
      upcoming: false,
      tag: 'talk',
      date: '2026-03-08',
      dateLabel: { en: 'March 8, 2026', tr: '8 Mart 2026', es: '8 de marzo de 2026' },
      location: { en: 'Online', tr: 'Çevrimiçi', es: 'En línea' },
      title: { en: 'Women in Tech Panel — IWD 2026', tr: 'Teknolojide Kadınlar Paneli', es: 'Mujeres en Tecnología — IWD 2026' },
      desc: { en: 'International Women\'s Day panel with Python engineers sharing their journeys.', tr: 'Dünya Kadınlar Günü paneli.', es: 'Panel del Día Internacional de la Mujer.' },
      calUrl: '',
      signupUrl: '',
    },
  ];

  /* active event list — replaced by sheet data on successful fetch */
  var activeEvents = FALLBACK_EVENTS;

  /* ── Sheet parsing ────────────────────────────────────────────────── */
  var LOCALES = { en: 'en-US', tr: 'tr-TR', es: 'es-ES' };


  function formatDateLabel(dateStr, lang) {
    /* Try to parse common formats: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, "Month D, YYYY" */
    var d = new Date(dateStr);
    /* DD/MM/YYYY — JS parses as MM/DD so fix if month > 12 */
    if (isNaN(d.getTime()) || (dateStr.indexOf('/') !== -1)) {
      var parts = dateStr.split('/');
      if (parts.length === 3) {
        /* try DD/MM/YYYY */
        d = new Date(parts[2] + '-' + parts[1] + '-' + parts[0]);
      }
    }
    if (isNaN(d.getTime())) return dateStr;
    try {
      return d.toLocaleDateString(LOCALES[lang] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function parseDate(dateStr) {
    var d = new Date(dateStr);
    if (isNaN(d.getTime()) && dateStr.indexOf('/') !== -1) {
      var parts = dateStr.split('/');
      if (parts.length === 3) d = new Date(parts[2] + '-' + parts[1] + '-' + parts[0]);
    }
    return d;
  }

  function parseSheetRow(row, id) {
    var dateStr  = (row.date || row.Date || '').trim();
    var name     = (row.event_name || row['Event Name'] || '').trim();
    var info     = (row.info || row.Info || row.description || '').trim();

    var parsed   = parseDate(dateStr);
    var today    = new Date(); today.setHours(0, 0, 0, 0);
    var upcoming = !isNaN(parsed.getTime()) && parsed >= today;

    return {
      id: id,
      upcoming: upcoming,
      tag: '',
      date: dateStr,
      dateLabel: {
        en: formatDateLabel(dateStr, 'en'),
        tr: formatDateLabel(dateStr, 'tr'),
        es: formatDateLabel(dateStr, 'es'),
      },
      location: { en: '', tr: '', es: '' },
      title:    { en: name, tr: name, es: name },
      desc:     { en: info, tr: info, es: info },
      calUrl: '',
      signupUrl: '',
    };
  }

  /* ── Fetch from sheet ─────────────────────────────────────────────── */
  function loadAndRender(lang) {
    showSkeletons();

    fetch(SHEET_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (rows) {
        if (!Array.isArray(rows) || rows.length === 0) throw new Error('empty');
        activeEvents = rows
          .filter(function (r) { return (r.event_name || '').trim(); })
          .map(function (r, i) { return parseSheetRow(r, i + 1); });
        renderEvents(lang);
      })
      .catch(function () {
        activeEvents = FALLBACK_EVENTS;
        renderEvents(lang);
      });
  }

  /* ── Loading skeletons ────────────────────────────────────────────── */
  function skeletonCard() {
    return '<div class="event-card event-card--skeleton">' +
      '<div class="skeleton-photo"></div>' +
      '<div class="event-body">' +
      '<div class="skeleton-line skeleton-line--short"></div>' +
      '<div class="skeleton-line"></div>' +
      '<div class="skeleton-line skeleton-line--mid"></div>' +
      '</div></div>';
  }

  function showSkeletons() {
    var ug = document.getElementById('upcoming-grid');
    var pg = document.getElementById('past-grid');
    if (ug) ug.innerHTML = skeletonCard() + skeletonCard() + skeletonCard();
    if (pg) pg.innerHTML = skeletonCard() + skeletonCard();
  }

  /* ── Render helpers ───────────────────────────────────────────────── */
  /* ── Tarih blogu ──────────────────────────────────────────────────
     Fotograf yerine kartin ustunde tarih duruyor. Etkinligin en
     onemli bilgisi zaten tarih; her kartta farkli oldugu icin
     izgara tekrar etmiyor ve hicbir gorsel yuklenmesi gerekmiyor. */
  function dateBlock(dateStr, lang, upcoming) {
    var d = parseDate(dateStr);
    if (isNaN(d.getTime())) {
      return '<div class="event-datebox' + (upcoming ? '' : ' past') + '"></div>';
    }
    var loc   = LOCALES[lang] || 'en-US';
    var month = d.toLocaleDateString(loc, { month: 'short' })
                 .replace('.', '').toLocaleUpperCase(loc);
    return '<div class="event-datebox' + (upcoming ? '' : ' past') + '">' +
      '<span class="dbx-day">' + d.getDate() + '</span>' +
      '<span class="dbx-month">' + escHtml(month) + '</span>' +
      '<span class="dbx-year">' + d.getFullYear() + '</span>' +
      '</div>';
  }

  function placeholderBg(tag) {
    var map = { workshop: '#DC143C', talk: '#1F2937', sprint: '#6B7280', social: '#9CA3AF' };
    return map[tag] || '#DC143C';
  }

  function renderCard(ev, lang, d, upcoming) {
    var title    = ev.title[lang] || ev.title.en;
    var dateLabel = ev.dateLabel[lang] || ev.dateLabel.en;
    var location  = ev.location[lang] || ev.location.en;
    var tagLabel  = ev.tag ? (d['ev_tag_' + ev.tag] || ev.tag) : '';
    var bg        = placeholderBg(ev.tag);


    /* Tarih artik kartin ustundeki blokta; burada tekrar etme */
    var metaParts = [location].filter(Boolean);

    var actionsHtml = upcoming
      ? '<div class="event-actions">' +
        (ev.signupUrl ? '<a href="' + escHtml(ev.signupUrl) + '" class="btn-primary">' + (d.ev_register || 'Register') + '</a>' : '') +
        (ev.calUrl    ? '<a href="' + escHtml(ev.calUrl) + '" target="_blank" rel="noopener" class="btn-secondary">' + (d.ev_cal || 'Add to Calendar') + '</a>' : '') +
        '</div>'
      : '';

    return '<article class="event-card" data-id="' + ev.id + '">' +
      dateBlock(ev.date, lang, upcoming) +
      '<div class="event-body">' +
      (tagLabel ? '<span class="event-tag">' + tagLabel + '</span>' : '') +
      '<h3 class="event-card-title">' + escHtml(title) + '</h3>' +
      (metaParts.length ? '<p class="event-meta">' + escHtml(metaParts.join(' · ')) + '</p>' : '') +
      actionsHtml +
      '</div>' +
      '</article>';
  }

  function rich(s) {
    return (window.PL && window.PL.richText) ? window.PL.richText(s) : '<p>' + escHtml(s) + '</p>';
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderEvents(lang) {
    var d = window.PL ? window.PL.getDict() : {};
    var upcomingGrid = document.getElementById('upcoming-grid');
    var pastGrid     = document.getElementById('past-grid');

    var upcoming = activeEvents.filter(function (e) { return e.upcoming; });
    var past     = activeEvents.filter(function (e) { return !e.upcoming; });

    if (upcomingGrid) {
      if (upcoming.length === 0) {
        upcomingGrid.innerHTML = '<p class="ev-empty">No upcoming events right now — check back soon!</p>';
      } else {
        upcomingGrid.innerHTML = upcoming.map(function (e) { return renderCard(e, lang, d, true); }).join('');
        upcomingGrid.querySelectorAll('.event-card').forEach(function (card) {
          card.addEventListener('click', function (evt) {
            if (evt.target.tagName === 'A') return;
            var id = parseInt(card.getAttribute('data-id'), 10);
            var ev = activeEvents.find(function (e) { return e.id === id; });
            if (ev) openModal(ev, lang, d);
          });
        });
      }
    }

    if (pastGrid) {
      if (past.length === 0) {
        pastGrid.innerHTML = '<p class="ev-empty">No past events yet.</p>';
      } else {
        pastGrid.innerHTML = past.map(function (e) { return renderCard(e, lang, d, false); }).join('');
        pastGrid.querySelectorAll('.event-card').forEach(function (card) {
          card.addEventListener('click', function (evt) {
            if (evt.target.tagName === 'A') return;
            var id = parseInt(card.getAttribute('data-id'), 10);
            var ev = activeEvents.find(function (e) { return e.id === id; });
            if (ev) openModal(ev, lang, d);
          });
        });
      }
    }
  }

  /* ── Modal ────────────────────────────────────────────────────────── */
  function openModal(ev, lang, d) {
    var overlay = document.getElementById('event-modal');
    if (!overlay) return;
    var title     = ev.title[lang] || ev.title.en;
    var dateLabel = ev.dateLabel[lang] || ev.dateLabel.en;
    var location  = ev.location[lang] || ev.location.en;
    var desc      = ev.desc[lang] || ev.desc.en;
    var tagLabel  = ev.tag ? (d['ev_tag_' + ev.tag] || ev.tag) : '';
    var metaParts = [dateLabel, location].filter(Boolean);

    var photoHtml = '<div class="modal-photo modal-photo--date' + (ev.upcoming ? '' : ' past') + '">' +
      dateBlock(ev.date, lang, ev.upcoming) + '</div>';

    var actionsHtml = ev.upcoming
      ? '<div class="modal-actions">' +
        (ev.signupUrl ? '<a href="' + escHtml(ev.signupUrl) + '" class="btn-primary">' + (d.ev_register || 'Register') + '</a>' : '') +
        (ev.calUrl    ? '<a href="' + escHtml(ev.calUrl) + '" target="_blank" rel="noopener" class="btn-secondary">' + (d.ev_cal || 'Add to Calendar') + '</a>' : '') +
        '</div>'
      : '';

    overlay.querySelector('.modal-card').innerHTML =
      '<button class="modal-close" aria-label="Close">&times;</button>' +
      photoHtml +
      '<div class="modal-body">' +
      (tagLabel ? '<span class="event-tag">' + tagLabel + '</span>' : '') +
      '<h2 class="modal-title">' + escHtml(title) + '</h2>' +
      (metaParts.length ? '<p class="event-meta">' + escHtml(metaParts.join(' · ')) + '</p>' : '') +
      '<div class="modal-desc">' + rich(desc) + '</div>' +
      actionsHtml +
      '</div>';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    var overlay = document.getElementById('event-modal');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Community form (Google Forms backend) ───────────────────────── */
  /* DIKKAT: adreste /u/1/ gibi bir hesap parcasi OLMAMALI. Formu kendi
     hesabinla acip adres cubugundan kopyalarsan oraya yapisir ve giris
     yapmamis ziyaretcilerde cevap kaydedilmez. */
  var FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScZMlBvgp5aw6tiLUNgHqPOxpM_rluH2Kd1foux6qk9Wh9xng/formResponse';

  function initForms() {
    var form      = document.getElementById('community-form');
    if (!form) return;
    var submitBtn = document.getElementById('form-submit');
    var thanks    = document.getElementById('community-thanks');

    function setErr(id, msg) {
      var el = document.getElementById(id);
      if (el) el.textContent = msg;
    }
    function clearErrors() {
      ['err-type','err-name','err-email','err-message','err-consent'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = '';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var type    = document.getElementById('form-type').value;
      var name    = document.getElementById('form-name').value.trim();
      var email   = document.getElementById('form-email').value.trim();
      var message = document.getElementById('form-message').value.trim();
      var consent = document.getElementById('form-consent').checked;

      var valid = true;
      if (!type)    { setErr('err-type',    'Please select a type.');               valid = false; }
      if (!name)    { setErr('err-name',    'Please enter your name.');             valid = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      setErr('err-email',   'Please enter a valid email address.'); valid = false; }
      if (!message) { setErr('err-message', 'Please enter your message.');          valid = false; }
      if (!consent) { setErr('err-consent', 'Please accept the consent.');          valid = false; }
      if (!valid) return;

      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      var body = new URLSearchParams();
      body.append('entry.560427484',  name);
      body.append('entry.256835924',  email);
      body.append('entry.1327289364', message);
      body.append('entry.1190307269', type);

      function onDone() { form.hidden = true; if (thanks) thanks.hidden = false; }
      fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: body })
        .then(onDone).catch(onDone);
    });
  }

  /* ── Boot ─────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var lang = window.PL ? window.PL.getLang() : 'en';
    loadAndRender(lang);
    initForms();

    var overlay = document.getElementById('event-modal');
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  });

  window.onLangChange = function (lang) {
    renderEvents(lang);
  };
})();
