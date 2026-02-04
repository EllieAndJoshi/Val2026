const cameraBtn = document.getElementById("cameraBtn");
const modal = document.getElementById("camera-modal");
const video = document.getElementById("video");
const closeBtn = document.getElementById("closeCamera");

let stream = null;

cameraBtn.addEventListener("click", async () => {
  document.title = "📸 Take a screenshot here!";

  modal.style.display = "flex";

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    });

    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied 😢");
    modal.style.display = "none";
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.title = "YESS❤️";

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
});
