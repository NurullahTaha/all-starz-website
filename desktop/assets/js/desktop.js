// Desktop-Optimized JavaScript for All Starz Fast Foods
console.log('All Starz Fast Foods Desktop version loaded');

// Page navigation function
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages with fade out
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page with fade in
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
            
            // Update navigation active states
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`a[href="#${pageId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    } else {
        console.error('Page not found:', pageId);
    }
}

// Enhanced image slider with smooth transitions
let currentSlide = 0;
const slides = ['#img1', '#img2'];
let slideInterval;

function switchSlide() {
    slides.forEach((slide, index) => {
        const img = document.querySelector(slide);
        if (img) {
            img.style.opacity = index === currentSlide ? '1' : '0';
        }
    });
    
    currentSlide = (currentSlide + 1) % slides.length;
}

function startSlideshow() {
    slideInterval = setInterval(switchSlide, 5000);
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Menu category switching
function setupMenuCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Hide all menu sections
            const menuSections = document.querySelectorAll('.menu-section');
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = document.getElementById(category);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update button active states
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Enhanced smooth scrolling for navigation
function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            
            // Add loading animation
            this.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                this.style.transform = '';
                showPage(pageId);
            }, 150);
        });
    });
}

// Parallax effect for hero section
function setupParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = scrolled * 0.5;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        });
    }
}

// Enhanced podium interactions
function setupPodiumInteractions() {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        step.addEventListener('click', function() {
            showPage('menu');
        });
    });
}

// Review card hover effects
function setupReviewEffects() {
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Enhanced form handling
function setupContactForm() {
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Loading animation
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.95)';
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.transform = '';
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }
}

// Google Maps initialization
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const geocoder = new google.maps.Geocoder();
    const address = '358A Railway Parade, Beckenham WA 6107';
    
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            const map = new google.maps.Map(mapElement, {
                zoom: 16,
                center: results[0].geometry.location,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [{"weight": "2.00"}]
                    },
                    {
                        "featureType": "all",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#9c9c9c"}]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text",
                        "stylers": [{"visibility": "on"}]
                    }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'All Starz Fast Foods',
                animation: google.maps.Animation.BOUNCE
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #5D2F02;">All Starz Fast Foods</h3>
                        <p style="margin: 0; color: #666;">358A Railway Parade<br>Beckenham WA 6107</p>
                        <p style="margin: 10px 0 0 0; color: #FF6B1A; font-weight: bold;">Mon-Fri: 2PM-10PM<br>Sat-Sun: 2PM-11PM</p>
                    </div>
                `
            });
            
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
            
            // Open info window by default
            infoWindow.open(map, marker);
            
            console.log('Google Maps initialized successfully');
        } else {
            console.error('Geocoding failed:', status);
        }
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const pages = ['home', 'about', 'menu', 'location'];
            const currentPage = document.querySelector('.page.active');
            if (currentPage) {
                const currentIndex = pages.indexOf(currentPage.id);
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
                } else {
                    newIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
                }
                
                showPage(pages[newIndex]);
            }
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing desktop features...');
    
    // Setup all navigation
    setupSmoothNavigation();
    
    // Setup menu categories
    setupMenuCategories();
    
    // Setup hero button
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            showPage('menu');
        });
    });
    
    // Start image slider
    if (document.querySelector('#slider')) {
        startSlideshow();
        console.log('Image slider started');
    }
    
    // Setup enhanced interactions
    setupParallax();
    setupPodiumInteractions();
    setupReviewEffects();
    setupContactForm();
    setupKeyboardNavigation();
    
    // Pause slideshow when not on home page
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const homePage = document.getElementById('home');
                if (homePage && homePage.classList.contains('active')) {
                    startSlideshow();
                } else {
                    stopSlideshow();
                }
            }
        });
    });
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        observer.observe(page, { attributes: true });
    });
    
    console.log('All Starz Fast Foods Desktop initialization complete');
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
    
    .nav-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .nav-link:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.showPage = showPage;
window.initMap = initMap; 