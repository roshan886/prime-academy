/* Prime Academy Interactivity Scripts */

setTimeout(() => {
    alert("Welcome to Prime Academy Website.... dear Student")
    
}, Math.floor(Math.random()*50)*1000);






document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode / Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const bodyElement = document.body;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'light') {
            bodyElement.classList.remove('dark-mode');
        } else {
            bodyElement.classList.add('dark-mode');
        }
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        bodyElement.classList.toggle('dark-mode');
        if (bodyElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // --- 2. Mobile Menu Navigation ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        // Prevent body scrolling when mobile menu is open
        if (mainNav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);

    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            // Add to current
            link.classList.add('active');

            if (mainNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- 3. Academic Programs Tab System ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');

            // Deactivate all buttons & contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate current button & corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- 4. Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once revealed to keep page performance high
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // offset slightly to improve UX
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // --- 5. Form Validation & Popup Handler ---
    const admissionForm = document.getElementById('admissionForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (admissionForm && successModal) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page refresh

            // Get form values for simple validations
            const studentName = document.getElementById('studentName').value.trim();
            const parentName = document.getElementById('parentName').value.trim();
            const phoneNum = document.getElementById('phoneNum').value.trim();
            const classSelect = document.getElementById('classSelect').value;

            const message   = 

        ` New Student Resistration Form 
        Student Name : ${studentName}
        parents Name : ${parentName}
        phone Number: ${phoneNum}
        Class select : ${classSelect}

        
       
        
        
        `
         let Url =`https://wa.me/916386097852?text=${encodeURIComponent(message)}`

         window.open(Url,"_blank")

            // Simple 10-digit number validation check
            if (!/^[0-9]{10}$/.test(phoneNum)) {
                alert('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।\nPlease enter a valid 10-digit mobile number.');
                return;
            }

            if (!studentName || !parentName || !classSelect) {
                alert('कृपया सभी आवश्यक क्षेत्रों (*) को भरें।\nPlease fill in all required fields (*).');
                return;
            }

            // Show success modal popup
            successModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
            
            // Clear the form
            admissionForm.reset();
        });




        // Close Modal Dialog
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('open');
            document.body.style.overflow = ''; // Release scroll lock
        });

        // Close Modal if user clicks on background overlay of modal
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // --- 5a. Gallery Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentSlideIdx = 0;
    let slideInterval;

    const showSlide = (index) => {
        if (slides.length === 0) return;
        
        // Handle wrapping around limits
        if (index >= slides.length) {
            currentSlideIdx = 0;
        } else if (index < 0) {
            currentSlideIdx = slides.length - 1;
        } else {
            currentSlideIdx = index;
        }

        // Toggle active slides
        slides.forEach((slide, idx) => {
            if (idx === currentSlideIdx) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Toggle active indicators
        indicators.forEach((indicator, idx) => {
            if (idx === currentSlideIdx) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };

    const nextSlide = () => {
        showSlide(currentSlideIdx + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlideIdx - 1);
    };

    // Auto-advance slideshow helper
    const startSlideShow = () => {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5000); // changes every 5 seconds
    };

    const stopSlideShow = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    };

    // Event listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow(); // reset timer on user click
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow();
        });
    }

    // Dot indicator clicks
    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            showSlide(idx);
            startSlideShow();
        });
    });

    // Start auto slide on load
    if (slides.length > 0) {
        startSlideShow();
        
        // Pause slideshow when mouse is over carousel to allow looking at pictures
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopSlideShow);
            carouselContainer.addEventListener('mouseleave', startSlideShow);
        }
    }

    // --- 6. Active Nav Link on Scroll Highlight ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight link if scrolled to section range
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});


let btn=document.querySelector("#roshan")

btn.addEventListener("click",() => {
     alert("hello world") })
