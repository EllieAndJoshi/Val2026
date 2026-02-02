const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadBubble = document.getElementById("sad-bubble");
const bubbleText = document.getElementById("bubble-text");
const topMessage = document.getElementById("top-message");

const messages = [
  "Tu joues à quoi?",
  "EHHH lache ça???",
  "Tu m'aimes plus c'est ça?!",
  "Bon..."
];

let msgIndex = 0;

// YES
yesBtn.addEventListener("click", () => {
  window.open("celebration.html", "_blank");
});

// NO hover
noBtn.addEventListener("mouseenter", () => {
  document.body.classList.add("sad");
  sadBubble.style.display = "block";
  bubbleText.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;
});

// NO leave
noBtn.addEventListener("mouseleave", () => {
  document.body.classList.remove("sad");
  sadBubble.style.display = "none";
});

// NO click
noBtn.addEventListener("click", () => {
  document.body.classList.remove("sad");
  sadBubble.style.display = "none";

  topMessage.textContent = "Nan bon aller plus sérieusement...";
  topMessage.classList.add("show");

  setTimeout(() => {
    topMessage.textContent = "";
    topMessage.classList.remove("show");
  }, 1000);
});
