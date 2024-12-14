document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            playRandomSound();
        });
    });

    function playRandomSound() {
        const sounds = ['wow', 'oof', 'yeet'];
        const sound = sounds[Math.floor(Math.random() * sounds.length)];
        const audio = new Audio(`https://www.myinstants.com/media/sounds/${sound}.mp3`);
        audio.volume = 0.2;
        audio.play();
    }
});

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
