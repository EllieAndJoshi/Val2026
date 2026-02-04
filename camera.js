const video = document.getElementById("video");
const filter = document.getElementById("cameraFilter");

const sidebar = document.getElementById("sidebar");
const toggleArrow = document.getElementById("sidebar-toggle");

const toggleFilterBtn = document.getElementById("toggleFilter");
const flipCameraBtn = document.getElementById("flipCamera");

let filterVisible = true;
let flipped = false;

/* =========================
   CAMERA INIT
========================= */

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: false
}).then(stream => {
  video.srcObject = stream;
}).catch(err => {
  alert("Camera access denied 😢");
});

/* =========================
   SIDEBAR TOGGLE
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
});

/* =========================
   FLIP CAMERA
========================= */

flipCameraBtn.addEventListener("click", () => {
  flipped = !flipped;

  const scale = flipped ? "scaleX(-1)" : "scaleX(1)";
  video.style.transform = scale;
  filter.style.transform = scale;
});
