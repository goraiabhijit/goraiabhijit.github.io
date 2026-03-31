// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const clockEl = document.getElementById('live-clock');

    function toggleClock(isActive) {
        if (clockEl) {
            clockEl.style.opacity = isActive ? '0' : '1';
            clockEl.style.visibility = isActive ? 'hidden' : 'visible';
        }
    }

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        const isActive = navMenu.classList.toggle('active');
        toggleClock(isActive);
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            toggleClock(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            toggleClock(false);
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.about-section, .projects-section, .contact-section');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// System UI Timers
document.addEventListener('DOMContentLoaded', () => {
    const liveClockEl = document.getElementById('live-clock');
    const timeSpentEl = document.getElementById('time-spent');
    
    if(!liveClockEl || !timeSpentEl) return;
    
    let secondsSpent = 0;

    function updateSystemUI() {
        // Live Clock
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        liveClockEl.textContent = timeString;

        // Time Spent
        const m = Math.floor(secondsSpent / 60).toString().padStart(2, '0');
        const s = (secondsSpent % 60).toString().padStart(2, '0');
        timeSpentEl.textContent = `${m}:${s} spent`;
        secondsSpent++;
    }

    // Initial call and set interval
    updateSystemUI();
    setInterval(updateSystemUI, 1000);
});
