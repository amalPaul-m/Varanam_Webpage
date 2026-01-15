// ===== SLIDER FUNCTIONALITY =====
class ProductSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;

        this.prevBtn = document.querySelector('.nav-prev');
        this.nextBtn = document.querySelector('.nav-next');
        this.slideCounter = document.querySelector('.current-slide');
        this.actionButtons = document.querySelectorAll('.slide-action-btn');

        // Color themes for each slide
        this.slideThemes = [
            { primary: '#FF6B35', secondary: '#FFA55C', name: 'orange' },
            { primary: '#FFD700', secondary: '#FFEB3B', name: 'lemon' },
            { primary: '#8B5CF6', secondary: '#A78BFA', name: 'grape' }
        ];

        this.init();
    }

    init() {
        // Timeline item click handlers
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => this.goToSlide(index));
        });

        // Action buttons (Click to Slide)
        this.actionButtons.forEach(btn => {
            btn.addEventListener('click', () => this.nextSlide());
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') this.previousSlide();
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') this.nextSlide();
        });

        // Touch/swipe support
        this.addTouchSupport();

        // Update timeline
        this.updateTimeline();
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');

        // Update current slide index
        this.currentSlide = index;

        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');

        // Update timeline
        this.updateTimeline();

        // Add animation effect
        this.animateSlideContent();

        // Update theme colors
        this.updateThemeColors();

        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    updateTimeline() {
        // Update timeline items active state
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            if (index === this.currentSlide) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update progress bar
        const progressBar = document.querySelector('.timeline-progress');
        if (progressBar) {
            const progressHeight = ((this.currentSlide + 1) / this.totalSlides) * 100;
            progressBar.style.height = `${progressHeight}%`;

            // Update gradient based on current slide
            const theme = this.slideThemes[this.currentSlide];
            progressBar.style.background = `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})`;
            progressBar.style.boxShadow = `0 0 20px ${theme.primary}80`;
        }
    }

    updateCounter() {
        // Legacy method - kept for compatibility
        if (this.slideCounter) {
            this.slideCounter.textContent = this.currentSlide + 1;
        }
    }

    animateSlideContent() {
        const activeSlide = this.slides[this.currentSlide];
        const textContent = activeSlide.querySelector('.text-content');
        const title = activeSlide.querySelector('.slide-title');
        const decorativeElements = activeSlide.querySelectorAll('.emoji-orange, .emoji-lemon, .emoji-grape, .emoji-leaf');

        // Reset and replay animations
        if (textContent) {
            textContent.style.animation = 'none';
            setTimeout(() => {
                textContent.style.animation = 'textEntrance 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 10);
        }

        // Animate decorative elements
        decorativeElements.forEach((elem, index) => {
            elem.style.opacity = '0';
            setTimeout(() => {
                elem.style.transition = 'opacity 0.5s ease-in-out';
                elem.style.opacity = '0.6';
            }, 200 + (index * 100));
        });
    }

    updateThemeColors() {
        const theme = this.slideThemes[this.currentSlide];
        const navbar = document.querySelector('.navbar');

        // Animate navbar border color (only if navbar exists)
        if (navbar) {
            navbar.style.borderImage = `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}) 1`;
        }
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        const sliderContainer = document.querySelector('.slider-container');

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            this.startAutoPlay(interval);
        });
    }

}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                // For now, just add active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// ===== PARALLAX EFFECT FOR DECORATIVE ELEMENTS =====
function addParallaxEffect() {
    const slides = document.querySelectorAll('.slide.active');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        slides.forEach(slide => {
            const decorativeElements = slide.querySelectorAll('.emoji-orange, .emoji-lemon, .emoji-grape, .emoji-leaf');

            decorativeElements.forEach((elem, index) => {
                const speed = (index + 1) * 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                elem.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    });
}

// ===== 3D TILT EFFECT FOR TEXT CONTENT =====
function add3DTiltEffect() {
    const textContents = document.querySelectorAll('.text-content');

    textContents.forEach(content => {
        content.addEventListener('mousemove', (e) => {
            const rect = content.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        content.addEventListener('mouseleave', () => {
            content.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    const slider = new ProductSlider();

    // Add parallax effect
    addParallaxEffect();

    // Add 3D tilt effect
    add3DTiltEffect();

    // Initialize particle system
    const particles = new ParticleSystem();

    // Initialize cursor trail
    const cursorTrail = new CursorTrail();

    // Update cursor trail color on slide change
    document.querySelectorAll('.nav-arrow, .slide-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                cursorTrail.updateColor(slider.currentSlide);
            }, 100);
        });
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    // Log initialization
    console.log('🍊 Tamagon Product Slider initialized!');
    console.log(`📊 Total slides: ${slider.totalSlides}`);
    console.log('⌨️  Use arrow keys to navigate');
    console.log('👆 Swipe on touch devices');
});

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 30;

        this.setupCanvas();
        this.createParticles();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '5';
        this.canvas.style.opacity = '0.4';
        document.body.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const colors = ['#FF6B35', '#FFD700', '#8B5CF6', '#FF6B9D', '#06B6D4'];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ===== CURSOR TRAIL EFFECT =====
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.colors = ['#FF6B35', '#FFD700', '#8B5CF6'];
        this.currentColorIndex = 0;

        document.addEventListener('mousemove', (e) => this.addTrailPoint(e));
        this.animate();
    }

    addTrailPoint(e) {
        this.trail.push({
            x: e.clientX,
            y: e.clientY,
            color: this.colors[this.currentColorIndex],
            life: 1
        });

        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    animate() {
        this.trail.forEach((point, index) => {
            point.life -= 0.05;
            if (point.life <= 0) {
                this.trail.splice(index, 1);
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    updateColor(index) {
        this.currentColorIndex = index;
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized - adjusting layout');
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
