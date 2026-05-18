document.addEventListener('DOMContentLoaded', () => {

    // Navigation Scroll Effect
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(15, 15, 15, 0.8)';
        }
    });

    // Mobile Menu Toggle logic has been moved to index.html for maximum reliability

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.05, // Lower threshold to trigger earlier
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters
    };

    let observer;
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply observer to animated elements
        document.querySelectorAll('.animate-up, .skill-card, .project-card, .section-title').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-up, .section').forEach(el => {
            el.classList.add('visible');
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const navLinks = document.querySelector('.nav-links');
                if (mobileMenu && navLinks) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Custom Notification System
    const showNotification = (message, isError = false) => {
        // Remove existing notification if any
        const existing = document.querySelector('.custom-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `custom-notification ${isError ? 'error' : 'success'}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${isError ? '⚠️' : '✅'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Load Projects Statically
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        const projects = [
            {
                id: 1,
                title: "Nova Store",
                description: "A full-featured e-commerce platform built with React and Node.js.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                tags: ["React", "Node.js", "MongoDB"]
            },
            {
                id: 2,
                title: "Insight Analytics",
                description: "Real-time data visualization dashboard for business metrics.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                tags: ["D3.js", "Next.js", "Firebase"]
            },
            {
                id: 3,
                title: "Luxe Living",
                description: "A luxury real estate landing page with high-performance animations.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
                tags: ["HTML/CSS", "GSAP", "JavaScript"]
            }
        ];

        projectsGrid.innerHTML = '';
        projects.forEach((project, index) => {
            const delay = index * 0.1;
            const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
            projectsGrid.innerHTML += `
                <div class="project-card fade-in-up" style="animation-delay: ${delay}s;">
                    <div class="project-img">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Re-apply intersection observer to new elements
        if ('IntersectionObserver' in window && observer) {
            document.querySelectorAll('.project-card').forEach(el => {
                observer.observe(el);
            });
        } else {
            document.querySelectorAll('.project-card').forEach(el => {
                el.classList.add('visible');
            });
        }
    }

    // Contact form uses native Netlify Forms submission
    // Form action="/success.html" is handled by Netlify at the CDN level

});

