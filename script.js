document.addEventListener('DOMContentLoaded', () => {
    try {
        // Handle loader
        const loader = document.querySelector('.loader');
        if (loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 1000);
            });
        }

        // Initialize smooth scroll for navigation links
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

        // Skills animation
        const skillsSection = document.querySelector('#skills');
        const skillItems = document.querySelectorAll('.skill-item');

        // Set initial percentages
        skillItems.forEach(item => {
            const level = item.querySelector('.skill-level');
            if (level) {
                const percent = level.getAttribute('data-level');
                const span = item.querySelector('span');
                if (span) {
                    span.setAttribute('data-percent', percent);
                }
            }
        });

        // Intersection Observer for skills section
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
                                const level = item.querySelector('.skill-level');
                                if (level) {
                                    const percent = level.getAttribute('data-level');
                                    level.style.width = percent;
                                }
                            }, index * 200);
                        });
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '-50px'
            });

            skillsObserver.observe(skillsSection);
        }

        // Navbar scroll effect
        const navbar = document.querySelector('nav');
        if (navbar) {
            let lastScroll = 0;
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const currentScroll = window.pageYOffset;

                        if (currentScroll > 50) {
                            navbar.style.background = 'rgba(17, 17, 17, 0.98)';
                            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
                        } else {
                            navbar.style.background = 'rgba(17, 17, 17, 0.95)';
                            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                        }

                        lastScroll = currentScroll;
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }

        // Mobile menu toggle
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.setAttribute('aria-label', 'Toggle menu');
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const navList = document.querySelector('nav ul');
        if (navList) {
            navbar.appendChild(menuButton);
            menuButton.addEventListener('click', () => {
                navList.classList.toggle('show');
                menuButton.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside or on a link
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && window.innerWidth <= 768) {
                navList.classList.remove('show');
                menuButton.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('show');
                    menuButton.classList.remove('active');
                }
            });
        });

        // Fix for iOS viewport height
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);

        // Scroll reveal animation for sections
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Handle project cards
                        if (entry.target.id === 'projects') {
                            const projectCards = entry.target.querySelectorAll('.project-card');
                            projectCards.forEach((card, cardIndex) => {
                                setTimeout(() => {
                                    card.classList.add('visible');
                                }, cardIndex * 100);
                            });
                        }
                        
                        // Handle contact items
                        if (entry.target.id === 'contact') {
                            const contactItems = entry.target.querySelectorAll('.contact-item');
                            contactItems.forEach((item, itemIndex) => {
                                setTimeout(() => {
                                    item.classList.add('visible');
                                }, itemIndex * 100);
                            });
                        }
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Hover effect for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(255, 0, 85, 0.3)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(255, 0, 85, 0.3)';
            });
        });

        // Animation for contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add cursor effect
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .contact-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    } catch (error) {
        console.error('Error in script:', error);
    }
});