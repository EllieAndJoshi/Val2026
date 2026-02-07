/* =================================================
   MAIN PAGE LOGIC
================================================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (yesBtn && noBtn) {

  yesBtn.addEventListener("click", () => {
    window.location.href = "celebration.html";
  });

  noBtn.addEventListener("click", () => {
    document.body.classList.add("sad");
    document.getElementById("sad-bubble").style.display = "block";
  });

}

/* =================================================
   CELEBRATION PAGE
================================================= */

if (document.body.classList.contains("celebrate")) {

  // Open camera popup
  setTimeout(() => {
    window.open(
      "camera.html",
      "cameraWindow",
      "width=1920,height=1080"
    );
  }, 1500);

}


/* =================================================
   CAMERA PAGE LOGIC
================================================= */

if (document.body.classList.contains("camera-page")) {

  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  const filterImg = document.getElementById("filter");
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");
  const readyBtn = document.getElementById("readyBtn");

  const filter1Btn = document.getElementById("filter1Btn");
  const filter2Btn = document.getElementById("filter2Btn");
  const flipBtn = document.getElementById("flipBtn");

  let currentFilter = "filters/filter1.png";
  let flipped = false;

  /* =========================
     START CAMERA
  ========================= */

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      alert("Camera access denied.");
    });

  /* =========================
     SIDEBAR AUTO OPEN
  ========================= */

  sidebar.classList.add("open");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  /* =========================
     FILTER SWITCHING (2 ONLY)
  ========================= */

  filter1Btn.addEventListener("click", () => {
    currentFilter = "filters/filter1.png";
    filterImg.src = currentFilter;

    filter1Btn.classList.add("active");
    filter2Btn.classList.remove("active");
  });

  filter2Btn.addEventListener("click", () => {
    currentFilter = "filters/filter2.png";
    filterImg.src = currentFilter;

    filter2Btn.classList.add("active");
    filter1Btn.classList.remove("active");
  });

  /* =========================
     FLIP CAMERA (FILTER STAYS)
  ========================= */

  flipBtn.addEventListener("click", () => {
    flipped = !flipped;
    video.style.transform = flipped ? "scaleX(-1)" : "scaleX(1)";
    flipBtn.classList.toggle("active");
  });

  /* =========================
     READY FOR PIC → COUNTDOWN
  ========================= */

  readyBtn.addEventListener("click", () => {

    readyBtn.classList.add("active");
    sidebar.classList.remove("open");

    startCountdown(5);

  });

  function startCountdown(seconds) {

    const countdownEl = document.getElementById("countdown");
    countdownEl.style.display = "flex";

    let count = seconds;
    countdownEl.textContent = count;

    const interval = setInterval(() => {

      count--;
      countdownEl.textContent = count;

      if (count === 0) {
        clearInterval(interval);
        countdownEl.style.display = "none";
        takePicture();
      }

    }, 1000);
  }

  /* =========================
     TAKE PICTURE + DOWNLOAD
  ========================= */

  function takePicture() {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    // Flip if needed
    if (flipped) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (flipped) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Draw filter
    const filterImage = new Image();
    filterImage.src = currentFilter;

    filterImage.onload = () => {

      ctx.drawImage(
        filterImage,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const link = document.createElement("a");
      link.download = "valentine_picture.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Reopen sidebar after photo
      setTimeout(() => {
        sidebar.classList.add("open");
        readyBtn.classList.remove("active");
      }, 1000);

    };
  }

}
