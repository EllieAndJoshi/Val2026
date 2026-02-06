const video = document.getElementById("video");
const filter = document.getElementById("cameraFilter");

const sidebar = document.getElementById("sidebar");
const toggleArrow = document.getElementById("sidebar-toggle");

const toggleFilterBtn = document.getElementById("toggleFilter");
const flipCameraBtn = document.getElementById("flipCamera");
const readyScreenBtn = document.getElementById("readyScreen");
const filterButtons = document.querySelectorAll(".filter-btn");

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
   LOAD DEFAULT FILTER
========================= */

function loadFilter(filename) {
  // cache busting
  filter.src = `assets/filters/${filename}?v=${Date.now()}`;
}

loadFilter("filter1.png");

/* =========================
   SIDEBAR TOGGLE
========================= */

toggleArrow.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  toggleArrow.textContent = sidebar.classList.contains("open") ? "❮" : "❯";
});

/* =========================
   FILTER VISIBILITY
========================= */

toggleFilterBtn.addEventListener("click", () => {
  filterVisible = !filterVisible;
  filter.style.display = filterVisible ? "block" : "none";
  toggleFilterBtn.classList.toggle("active", filterVisible);
});

/* =========================
   FILTER SWITCHING
========================= */

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const file = btn.dataset.filter;
    loadFilter(file);
  });
});

/* =========================
   FLIP CAMERA (FILTER LOCKED)
========================= */

flipCameraBtn.addEventListener("click", () => {
  flipped = !flipped;

  video.style.transform = flipped ? "scaleX(-1)" : "scaleX(1)";
  // ❌ filter does NOT flip anymore

  flipCameraBtn.classList.toggle("active", flipped);
});

/* =========================
   READY FOR SCREEN
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
