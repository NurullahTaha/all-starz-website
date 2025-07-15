// Fresh JavaScript - Simple and Working
console.log('Script loaded successfully');

// Global variables
let mobileMenuOpen = false;

// Simple page navigation function
function showPage(pageId) {
    console.log('=== showPage called with:', pageId, '===');
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    console.log('Found pages:', pages.length);
    pages.forEach((page, index) => {
        console.log(`Page ${index}:`, page.id, 'classes:', page.className);
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    console.log('Target page found:', targetPage ? targetPage.id : 'NOT FOUND');
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Added active class to:', pageId);
        console.log('Page classes after:', targetPage.className);
    } else {
        console.error('Page with ID', pageId, 'not found!');
        return;
    }
    
    // Update navigation active states
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`a[href="#${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        console.log('Updated active nav link for:', pageId);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('=== showPage complete ===');
}

// Make showPage global
window.showPage = showPage;

// Mobile menu functions
function toggleMobileMenu() {
    console.log('toggleMobileMenu called');
    
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!hamburger || !mobileMenu) {
        console.error('Hamburger or mobile menu not found');
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
    
    console.log('Mobile menu open:', mobileMenuOpen);
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
    }
}

// Make functions global
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// Test function
window.testJS = function() {
    alert('JavaScript is working!');
    console.log('Test function called successfully');
};

// Test page switching function
window.testPages = function() {
    console.log('=== TESTING ALL PAGES ===');
    const pages = ['home', 'about', 'menu', 'location'];
    pages.forEach(pageId => {
        const page = document.getElementById(pageId);
        console.log(`Page "${pageId}":`, page ? 'EXISTS' : 'MISSING');
        if (page) {
            console.log(`  - Classes: ${page.className}`);
            console.log(`  - Display: ${getComputedStyle(page).display}`);
        }
    });
};

// Test navigation function
window.testNav = function(pageId) {
    console.log(`Testing navigation to: ${pageId}`);
    showPage(pageId);
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Debug: Check all pages on load
    console.log('=== PAGE DEBUG ON LOAD ===');
    const allPages = document.querySelectorAll('.page');
    console.log('Total pages found:', allPages.length);
    allPages.forEach((page, index) => {
        console.log(`Page ${index}: ID="${page.id}", classes="${page.className}", display="${getComputedStyle(page).display}"`);
    });
    console.log('=== END PAGE DEBUG ===');
    
    // Setup hamburger menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
        console.log('Hamburger click listener added');
    }
    
    // Setup mobile menu navigation
    const mobileMenu = document.getElementById('mobileMenu');
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
        console.log('Mobile menu links setup complete');
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
    console.log('Desktop navigation setup complete');
    
    // Setup menu category buttons
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
    console.log('Menu category buttons setup complete');
    
    // Setup explore button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            showPage('menu');
        });
        console.log('Explore button setup complete');
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuOpen) {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (hamburger && mobileMenu && 
                !hamburger.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    console.log('All event listeners setup complete');
});

// EmailJS functionality (placeholder - replace with actual credentials)
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID', 
    templateId: 'YOUR_TEMPLATE_ID'
};

// Initialize EmailJS if available
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
}

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simple success simulation (replace with actual EmailJS when configured)
            setTimeout(() => {
                alert('Thank you for your review! We appreciate your feedback.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});

// Google Maps callback function
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const geocoder = new google.maps.Geocoder();
    const address = '358A Railway Parade, Beckenham WA 6107';
    
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: results[0].geometry.location
            });
            
            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: 'All Starz Fast Foods'
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: '<div><strong>All Starz Fast Foods</strong><br>358A Railway Parade<br>Beckenham WA 6107</div>'
            });
            
            infoWindow.open(map, marker);
        }
    });
}

// Make initMap global for Google Maps callback
window.initMap = initMap;

console.log('Script setup complete');