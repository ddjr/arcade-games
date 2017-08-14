var canvas, canvasContext;
var hero = new characterClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  drawLoadingScreen();
  imageLoadingDoneSoStartGame();

}
function drawLoadingScreen() {
  colorRect(0,0,canvas.width, canvas.height, 'black');
  colorText("Loading ....",canvas.width/2 - 20, canvas.height/2 - 20, 'white');
}

function imageLoadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  setupInput();
  loadLevel(levels[0]);
  //sliderReset();
}
function loadLevel(level) {
  worldGrid = level.slice();
  hero.reset();
}

function updateAll() {
  moveAll();
  drawAll();
}
function moveAll() {
  hero.move();
}
function drawAll() {
  colorRect(0,0,canvas.width, canvas.height, 'black');
  canvasContext.save();
  canvasContext.translate( -camPanX, -camPanY);
  drawOnlyBricksInView();
  hero.draw();
  canvasContext.restore();
  debug_DrawMouseCoord();
}
