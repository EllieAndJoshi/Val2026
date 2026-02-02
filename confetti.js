const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];
const colors = [
  "#ff5a8a",
  "#ffd166",
  "#6ecbff",
  "#c77dff",
  "#95ff9f",
  "#ff9f1c",
  "#f72585"
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initConfetti() {
  pieces = [];
  for (let i = 0; i < 300; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    p.y += p.speed;
    p.rotation += p.speed;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}

resizeCanvas();
initConfetti();
drawConfetti();

window.addEventListener("resize", () => {
  resizeCanvas();
  initConfetti();
});
