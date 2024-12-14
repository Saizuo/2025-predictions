import { predictions } from './predictions.js';

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('prediction-generator');
    const predictionContainer = document.getElementById('random-prediction');

    generateButton.addEventListener('click', () => {
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        
        predictionContainer.innerHTML = `
            <h2>${randomPrediction.title}</h2>
            <img src="${randomPrediction.gif}" alt="prediction gif">
            <p>${randomPrediction.text}</p>
        `;
        
        predictionContainer.style.display = 'block';
        
        // Add some flair
        predictionContainer.style.animation = 'none';
        predictionContainer.offsetHeight; // Trigger reflow
        predictionContainer.style.animation = 'popIn 0.5s ease-out';
    });
});

// Add this CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: scale(0); }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add confetti explosion on click
document.addEventListener('click', (e) => {
    createConfetti(e.clientX, e.clientY);
});

function createConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.background = `hsl(${Math.random() * 360}deg, 100%, 50%)`;
        div.style.borderRadius = '50%';
        div.style.pointerEvents = 'none';
        document.body.appendChild(div);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = x;
        let posY = y;

        const animate = () => {
            posX += vx;
            posY += vy;
            div.style.left = posX + 'px';
            div.style.top = posY + 'px';

            if (posY > window.innerHeight) {
                div.remove();
            } else {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}
