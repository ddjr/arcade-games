"use strict";
const WORLD_BLOCK_SIZE = 50; // size in pixels
var showGridLines = true;

var worldGrid = [];
var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BERFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BERFORE_CAMERA_PAN_Y = 100;

function returnTileTypeAtColRow(col,row) {
    if(isInbound(col,row)) {
      return worldGrid[row][col];
    } else {
    return WORLD_BLOCK_WALL;
  }
}

function characterTileHandling(characterWorldCol, characterWorldRow, character) {
  var tileType = returnTileTypeAtColRow(characterWorldCol,characterWorldRow);
  worldTiles[tileType](character, characterWorldCol, characterWorldRow);
}
function isInbound(col, row) {
  //console.log(row + ","+ col);
  if(row >= worldGrid.length ||
     col >= worldGrid[0].length)
  {
    return false;
  }
  return true;
}

function characterWorldHanding(character) {
  var topCol =  Math.floor(character.x/WORLD_BLOCK_SIZE);
  var topRow =  Math.floor((character.y - 10)/WORLD_BLOCK_SIZE);

  var leftCol = Math.floor((character.x - 10)/WORLD_BLOCK_SIZE);
  var leftRow = Math.floor(character.y/WORLD_BLOCK_SIZE);

  var rightCol = Math.floor((character.x + 10)/WORLD_BLOCK_SIZE);
  var rightRow = Math.floor(character.y/WORLD_BLOCK_SIZE);

  var bottomCol = Math.floor(character.x/WORLD_BLOCK_SIZE);
  var bottomRow = Math.floor((character.y +20)/WORLD_BLOCK_SIZE);

  if(isInbound(leftCol, topRow) &&
     isInbound(rightCol, bottomRow) ){
    characterTileHandling(bottomCol, bottomRow, character);
    if(character.inWall) {
      character.y -= MOVE_SPEED;
      character.inWall = false
    }
    characterTileHandling(topCol, topRow, character);
    if(character.inWall) {
      character.y += MOVE_SPEED;
      character.inWall = false
    }
    characterTileHandling(rightCol, rightRow, character);
    if(character.inWall) {
      character.x -= MOVE_SPEED;
      character.inWall = false
    }
    characterTileHandling(leftCol, leftRow, character);
    if(character.inWall) {
      character.x += MOVE_SPEED;
      character.inWall = false
    }
    if(character.hasCamera) {
      cameraFollow(character);
    }
  } else {
    if(character.x + 10 >= canvas.width) {
        loadLevel(level2);
    }
    if(character.x - 10 < 0) {
        loadLevel(level1);
    }
      pushPlayerToLastLocation(character);
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
  var maxPanTop = worldGrid.length * WORLD_BLOCK_SIZE -  canvas.height + LEVEL_EDITOR_HEIGHT;
  if(camPanX > maxPanRight) {
    camPanX = maxPanRight;
  }
  if(camPanY > maxPanTop) {
    camPanY = maxPanTop;
  }

}

function drawOnlyTilesInView() {
  var cameraLeftMostCol = Math.floor(camPanX / WORLD_BLOCK_SIZE);
  var cameraTopMostRow = Math.floor(camPanY / WORLD_BLOCK_SIZE);

  var colsThatFitOnScreen = Math.floor(canvas.width / WORLD_BLOCK_SIZE);
  var rowsThatFitOnScreen = Math.floor(canvas.height / WORLD_BLOCK_SIZE);

  var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
  var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

  for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
      for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {
        // var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        // if(arrayIndex < worldGrid.length) {
        if( isInbound(eachCol,eachRow) ) {
        var tileKindHere = worldGrid[eachRow][eachCol];
        var useImg = worldPics[tileKindHere];

        if(isTileTransparent(tileKindHere)) {
          canvasContext.drawImage(worldPics[WORLD_ROAD], eachCol*WORLD_BLOCK_SIZE,eachRow*WORLD_BLOCK_SIZE);
        }
        canvasContext.drawImage(useImg, eachCol*WORLD_BLOCK_SIZE, eachRow*WORLD_BLOCK_SIZE);
        if(showGridLines) {
          drawGridLines(eachCol, eachRow);
        } // end if showGridLines
      } // end of if inbounds of worldGrid
    } // end of for eachCol world
  } // end of for eachRow
} // drawOnlyBricksInView()


function drawGridLines(col,row) {
  colorRect(col* WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE -1,row * WORLD_BLOCK_SIZE, 1, WORLD_BLOCK_SIZE, 'grey');
  colorRect(col* WORLD_BLOCK_SIZE ,row *WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE-1, WORLD_BLOCK_SIZE, 1, 'grey');
}
function pushPlayerToLastLocation(character) {
  character.x = character.lastLocation.x;
  character.y = character.lastLocation.y;
}
function drawHUD() {
  //colorText("name: " + player1.name, camPanX ,camPanY+10, 'black');
  //colorText("Score: " + player1.score, camPanX,camPanY + 20, 'black');
  return;
}
