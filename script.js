// Smooth scroll behavior
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.challenge-card, .solution-card, .portfolio-card, .work-item, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ROI Counter Animation
const roiCounter = document.querySelector('.roi-percentage');
if (roiCounter) {
    const targetValue = parseInt(roiCounter.getAttribute('data-target'));
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps

    const roiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(counter);
                    }
                    roiCounter.textContent = Math.floor(currentValue);
                }, 16);
                roiObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    roiObserver.observe(roiCounter);
}

// Parallax effect for images - DISABLED to fix images in place
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.hero-image, .challenge-image, .solution-image');
//     
//     parallaxElements.forEach(el => {
//         const speed = 0.5;
//         const yPos = -(scrolled * speed);
//         el.style.transform = `translateY(${yPos}px)`;
//     });
// });

// Add hover effect to cards
document.querySelectorAll('.challenge-card, .solution-card, .portfolio-card, .roi-card, .work-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37, #B8860B);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Smooth reveal on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🚀 第2の創業へ - DX推進提案サイト initialized');
