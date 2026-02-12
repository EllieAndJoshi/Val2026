/* =================================================
   LOGIN SYSTEM
================================================= */

const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");

const nameInput = document.getElementById("nameInput");
const enterBtn = document.getElementById("enterBtn");
const idkBtn = document.getElementById("idkBtn");
const loginError = document.getElementById("login-error");

if (loginScreen) {

  idkBtn.addEventListener("click", () => {
    window.open(
      "https://youtu.be/M0a_68xnboc?si=QOHx9FVexeqSy0Kw",
      "_blank"
    );
  });

  enterBtn.addEventListener("click", checkLogin);

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkLogin();
    }
  });

  function checkLogin() {

    const value = nameInput.value.trim().toLowerCase();

    if (value === "elena" || value === "your wife") {

      loginScreen.style.display = "none";
      mainContent.style.display = "block";

    } else {

      loginError.textContent = "This is not for you then.";
      nameInput.value = "";

    }

  }
}

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

  /* =========================
     NO HOVER → SAD MODE
  ========================= */

  noBtn.addEventListener("mouseenter", () => {
    document.body.classList.add("sad-hover");
  });

  noBtn.addEventListener("mouseleave", () => {
    document.body.classList.remove("sad-hover");
  });

  /* =========================
     NO CLICK → MESSAGE ONLY
  ========================= */

  noBtn.addEventListener("click", () => {

    // Make sure grey mode is removed
    document.body.classList.remove("sad-hover");

    // Show message
    topMessage.textContent = "It must be an error... please try again 💔";
    topMessage.classList.add("show-message");

    // Remove after 5s
    setTimeout(() => {
      topMessage.classList.remove("show-message");
      topMessage.textContent = "";
    }, 5000);

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
