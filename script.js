/**
 * Custard Landing Page - JavaScript
 * Handles interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScroll();
    initScrollAnimations();
    initMobileNav();
    initHeaderScroll();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                closeMobileNav();
            }
        });
    });
}

/**
 * Scroll-triggered animations for cards and elements
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.15}s`;
        observer.observe(item);
    });
}

/**
 * Animate numbers in stat section
 */
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.textContent;

        if (text.includes('hrs')) {
            // Animate 48
            animateValue(stat, 0, 48, 1500);
        } else if (text.includes('min')) {
            // Animate 10
            animateValue(stat, 0, 10, 1500);
        } else if (text.includes('★')) {
            // Skip star ratings
            return;
        } else {
            // Animate other numbers
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            if (!isNaN(number)) {
                animateValue(stat, 0, number, 1500);
            }
        }
    });
}

/**
 * Helper function to animate number values
 */
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);
        const current = Math.floor(start + (range * easeProgress));

        element.childNodes[0].textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Easing function for smooth animations
 */
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Mobile navigation handling
 */
function initMobileNav() {
    // Create mobile menu button if it doesn't exist
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.nav');

    // Create mobile menu toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation');
    mobileToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--dark-slate);
    `;

    header.insertBefore(mobileToggle, nav);

    // Toggle menu on click
    mobileToggle.addEventListener('click', function() {
        if (nav.classList.contains('mobile-open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    // Show toggle on mobile
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
        } else {
            mobileToggle.style.display = 'none';
            closeMobileNav();
        }
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
}

function openMobileNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-nav-toggle');

    nav.classList.add('mobile-open');
    nav.style.cssText = `
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        gap: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999;
    `;

    toggle.innerHTML = '✕';
}

function closeMobileNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-nav-toggle');

    nav.classList.remove('mobile-open');
    nav.style.cssText = '';

    if (toggle) {
        toggle.innerHTML = '☰';
    }
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// Add CSS for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @media (max-width: 768px) {
        .mobile-nav-toggle {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);

// Add scroll animation observer for stats
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

/**
 * Track CTA clicks for analytics (placeholder)
 */
function trackCTAClick(buttonName) {
    // This can be connected to Google Analytics, Facebook Pixel, etc.
    console.log('CTA Clicked:', buttonName);

    // Example Google Analytics tracking:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'click', {
    //         event_category: 'CTA',
    //         event_label: buttonName
    //     });
    // }
}

// Add click tracking to all CTA buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        trackCTAClick(this.textContent.trim());
    });
});

/**
 * Lightbox Functionality
 * Enables clicking on screenshots to view them full size
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    let currentIndex = 0;
    const totalImages = triggers.length;

    // Open lightbox when clicking on a screenshot
    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const trigger = triggers[currentIndex];
        const imageSrc = trigger.src;
        const caption = trigger.dataset.caption || '';

        lightboxImage.src = imageSrc;
        lightboxImage.alt = trigger.alt;
        lightboxCaption.textContent = caption;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateLightboxContent();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateLightboxContent();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initLightbox);
