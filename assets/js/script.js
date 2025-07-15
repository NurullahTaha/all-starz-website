// All Starz Fast Foods - JavaScript
console.log('All Starz Fast Foods script loaded');

// Global variables
let mobileMenuOpen = false;
let hamburger = null;
let mobileMenu = null;

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

// Image slider functionality
let currentSlide = 0;
const slides = ['#img1', '#img2'];

function switchSlide() {
    slides.forEach((slide, index) => {
        const img = document.querySelector(slide);
        if (img) {
            img.style.opacity = index === currentSlide ? '1' : '0';
        }
    });
    
    currentSlide = (currentSlide + 1) % slides.length;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
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
                closeMobileMenu();
            });
        });
        console.log('Mobile menu navigation initialized');
    }
    
    // Setup desktop navigation
    const desktopLinks = document.querySelectorAll('.nav-left .nav-link, .nav-right .nav-link');
    desktopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });
    console.log('Desktop navigation initialized');
    
    // Setup hero button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            showPage('menu');
        });
    }
    
    // Start image slider
    if (document.querySelector('#slider')) {
        setInterval(switchSlide, 4000);
        console.log('Image slider initialized');
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    console.log('All Starz Fast Foods initialization complete');
});

// Make functions globally available
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;