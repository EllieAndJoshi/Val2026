const video = document.getElementById("video");
const filter = document.getElementById("cameraFilter");

const sidebar = document.getElementById("sidebar");
const toggleArrow = document.getElementById("sidebar-toggle");

const toggleFilterBtn = document.getElementById("toggleFilter");
const flipCameraBtn = document.getElementById("flipCamera");
const readyPicBtn = document.getElementById("readyPic");
const filterButtons = document.querySelectorAll(".filter-btn");
const captureBtn = document.getElementById("captureBtn");

let filterVisible = true;
let flipped = false;
let readyActive = false;
let readyTimeout = null;

/* CAMERA INIT */

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: false
}).then(stream => {
  video.srcObject = stream;
}).catch(() => {
  alert("Camera access denied 😢");
});

/* LOAD FILTER */

function loadFilter(filename) {
  filter.src = `assets/filters/${filename}?v=${Date.now()}`;
}

loadFilter("filter1.png");

/* SIDEBAR */

toggleArrow.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  toggleArrow.textContent = sidebar.classList.contains("open") ? "❮" : "❯";
});

/* TOGGLE FILTER */

toggleFilterBtn.addEventListener("click", () => {
  filterVisible = !filterVisible;
  filter.style.display = filterVisible ? "block" : "none";
  toggleFilterBtn.classList.toggle("active", filterVisible);
});

/* SWITCH FILTER */

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadFilter(btn.dataset.filter);
  });
});

/* FLIP CAMERA (FILTER LOCKED) */

flipCameraBtn.addEventListener("click", () => {
  flipped = !flipped;
  video.style.transform = flipped ? "scaleX(-1)" : "scaleX(1)";
  flipCameraBtn.classList.toggle("active", flipped);
});

/* READY FOR PIC */

readyPicBtn.addEventListener("click", () => {
  if (readyActive) return;

  readyActive = true;
  readyPicBtn.classList.add("active");

  sidebar.classList.remove("open");
  toggleArrow.textContent = "❯";

  clearTimeout(readyTimeout);

  readyTimeout = setTimeout(() => {
    sidebar.classList.add("open");
    toggleArrow.textContent = "❮";
    readyActive = false;
    readyPicBtn.classList.remove("active");
  }, 10000);
});

/* CAPTURE */

captureBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const w = video.videoWidth;
  const h = video.videoHeight;

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");

  if (flipped) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, 0, 0, w, h);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (filterVisible) {
    ctx.drawImage(filter, 0, 0, w, h);
  }

  const link = document.createElement("a");
  link.download = `valentine-photo-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});
