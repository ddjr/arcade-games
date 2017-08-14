const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYER_START = 2;
const WORLD_FILL = 3;
const WORLD_TREE = 4;
const WORLD_CRACK = 5;
const WORLD_KEY = 6;
const WORLD_DOOR = 7;
const WORLD_GOAL = 8;

const WORLD_BLOCK_SIZE = 50; // size in pixels
var worldTiles =[
  {tileType: WORLD_ROAD, tileHandler: tileGroundHandling },
  {tileType: WORLD_WALL, tileHandler: tileWallHandling },
  {tileType: WORLD_PLAYER_START, tileHandler: tileGroundHandling}
];

function returnTileTypeAtColRow(col,row) {
  if(col >= 0 && col < worldGrid[0].length && // is character within the left and right bounds of the worldGrid
     row >= 0 && row < worldGrid.length) { // is character within the top and bottom bounds of the worldGrid
    return worldGrid[row][col];
  } else {
    console.log("could not find tile type");
    return WORLD_WALL;
  }
}
function returnTileTypeAtPixelCoord(x,y) {
  var col = Math.floor(x/WORLD_BLOCK_SIZE);
  var row = Math.floor(y/WORLD_BLOCK_SIZE);
  if(col >= 0 && col < worldGrid[0].length && // is character within the left and right bounds of the worldGrid
     row >= 0 && row < worldGrid.length) { // is character within the top and bottom bounds of the worldGrid
    return worldGrid[row][col];
  } else {
    console.log("could not find tile type");
    return WORLD_WALL;
  }
}

function isTileTransparent(tileType) {
  if(tileType == WORLD_KEY ||
     tileType == WORLD_TREE ||
     tileType == WORLD_GOAL ) {
    return true;
  }
  return false;
}
function characterTileHandling(character) {
  var tileType = returnTileTypeAtColRow(character.col,character.row);
  worldTiles[tileType].tileHandler(character);
}
function tileWallHandling(character) {
  character.onGround = true;
  character.speedY = 0;
  character.pushToLastLocation();


}
function tileGroundHandling(character,currentIndex) {
  // character does not interact with the ground
  character.onGround = false;
}
