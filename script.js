class MagicParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 10; // Random size between 10 and 30
        this.color = randomColor();
        this.speedX = Math.random() * 4 - 2; // Random horizontal speed
        this.speedY = Math.random() * 4 - 2; // Random vertical speed
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function randomColor() {
    const colors = [
        "#e84e66", "#67c69e",
        "#eedf1f4", "#800acc9",
        "#73a8b0", "#fe817f",
        "#68d284", "#1d203f",
        "#c9a30d"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticle(x, y) {
    const particle = new MagicParticle(x, y);
    particles.push(particle);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw(ctx);

        if (particle.opacity <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
    createParticle(e.clientX, e.clientY);
});

animate();
