/* =================================================
   CAMERA LAUNCHER (CELEBRATION PAGE)
================================================= */

const cameraBtn = document.getElementById("cameraBtn");

if (cameraBtn) {

  cameraBtn.addEventListener("click", () => {

    window.open(
      "camera.html",
      "cameraWindow",
      "width=1400,height=900,resizable=yes"
    );

  });

}