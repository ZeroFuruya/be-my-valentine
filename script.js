document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const card = document.querySelector('.card');
    const heartEmojis = ['💖', '💝', '💗', '💓', '💕'];
    const sadGifs = ["cat-sad.gif", "cat-cry.gif", "cat-regret.gif", "cat-mistake.gif", "cat-heartbreak.gif"];
    const defaultGif = "cat-please.gif";
    
    // Make the No button impossible to click
    const responses = [
        { text: "Are you sure? 🥺", gif: "cute-crying.gif" },
        { text: "Think again! 🥺", gif: "heart-broken.gif" },
        { text: "Last chance! 💔", gif: "heart-broken-sad.gif" },
        { text: "Give it another thought! 🥺", gif: "sad-broken-heart.gif" },
        { text: "Really sure? 🥺", gif: "cute-penguin.gif" },
        { text: "You might regret this! 💔", gif: "romance-love.gif" },
        { text: "Surely not? 🥺", gif: "break-up-heartbroken.gif" },
        { text: "Don't be so cold! 💔", gif: "heart-broken.gif" },
        { text: "Are you absolutely sure? 💔", gif: "sad-crying.gif" },
        { text: "Have a heart! 💖", gif: "romance-love.gif" },
        { text: "Change of heart? 🥺", gif: "break-up-heartbroken.gif" },
        { text: "Final answer? 💔", gif: "heart-broken-sad.gif" },
        { text: "This could be a mistake! 🥺", gif: "sad-broken-heart.gif" },
        { text: "Pretty please? 🥺", gif: "cute-crying.gif" },
        { text: "I beg you! 💖", gif: "cute-penguin.gif" },
        { text: "No way! 🥺", gif: "sad-crying.gif" },
        { text: "Not like this! 💔", gif: "break-up-heartbroken.gif" },
        { text: "You're breaking my heart! 💔", gif: "heart-broken.gif" },
        { text: "Don't do this! 🥺", gif: "sad-broken-heart.gif" }
    ];

    let clickCount = 0;
    let buttonSize = 1;
    let yesButtonSize = 1;

    // Update GIF in card
    const updateCardGif = (gif) => {
        const gifContainer = document.querySelector('.gif-container');
        if (gifContainer) {
            gifContainer.innerHTML = `
                <img src="${gif}" alt="Reaction GIF" 
                    style="max-width: 200px; margin: 20px auto; display: block; 
                    border-radius: 15px; border: 3px solid #ffb6c1;
                    box-shadow: 0 5px 20px rgba(255,182,193,0.4);">
            `;
        }
    };

    // Handle No button clicks
    noBtn.addEventListener('mouseover', () => {
        const img = document.querySelector('.main-image');
        const randomGif = sadGifs[Math.floor(Math.random() * sadGifs.length)];
        img.src = randomGif;
    });

    noBtn.addEventListener('mouseout', () => {
        const img = document.querySelector('.main-image');
        img.src = defaultGif;
    });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default button behavior
        
        clickCount++;
        
        // Check if it's the 7th click for shatter effect
        if (clickCount === 7) {
            const rect = noBtn.getBoundingClientRect();
            const pieces = 12; // Number of shatter pieces
            
            // Create shatter pieces
            for (let i = 0; i < pieces; i++) {
                const piece = document.createElement('div');
                piece.className = 'shatter-piece';
                
                // Random size for each piece
                const size = Math.random() * 20 + 10;
                piece.style.width = size + 'px';
                piece.style.height = size + 'px';
                
                // Position at button's location
                piece.style.left = (rect.left + rect.width / 2) + 'px';
                piece.style.top = (rect.top + rect.height / 2) + 'px';
                
                document.body.appendChild(piece);
                
                // Animate pieces outward
                setTimeout(() => {
                    const angle = (i / pieces) * Math.PI * 2;
                    const distance = Math.random() * 200 + 100;
                    piece.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 360}deg)`;
                    piece.style.opacity = '0';
                }, 0);
                
                // Remove pieces after animation
                setTimeout(() => piece.remove(), 1000);
            }
            
            // Hide original button
            noBtn.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => noBtn.style.display = 'none', 500);
            return;
        }
        
        // Normal click behavior
        buttonSize = Math.max(0.5, 1 - (clickCount * 0.1));
        yesButtonSize = Math.min(2, 1 + (clickCount * 0.1));
        
        noBtn.style.transform = `scale(${buttonSize})`;
        yesBtn.style.transform = `scale(${yesButtonSize})`;
        
        // Get current response
        let response;
        if (clickCount <= responses.length) {
            response = responses[clickCount - 1];
        } else {
            response = responses[Math.floor(Math.random() * 5) + responses.length - 5];
        }

        // Update button text
        const span = noBtn.querySelector('span') || noBtn;
        span.textContent = response.text;

        // Create disappointed hearts
        for (let i = 0; i < 3; i++) {
            const rect = noBtn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createFloatingHeart(x, y, {
                size: 20,
                distance: 100,
                duration: 1000,
                rotation: Math.random() * 360
            });
        }
        
        // If clicked too many times, make it slightly transparent but still visible
        if (clickCount >= 10) {
            noBtn.style.opacity = Math.max(0.3, 1 - (clickCount - 10) * 0.05);
        }
        
        // Update GIF in card
        updateCardGif(response.gif);
    });

    // Create floating heart
    const createFloatingHeart = (x, y, options = {}) => {
        const heart = document.createElement('div');
        const randomHeart = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'floating-heart';
        
        const duration = options.duration || 1000;
        const size = options.size || Math.random() * 10 + 15;
        const distance = options.distance || 100;
        const rotation = options.rotation || Math.random() * 360;
        
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${size}px;
            pointer-events: none;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg);
            animation: floatHeart ${duration}ms ease-out forwards;
        `;

        const keyframes = `
        @keyframes floatHeart {
            0% {
                transform: translate(-50%, -50%) rotate(0deg) scale(0.3);
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translate(-50%, ${-distance}px) rotate(${rotation}deg) scale(1.2);
                opacity: 0;
            }
        }`;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
            styleSheet.remove();
        }, duration);
    };

    // Love letter configuration
    const loveLetter = {
        title: "💌 A Letter For You 💌",
        greeting: "Hi Althea🤗,",
        opening: "Hope this message finds you well. Or maybe you didn't get it, so ako nalang ni ihatag ni Janz or Bea kay basin i turn down nimo. Pero I still made this hoping you'll accept the gift and read the QR message.",
        content: `First off, sorry gyud ha😭. Wala gihapon ko ka get over na akoang gi mention si Avelino natong time na na samad cya, even though nag sorry nako nimo sa IG ug Messenger. Na notice nako nga murag gikan ka ni hilak ato, and nag fidget imong hands. Sad kaayo ka ato, and na realize nako nga insensitive kaayo ko. So, I’m really sorry. Please forgive me 🤧 or not, it’s your choice.  

I felt haunted kay wala ka nag respond. Maybe you’re mad, or I don’t know. But I want to confess now that I have a huge crush on you. Dili ko usually ma fall in love easily, because I only admired your dancing at first kay ever since I saw you dance, na amaze ko. And na balik akoang childhood kay I love dancing pero wala koy talent or confidence, so usahay mag watch nlng ko ug mga dance troupes like jabbawockeez, astrophile, and etc. Pero hilig kog kanta² bisag yabag haha.  

After pila ka weeks na delulu kaayo ko nimo, that I even made a song about you, pero corny siya haha. I don’t know exactly how it started, pero siguro kadto nag-hi ka nako nga wala ko naka-notice then nag sorry ko ato (or I don't know maybe imagination rto nko). Next nadugangan akoa feelings since I like the way you look and how kind you are, even to people you’re not close to.  

Then nahibong nalang ko kay cge’g istorya si Sir Leal nako about you, and I don’t know if sa imo sad ba. Kay ingon si Bea tungod tali to kadto murag makig interact ko usahay nmo. It's because na curious ko nimo that I wanted to get to know you more as a person, pero since tungod nato ni sir Leal sometimes I try to avoid your section kay murag awkward kaayo and I don't want to distract you or give misunderstandings tungod nato. But eventually it kinda got to me na naibog ko nmo.

Pero all I want to say is I really like you. I don’t expect you to reciprocate my feelings or even reply kay busy man ka, and dili ka always mag soc med. But I wish you good luck sa imong journey sa One Dadieu fam, school, and life.  

You inspired me to be a better person, even without knowing it. Because of you, I rebuilt my bond with my mom, and I’ve been focusing on being the best version of myself, thinking maybe one day I’ll get your attention. Pero since I think naa kay uyab, I’ll try to move on or maybe not haha. Maybe I’ll just admire you from afar.  

Thank you kaayo, Althea. Even if we’re not close, you made a huge impact on my life just by being my secret crush. Hoping this message won't change our friendship and make things awkward.`,
        promises: [],
        closing: "",
        signature: "Yours truly,<br>Aeji 💝"
    };

    // Function to generate love letter HTML
    function generateLoveLetter(letter) {
        return `
            <p style="text-align: center; font-size: 1.2em; margin-bottom: 25px;">${letter.title}</p>
            <p>${letter.greeting}</p>
            <p>${letter.opening}</p>
            ${letter.content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            ${letter.closing ? `<p>${letter.closing}</p>` : ''}
            <p class="signature">${letter.signature}</p>
            <p class="date">${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</p>
        `;
    }

    // Handle Yes button hover/touch
    let lastHeartTime = 0;
    const createHeartsAtPoint = (x, y) => {
        const now = Date.now();
        if (now - lastHeartTime > 50) {
            createFloatingHeart(x, y, {
                size: 15,
                distance: 120,
                duration: 1200
            });
            lastHeartTime = now;
        }
    };

    // Add both mouse and touch events for Yes button
    yesBtn.addEventListener('mousemove', (e) => {
        createHeartsAtPoint(e.clientX, e.clientY);
    });

    yesBtn.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        createHeartsAtPoint(touch.clientX, touch.clientY);
    });

    // Handle successful click
    yesBtn.addEventListener('click', () => {
        // Create heart burst
        const burstCount = 30;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                const angle = (i / burstCount) * Math.PI * 2;
                const distance = 100;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                createFloatingHeart(x, y, {
                    size: 20 + Math.random() * 20,
                    distance: 150 + Math.random() * 100,
                    duration: 1500 + Math.random() * 500,
                    rotation: angle * (180 / Math.PI)
                });
            }, i * 50);
        }

        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        document.body.appendChild(overlay);

        // Create fullscreen button
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'fullscreen-btn';
        fullscreenBtn.setAttribute('aria-label', 'Read in fullscreen');
        fullscreenBtn.innerHTML = `
            <span class="fullscreen-btn-icon">📱</span>
            <span>Read Better</span>
        `;
        document.body.appendChild(fullscreenBtn);

        // Update card content with love letter
        card.innerHTML = `
            <h1>Yay! Thank you for being my Valentine! 🥰</h1>
            <div class="success-content">
                <img src="rose-cute.gif" alt="Celebration GIF" 
                    style="max-width: 200px; margin: 20px auto; display: block; 
                    border-radius: 15px; border: 3px solid #ffb6c1;
                    box-shadow: 0 5px 20px rgba(255,182,193,0.4);">
                <div class="love-letter">
                    ${generateLoveLetter(loveLetter)}
                </div>
            </div>
        `;
        card.classList.add('success');

        // Add fullscreen functionality
        fullscreenBtn.addEventListener('click', () => {
            overlay.innerHTML = `
                <button class="close-fullscreen" aria-label="Close fullscreen">×</button>
                <div class="love-letter">
                    ${generateLoveLetter(loveLetter)}
                </div>
            `;
            overlay.classList.add('active');

            // Add close button functionality
            const closeBtn = overlay.querySelector('.close-fullscreen');
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    overlay.classList.remove('active');
                }
            });

            // Close on overlay click (but not when clicking the letter)
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });

        // Background hearts
        let heartInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight + 50;
            createFloatingHeart(x, y, {
                size: 15 + Math.random() * 15,
                distance: window.innerHeight,
                duration: 2000 + Math.random() * 1000,
                rotation: Math.random() * 360
            });
        }, 300);

        setTimeout(() => clearInterval(heartInterval), 30000);
    });
});
