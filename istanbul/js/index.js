/* ========================================
   INDEX PAGE JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Page specific initialization
    console.log('Index page loaded');

    // Animate service numbers on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    });

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS animation if not exists
    if (!document.getElementById('fadeInUpAnimation')) {
        const style = document.createElement('style');
        style.id = 'fadeInUpAnimation';
        style.innerHTML = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Handle video autoplay on visibility change
    const videoElement = document.querySelector('.hero-video video');
    if (videoElement) {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
        });
    }
});

// Analytics or tracking can be added here
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Add Google Analytics or other tracking here
}

// Track button clicks
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('CTA_Click', { text: button.textContent });
        });
    });
});
