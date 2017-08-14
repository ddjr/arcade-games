var mouseX = 0;
var mouseY = 0;
var selectedIndex = -1;
var selectedTile = -1;



const TILE_W = TILE_H = 75;
const TILE_GAP = 1;
const TILE_COLS = 8;
const TILE_ROWS = 8;


const SELECTOR_COLS = 3;
const SELECTOR_ROWS = 8;
var selectedTile = 0;
var selectorGrid = [
   1, 2, 3, 4, 5, 6, 0, 0,
  -1,-2,-3,-4,-5,-6, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0];
var tileGrid =
[ 2, 4, 3, 6, 5, 3, 4, 2,
  1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
 -1,-1,-1,-1,-1,-1,-1,-1,
 -2,-4,-3,-6,-5,-3,-4,-2];

 const NO_PIECE = 0;
 const PAWN = 1;
 const ROOK = 2;
 const BISHOP = 3;
 const KNIGHT = 4;
 const KING = 5;
 const QUEEN = 6;

var canvas, canvasContext;

function tileCoordToIndex(col, row) {
  return (col + TILE_COLS*row);
}
window.onload = function() {
  // Connect js to canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');


  colorRect(0,0,canvas.width, canvas.height, 'black');
  colorText("Loading ....",canvas.width/2 - 20, canvas.height/2 - 20, 'white');
  loadImages();
  // Connect mouse to js

}
function imageLoadingDoneSoStartGame() {


  var framesPerSecond = 30;
  setInterval(function() {
    drawEverything();
  }, 1000/framesPerSecond);
  canvasContext.font = "12px Arial";
  initInput();
  loadLevel(level1);
}
funciton loadLevel(level) {
  worldGrid = level.slice();
}

function drawPieces(index, tileLeftEdgeX, tileTopEdgeY) {
  var pieceHere = tileGrid[index];

  var pieceName = "";

  if(pieceHere < 0) {
    canvasContext.fillStyle = 'white';
    pieceName = "whi.";
  } else if(pieceHere > 0) {
    canvasContext.fillStyle = 'black';
    pieceName = "Blk.";
  }
  switch (Math.abs(pieceHere)) {
    case NO_PIECE:
      break;
    case PAWN:
      pieceName += "Pawn";
      break;
    case ROOK:
      pieceName += "Rook";
      break;
    case BISHOP:
      pieceName += "Bishop";
      break;
    case KNIGHT:
      pieceName += "Knight";
      break;
    case KING:
      pieceName += "King";
    break;
    case QUEEN:
      pieceName += "Queen";
      break;
  }
  canvasContext.fillText(pieceName, tileLeftEdgeX + TILE_W/2, tileTopEdgeY  + TILE_H/2);
}
function drawTiles() {
  for(var eachCol=0; eachCol<TILE_COLS; eachCol++) {
    for(var eachRow=0; eachRow<TILE_ROWS; eachRow++) {
      var tileLeftEdgeX = eachCol * TILE_W;
      var tileTopEdgeY = eachRow * TILE_H;
      if ((eachCol + eachRow) % 2 == 0) { // <- creates black and white checker board
        colorRect(tileLeftEdgeX,tileTopEdgeY,
                  TILE_W-TILE_GAP, TILE_H - TILE_GAP, '#aaaaaa');
      } else {
        colorRect(tileLeftEdgeX,tileTopEdgeY,
                  TILE_W-TILE_GAP, TILE_H - TILE_GAP, '#888888');
      } // end if else (draw checker board)
      var idxHere = tileCoordToIndex(eachCol, eachRow);
      drawPieces(idxHere, tileLeftEdgeX, tileTopEdgeY);
    } // end for eachRow
  } // end for eachCol
} // end drawTiles()

function drawSelectorTiles() {
    for(var eachRow=0; eachRow<SELECTOR_ROWS; eachRow++) {
      for(var eachCol=0; eachCol<SELECTOR_COLS; eachCol++) {
      var tileLeftEdgeX = TILE_COLS * TILE_W + (eachCol*TILE_W);
      var tileTopEdgeY = eachRow * TILE_H;
      if ((eachCol + eachRow) % 2 == 0) { // <- creates black and white checker board
        colorRect(tileLeftEdgeX,tileTopEdgeY,
                  TILE_W-TILE_GAP, TILE_H - TILE_GAP, '#ffaaaa');
      } else {
        colorRect(tileLeftEdgeX,tileTopEdgeY,
                  TILE_W-TILE_GAP, TILE_H - TILE_GAP, '#ff8888');
      } // end if else (draw checker board)
      var idxHere = tileCoordToIndex(eachRow, eachCol);
      drawSelectorPieces(idxHere, tileLeftEdgeX, tileTopEdgeY);
    } // end for eachRow
  }
} // end drawTiles()
function drawSelectorPieces(idxHere, tileLeftEdgeX, tileTopEdgeY) {
  var pieceHere = selectorGrid[idxHere];

  var pieceName = "";

  if(pieceHere < 0) {
    canvasContext.fillStyle = 'white';
    pieceName = "whi.";
  } else if(pieceHere > 0) {
    canvasContext.fillStyle = 'black';
    pieceName = "Blk.";
  }
  switch (Math.abs(pieceHere)) {
    case NO_PIECE:
      break;
    case PAWN:
      pieceName += "Pawn";
      break;
    case ROOK:
      pieceName += "Rook";
      break;
    case BISHOP:
      pieceName += "Bishop";
      break;
    case KNIGHT:
      pieceName += "Knight";
      break;
    case KING:
      pieceName += "King";
    break;
    case QUEEN:
      pieceName += "Queen";
      break;
  }
  canvasContext.fillText(pieceName, tileLeftEdgeX + TILE_W/2, tileTopEdgeY  + TILE_H/2);
}
function drawEverything() {
  colorRect(0,0, canvas.width, canvas.height, 'black');

  canvasContext.textAlign = 'center';
  drawTiles();
  drawSelectorTiles();
  drawMouseHover();

}
function printLevel() {
  console.log("var level = [" + tileGrid + "];");
}
