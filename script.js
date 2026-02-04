const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadBubble = document.getElementById("sad-bubble");
const bubbleText = document.getElementById("bubble-text");
const topMessage = document.getElementById("top-message");
const pictureWall = document.getElementById("picture-wall");

const messages = [
  "Are you sure?",
  "Are you REALLY sure???",
  "I think this might be an error",
  "That button feels wrong…"
];

let msgIndex = 0;

/* =========================
   YES BUTTON — PICTURE WALL
========================= */

let yesHoverTimer = null;
let hideWallTimer = null;
let wallCreated = false;

const pictures = Array.from({ length: 20 }, (_, i) =>
  `assets/pictures/pic${i + 1}.jpg`
);

function createPictureWall() {
  if (wallCreated) return;
  wallCreated = true;

  pictures.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "picture";
    img.style.top = Math.random() * 90 + "%";
    img.style.left = Math.random() * 90 + "%";
    img.style.setProperty("--rot", `${Math.random() * 30 - 15}deg`);
    pictureWall.appendChild(img);
  });
}

function showPictureWall() {
  createPictureWall();
  pictureWall.classList.add("active");
}

function hidePictureWall() {
  pictureWall.classList.remove("active");
}

yesBtn.addEventListener("mouseenter", () => {
  clearTimeout(hideWallTimer);

  yesHoverTimer = setTimeout(() => {
    showPictureWall();
  }, 5000);
});

yesBtn.addEventListener("mouseleave", () => {
  clearTimeout(yesHoverTimer);

  hideWallTimer = setTimeout(() => {
    hidePictureWall();
  }, 5000);
});

/* =========================
   YES CLICK
========================= */

yesBtn.addEventListener("click", () => {
  window.open("celebration.html", "_blank");
});

/* =========================
   NO BUTTON LOGIC (UNCHANGED)
========================= */

noBtn.addEventListener("mouseenter", () => {
  document.body.classList.add("sad");
  sadBubble.style.display = "block";
  bubbleText.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;
});

noBtn.addEventListener("mouseleave", () => {
  document.body.classList.remove("sad");
  sadBubble.style.display = "none";
});

noBtn.addEventListener("click", () => {
  document.body.classList.remove("sad");
  sadBubble.style.display = "none";

  topMessage.textContent = "Nothing happened, let's restart 💔";
  topMessage.classList.add("show");

  setTimeout(() => {
    topMessage.textContent = "";
    topMessage.classList.remove("show");
  }, 10000);
});
