/* =================================================
   MAIN PAGE LOGIC
================================================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadBubble = document.getElementById("sad-bubble");
const topMessage = document.getElementById("top-message");

const sadMessages = [
  "Are you sure?",
  "Are you really sure???",
  "I think that might be an error.",
  "That feels suspicious...",
  "Hmmmm... try again?"
];

if (yesBtn && noBtn) {

  /* YES BUTTON → GO TO CELEBRATION */
  yesBtn.addEventListener("click", () => {
    window.location.href = "celebration.html";
  });

  /* NO BUTTON → SAD MODE ON HOVER */
  noBtn.addEventListener("mouseenter", () => {
    document.body.classList.add("sad");

    if (sadBubble) {
      sadBubble.style.display = "block";
      sadBubble.innerText =
        sadMessages[Math.floor(Math.random() * sadMessages.length)];
    }
  });

  /* REMOVE SAD MODE WHEN LEAVING */
  noBtn.addEventListener("mouseleave", () => {
    document.body.classList.remove("sad");
    if (sadBubble) sadBubble.style.display = "none";
  });

  /* CLICK NO → SHOW MESSAGE ONLY */
  noBtn.addEventListener("click", () => {
    if (topMessage) {
      topMessage.innerText = "It must be an error restart";
      topMessage.classList.add("show");

      setTimeout(() => {
        topMessage.classList.remove("show");
      }, 10000);
    }
  });

}


/* =================================================
   CELEBRATION PAGE
================================================= */

if (document.body.classList.contains("celebrate")) {

  const cameraBtn = document.getElementById("cameraBtn");

  if (cameraBtn) {
    cameraBtn.addEventListener("click", () => {
      window.open(
        "camera.html",
        "cameraWindow",
        "width=1920,height=1080"
      );
    });
  }

}
