const cameraBtn = document.getElementById("cameraBtn");

cameraBtn.addEventListener("click", () => {
  window.open(
    "camera.html",
    "cameraWindow",
    "width=1920,height=1080,resizable=yes"
  );
});