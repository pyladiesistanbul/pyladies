/* education.js — Education page
   Google Sheet columns: is_blog | title | content | description | author | author_contact_info
   Yalnizca videolar gosterilir; is_blog dolu olan satirlar atlanir.
*/
(function () {
  'use strict';

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Avbn4cYdglt_4pzxULxxKqIqPgm_8172lUmd1Mlg6a0/export?format=csv';

  var activeResources = [];
  var currentQuery    = '';

  /* ── YouTube helpers ─────────────────────────────────────────── */
  function getYouTubeId(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function rich(s) {
    return (window.PL && window.PL.richText) ? window.PL.richText(s) : '<p>' + escHtml(s) + '</p>';
  }

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }


  /* ── Load sheet (PapaParse handles commas inside URLs) ───────── */
  function loadAndRender() {
    showSkeletons();

    fetch(SHEET_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (csvText) {
        var parsed = Papa.parse(csvText.trim(), {
          header: true,
          skipEmptyLines: true,
          transformHeader: function (h) { return h.trim().toLowerCase(); }
        });

        var id = 1;
        activeResources = (parsed.data || [])
          .map(function (row) {
            var content = (row.content || '').trim();
            if (!content) return null;

            /* Blog satirlari siteye cikmiyor; sheet'te kalabilirler */
            var flag   = (row.is_blog || '').toLowerCase().trim();
            if (flag === 'true' || flag === 'yes' || flag === '1' || flag === 'evet') return null;
            var ytId   = getYouTubeId(content);
            var contact = (row.author_contact_info || '').trim();

            return {
              id: id++,
              type: 'video',
              title: (row.title || '').trim() || 'Untitled resource',
              description: (row.description || '').trim(),
              content: content,
              author: (row.author || '').trim() || 'PyLadies İstanbul',
              authorContact: contact.indexOf('@') !== -1 ? contact : null,
              youtubeId: ytId
            };
          })
          .filter(Boolean);

        if (!activeResources.length) { showEmpty(); return; }
        render();
      })
      .catch(function (err) {
        console.warn('Sheet fetch failed:', err);
        showEmpty();
      });
  }

  /* ── Skeletons & empty ───────────────────────────────────────── */
  function skeletonCard() {
    return '<div class="resource-card resource-card--skeleton">' +
      '<div class="skeleton-thumb"></div>' +
      '<div class="resource-body">' +
      '<div class="skeleton-line skeleton-line--short"></div>' +
      '<div class="skeleton-line"></div>' +
      '<div class="skeleton-line skeleton-line--mid"></div>' +
      '</div></div>';
  }

  function showSkeletons() {
    var grid = document.getElementById('resources-grid');
    if (grid) grid.innerHTML = skeletonCard() + skeletonCard() + skeletonCard();
  }

  function showEmpty() {
    var grid = document.getElementById('resources-grid');
    var d = window.PL ? window.PL.getDict() : {};
    if (grid) {
      grid.innerHTML = '<div class="ed-empty"><p>' +
        escHtml(d.ed_no_results || 'No resources found. Check back soon!') +
        '</p></div>';
    }
  }

  /* ── Card ────────────────────────────────────────────────────── */
  function thumbHtml(res, d) {
    var badge = '<span class="resource-badge">' + escHtml(d.ed_badge_video || 'Video') + '</span>';

    if (res.youtubeId) {
      return '<div class="resource-thumbnail resource-thumbnail--video">' + badge +
        '<img src="https://img.youtube.com/vi/' + res.youtubeId + '/hqdefault.jpg" alt="" loading="lazy" ' +
        'onerror="this.onerror=null;this.src=\'https://img.youtube.com/vi/' + res.youtubeId + '/mqdefault.jpg\'">' +
        '</div>';
    }
    /* YouTube disi bir baglanti: sade gradyan */
    return '<div class="resource-thumbnail resource-thumbnail--video resource-thumbnail--plain">' +
      badge + '</div>';
  }

  function renderCard(res, d) {
    var mail = res.authorContact
      ? '<a href="mailto:' + escHtml(res.authorContact) + '" class="author-email" aria-label="Email ' + escHtml(res.author) + '">✉</a>'
      : '';

    return '<article class="resource-card" data-id="' + res.id + '" tabindex="0" role="button">' +
      thumbHtml(res, d) +
      '<div class="resource-body">' +
      '<h3>' + escHtml(res.title) + '</h3>' +
      (res.description ? '<p>' + escHtml(res.description) + '</p>' : '<p></p>') +
      '<div class="resource-author"><span>' + escHtml(res.author) + '</span>' + mail + '</div>' +
      '</div></article>';
  }

  /* ── Modal ───────────────────────────────────────────────────── */
  function openModal(res) {
    var overlay = document.getElementById('resource-modal');
    if (!overlay) return;
    var d = window.PL ? window.PL.getDict() : {};

    var mediaHtml = (res.type === 'video' && res.youtubeId)
      ? '<div class="modal-embed"><iframe src="https://www.youtube.com/embed/' + res.youtubeId +
        '" title="' + escHtml(res.title) + '" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>'
      : '<div class="modal-photo modal-photo--plain"></div>';

    var metaHtml = '<span class="modal-author">' + escHtml(res.author) + '</span>';
    if (res.authorContact) {
      metaHtml += '<span class="modal-email"><a href="mailto:' + escHtml(res.authorContact) + '">' +
        escHtml(res.authorContact) + '</a></span>';
    }

    var ctaLabel = d.ed_watch_yt || 'Watch on YouTube';

    var actionsHtml = /^https?:\/\//i.test(res.content)
      ? '<div class="modal-actions"><a href="' + escHtml(res.content) +
        '" target="_blank" rel="noopener" class="btn-primary">' + escHtml(ctaLabel) + '</a></div>'
      : '';

    overlay.querySelector('.modal-card').innerHTML =
      '<button class="modal-close" aria-label="Close">&times;</button>' +
      mediaHtml +
      '<div class="modal-body">' +
      '<span class="modal-tag">' + escHtml(d.ed_badge_video || 'Video') + '</span>' +
      '<h2 class="modal-title">' + escHtml(res.title) + '</h2>' +
      '<div class="modal-meta">' + metaHtml + '</div>' +
      (res.description ? '<div class="modal-description">' + rich(res.description) + '</div>' : '') +
      actionsHtml +
      '</div>';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    var overlay = document.getElementById('resource-modal');
    if (!overlay) return;
    overlay.classList.remove('open');
    /* clearing the card stops any playing video */
    var card = overlay.querySelector('.modal-card');
    if (card) card.innerHTML = '<button class="modal-close" aria-label="Close">&times;</button>';
    document.body.style.overflow = '';
  }

  /* ── Render grid (filter + search combined) ──────────────────── */
  function render() {
    var grid = document.getElementById('resources-grid');
    if (!grid) return;
    var d = window.PL ? window.PL.getDict() : {};
    var q = currentQuery.toLowerCase().trim();

    var toShow = activeResources.filter(function (r) {
      if (!q) return true;
      return (r.title + ' ' + r.description + ' ' + r.author).toLowerCase().indexOf(q) !== -1;
    });

    if (!toShow.length) { showEmpty(); return; }

    grid.innerHTML = toShow.map(function (r) { return renderCard(r, d); }).join('');

    grid.querySelectorAll('.resource-card').forEach(function (card) {
      function activate(e) {
        if (e.target.tagName === 'A') return;
        var id  = parseInt(card.getAttribute('data-id'), 10);
        var res = activeResources.find(function (r) { return r.id === id; });
        if (res) openModal(res);
      }
      card.addEventListener('click', activate);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(e); }
      });
    });
  }

  /* ── Boot ────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    loadAndRender();

    var overlay = document.getElementById('resource-modal');
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });


    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      var timer;
      searchInput.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          currentQuery = searchInput.value;
          render();
        }, 250);
      });
    }
  });

  window.onLangChange = function () {
    if (activeResources.length) render();
  };
})();
