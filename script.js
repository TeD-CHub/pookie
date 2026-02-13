document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionBox = document.querySelector('.question-box');
    const celebration = document.getElementById('celebration');
    const backgroundHearts = document.getElementById('backgroundHearts');

    // Slideshow Logic
    let slideIndex = 1;
    showSlides(slideIndex);

    // Make functions global so HTML onclick works
    window.plusSlides = function (n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function (n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("slide");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove("active");
        }

        slides[slideIndex - 1].style.display = "flex";
        slides[slideIndex - 1].classList.add("active");
    }

    // Auto Advance Slides
    setInterval(() => {
        plusSlides(1);
    }, 6000);

    // Make 'No' button run away
    const moveButton = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Calculate a new random position
        const newX = Math.random() * (viewportWidth - btnWidth - 40) + 20;
        const newY = Math.random() * (viewportHeight - btnHeight - 40) + 20;

        noBtn.style.position = 'fixed'; // Change to fixed to move freely
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click on touch devices
        moveButton();
    });

    // Handle 'Yes' click
    yesBtn.addEventListener('click', () => {
        // Hide question, show celebration
        questionBox.classList.add('hidden');
        celebration.classList.remove('hidden');

        // Trigger Confetti
        fireConfetti();

        // Continuous confetti for a bit
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            fireConfetti();
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });

    function fireConfetti() {
        confetti({
            particleCount: 5,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffe5ec', '#ffffff']
        });
    }

    // Background floating hearts and flowers
    function createFloatingElement(type) {
        const el = document.createElement('div');
        el.classList.add('floating-element');

        if (type === 'heart') {
            el.innerHTML = '❤️';
            el.style.fontSize = Math.random() * 20 + 20 + "px";
        } else {
            // Flowers
            const flowers = ['🌸', '🌹', '🌺', '🌷', '🌻'];
            el.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
            el.style.fontSize = Math.random() * 25 + 20 + "px";
        }

        el.style.left = Math.random() * 100 + "vw";
        el.style.animationDuration = Math.random() * 5 + 5 + "s"; // 5-10s duration

        backgroundHearts.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 10000);
    }

    setInterval(() => {
        createFloatingElement('heart');
    }, 400);

    setInterval(() => {
        createFloatingElement('flower');
    }, 600);
});
