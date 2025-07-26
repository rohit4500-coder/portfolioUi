// Loading Animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Animated Background Particles
        function createParticles() {
            const bgAnimation = document.getElementById('bgAnimation');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                bgAnimation.appendChild(particle);
            }
        }

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            localStorage.setItem('theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

        // Smooth Scrolling Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Scroll Spy
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.2
        });

        gsap.from('.hero-subtitle', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.5
        });

        gsap.from('.hero-description', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.8
        });

        gsap.from('.cta-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 2.1
        });

        // Parallax effect for hero
        gsap.to('.hero-content', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Project cards 3D effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Skill bars animation
        ScrollTrigger.create({
            trigger: '#skills',
            start: 'top 80%',
            onEnter: () => {
                document.querySelectorAll('.skill-progress').forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });

        // Contact form handling
        function handleSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert(`Thank you ${data.name}! Your message has been received. I'll get back to you soon!`);
            event.target.reset();
        }

        // Resume download
  function downloadResume(event) {
    const pdfPath = "assets/resumepdf.pdf";

    const a = document.createElement('a');
    a.href = pdfPath;
    a.download = 'resumepdf.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // ✅ Now event.target will work correctly
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}


        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            // Add some interactive elements
            document.querySelectorAll('.glass-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        scale: 1.02,
                        rotationY: 5,
                        ease: 'power2.out'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        scale: 1,
                        rotationY: 0,
                        ease: 'power2.out'
                    });
                });
            });
        });

  function typeWriter() {
      const texts = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typingElement = document.getElementById('typingText');

      function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
          typingElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
      }

      type();
    }

    window.addEventListener('DOMContentLoaded', () => {
      typeWriter();
    });



    const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  (function () {
    function c() {
      var b = a.contentDocument || a.contentWindow.document;
      if (b) {
        var d = b.createElement("script");
        d.innerHTML =
          "window.__CF$cv$params={r:'9621dda87769b2d8',t:'MTc1MzAwODI5My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
        b.getElementsByTagName("head")[0].appendChild(d);
      }
    }
    if (document.body) {
      var a = document.createElement("iframe");
      a.height = 1;
      a.width = 1;
      a.style.position = "absolute";
      a.style.top = 0;
      a.style.left = 0;
      a.style.border = "none";
      a.style.visibility = "hidden";
      document.body.appendChild(a);
      if ("loading" !== document.readyState) c();
      else if (window.addEventListener)
        document.addEventListener("DOMContentLoaded", c);
      else {
        var e = document.onreadystatechange || function () {};
        document.onreadystatechange = function (b) {
          e(b);
          "loading" !== document.readyState &&
            ((document.onreadystatechange = e), c());
        };
      }
    }
  })();

    





// const menuToggle = document.getElementById('menuToggle');
// const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');

// Toggle menu and overlay
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('show');
  overlay.classList.toggle('active');
});

// Hide menu when clicking overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  overlay.classList.remove('active');
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('show');
    overlay.classList.remove('active');
  }
});

// Optional: Hide menu after clicking a nav link (on mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    overlay.classList.remove('active');
  });
});


// const menuToggle = document.getElementById('menuToggle');
// const navLinks = document.querySelector('.nav-links');
// const overlay = document.getElementById('overlay');

// Toggle menu and overlay
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('show');
  overlay.classList.toggle('active');
});

// Hide menu when clicking overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  overlay.classList.remove('active');
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('show');
    overlay.classList.remove('active');
  }
});

// Hide menu after clicking a nav link (on mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    overlay.classList.remove('active');
  });
});
