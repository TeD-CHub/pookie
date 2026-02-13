document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px"
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => fadeInObserver.observe(el));

    // --- Magic Dust Cursor ---
    document.addEventListener('mousemove', (e) => {
        createDust(e.pageX, e.pageY);
    });

    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        createDust(touch.pageX, touch.pageY);
    });

    function createDust(x, y) {
        const dust = document.createElement('div');
        dust.classList.add('magic-dust');
        dust.style.left = `${x}px`;
        dust.style.top = `${y}px`;
        dust.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`; // Random pastel colors
        document.body.appendChild(dust);

        setTimeout(() => {
            dust.remove();
        }, 1000);
    }

    // --- Love Timer ---
    const startDate = new Date("2025-09-06T00:00:00");

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // --- Music Player ---
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "🎵 Play Music";
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicBtn.innerText = "⏸️ Pause Music";
                isPlaying = true;
            }).catch(e => {
                console.log("Autoplay prevented or interaction required", e);
            });
        }
    });

    // --- Envelope Logic ---
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
    });

    // --- Proposal Logic ---
    const celebration = document.getElementById('celebration');
    const newYesBtn = document.getElementById('yesBtn');
    const newNoBtn = document.getElementById('noBtn');

    // Handle 'Yes' click
    if (newYesBtn) {
        newYesBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing envelope

            // Play Music
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicBtn.innerText = "⏸️ Pause Music";
                    isPlaying = true;
                }).catch(e => console.log("Audio play failed", e));
            }

            document.querySelector('.proposal-section').innerHTML = ''; // Clear envelope
            document.querySelector('.proposal-section').appendChild(celebration); // Move celebration here
            celebration.classList.remove('hidden');
            fireConfetti();
            startLoveRain();
        });
    }

    if (newNoBtn) {
        // Keep the runaway logic
        const moveButtonNew = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const btnWidth = newNoBtn.offsetWidth;
            const btnHeight = newNoBtn.offsetHeight;

            const newX = Math.random() * (viewportWidth - btnWidth - 40) + 20;
            const newY = Math.random() * (viewportHeight - btnHeight - 40) + 20;

            newNoBtn.style.position = 'fixed';
            newNoBtn.style.left = `${newX}px`;
            newNoBtn.style.top = `${newY}px`;
            newNoBtn.style.zIndex = "1000";
        };

        newNoBtn.addEventListener('mouseover', moveButtonNew);
        newNoBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveButtonNew();
        });

        // Prevent click from bubbling to envelope
        newNoBtn.addEventListener('click', (e) => e.stopPropagation());
    }

    // --- Confetti & Particles ---
    function fireConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    function startLoveRain() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerText = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-10px';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.transition = 'top 5s linear, opacity 5s';
            heart.style.zIndex = '9999';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.top = '110vh';
                heart.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }

    // --- Background Floating Particles ---
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            createBackgroundParticle();
        }
    }

    function createBackgroundParticle() {
        if (!particlesContainer) return;
        const p = document.createElement('div');
        p.innerText = Math.random() > 0.5 ? '✨' : '🌸';
        p.style.position = 'absolute';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.fontSize = Math.random() * 15 + 10 + 'px';
        p.style.opacity = Math.random() * 0.5 + 0.1;
        p.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particlesContainer.appendChild(p);
    }
});
