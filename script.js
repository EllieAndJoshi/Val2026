const sadBubble = document.getElementById("sad-bubble");
const bubbleText = document.getElementById("bubble-text");

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
