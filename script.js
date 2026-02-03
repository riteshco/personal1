const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const celebrationSection = document.getElementById('celebration');
const askSection = document.getElementById('ask');
const finalVideo = document.getElementById('final-video');

// 1. The "No" Button Evasion Logic
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton); // For mobile taps

function moveButton() {
    // Get viewport dimensions
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    
    // Optional: Change text for comedic effect
    const phrases = ["Are you sure?", "Really?", "Think again!", "Last chance!", "Don't do this!"];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    noBtn.innerText = randomPhrase;
}

// 2. The "Yes" Button Logic
yesBtn.addEventListener('click', () => {
    // Launch Confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Hide the ask section and show celebration
    askSection.style.display = 'none';
    celebrationSection.classList.remove('hidden');
    celebrationSection.style.display = 'flex'; // Force flex display

    // Smooth scroll to celebration
    celebrationSection.scrollIntoView({ behavior: 'smooth' });
    
    // Auto-play the final video
    finalVideo.play();
});
