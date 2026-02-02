const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const bubble = document.getElementById("bubble");
const bubbleText = document.getElementById("bubble-text");
const topMessage = document.getElementById("top-message");

const messages = [
  "Are you sure?",
  "Are you REALLY sure???",
  "I think this might be an error",
  "That button looks suspicious…"
];

let msgIndex = 0;

// YES click
yesBtn.addEventListener("click", () => {
  window.open("celebration.html", "_blank");
});

// NO hover
noBtn.addEventListener("mouseenter", () => {
  document.body.classList.add("sad");
  bubble.style.display = "block";
  bubbleText.style.display = "block";

  bubbleText.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;
});

// NO leave
noBtn.addEventListener("mouseleave", () => {
  document.body.classList.remove("sad");
  bubble.style.display = "none";
  bubbleText.style.display = "none";
});

// NO click
noBtn.addEventListener("click", () => {
  document.body.classList.remove("sad");
  bubble.style.display = "none";
  bubbleText.style.display = "none";

  topMessage.textContent = "Nothing happened, let's restart";

  setTimeout(() => {
    topMessage.textContent = "";
  }, 10000);
});
