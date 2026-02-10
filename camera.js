/* =================================================
   CAMERA PAGE LOGIC
================================================= */

const video = document.getElementById("video");
const filter = document.getElementById("cameraFilter");

const sidebar = document.getElementById("sidebar");
const toggleArrow = document.getElementById("sidebar-toggle");

const toggleFilterBtn = document.getElementById("toggleFilter");
const flipCameraBtn = document.getElementById("flipCamera");
const readyPicBtn = document.getElementById("readyPic");

const filterButtons = document.querySelectorAll(".filter-btn");
const countdownEl = document.getElementById("countdown");

let filterVisible = true;
let flipped = false;
let readyActive = false;

/* =================================================
   START CAMERA
================================================= */

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: false
})
.then(stream => {
  video.srcObject = stream;
})
.catch(() => {
  alert("Camera access denied 😢");
});

/* =================================================
   LOAD FILTER
================================================= */

function loadFilter(filename) {
  filter.src = `assets/filters/${filename}?v=${Date.now()}`;
}

loadFilter("filter1.png"); // default = landscape


/* =================================================
   SIDEBAR DEFAULT OPEN
================================================= */

sidebar.classList.add("open");


/* =================================================
   SIDEBAR TOGGLE
================================================= */

toggleArrow.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


/* =================================================
   TOGGLE FILTER VISIBILITY
================================================= */

toggleFilterBtn.addEventListener("click", () => {
  filterVisible = !filterVisible;

  filter.style.display = filterVisible ? "block" : "none";
  toggleFilterBtn.classList.toggle("active", filterVisible);
});


/* =================================================
   SWITCH FILTER (LANDSCAPE / PORTRAIT)
================================================= */

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Update active state
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Load filter
    loadFilter(btn.dataset.filter);

    /* Adapt video + filter fitting */

    if (btn.dataset.filter === "filter1.png") {
      // LANDSCAPE → fill entire window
      video.style.objectFit = "cover";
      filter.style.objectFit = "cover";
    } else {
      // PORTRAIT → ensure filter fully visible
      video.style.objectFit = "contain";
      filter.style.objectFit = "contain";
    }

  });
});


/* =================================================
   FLIP CAMERA
================================================= */

flipCameraBtn.addEventListener("click", () => {
  flipped = !flipped;

  video.style.transform = flipped ? "scaleX(-1)" : "scaleX(1)";
  flipCameraBtn.classList.toggle("active", flipped);
});


/* =================================================
   READY FOR PIC
================================================= */

readyPicBtn.addEventListener("click", () => {
  if (readyActive) return;

  readyActive = true;
  readyPicBtn.classList.add("active");

  sidebar.classList.remove("open");

  startCountdown(5);
});


/* =================================================
   COUNTDOWN
================================================= */

function startCountdown(seconds) {

  let current = seconds;

  countdownEl.style.display = "flex";
  countdownEl.textContent = current;

  const interval = setInterval(() => {

    current--;

    if (current > 0) {
      countdownEl.textContent = current;
    } else {
      clearInterval(interval);
      countdownEl.style.display = "none";
      takePhoto();
      restoreSidebar();
    }

  }, 1000);
}


/* =================================================
   TAKE PHOTO
================================================= */

function takePhoto() {

  const canvas = document.createElement("canvas");

  const w = video.videoWidth;
  const h = video.videoHeight;

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");

  // Flip if needed
  if (flipped) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, 0, 0, w, h);

  // Reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Draw filter if visible
  if (filterVisible) {
    ctx.drawImage(filter, 0, 0, w, h);
  }

  const link = document.createElement("a");
  link.download = `valentine-photo-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}


/* =================================================
   RESTORE SIDEBAR AFTER PHOTO
================================================= */

function restoreSidebar() {
  setTimeout(() => {
    sidebar.classList.add("open");
    readyPicBtn.classList.remove("active");
    readyActive = false;
  }, 1000);
}
