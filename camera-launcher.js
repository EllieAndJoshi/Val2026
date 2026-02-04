const cameraBtn = document.getElementById("cameraBtn");

cameraBtn.addEventListener("click", () => {
  window.open(
    "camera.html",
    "cameraWindow",
    "width=420,height=640,resizable=yes"
  );
});