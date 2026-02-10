/* =================================================
   MAIN PAGE LOGIC
================================================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadBubble = document.getElementById("sad-bubble");
const bubbleText = document.getElementById("bubble-text");

if (yesBtn && noBtn) {

  /* Apply correct button styles */
  yesBtn.classList.add("pill-btn", "yes-style");
  noBtn.classList.add("pill-btn", "no-style");

  /* =========================
     YES BUTTON
  ========================= */

  yesBtn.addEventListener("click", () => {
    window.location.href = "celebration.html";
  });

  /* =========================
     NO BUTTON HOVER (TEMP SAD MODE)
  ========================= */

  noBtn.addEventListener("mouseenter", () => {
    document.body.classList.add("sad");
    bubbleText.textContent = "That makes me sad 😢";
    sadBubble.style.display = "block";
  });

  noBtn.addEventListener("mouseleave", () => {
    document.body.classList.remove("sad");
    sadBubble.style.display = "none";
  });

  /* =========================
     NO BUTTON CLICK (ERROR MESSAGE ONLY)
  ========================= */

  noBtn.addEventListener("click", () => {
    bubbleText.textContent = "It must be an error... restart the page 😌";
    sadBubble.style.display = "block";

    setTimeout(() => {
      sadBubble.style.display = "none";
    }, 3000);
  });

}


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
