/* ========================================
   MAIN JAVASCRIPT - SHARED FUNCTIONALITY
   ======================================== */

// ========================================
// DARK MODE
// ========================================

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const button = document.querySelector('.dark-mode-toggle');
    if (button) {
        if (document.body.classList.contains('dark-mode')) {
            button.textContent = '☀️';
        } else {
            button.textContent = '🌙';
        }
    }
}

// Check for saved dark mode preference on page load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Update button when page loads
document.addEventListener('DOMContentLoaded', updateDarkModeButton);

// ========================================
// LANGUAGE SUPPORT
// ========================================

const translations = {
    en: {
        home: 'Home',
        education: 'Education',
        events: 'Events',
        contact: 'Contact Us',
        language: '🇬🇧 English',
        darkMode: 'Toggle dark mode'
    },
    tr: {
        home: 'Anasayfa',
        education: 'Eğitimler',
        events: 'Etkinlikler',
        contact: 'İletişim',
        language: '🇹🇷 Türkçe',
        darkMode: 'Koyu modu aç/kapat'
    },
    es: {
        home: 'Inicio',
        education: 'Educación',
        events: 'Eventos',
        contact: 'Contacto',
        language: '🇪🇸 Español',
        darkMode: 'Alternar modo oscuro'
    }
};

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    console.log('Language changed to:', lang);
    // Language preference saved for future implementation
}

// Check for saved language preference
const savedLanguage = localStorage.getItem('language') || 'en';
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    languageSelect.value = savedLanguage;
}

// ========================================
// SMOOTH SCROLLING
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Search focus: Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Dark mode toggle: Ctrl+Shift+D or Cmd+Shift+D
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

const mainNav = document.querySelector('nav');
if (mainNav) {
    mainNav.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const link = e.target.closest('a');
            if (link) link.click();
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(getCurrentLanguage(), options);
}

// Check if dark mode is enabled
function isDarkMode() {
    return document.body.classList.contains('dark-mode');
}

// Log version
console.log('PyLadies Istanbul Website v1.0');
