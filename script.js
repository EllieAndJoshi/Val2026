const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadBubble = document.getElementById("sad-bubble");
const bubbleText = document.getElementById("bubble-text");
const topMessage = document.getElementById("top-message");

/* 🔽 ADDED: timer for rain delay */
let rainTimer = null;

const messages = [
  "Are you sure?",
  "Are you REALLY sure???",
  "I think this might be an error",
  "That button feels wrong…"
];

let msgIndex = 0;

/* YES click */
yesBtn.addEventListener("click", () => {
  window.open("celebration.html", "_blank");
});

/* NO hover */
noBtn.addEventListener("mouseenter", () => {
  document.body.classList.add("sad");
  sadBubble.style.display = "block";
  bubbleText.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;

  /* 🔽 ADDED: start 5s rain timer */
  rainTimer = setTimeout(() => {
    startRain();
  }, 5000);
});

/* NO leave */
noBtn.addEventListener("mouseleave", () => {
  document.body.classList.remove("sad");
  sadBubble.style.display = "none";

  /* 🔽 ADDED: stop rain + timer */
  clearTimeout(rainTimer);
  stopRain();
});

/* NO click */
noBtn.addEventListener("click", () => {
  document.body.classList.remove("sad");
  sadBubble.style.display = "none";

  /* 🔽 ADDED: stop rain + timer */
  clearTimeout(rainTimer);
  stopRain();

  topMessage.textContent = "Nothing happened, let's restart 💔";
  topMessage.classList.add("show");

  setTimeout(() => {
    topMessage.textContent = "";
    topMessage.classList.remove("show");
  }, 10000);
});
