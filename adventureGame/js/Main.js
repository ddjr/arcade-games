var canvas, canvasContext;
var player1 = new characterClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  colorRect(0,0,canvas.width, canvas.height, 'black');
  colorText("Loading ....",canvas.width/2 - 20, canvas.height/2 - 20, 'white');
  loadImages();
}

function imageLoadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  setupInput();
  loadLevel(level1);
}
function loadLevel(level) {
  worldGrid = level.slice();
  console.log(worldGrid);
  player1.reset(characterSprite1, characterWaterSprite, "Red Rock Racer");
}

function updateAll() {
  moveAll();
  drawAll();
}
function moveAll() {
  player1.move();
}
function drawAll() {
  canvasContext.save();
  canvasContext.translate( -camPanX, -camPanY + LEVEL_EDITOR_HEIGHT);
  drawOnlyTilesInView();
  drawHUD();
  drawMouseHover();
  player1.draw();
  canvasContext.restore();
  drawTileSelector();
  drawMouseHoverTileSelector();
  if(mouseheld) {
     handleMouseClick();
  }

  debug_DrawMouseCoord();
}
