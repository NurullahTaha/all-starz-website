// Mobile-Optimized JavaScript for All Starz Fast Foods
console.log('All Starz Fast Foods Mobile version loaded');

// Global variables
let mobileMenuOpen = false;
let hamburger = null;
let mobileMenu = null;
let touchStartX = 0;
let touchEndX = 0;

// Page navigation function
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update navigation active states
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('Page not found:', pageId);
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    console.log('Toggle mobile menu');
    
    if (!hamburger || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add vibration feedback if supported
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    } else {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
    }
}

// Mobile image slider
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
    slideInterval = setInterval(switchSlide, 4000);
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Mobile menu tab switching
function setupMobileMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
            
            // Hide all menu sections
            const menuSections = document.querySelectorAll('.menu-section');
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = document.getElementById(category);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update button active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Touch gesture handling
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        const pages = ['home', 'about', 'menu', 'location'];
        const currentPage = document.querySelector('.page.active');
        
        if (currentPage) {
            const currentIndex = pages.indexOf(currentPage.id);
            let newIndex;
            
            if (swipeDistance > 0) {
                // Swipe right - go to previous page
                newIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
            } else {
                // Swipe left - go to next page
                newIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
            }
            
            showPage(pages[newIndex]);
        }
    }
}

// Mobile contact form handling
function setupMobileContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.textContent = '✓ Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Success vibration
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '';
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }
}

// Mobile optimized Google Maps
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const geocoder = new google.maps.Geocoder();
    const address = '358A Railway Parade, Beckenham WA 6107';
    
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: results[0].geometry.location,
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                gestureHandling: 'greedy',
                styles: [
                    {
                        "featureType": "poi",
                        "stylers": [{"visibility": "off"}]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [{"visibility": "off"}]
                    }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'All Starz Fast Foods',
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRjk1MDAiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik04IDJMMTAuMTIgNi44OEwxNSA3TDExLjUgMTAuMTJMMTIuNSAxNUw4IDEyLjVMMy41IDE1TDQuNSAxMC4xMkwxIDdMNS44OCA2Ljg4TDggMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K',
                    scaledSize: new google.maps.Size(32, 32)
                }
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 5px; font-size: 14px;">
                        <h4 style="margin: 0 0 5px 0; color: #5D2F02;">All Starz Fast Foods</h4>
                        <p style="margin: 0; color: #666; font-size: 12px;">358A Railway Parade<br>Beckenham WA 6107</p>
                        <p style="margin: 5px 0 0 0; color: #FF6B1A; font-weight: bold; font-size: 11px;">Mon-Fri: 2PM-10PM<br>Sat-Sun: 2PM-11PM</p>
                    </div>
                `
            });
            
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
            
            console.log('Mobile Google Maps initialized');
        } else {
            console.error('Geocoding failed:', status);
        }
    });
}

// Add touch feedback to buttons
function addTouchFeedback() {
    const buttons = document.querySelectorAll('button, .nav-link, .tab-btn, .mobile-menu-item');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Prevent double-tap zoom on certain elements
function preventDoubleTabZoom() {
    const elements = document.querySelectorAll('button, .nav-link, .tab-btn, .hamburger');
    elements.forEach(element => {
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}

// Handle orientation changes
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate hero height
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.minHeight = window.innerHeight + 'px';
            }
            
            // Close mobile menu on orientation change
            if (mobileMenuOpen) {
                closeMobileMenu();
            }
        }, 100);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile features...');
    
    // Initialize mobile menu elements
    hamburger = document.getElementById('hamburger');
    mobileMenu = document.getElementById('mobileMenu');
    
    // Setup hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
        console.log('Hamburger menu initialized');
    }
    
    // Setup mobile menu navigation
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('href').substring(1);
                showPage(pageId);
            });
        });
        console.log('Mobile menu navigation initialized');
    }
    
    // Setup mobile menu tabs
    setupMobileMenuTabs();
    
    // Setup hero buttons
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
    
    // Setup touch gestures
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    
    // Setup contact form
    setupMobileContactForm();
    
    // Add touch feedback
    addTouchFeedback();
    
    // Prevent double-tap zoom
    preventDoubleTabZoom();
    
    // Handle orientation changes
    handleOrientationChange();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on back button
    window.addEventListener('popstate', function() {
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
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
    
    // Optimize for mobile performance
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }
    
    console.log('All Starz Fast Foods Mobile initialization complete');
});

// Handle visibility changes to pause/resume slideshow
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopSlideshow();
    } else {
        const homePage = document.getElementById('home');
        if (homePage && homePage.classList.contains('active')) {
            startSlideshow();
        }
    }
});

// Optimize scrolling performance
let ticking = false;
function optimizeScrolling() {
    if (!ticking) {
        requestAnimationFrame(function() {
            // Scroll-based optimizations can go here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', optimizeScrolling);

// Make functions globally available
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.initMap = initMap; 