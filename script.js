document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionBox = document.querySelector('.question-box');
    const celebration = document.getElementById('celebration');
    const backgroundHearts = document.getElementById('backgroundHearts');

    // Make 'No' button run away
    const moveButton = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Calculate a new random position
        // Ensure it stays within viewport with some padding
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

    // Background floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // 4-7s duration
        heart.style.fontSize = Math.random() * 20 + 20 + "px"; // 20-40px size
        
        backgroundHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    setInterval(createHeart, 500);
});
