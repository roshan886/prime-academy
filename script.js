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

    // --- 7. Chatbot Widget ---
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotCloseBtn = document.getElementById('chatbotClose');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    let chatOpened = false;

    // Chatbot Knowledge Base - keyword to response mapping
    const chatResponses = {
        courses: {
            keywords: ['course', 'courses', 'कोर्स', 'कोर्सेस', 'class', 'classes', 'कक्षा', 'विषय', 'subject', 'subjects', 'board', 'बोर्ड', 'cbse', 'ncert', 'batch', 'बैच', 'पढ़ाई', 'study'],
            reply: `📚 <strong>हमारे कोर्सेस:</strong><br><br>
🔹 <strong>सामान्य बोर्ड:</strong> कक्षा 9वीं से 12वीं<br>
🔹 <strong>CBSE बोर्ड:</strong> स्पेशल इवनिंग बैच<br>
🔹 <strong>विशेष कक्षाएँ:</strong> 11वीं एवं 12वीं जीव विज्ञान (Biology)<br><br>
📖 <strong>विषय:</strong> Hindi, English, Math, Physics, Chemistry, Social Science, Sanskrit<br><br>
अधिक जानकारी के लिए <a href="#courses">कोर्सेस सेक्शन</a> देखें।`
        },
        timing: {
            keywords: ['time', 'timing', 'timings', 'समय', 'टाइम', 'कब', 'schedule', 'शेड्यूल', 'morning', 'evening', 'सुबह', 'शाम'],
            reply: `⏰ <strong>बैच का समय:</strong><br><br>
🌅 <strong>Morning Batch (सामान्य बोर्ड):</strong><br>प्रातः 06:00 बजे से 09:30 बजे तक<br><br>
🌇 <strong>Evening Batch (CBSE Board):</strong><br>दोपहर 03:00 PM से 06:00 PM तक<br><br>
अपनी कक्षा और बैच की विस्तृत जानकारी के लिए <a href="tel:9125557653">☎ 9125557653</a> पर कॉल करें।`
        },
        fees: {
            keywords: ['fee', 'fees', 'फीस', 'cost', 'price', 'charge', 'payment', 'पैसा', 'कितना', 'शुल्क', 'दाम', 'पेमेंट', 'amount'],
            reply: `💰 <strong>फीस की जानकारी:</strong><br><br>
फीस की विस्तृत जानकारी के लिए कृपया एकेडमी में संपर्क करें या नीचे दिए नम्बरों पर कॉल करें:<br><br>
📞 <a href="tel:9125557653">9125557653</a><br>
📞 <a href="tel:9161412901">9161412901</a><br><br>
या <a href="https://wa.me/916386097852?text=Hello%20Prime%20Academy%2C%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%AB%E0%A5%80%E0%A4%B8%20%E0%A4%95%E0%A5%80%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F" target="_blank">WhatsApp पर मैसेज करें</a> 💬`
        },
        address: {
            keywords: ['address', 'location', 'पता', 'कहाँ', 'कहां', 'where', 'map', 'direction', 'रास्ता', 'जगह', 'place', 'ballia', 'बलिया', 'dattahan', 'दत्तहां', 'reoti', 'रेवती'],
            reply: `📍 <strong>हमारा पता:</strong><br><br>
<strong>प्राइम एकेडमी</strong><br>
रेवती सब्जी मण्डी के पास (दत्तहां रोड),<br>
बलिया (उ०प्र०)<br><br>
🗺️ एकेडमी तक पहुँचने में कोई समस्या हो तो कॉल करें: <a href="tel:9125557653">9125557653</a>`
        },
        contact: {
            keywords: ['contact', 'phone', 'call', 'whatsapp', 'संपर्क', 'फोन', 'कॉल', 'नंबर', 'number', 'mobile', 'मोबाइल', 'बात', 'talk'],
            reply: `📞 <strong>संपर्क जानकारी:</strong><br><br>
📱 <a href="tel:9125557653">9125557653</a><br>
📱 <a href="tel:9161412901">9161412901</a><br><br>
💬 <a href="https://wa.me/916386097852?text=Hello%20Prime%20Academy" target="_blank">WhatsApp पर मैसेज करें</a><br><br>
🏫 या सीधे एकेडमी में आएं - रेवती सब्जी मण्डी के पास (दत्तहां रोड), बलिया`
        },
        teachers: {
            keywords: ['teacher', 'teachers', 'faculty', 'अध्यापक', 'शिक्षक', 'सर', 'sir', 'pintu', 'पिन्टू', 'pankaj', 'पंकज', 'sonu', 'सोनू', 'neeraj', 'नीरज', 'shyam', 'श्याम', 'tabrez', 'तबरेज', 'siddharth', 'सिद्धार्थ', 'sunil', 'सुनील', 'ravi', 'रवि'],
            reply: `👨‍🏫 <strong>हमारे अध्यापक गण:</strong><br><br>
🎓 <strong>संचालक:</strong><br>
• पिन्टू सर — MA (Eng.), B.Ed, L.L.B.<br>
• पंकज सर — polytechnic , B.tech,L.L.B.<br><br>
🧑‍🏫 <strong>अध्यापक:</strong><br>
• सिद्धार्थ पाण्डेय — Biology/Genetics<br>
• सोनू सर — Chemistry<br>
• Sittu Sir — Mathematics B.Sc<br>
• नीरज सर — Physics<br>
• श्याम सर — Hindi<br>
• सुनील सर — Social Science<br>
विस्तार से देखें: <a href="#faculty">अध्यापक गण सेक्शन</a>`
        },
        admission: {
            keywords: ['admission', 'admit', 'enroll', 'join', 'प्रवेश', 'दाखिला', 'registration', 'register', 'form', 'फॉर्म'],
            reply: `📝 <strong>प्रवेश की जानकारी:</strong><br><br>
🟢 <strong>प्रवेश प्रारम्भ / Admissions Open 2026!</strong><br><br>
प्रवेश के लिए:<br>
1️⃣ नीचे दिए <a href="#contact">प्रवेश फॉर्म</a> को भरें<br>
2️⃣ या सीधे एकेडमी में आएं<br>
3️⃣ या कॉल करें: <a href="tel:9125557653">9125557653</a><br><br>
📄 आवश्यक दस्तावेज: आधार कार्ड, पिछली कक्षा की मार्कशीट`
        },
        hello: {
            keywords: ['hello', 'hi', 'hey', 'हैलो', 'हेलो', 'नमस्ते', 'नमस्कार', 'राम राम', 'hii', 'hiii'],
            reply: `🙏 <strong>नमस्ते!</strong><br><br>
प्राइम एकेडमी में आपका स्वागत है! 🎓<br>
मैं आपकी कैसे मदद कर सकता हूँ?<br><br>
आप नीचे दिए गए विकल्पों में से चुन सकते हैं या अपना सवाल लिख सकते हैं।`
        }
    };

    // Fallback response
    const fallbackReply = `🤔 माफ़ कीजिए, मुझे इसका सही उत्तर नहीं मिला।<br><br>
कृपया अधिक जानकारी के लिए:<br>
📞 <a href="tel:9125557653">9125557653</a> पर कॉल करें<br>
💬 या <a href="https://wa.me/916386097852?text=Hello%20Prime%20Academy%2C%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F" target="_blank">WhatsApp पर मैसेज करें</a>`;

    // --- Helper Functions ---

    // Add a message bubble to the chat
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);

        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('chat-msg-avatar');
        avatarDiv.textContent = sender === 'bot' ? 'P' : '👤';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('chat-bubble');
        bubbleDiv.innerHTML = text;

        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chat-message', 'bot');
        typingDiv.id = 'typingIndicator';

        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('chat-msg-avatar');
        avatarDiv.textContent = 'P';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('chat-bubble');
        bubbleDiv.innerHTML = `<div class="typing-indicator">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>`;

        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTyping() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
    }

    // Scroll to the bottom of messages
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Find the best response for a given query
    function findResponse(query) {
        const lowerQuery = query.toLowerCase().trim();

        for (const category in chatResponses) {
            const { keywords, reply } = chatResponses[category];
            for (const keyword of keywords) {
                if (lowerQuery.includes(keyword.toLowerCase())) {
                    return reply;
                }
            }
        }
        return fallbackReply;
    }

    // Process user input
    function processUserQuery(queryText) {
        // Add user message
        addMessage(queryText, 'user');

        // Show typing indicator
        showTyping();

        // Find response with a delay for realism
        const delay = 700 + Math.random() * 800;
        setTimeout(() => {
            removeTyping();
            const response = findResponse(queryText);
            addMessage(response, 'bot');
        }, delay);
    }

    // --- Event Handlers ---

    // Toggle chatbot open/close
    function toggleChat() {
        chatbotWidget.classList.toggle('open');

        if (chatbotWidget.classList.contains('open')) {
            // Show welcome message on first open
            if (!chatOpened) {
                chatOpened = true;
                setTimeout(() => {
                    addMessage(`🙏 <strong>नमस्ते! प्राइम एकेडमी में आपका स्वागत है!</strong><br><br>
मैं आपकी मदद कर सकता हूँ। नीचे दिए विकल्पों में से चुनें या अपना सवाल लिखें:
<br><br>📚 कोर्सेस &nbsp; ⏰ समय &nbsp; 💰 फीस<br>📍 पता &nbsp; 📞 संपर्क &nbsp; 👨‍🏫 अध्यापक`, 'bot');
                }, 400);
            }
            // Focus input
            setTimeout(() => chatInput.focus(), 450);
        }
    }

    chatbotToggle.addEventListener('click', toggleChat);

    chatbotCloseBtn.addEventListener('click', () => {
        chatbotWidget.classList.remove('open');
    });

    // Handle form submit
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        chatInput.value = '';
        processUserQuery(query);
    });

    // Handle suggestion chip clicks
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const queryKey = chip.getAttribute('data-query');
            const chipText = chip.textContent.trim();

            // Trigger the response from the knowledge base directly
            addMessage(chipText, 'user');
            showTyping();

            const delay = 600 + Math.random() * 600;
            setTimeout(() => {
                removeTyping();
                const response = chatResponses[queryKey]
                    ? chatResponses[queryKey].reply
                    : fallbackReply;
                addMessage(response, 'bot');
            }, delay);
        });
    });

});
