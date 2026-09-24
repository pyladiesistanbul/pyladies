/* core.js — shared across all pages */
(function () {
  'use strict';

  /* ── i18n dictionary ─────────────────────────────────────────────── */
  const DICT = {
    en: {
      nav_home: 'Home',
      nav_education: 'Education',
      nav_events: 'Events',
      nav_contact: 'Contact',
      footer_tagline: 'Bringing Python developers together in İstanbul.',
      footer_links: 'Quick Links',
      footer_rights: '© 2026 PyLadies İstanbul. All rights reserved.',

      /* Home */
      hero_badge: 'Animation 1 · Girl Drinking Tea',
      hero_h1: 'Take a sip and join Python developers in İstanbul',
      hero_sub: 'A welcoming community for Python enthusiasts. We learn and grow in Python together!',
      hero_cta_events: 'Browse Events',
      hero_cta_join: 'Join Us',

      what_kicker: 'What We Do',
      what_h2: 'Code, Connect, Celebrate',
      do_card1_title: 'University Clubs',
      do_card1_body: 'We partner with student clubs across İstanbul to run workshops and study jams.',
      do_card2_title: 'Planned Events',
      do_card2_body: 'Talks, sprints, hackathons and social meet-ups — something for every level.',
      do_card3_title: 'Open Mentorship',
      do_card3_body: 'Pair with an experienced Pythonista for code reviews, career chats and project feedback.',

      loop_kicker: 'Stay in the Loop',
      loop_h2: 'Never miss an event',
      loop_cal_label: 'Add Google Calendar',
      cal_card_desc: 'Subscribe to get all PyLadies İstanbul events directly in your calendar — never miss a workshop, talk or social.',
      cal_card_btn: 'Open Calendar',
      nl_placeholder: 'your@email.com',
      nl_btn: 'Subscribe',
      nl_thanks: "You're in! Check your inbox.",

      cat_h2: 'Baklava Break',
      cat_sub: 'Click the cat to share a treat!',
      cat_btn: 'Give Baklava 🍯',
      cat_fed: 'Nom nom! The cat is full.',

      follow_h2: 'Follow PyLadies İstanbul',

      /* Events */
      ev_upcoming_h2: 'Upcoming Events',
      ev_past_h2: 'Past Events',
      ev_register: 'Register',
      ev_cal: 'Add to Calendar',
      ev_tag_workshop: 'Workshop',
      ev_tag_talk: 'Talk',
      ev_tag_sprint: 'Sprint',
      ev_tag_social: 'Social',

      suggest_h2: 'Suggest an Event',
      suggest_name_label: 'Your Name',
      suggest_name_ph: 'Ada',
      suggest_email_label: 'Email',
      suggest_email_ph: 'ada@example.com',
      suggest_idea_label: 'Your Idea',
      suggest_idea_ph: 'What kind of event would you love to see?',
      suggest_btn: 'Send Suggestion',
      suggest_thanks: 'Thank you! We\'ll review your idea.',
      form_message_ph: 'Tell us your idea or feedback…',

      feedback_h2: 'Share Feedback',
      feedback_label: 'Your Feedback',
      feedback_ph: 'Tell us what we can do better…',
      feedback_btn: 'Send Feedback',
      feedback_thanks: 'Thanks for your feedback!',

      cat_nom_one: 'Nom nom, 1 baklava eaten!',
      cat_nom_many: 'Nom nom, {n} baklavas eaten!',

      slack_cta: 'Make sure to find us on #city-istanbul channel on Slack!',
      footer_events_free: 'PyLadies events are always free to attend.',
      organizers_h2: 'Our Organizers',
      coc_link: 'Code of Conduct',

      /* Contact */
      contact_kicker: 'Get in Touch',
      contact_h1: "Don't feel alone coding!",
      contact_sub: 'We\'re here to help — whether you\'re stuck on a bug or ready to give your first talk.',
      cat_bubble: "There's a bug I can't fix… send help 🐞",
      socials_h2: 'Find Us Online',
      cta_speaker_title: 'Speak at an Event',
      cta_speaker_body: 'Have something to share? We\'d love to have you on stage.',
      cta_speaker_btn: 'Reach Out',
      cta_sponsor_title: 'Sponsor Us',
      cta_sponsor_body: 'Help us keep events free for everyone.',
      cta_sponsor_btn: 'Get in Touch',
      cta_report_title: 'Report Behaviour',
      cta_report_body: 'We take our Code of Conduct seriously. Reach out confidentially.',
      cta_report_btn: 'Report',

      form_desc: 'Have an event idea, feedback, or just want to say hi? We\'d love to hear from you.',
      form_type_label: 'Type',
      form_message_label: 'Your Message',
      form_send_btn: 'Send',
      form_type_placeholder: 'Select type…',
      form_type_event: 'Event Suggestion',
      form_type_feedback: 'Feedback',
      form_consent: 'I consent to my data being processed on Google infrastructure for community communication purposes.',

      /* Education */
      ed_h2: 'Learning Resources',
      ed_sub: 'Talks and tutorials from our community, all in one place.',
      ed_search_placeholder: 'Search resources…',
      filter_all: 'All',
      filter_blog: 'Blog Posts',
      filter_video: 'Videos',
      ed_badge_blog: 'Blog',
      ed_badge_video: 'Video',
      ed_read_post: 'Read the post',
      ed_watch_yt: 'Watch on YouTube',
      ed_no_results: 'No resources found. Check back soon!',
      footer_privacy: 'Form data collected through the PyLadies İstanbul website is securely hosted on Google infrastructure for managing community processes, and email newsletter subscriptions are securely hosted on Substack for communication activities, both in compliance with applicable law. Your data is never shared with third parties, and you retain the right to unsubscribe or request deletion at any time.',
    },

    tr: {
      nav_home: 'Anasayfa',
      nav_education: 'Eğitim',
      nav_events: 'Etkinlikler',
      nav_contact: 'İletişim',
      footer_tagline: 'İstanbul\'da Python geliştiricilerini bir araya getiriyoruz.',
      footer_links: 'Hızlı Bağlantılar',
      footer_rights: '© 2026 PyLadies İstanbul. Tüm hakları saklıdır.',

      hero_badge: 'Animasyon 1 · Çay İçen Kız',
      hero_h1: 'Bir yudum çay al ve İstanbul\'daki Python geliştiricilerine katıl',
      hero_sub: 'Python meraklıları için sıcak bir topluluk. Python\'da birlikte öğrenip büyüyoruz!',
      hero_cta_events: 'Etkinliklere Göz At',
      hero_cta_join: 'Bize Katıl',

      what_kicker: 'Ne Yapıyoruz',
      what_h2: 'Kodla, Bağlan, Kutla',
      do_card1_title: 'Üniversite Kulüpleri',
      do_card1_body: 'İstanbul genelindeki öğrenci kulüpleriyle workshop\'lar ve çalışma etkinlikleri düzenliyoruz.',
      do_card2_title: 'Planlanan Etkinlikler',
      do_card2_body: 'Konuşmalar, sprint\'ler, hackathon\'lar ve sosyal buluşmalar — her seviyeye bir şeyler var.',
      do_card3_title: 'Açık Mentorluk',
      do_card3_body: 'Kod incelemeleri, kariyer sohbetleri ve proje geri bildirimi için deneyimli bir Pythonista ile eşleş.',

      loop_kicker: 'Haberdar Ol',
      loop_h2: 'Hiçbir etkinliği kaçırma',
      loop_cal_label: 'Google Takvim\'e Ekle',
      cal_card_desc: 'Tüm PyLadies İstanbul etkinliklerini takviminizde görün — hiçbir workshop, konuşma veya sosyal etkinliği kaçırmayın.',
      cal_card_btn: 'Takvimi Aç',
      nl_placeholder: 'eposta@adresin.com',
      nl_btn: 'Abone Ol',
      nl_thanks: 'Kaydoldunuz! Gelen kutunuzu kontrol edin.',

      cat_h2: 'Baklava Molası',
      cat_sub: 'Kediye ikram etmek için tıkla!',
      cat_btn: 'Baklava Ver 🍯',
      cat_fed: 'Nom nom! Kedi doydu.',

      follow_h2: 'PyLadies İstanbul\'u Takip Et',

      ev_upcoming_h2: 'Yaklaşan Etkinlikler',
      ev_past_h2: 'Geçmiş Etkinlikler',
      ev_register: 'Kaydol',
      ev_cal: 'Takvime Ekle',
      ev_tag_workshop: 'Workshop',
      ev_tag_talk: 'Konuşma',
      ev_tag_sprint: 'Sprint',
      ev_tag_social: 'Sosyal',

      suggest_h2: 'Etkinlik Öner',
      suggest_name_label: 'Adınız',
      suggest_name_ph: 'Ada',
      suggest_email_label: 'E-posta',
      suggest_email_ph: 'ada@ornek.com',
      suggest_idea_label: 'Fikriniz',
      suggest_idea_ph: 'Nasıl bir etkinlik görmek istersiniz?',
      suggest_btn: 'Öneri Gönder',
      suggest_thanks: 'Teşekkürler! Fikrinizi inceleyeceğiz.',
      form_message_ph: 'Fikrinizi veya geri bildiriminizi paylaşın…',

      feedback_h2: 'Geri Bildirim Paylaş',
      feedback_label: 'Geri Bildiriminiz',
      feedback_ph: 'Daha iyi neler yapabiliriz?',
      feedback_btn: 'Gönder',
      feedback_thanks: 'Geri bildiriminiz için teşekkürler!',

      cat_nom_one: 'Nom nom, 1 baklava yendi!',
      cat_nom_many: 'Nom nom, {n} baklava yendi!',

      slack_cta: '#city-istanbul kanalında bizi Slack\'te bulun!',
      footer_events_free: 'PyLadies etkinlikleri her zaman ücretsizdir.',
      organizers_h2: 'Organizatörlerimiz',
      coc_link: 'Davranış Kuralları',

      contact_kicker: 'Bize Ulaşın',
      contact_h1: 'Kodlarken yalnız hissetme!',
      contact_sub: 'Bir bug\'da sıkışsanız da ilk konuşmanızı vermeye hazır olsanız da buradayız.',
      cat_bubble: 'Düzeltemediğim bir bug var… yardım edin 🐞',
      socials_h2: 'Bizi Çevrimiçi Bulun',
      cta_speaker_title: 'Etkinlikte Konuş',
      cta_speaker_body: 'Paylaşacak bir şeyiniz mi var? Sahneye çıkmanızı çok isteriz.',
      cta_speaker_btn: 'İletişime Geç',
      cta_sponsor_title: 'Sponsor Ol',
      cta_sponsor_body: 'Etkinliklerin herkes için ücretsiz kalmasına yardım edin.',
      cta_sponsor_btn: 'İletişime Geç',
      cta_report_title: 'Davranış Bildir',
      cta_report_body: 'Kural ihlalinde ulaşın.',
      cta_report_btn: 'Bildir',

      form_desc: 'Bir etkinlik fikriniz veya geri bildiriminiz mi var, yoksa sadece merhaba mı demek istiyorsunuz? Sizi duymak isteriz.',
      form_type_label: 'Tür',
      form_message_label: 'Mesajınız',
      form_send_btn: 'Gönder',
      form_type_placeholder: 'Tür seçin…',
      form_type_event: 'Etkinlik Önerisi',
      form_type_feedback: 'Geri Bildirim',
      form_consent: 'Verilerimin topluluk iletişimi amacıyla Google altyapısında işlenmesini onaylıyorum.',

      /* Eğitim */
      ed_h2: 'Öğrenme Kaynakları',
      ed_sub: 'Topluluğumuzun konuşmaları ve eğitim videoları tek yerde.',
      ed_search_placeholder: 'Kaynaklarda ara…',
      filter_all: 'Tümü',
      filter_blog: 'Blog Yazıları',
      filter_video: 'Videolar',
      ed_badge_blog: 'Blog',
      ed_badge_video: 'Video',
      ed_read_post: 'Yazıyı oku',
      ed_watch_yt: "YouTube'da izle",
      ed_no_results: 'Kaynak bulunamadı. Yakında tekrar bak!',
      footer_privacy: 'PyLadies İstanbul web sitesi üzerinden toplanan form verileri topluluk içi süreçlerin yönetilmesi amacıyla Google altyapısında, e-posta bülten üyelikleri ise iletişim faaliyetlerinin yürütülmesi amacıyla Substack altyapısında yasal mevzuata uygun olarak güvenli bir şekilde barındırılmaktadır. Verileriniz üçüncü şahıslarla asla paylaşılmaz ve dilediğiniz an topluluktan ayrılma veya verilerinizin silinmesini talep etme hakkınız saklıdır.',
    },

    es: {
      nav_home: 'Inicio',
      nav_education: 'Educación',
      nav_events: 'Eventos',
      nav_contact: 'Contacto',
      footer_tagline: 'Uniendo desarrolladoras de Python en İstanbul.',
      footer_links: 'Enlaces Rápidos',
      footer_rights: '© 2026 PyLadies İstanbul. Todos los derechos reservados.',

      hero_badge: 'Animación 1 · Chica Tomando Té',
      hero_h1: 'Toma un sorbo y únete a las desarrolladoras de Python en İstanbul',
      hero_sub: 'Una comunidad acogedora para entusiastas de Python. ¡Aprendemos y crecemos en Python juntas!',
      hero_cta_events: 'Ver Eventos',
      hero_cta_join: 'Únete',

      what_kicker: 'Qué Hacemos',
      what_h2: 'Codifica, Conecta, Celebra',
      do_card1_title: 'Clubes Universitarios',
      do_card1_body: 'Colaboramos con clubes estudiantiles de İstanbul para talleres y sesiones de estudio.',
      do_card2_title: 'Eventos Planificados',
      do_card2_body: 'Charlas, sprints, hackathons y encuentros sociales — algo para cada nivel.',
      do_card3_title: 'Mentoría Abierta',
      do_card3_body: 'Emparéjate con una Pythonista experimentada para revisiones de código, charlas de carrera y retroalimentación.',

      loop_kicker: 'Mantente al Día',
      loop_h2: 'No te pierdas ningún evento',
      loop_cal_label: 'Añadir a Google Calendar',
      cal_card_desc: 'Suscríbete para tener todos los eventos de PyLadies İstanbul en tu calendario — no te pierdas ningún taller, charla ni evento social.',
      cal_card_btn: 'Abrir Calendario',
      nl_placeholder: 'tu@correo.com',
      nl_btn: 'Suscribirse',
      nl_thanks: '¡Ya estás dentro! Revisa tu bandeja.',

      cat_h2: 'Pausa de Baklava',
      cat_sub: '¡Haz clic en el gato para darle un dulce!',
      cat_btn: 'Dar Baklava 🍯',
      cat_fed: '¡Ñam ñam! El gato está lleno.',

      follow_h2: 'Sigue a PyLadies İstanbul',

      ev_upcoming_h2: 'Próximos Eventos',
      ev_past_h2: 'Eventos Pasados',
      ev_register: 'Registrarse',
      ev_cal: 'Añadir al Calendario',
      ev_tag_workshop: 'Taller',
      ev_tag_talk: 'Charla',
      ev_tag_sprint: 'Sprint',
      ev_tag_social: 'Social',

      suggest_h2: 'Sugerir un Evento',
      suggest_name_label: 'Tu Nombre',
      suggest_name_ph: 'Ada',
      suggest_email_label: 'Correo',
      suggest_email_ph: 'ada@ejemplo.com',
      suggest_idea_label: 'Tu Idea',
      suggest_idea_ph: '¿Qué tipo de evento te gustaría ver?',
      suggest_btn: 'Enviar Sugerencia',
      suggest_thanks: '¡Gracias! Revisaremos tu idea.',
      form_message_ph: 'Cuéntanos tu idea o comentario…',

      feedback_h2: 'Compartir Retroalimentación',
      feedback_label: 'Tu Retroalimentación',
      feedback_ph: 'Cuéntanos qué podemos mejorar…',
      feedback_btn: 'Enviar Comentario',
      feedback_thanks: '¡Gracias por tu comentario!',

      cat_nom_one: '¡Nom nom, 1 baklava comida!',
      cat_nom_many: '¡Nom nom, {n} baklavas comidas!',

      slack_cta: '¡Encuéntranos en el canal #city-istanbul en Slack!',
      footer_events_free: 'Los eventos de PyLadies siempre son gratuitos.',
      organizers_h2: 'Nuestras Organizadoras',
      coc_link: 'Código de Conducta',

      contact_kicker: 'Contáctanos',
      contact_h1: '¡No te sientas sola programando!',
      contact_sub: 'Estamos aquí para ayudar — ya sea que estés atascada en un bug o lista para dar tu primera charla.',
      cat_bubble: 'Hay un bug que no puedo arreglar… ¡necesito ayuda! 🐞',
      socials_h2: 'Encuéntranos en Línea',
      cta_speaker_title: 'Habla en un Evento',
      cta_speaker_body: '¿Tienes algo que compartir? Nos encantaría tenerte en el escenario.',
      cta_speaker_btn: 'Contáctanos',
      cta_sponsor_title: 'Patrocínanos',
      cta_sponsor_body: 'Ayúdanos a mantener los eventos gratuitos para todos.',
      cta_sponsor_btn: 'Contáctanos',
      cta_report_title: 'Reportar Comportamiento',
      cta_report_body: 'Tomamos nuestro Código de Conducta en serio. Contáctanos de forma confidencial.',
      cta_report_btn: 'Reportar',

      form_desc: '¿Tienes una idea de evento, retroalimentación, o solo quieres saludar? Nos encantaría saber de ti.',
      form_type_label: 'Tipo',
      form_message_label: 'Tu Mensaje',
      form_send_btn: 'Enviar',
      form_type_placeholder: 'Seleccionar tipo…',
      form_type_event: 'Sugerencia de evento',
      form_type_feedback: 'Retroalimentación',
      form_consent: 'Consiento que mis datos sean procesados en la infraestructura de Google con fines de comunicación de la comunidad.',

      /* Educación */
      ed_h2: 'Recursos de Aprendizaje',
      ed_sub: 'Charlas y tutoriales de nuestra comunidad, todo en un solo lugar.',
      ed_search_placeholder: 'Buscar recursos…',
      filter_all: 'Todos',
      filter_blog: 'Artículos',
      filter_video: 'Vídeos',
      ed_badge_blog: 'Blog',
      ed_badge_video: 'Vídeo',
      ed_read_post: 'Leer el artículo',
      ed_watch_yt: 'Ver en YouTube',
      ed_no_results: 'No se encontraron recursos. ¡Vuelve pronto!',
      footer_privacy: 'Los datos de formulario recopilados a través del sitio web de PyLadies İstanbul se alojan de forma segura en la infraestructura de Google para la gestión de procesos comunitarios, y las suscripciones al boletín se alojan de forma segura en Substack para actividades de comunicación, ambos en cumplimiento con la legislación aplicable. Sus datos nunca se comparten con terceros y conserva el derecho de darse de baja o solicitar la eliminación en cualquier momento.',
    },
  };

  /* ── Theme ────────────────────────────────────────────────────────── */
  /* ── Sheet metnini guvenli bicimlendirme ──────────────────────────
     Sheets'in kendi bicimlendirmesi (Ctrl+B vb.) disa aktarimda
     kayboldugu icin bicimlendirme hucreye karakter olarak yazilir:

       **kalin**              -> kalin
       *egik*                 -> egik
       [yazi](https://...)    -> baglanti
       Alt+Enter              -> satir sonu
       bos satir              -> yeni paragraf

     Once escHtml, sonra desenler uygulanir; hucreye HTML yazilsa
     bile etiket olarak calismaz. */
  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function richText(str) {
    /* Windows/Sheets \r\n satir sonlarini tekilleştir */
    var s = escHtml(String(str == null ? '' : str).replace(/\r\n?/g, '\n'));

    /* [yazi](url) — yalnizca http(s) ve mailto */
    s = s.replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, function (m, label, url) {
      var clean = url.replace(/&amp;/g, '&');
      /* Guvenli olmayan sema: yazildigi gibi birak, kullanici calismadigini gorsun */
      if (!/^(https?:\/\/|mailto:)/i.test(clean)) return m;
      return '<a href="' + clean.replace(/&/g, '&amp;').replace(/"/g, '&quot;') +
             '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    });

    s = s.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');

    return s.split(/\n\s*\n/).map(function (para) {
      return '<p>' + para.trim().replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function getTheme() {
    return localStorage.getItem('pl_theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const knob = document.querySelector('.toggle-knob');
    if (knob) knob.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function toggleDark() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pl_theme', next);
    applyTheme(next);
    const toggle = document.querySelector('.dark-toggle');
    if (toggle) toggle.classList.toggle('is-dark', next === 'dark');
  }

  /* ── Language ─────────────────────────────────────────────────────── */
  function getLang() {
    return localStorage.getItem('pl_lang') || 'en';
  }

  function applyLang(lang) {
    const d = DICT[lang] || DICT.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (d[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = d[key];
        } else {
          el.textContent = d[key];
        }
      }
    });
    document.documentElement.setAttribute('lang', lang);
  }

  function setLang(lang) {
    localStorage.setItem('pl_lang', lang);
    applyLang(lang);
    updateLangTrigger(lang);
    closeLangMenu();
    if (typeof window.onLangChange === 'function') window.onLangChange(lang);
  }

  /* ── Lang menu ────────────────────────────────────────────────────── */
  const LANGS = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  function updateLangTrigger(lang) {
    const entry = LANGS.find(function (l) { return l.code === lang; }) || LANGS[1];
    const trigger = document.querySelector('.lang-trigger');
    if (trigger) trigger.innerHTML = entry.label + ' <span class="lang-arrow">▾</span>';
  }

  function closeLangMenu() {
    const menu = document.querySelector('.lang-menu');
    if (menu) menu.classList.remove('open');
  }

  function initLangMenu() {
    const trigger = document.querySelector('.lang-trigger');
    const menu = document.querySelector('.lang-menu');
    if (!trigger || !menu) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    menu.innerHTML = LANGS.map(function (l) {
      return '<button class="lang-option" data-lang="' + l.code + '">' + l.label + '</button>';
    }).join('');

    menu.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.lang-picker')) closeLangMenu();
    });
  }

  /* ── Active nav ───────────────────────────────────────────────────── */
  function setActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (a) {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === page) { a.classList.add('active'); return; }
      if (href === 'index.html' && (page === '' || page === 'index.html')) { a.classList.add('active'); }
    });
  }

  /* ── Dark toggle wiring ───────────────────────────────────────────── */
  function initDarkToggle() {
    const toggle = document.querySelector('.dark-toggle');
    if (!toggle) return;
    const currentTheme = getTheme();
    toggle.classList.toggle('is-dark', currentTheme === 'dark');
    toggle.addEventListener('click', toggleDark);
  }

  /* ── Boot ─────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getTheme());
    const lang = getLang();
    applyLang(lang);
    updateLangTrigger(lang);
    initLangMenu();
    initDarkToggle();
    setActiveNav();
  });

  /* expose for page scripts */
  window.PL = {
    getLang: getLang,
    getDict: function () { return DICT[getLang()] || DICT.en; },
    escHtml: escHtml,
    richText: richText,
  };
})();
