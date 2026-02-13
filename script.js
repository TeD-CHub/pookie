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
                // Optional: Stop observing once visible if you want it to happen only once
                // fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => fadeInObserver.observe(el));

    // --- Proposal Logic ---
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebration = document.getElementById('celebration');
    const proposalCard = document.querySelector('.proposal-card');

    // Make 'No' button run away
    const moveButton = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const newX = Math.random() * (viewportWidth - btnWidth - 40) + 20;
        const newY = Math.random() * (viewportHeight - btnHeight - 40) + 20;

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.zIndex = "1000"; // Ensure it floats above everything
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Handle 'Yes' click
    yesBtn.addEventListener('click', () => {
        proposalCard.classList.add('hidden');
        celebration.classList.remove('hidden');
        fireConfetti();
        startLoveRain();
    });

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

    // --- Background Floating Particles (CSS handled, just adding some JS variety) ---
    // Simple floating hearts for the background
    const particlesContainer = document.getElementById('particles-js');
    for (let i = 0; i < 20; i++) {
        createBackgroundParticle();
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
