// Scroll effect - glass card stays fixed until it reaches end of background image
const glassCard = document.getElementById('glassCard');
const heroContainer = document.querySelector('.hero-container');
const glassNav = document.querySelector('.glass-nav');

function updateScrollElements() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Toggle nav bar style based on scroll position
    if (glassNav && heroContainer) {
        const heroHeight = heroContainer.offsetHeight;
        // Add scrolled class when we've scrolled past the hero section
        if (scrollY > heroHeight) {
            glassNav.classList.add('scrolled');
        } else {
            glassNav.classList.remove('scrolled');
        }
    }
    
    if (glassCard) {
        // Get hero container dimensions
        const heroHeight = heroContainer.offsetHeight;
        
        // Margin from the bottom of the visible image (adjust this value as needed)
        const bottomMargin = 10;
        
        // Get the glass card dimensions
        const cardHeight = glassCard.offsetHeight;
        
        // Calculate the initial top position in pixels (85vh)
        const cardInitialTopPx = windowHeight * 0.70;
        
        // Calculate when the bottom of the card (in viewport) would reach the threshold
        // The threshold is the end of the hero section minus the margin
        const imageEndPoint = heroHeight - bottomMargin;
        
        // The point where we should stop the card from being fixed
        // This is when: scrollY + cardInitialTopPx + cardHeight >= imageEndPoint
        const stopScrollThreshold = imageEndPoint - cardInitialTopPx - cardHeight;
        
        if (scrollY < stopScrollThreshold) {
            // Keep the card fixed in its original position (no transform)
            glassCard.style.position = 'fixed';
            glassCard.style.top = '70vh';
            glassCard.style.left = '9%';
            glassCard.style.transform = 'none';
        } else {
            // Switch to absolute positioning so it stops scrolling with the viewport
            // Position it relative to the hero container
            glassCard.style.position = 'absolute';
            glassCard.style.top = (imageEndPoint - cardHeight) + 'px';
            glassCard.style.left = '9%';
            glassCard.style.transform = 'none';
        }
    }
}

// Throttle scroll events for performance
let ticking = false;
function requestUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollElements();
            ticking = false;
        });
        ticking = true;
    }
}

// Event listeners
window.addEventListener('scroll', requestUpdate);
window.addEventListener('resize', updateScrollElements);
window.addEventListener('load', updateScrollElements);

// Initial call
updateScrollElements();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only handle links that point to an element (not just "#")
        if (href && href.length > 1) {
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for smooth scroll
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 100, // 100px offset from top for better visibility
                    behavior: 'smooth'
                });
            }
        }
    });
});

