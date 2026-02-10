const card = document.querySelector(".card");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadBubble = document.getElementById("sad-bubble");
const topMessage = document.getElementById("top-message");

/* YES */
yesBtn.addEventListener("click", () => {
  window.location.href = "celebration.html";
});

/* Glow on hover */
yesBtn.addEventListener("mouseenter", () => {
  card.style.boxShadow = "0 0 40px rgba(236, 187, 80, 0.6)";
});

yesBtn.addEventListener("mouseleave", () => {
  card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
});

/* NO hover sad theme */
noBtn.addEventListener("mouseenter", () => {
  document.body.classList.add("sad-mode");
});

noBtn.addEventListener("mouseleave", () => {
  document.body.classList.remove("sad-mode");
});

/* NO click top message */
noBtn.addEventListener("click", () => {
  topMessage.textContent = "It must be an error... please try again 💔";
});


/* =================================================
   CELEBRATION PAGE LOGIC
================================================= */

if (document.body.classList.contains("celebrate")) {
  // nothing automatic — camera opens only via button
}


/* =================================================
   CAMERA PAGE LOGIC
   (Handled fully in camera.js)
================================================= */
