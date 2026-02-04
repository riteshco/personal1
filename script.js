const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const celebrationSection = document.getElementById('celebration');
const askSection = document.getElementById('ask');
const finalVideo = document.getElementById('final-video');

let noClickCount = 0; // Tracks how many times she tried "No"

// 1. The Interaction Logic
noBtn.addEventListener('mouseover', handleNoInteraction);
noBtn.addEventListener('click', handleNoInteraction);

function handleNoInteraction() {
    noClickCount++;
    
    // --- STAGE 1: Run Away (Attempts 1-5) ---
    if (noClickCount <= 5) {
        moveButton();
        const playfulTexts = ["Catch me if you can!", "Too slow!", "Nope!", "Try again!", "Missed me!"];
        noBtn.innerText = playfulTexts[Math.floor(Math.random() * playfulTexts.length)];
    } 
    
    // --- STAGE 2: The Guilt Trip (Attempts 6-10) ---
    else if (noClickCount > 5 && noClickCount <= 10) {
        // Stop moving, just guilt trip
        noBtn.style.position = 'fixed'; 
        noBtn.style.transform = 'none';
        
        const guiltTexts = ["You are so bad...", "Why are you doing this?", "My heart is breaking 💔", "Serious??"];
        noBtn.innerText = guiltTexts[Math.floor(Math.random() * guiltTexts.length)];
        
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
    } 
    
    // --- STAGE 3: The Arrow Storm (Attempts 11+) ---
    else {
        noBtn.innerText = "Just click YES already! 😡";
        
        // Make the Yes button grow bigger
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = `${currentSize * 1.2}px`; 
        
        // Spawn an arrow pointing to the Yes button
        spawnArrow();
    }
}

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed'; 
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = "1000"; 
}

function spawnArrow() {
    const arrow = document.createElement('div');
    arrow.classList.add('floating-arrow');
    arrow.innerText = "👈 Click this one!"; 
    
    // 1. Get Yes Button Center Position
    const yesRect = yesBtn.getBoundingClientRect();
    const yesCenterX = yesRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top + yesRect.height / 2;
    
    // 2. Random Position for the Arrow (random distance from button)
    // We create a random angle (0 to 360) and a random distance (100px to 300px away)
    const angleRandom = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 200; // Distance from button
    
    // Calculate arrow position based on angle and distance
    const arrowX = yesCenterX + Math.cos(angleRandom) * distance;
    const arrowY = yesCenterY + Math.sin(angleRandom) * distance;
    
    arrow.style.left = `${arrowX}px`;
    arrow.style.top = `${arrowY}px`;
    
    // 3. Calculate Rotation to Point at Button
    // The emoji 👈 points left (which is 180 degrees in math terms). 
    // We calculate the angle to the button, then subtract 180 to align the finger.
    const deltaX = yesCenterX - arrowX;
    const deltaY = yesCenterY - arrowY;
    const angleToButton = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    const rotation = angleToButton - 180; // Adjust because 👈 points Left
    
    arrow.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(arrow);
}

// 2. The "Yes" Button Logic (Standard)
yesBtn.addEventListener('click', () => {
    // A. Clean up the chaos
    // Remove all arrows
    const arrows = document.querySelectorAll('.floating-arrow');
    arrows.forEach(arrow => arrow.remove());
    
    // Hide the No button
    noBtn.style.display = 'none';

    // B. Celebration
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });

    // Hide the ask section and show celebration
    askSection.style.display = 'none';
    celebrationSection.classList.remove('hidden');
    celebrationSection.style.display = 'flex'; 

    celebrationSection.scrollIntoView({ behavior: 'smooth' });
    
    finalVideo.play();
});