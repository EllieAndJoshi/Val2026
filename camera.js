const video = document.getElementById("video");
const filter = document.getElementById("cameraFilter");

const sidebar = document.getElementById("sidebar");
const toggleArrow = document.getElementById("sidebar-toggle");

const toggleFilterBtn = document.getElementById("toggleFilter");
const flipCameraBtn = document.getElementById("flipCamera");
const readyScreenBtn = document.getElementById("readyScreen");

let filterVisible = true;
let flipped = false;
let readyActive = false;
let readyTimeout = null;

/* =========================
   CAMERA INIT
========================= */

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: false
}).then(stream => {
  video.srcObject = stream;
}).catch(() => {
  alert("Camera access denied 😢");
});

/* =========================
   SIDEBAR TOGGLE (MANUAL)
========================= */

toggleArrow.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  toggleArrow.textContent = sidebar.classList.contains("open") ? "❮" : "❯";
});

/* =========================
   FILTER TOGGLE
========================= */

toggleFilterBtn.addEventListener("click", () => {
  filterVisible = !filterVisible;
  filter.style.display = filterVisible ? "block" : "none";
  toggleFilterBtn.classList.toggle("active", filterVisible);
});

/* =========================
   FLIP CAMERA
========================= */

flipCameraBtn.addEventListener("click", () => {
  flipped = !flipped;

  const scale = flipped ? "scaleX(-1)" : "scaleX(1)";
  video.style.transform = scale;
  filter.style.transform = scale;

  flipCameraBtn.classList.toggle("active", flipped);
});

/* =========================
   READY FOR SCREEN (10s)
========================= */

readyScreenBtn.addEventListener("click", () => {
  if (readyActive) return;

  readyActive = true;
  readyScreenBtn.classList.add("active");

  sidebar.classList.remove("open");
  toggleArrow.textContent = "❯";

  clearTimeout(readyTimeout);

  readyTimeout = setTimeout(() => {
    sidebar.classList.add("open");
    toggleArrow.textContent = "❮";

    readyActive = false;
    readyScreenBtn.classList.remove("active");
  }, 10000);
});
