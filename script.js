document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const exploreBtn = document.querySelector('.explore-btn');
    const contactForm = document.querySelector('.form');

    window.showPage = function(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        const activeNavLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showMenuSection(categoryId) {
        menuSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(categoryId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            window.showPage(pageId);
        });
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showMenuSection(category);
            
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            window.showPage('menu');
        });
    }

    // EmailJS configuration - Replace with your actual credentials
    const EMAILJS_CONFIG = {
        publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
        serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        templateId: 'YOUR_TEMPLATE_ID' // Replace with your EmailJS template ID
    };

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    this
                ).then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your review! We appreciate your feedback and will read it soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error sending your review. Please try again later or contact us directly.');
                }).finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            } else {
                alert('Email service is not available. Please try again later.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    const reviewCards = document.querySelectorAll('.review-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const podiumSteps = document.querySelectorAll('.step');
    podiumSteps.forEach(step => {
        step.addEventListener('click', function() {
            window.showPage('menu');
        });
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });

    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.fontSize = '24px';
    hamburger.style.cursor = 'pointer';
    hamburger.style.color = '#8B4513';

    const nav = document.querySelector('.nav');
    nav.appendChild(hamburger);

    function toggleMobileMenu() {
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        
        if (navLeft.classList.contains('active')) {
            navLeft.classList.remove('active');
            navRight.classList.remove('active');
        } else {
            navLeft.classList.add('active');
            navRight.classList.add('active');
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    function checkMobile() {
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
            if (!navLeft.classList.contains('active')) {
                navLeft.style.display = 'none';
                navRight.style.display = 'none';
            }
        } else {
            hamburger.style.display = 'none';
            navLeft.style.display = 'flex';
            navRight.style.display = 'flex';
            navLeft.classList.remove('active');
            navRight.classList.remove('active');
        }
    }

    window.addEventListener('resize', checkMobile);
    checkMobile();

    // Image slider functionality
    const images = [
        "https://static.wixstatic.com/media/fbe9c2_633948ad5335444aa475fc27d13b8cfb~mv2.jpg", 
        "https://static.wixstatic.com/media/fbe9c2_f32c63074f2941bc8ff883a19c0b33ec~mv2.jpg",
        "https://static.wixstatic.com/media/fbe9c2_5c1bd65926d9489e92c2ebe8a3515b06~mv2.jpg",
        "https://static.wixstatic.com/media/fbe9c2_9cfb99e9f6bb415c81765a85cea44879~mv2.jpg"
    ];

    let currentIndex = 0;
    let showingImg1 = true;
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    function crossFade() {
        const nextIndex = (currentIndex + 1) % images.length;
        if (showingImg1) {
            img2.src = images[nextIndex];
            img2.style.opacity = 1;
            img1.style.opacity = 0;
        } else {
            img1.src = images[nextIndex];
            img1.style.opacity = 1;
            img2.style.opacity = 0;
        }
        showingImg1 = !showingImg1;
        currentIndex = nextIndex;
    }

    // Start the interval after page loads
    if (img1 && img2) {
        setInterval(crossFade, 4000);
    }

    // Morphing text effect
    const morphingTexts = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2")
    };

    if (morphingTexts.text1 && morphingTexts.text2) {
        // Set initial state
        morphingTexts.text1.textContent = "ALL STARZ";
        morphingTexts.text2.textContent = "LOVE AND SAUCE";
        morphingTexts.text1.style.opacity = "1";
        morphingTexts.text2.style.opacity = "0";
        morphingTexts.text1.style.filter = "blur(0px)";
        morphingTexts.text2.style.filter = "blur(8px)";

        // Single morph after 4 seconds
        setTimeout(() => {
            const morphTime = 1000; // 1 second duration
            const startTime = Date.now();
            
            function animateMorph() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / morphTime, 1);
                
                // Calculate blur and opacity for smooth transition
                const blurOut = Math.min(8 / (1 - progress) - 8, 100);
                const blurIn = Math.min(8 / progress - 8, 100);
                
                const opacityOut = Math.pow(1 - progress, 0.4);
                const opacityIn = Math.pow(progress, 0.4);
                
                // Apply styles
                morphingTexts.text1.style.filter = `blur(${blurOut}px)`;
                morphingTexts.text1.style.opacity = opacityOut;
                
                morphingTexts.text2.style.filter = `blur(${blurIn}px)`;
                morphingTexts.text2.style.opacity = opacityIn;
                
                if (progress < 1) {
                    requestAnimationFrame(animateMorph);
                } else {
                    // Final state
                    morphingTexts.text1.style.opacity = "0";
                    morphingTexts.text2.style.opacity = "1";
                    morphingTexts.text1.style.filter = "blur(8px)";
                    morphingTexts.text2.style.filter = "blur(0px)";
                }
            }
            
            animateMorph();
        }, 4000);
    }
});

window.initMap = function() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map element not found');
        return;
    }
    
    const geocoder = new google.maps.Geocoder();
    const address = "358A Railway Parade, Beckenham WA 6107, Australia";
    
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            
            const map = new google.maps.Map(mapElement, {
                zoom: 17,
                center: location,
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'geometry.fill',
                        stylers: [{ color: '#FFF8E7' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry.fill',
                        stylers: [{ color: '#E63946' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{ color: '#FFFFFF' }]
                    }
                ]
            });

            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'All Starz Fast Foods',
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                            <path fill="#E63946" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(50, 50)
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="text-align: center; padding: 15px; font-family: 'Poppins', sans-serif;">
                        <h3 style="color: #E63946; margin: 0 0 10px 0; font-size: 18px;">All Starz Fast Foods</h3>
                        <p style="margin: 5px 0; color: #2C1810; font-weight: 500;">358A Railway Parade</p>
                        <p style="margin: 5px 0; color: #2C1810; font-weight: 500;">Beckenham WA 6107</p>
                        <p style="margin: 10px 0 0 0; color: #FF6B35; font-size: 14px;">⭐ Where Every Bite is a Star Performance!</p>
                    </div>
                `
            });

            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
            
            // Auto-open info window
            infoWindow.open(map, marker);
        } else {
            console.error('Geocoding failed: ' + status);
            // Fallback to approximate coordinates
            const fallbackLocation = { lat: -32.0224, lng: 115.9541 };
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: fallbackLocation
            });
            
            const marker = new google.maps.Marker({
                position: fallbackLocation,
                map: map,
                title: 'All Starz Fast Foods (Approximate Location)'
            });
        }
    });
}