/* Rain effect for sad mode */

const rainCanvas = document.getElementById("rain");
const rctx = rainCanvas.getContext("2d");

let rainDrops = [];
let raining = false;

function resizeRain() {
  rainCanvas.width = window.innerWidth;
  rainCanvas.height = window.innerHeight;
}

function initRain() {
  rainDrops = [];
  for (let i = 0; i < 300; i++) {
    rainDrops.push({
      x: Math.random() * rainCanvas.width,
      y: Math.random() * rainCanvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 6 + 4
    });
  }
}

function drawRain() {
  if (!raining) return;

  rctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  rctx.strokeStyle = "rgba(180, 200, 220, 0.6)";
  rctx.lineWidth = 2;

  rainDrops.forEach(drop => {
    rctx.beginPath();
    rctx.moveTo(drop.x, drop.y);
    rctx.lineTo(drop.x, drop.y + drop.length);
    rctx.stroke();

    drop.y += drop.speed;

    if (drop.y > rainCanvas.height) {
      drop.y = -drop.length;
      drop.x = Math.random() * rainCanvas.width;
    }
  });

  requestAnimationFrame(drawRain);
}

function startRain() {
  if (raining) return;
  raining = true;
  rainCanvas.style.display = "block";
  resizeRain();
  initRain();
  drawRain();
}

function stopRain() {
  raining = false;
  rainCanvas.style.display = "none";
  rctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
}

window.addEventListener("resize", resizeRain);
