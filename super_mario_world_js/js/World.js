var worldGrid = [];





var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BERFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BERFORE_CAMERA_PAN_Y = 100;


function characterWorldHanding(character) {
  var characterWorldCol = Math.floor(character.x / WORLD_BLOCK_SIZE);
  var characterWorldRow = Math.floor(character.y / WORLD_BLOCK_SIZE);

  if(characterWorldCol >= 0 && characterWorldCol < WORLD_COLS && // is character within the left and right bounds of the worldGrid
     characterWorldRow >= 0 && characterWorldRow < WORLD_ROWS) { // is character within the top and bottom bounds of the worldGrid
    cameraFollow(character)
    characterTileHandling(character);
  } else {
    character.pushToLastLocation();
  }// end of if in bounds of worldGrid
} // end of characterWorldHanding

function cameraFollow(character) {
  var centerOfViewX = camPanX + canvas.width/2;
  var centerOfViewY = camPanY + canvas.height/2;

  var characterDistFromCenterOfViewX = Math.abs(character.x - centerOfViewX);
  var characterDistFromCenterOfViewY = Math.abs(character.y - centerOfViewY);
  if(characterDistFromCenterOfViewX > PLAYER_DIST_FROM_CENTER_BERFORE_CAMERA_PAN_X) {
    if(centerOfViewX < character.x) {
      camPanX += MOVE_SPEED;
    } else {
      camPanX -= MOVE_SPEED;
    }
  }
  if(characterDistFromCenterOfViewY > PLAYER_DIST_FROM_CENTER_BERFORE_CAMERA_PAN_Y) {
    if(centerOfViewY < character.y) {
      camPanY += MOVE_SPEED;
    } else {
      camPanY -= MOVE_SPEED;
    }
  }
  preventCameraPanningOffTheMap();
} // end cameraFollow()
function preventCameraPanningOffTheMap() {
  if(camPanX < 0) {
    camPanX = 0;
  }
  if(camPanY < 0) {
    camPanY = 0;
  }
  var maxPanRight = worldGrid[0].length * WORLD_BLOCK_SIZE - canvas.width;
  var maxPanTop = worldGrid.length * WORLD_BLOCK_SIZE -  canvas.height;
  if(camPanX > maxPanRight) {
    camPanX = maxPanRight;
  }
  if(camPanY > maxPanTop) {
    camPanY = maxPanTop;
  }

}

// function rowColToArrayIndex(col, row) {
//   return  col + WORLD_COLS * row;
// }
function drawOnlyBricksInView() {
  var cameraLeftMostCol = Math.floor(camPanX / WORLD_BLOCK_SIZE);
  var cameraTopMostRow = Math.floor(camPanY / WORLD_BLOCK_SIZE);

  var colsThatFitOnScreen = Math.floor(canvas.width / WORLD_BLOCK_SIZE);
  var rowsThatFitOnScreen = Math.floor(canvas.height / WORLD_BLOCK_SIZE);

  var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
  var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

  for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {
    for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
      const BRICK_GAP = 2;
      if(worldGrid[eachRow][eachCol] == 1){
        colorRect(eachCol*WORLD_BLOCK_SIZE,eachRow*WORLD_BLOCK_SIZE, WORLD_BLOCK_SIZE-BRICK_GAP,WORLD_BLOCK_SIZE-BRICK_GAP, 'BLUE');
      }

    } // end of for eachCol world
  } // end of for eachRow
}
function drawWorld() {
  var drawTitleX = 0;
  var drawTitleY = 0;
  for(var eachRow=0; eachRow<WORLD_ROWS; eachRow++) {
    for(var eachCol=0; eachCol<WORLD_COLS; eachCol++) {
      const BRICK_GAP = 2;
      if(worldGrid[row][col] == 1){
        colorRect(eachCol*WORLD_BLOCK_SIZE,eachRow*WORLD_BLOCK_SIZE, WORLD_BLOCK_SIZE-BRICK_GAP,WORLD_BLOCK_SIZE-BRICK_GAP, 'BLUE');
      }
      drawTitleX += WORLD_BLOCK_SIZE;
    } // end of for eachCol world
    drawTitleX = 0;
    drawTitleY += WORLD_BLOCK_SIZE;
  } // end of for eachRow
} // end of drawWorld()
