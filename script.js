document.addEventListener('DOMContentLoaded', () => {
    const storm = document.querySelector('.storm');
    let isStormActive = false;
    if (storm) {
        // Function to handle scroll events
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Start storm animation when scrolled past 50% of the viewport
            if (scrollPosition > windowHeight * 0.5 && !isStormActive) {
                storm.classList.add('active');
                isStormActive = true;
            } else if (scrollPosition <= windowHeight * 0.5 && isStormActive) {
                storm.classList.remove('active');
                isStormActive = false;
            }
        });
    }

    // Smooth scroll for navigation links
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

    // Add animation to features when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all features
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(feature);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    if (mobileMenuBtn && navLinks && menuOverlay) {
        // Toggle menu function
        function toggleMenu() {
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            toggleMenu();
        });

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Handle navigation link clicks
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Initialize map points if we're on the explore page
    const mapPoints = document.querySelector('.map-points');
    if (mapPoints) {
        const features = [
            {
                x: 41.6,
                y: 24.3,
                title: '2 Seasons Residential',
                description: 'A serene gated community with modern apartments, cottages, and duplexes. Designed with jogging and cycling lanes, landscaped streets, playgrounds, and essential amenities for families and young professionals.'
            },
            {
                x: 57.3,
                y: 50.7,
                title: 'The Wellness Hub',
                description: 'A holistic wellness center featuring a spa, sauna, swimming pools, gym, yoga pavilion, and therapy rooms—dedicated to fitness, healing, and mental well-being.'
            },
            {
                x: 51.2,
                y: 62.1,
                title: 'Fruit Forest',
                description: 'An expansive orchard with over 3,000 fruit trees, providing fresh harvests, shaded walkways, and a connection to nature. A key part of 2 Seasons\' regenerative lifestyle.'
            },
            {
                x: 63.0,
                y: 61.1,
                title: 'True Vine Villas',
                description: 'Luxury lakefront villas ideal for second homes or Airbnb. Each villa overlooks the artificial lake, offering privacy, elegance, and opportunities for relaxation or income generation.'
            },
            {
                x: 61.3,
                y: 69.9,
                title: 'Lake',
                description: 'A 4-acre artificial lake with a cascading waterfall, designed for water activities, scenic views, and community gatherings. The heart of relaxation within 2 Seasons.'
            },
            {
                x: 71.8,
                y: 73.8,
                title: 'Sports Academy',
                description: 'A dynamic academy training 100 youths annually in football, tennis, and athletics. Equipped with courts, pitches, and coaching facilities to nurture future champions.'
            },
            {
                x: 64.4,
                y: 87.3,
                title: 'Hygge Town',
                description: 'A vibrant commercial and creative hub featuring luxury retail, cafes, co-working spaces, and partnerships with global tech and creative giants. The cultural heartbeat of 2 Seasons.'
            },
            // Nearby Landmarks
            {
                x: 15.0,
                y: 15.0,
                title: 'Daywaterman College',
                description: 'A prestigious educational institution in Abeokuta, known for academic excellence and character development. Located near 2 Seasons for easy access to quality education.',
                isLandmark: true
            },
            {
                x: 25.0,
                y: 5.0,
                title: 'Wole Soyinka Train Station',
                description: 'The main railway station in Abeokuta, named after Nobel laureate Wole Soyinka. Provides convenient rail connectivity to Lagos and other major cities in Nigeria.',
                isLandmark: true
            },
            {
                x: 5.0,
                y: 25.0,
                title: 'Abeokuta Interchange',
                description: 'Major transportation hub connecting Abeokuta to Lagos and other parts of Ogun State. Easy access point for visitors traveling to 2 Seasons from various locations.',
                isLandmark: true
            }
        ];

        features.forEach((feature, index) => {
            const point = document.createElement('div');
            point.className = feature.isLandmark ? 'map-point landmark' : 'map-point';
            
            // Function to set position based on screen size
            function setPosition() {
                const isMobile = window.innerWidth <= 768;
                
                if (isMobile) {
                    // Use precise mobile coordinates
                    const mobileCoordinates = {
                        '2 Seasons Residential': { x: 28.2, y: 24.0 },
                        'The Wellness Hub': { x: 67.5, y: 58.0 },
                        'Fruit Forest': { x: 58.7, y: 58.6 },
                        'True Vine Villas': { x: 85.5, y: 59.4 },
                        'Lake': { x: 85.0, y: 62.5 },
                        'Sports Academy': { x: 98.5, y: 80.0 },
                        'Hygge Town': { x: 83.0, y: 90.0 },
                        // Landmarks mobile coordinates
                        'Daywaterman College': { x: 12.0, y: 12.0 },
                        'Wole Soyinka Train Station': { x: 20.0, y: 3.0 },
                        'Abeokuta Interchange': { x: 3.0, y: 20.0 }
                    };
                    
                    const mobilePos = mobileCoordinates[feature.title] || { x: feature.x, y: feature.y };
                    point.style.left = `${Math.max(0, Math.min(100, mobilePos.x))}%`;
                    point.style.top = `${Math.max(0, Math.min(100, mobilePos.y))}%`;
                } else {
                    point.style.left = `${feature.x}%`;
                    point.style.top = `${feature.y}%`;
                }
            }
            
            // Set initial position
            setPosition();
            
            // Update position on window resize
            window.addEventListener('resize', setPosition);
            
            const info = document.createElement('div');
            info.className = 'feature-info';
            info.innerHTML = `
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            
            point.appendChild(info);
            mapPoints.appendChild(point);

            // Add click event to show/hide info with smart positioning
            point.addEventListener('click', (e) => {
                e.stopPropagation();
                const allInfos = document.querySelectorAll('.feature-info');
                allInfos.forEach(info => info.classList.remove('active'));
                
                // Smart positioning based on marker location
                info.className = 'feature-info';
                if (feature.y < 30) {
                    info.classList.add('position-bottom'); // Show below for top markers
                } else if (feature.y > 70) {
                    info.classList.add('position-top'); // Show above for bottom markers
                } else {
                    info.classList.add('position-bottom'); // Default to below
                }
                
                if (feature.x < 20) {
                    info.classList.add('position-right'); // Show to right for left markers
                } else if (feature.x > 80) {
                    info.classList.add('position-left'); // Show to left for right markers
                }
                
                info.classList.add('active');
            });
        });

        // Close info when clicking outside
        document.addEventListener('click', () => {
            const allInfos = document.querySelectorAll('.feature-info');
            allInfos.forEach(info => info.classList.remove('active'));
        });
    }

    // Property option selection handling
    const propertyOptions = document.querySelectorAll('.property-option');
    const propertyTypeInput = document.getElementById('propertyType');
    const selectedCountDiv = document.getElementById('selectedCount');
    const plotsForm = document.getElementById('plotsForm');
    if (propertyOptions.length && propertyTypeInput && selectedCountDiv && plotsForm) {
        propertyOptions.forEach(option => {
            const checkbox = option.querySelector('input[type="checkbox"]');
            
            option.addEventListener('click', function(e) {
                // Don't toggle if clicking directly on checkbox
                if (e.target.type === 'checkbox') {
                    return;
                }
                
                // Toggle checkbox
                checkbox.checked = !checkbox.checked;
                updateSelection();
            });

            // Handle checkbox change
            checkbox.addEventListener('change', function() {
                updateSelection();
            });
        });

        function updateSelection() {
            const selectedOptions = document.querySelectorAll('.property-option input[type="checkbox"]:checked');
            const selectedValues = Array.from(selectedOptions).map(checkbox => checkbox.value);
            
            // Update visual selection
            propertyOptions.forEach(option => {
                const checkbox = option.querySelector('input[type="checkbox"]');
                if (checkbox.checked) {
                    option.classList.add('selected');
                } else {
                    option.classList.remove('selected');
                }
            });

            // Update hidden input with comma-separated values
            propertyTypeInput.value = selectedValues.join(', ');

            // Show/hide plots form
            const hasResidential = selectedValues.includes('residential');
            if (hasResidential) {
                plotsForm.classList.add('show');
            } else {
                plotsForm.classList.remove('show');
            }

            // Update selected count display
            if (selectedValues.length > 0) {
                selectedCountDiv.textContent = `Selected: ${selectedValues.length} option(s)`;
                selectedCountDiv.classList.add('show');
            } else {
                selectedCountDiv.classList.remove('show');
            }
        }
    }

    // Video Sound Toggle Functionality
    const videoSoundToggle = document.querySelector('.video-sound-toggle');
    const heroVideo = document.querySelector('.hero-video');
    
    if (videoSoundToggle && heroVideo) {
        let isMuted = true;
        
        videoSoundToggle.addEventListener('click', function() {
            isMuted = !isMuted;
            heroVideo.muted = isMuted;
            
            // Update icon
            const icon = this.querySelector('i');
            if (isMuted) {
                icon.className = 'fas fa-volume-mute';
            } else {
                icon.className = 'fas fa-volume-up';
            }
        });
    }

    // Scroll-triggered animations for new luxury sections
    const luxuryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe luxury sections
    const luxurySections = document.querySelectorAll('.exclusivity-section, .vision-quote-section, .booking-preview-section');
    luxurySections.forEach(section => {
        luxuryObserver.observe(section);
    });
}); 