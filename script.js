document.addEventListener('DOMContentLoaded', () => {
    // Reveal Elements on Scroll setup
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,      // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // If you want elements to hide again when scrolled up, uncomment next line
                // entry.target.classList.remove('active');
                return;
            }

            // Add 'active' class to trigger CSS transitions
            entry.target.classList.add('active');

            // Unobserve if you only want the animation to happen once
            // observer.unobserve(entry.target); 
        });
    }, revealOptions);

    // Initial check for elements in viewport on load, and observe all reveals
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Scroll Gather Section Logic (Funcionalidades)
    const gatherSection = document.querySelector('.scroll-gather-section');
    if (gatherSection) {
        window.addEventListener('scroll', () => {
            const rect = gatherSection.getBoundingClientRect();
            let progress = 0;
            // The distance we have to scroll to reach the bottom of the section
            const scrollableDist = rect.height - window.innerHeight;

            if (rect.top > 0) {
                progress = 0;
            } else if (rect.top <= 0 && -rect.top < scrollableDist) {
                progress = -rect.top / scrollableDist;
            } else {
                progress = 1;
            }

            // Apply ease-out for a smoother ending
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            gatherSection.style.setProperty('--gather-progress', easeOutProgress);
            gatherSection.style.setProperty('--gather-opacity', Math.min(1, progress * 4));
        });
        // Trigger once on load to set initial state
        window.dispatchEvent(new Event('scroll'));
    }
});
