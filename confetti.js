const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
  "#ff5a8a",
  "#ffd166",
  "#6ecbff",
  "#c77dff",
  "#95ff9f"
];

let pieces = [];

for (let i = 0; i < 250; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 4 + 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(draw);
}

draw();