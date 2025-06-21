document.addEventListener('DOMContentLoaded', () => {
    const storm = document.querySelector('.storm');
    let isStormActive = false;

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
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

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

    // Initialize map points if we're on the explore page
    const mapPoints = document.querySelector('.map-points');
    if (mapPoints) {
        const features = [
            {
                x: 20,
                y: 30,
                title: 'Residential Area',
                description: 'Luxury living spaces with modern amenities and beautiful surroundings'
            },
            {
                x: 40,
                y: 25,
                title: 'True Vine Villas',
                description: 'Premium accommodations for short-term stays and vacation rentals'
            },
            {
                x: 60,
                y: 35,
                title: 'Wellness Hub',
                description: 'Holistic wellness facilities including spa, yoga, and natural therapy'
            },
            {
                x: 80,
                y: 30,
                title: 'Hygge Town',
                description: 'State-of-the-art facilities for content creators and media production'
            },
            {
                x: 50,
                y: 50,
                title: 'Artificial Lake',
                description: 'Serene water features perfect for relaxation and water activities'
            },
            {
                x: 30,
                y: 60,
                title: 'Organic Farm',
                description: 'Sustainable farming and fresh produce for the community'
            }
        ];

        features.forEach((feature, index) => {
            const point = document.createElement('div');
            point.className = 'map-point';
            point.style.left = `${feature.x}%`;
            point.style.top = `${feature.y}%`;
            
            const info = document.createElement('div');
            info.className = 'feature-info';
            info.innerHTML = `
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            
            point.appendChild(info);
            mapPoints.appendChild(point);

            // Add click event to show/hide info
            point.addEventListener('click', (e) => {
                e.stopPropagation();
                const allInfos = document.querySelectorAll('.feature-info');
                allInfos.forEach(info => info.classList.remove('active'));
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
}); 