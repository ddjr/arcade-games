var worldTiles = {};
  worldTiles[WORLD_ROAD] = tileGroundHandling;
  worldTiles[WORLD_WALL] = tileGroundHandling;
  worldTiles[WORLD_FILL] = tileGroundHandling;
  worldTiles[WORLD_CRACK] = tileGroundHandling;

  worldTiles[WORLD_TREE] = tileWallHandling;
  worldTiles[WORLD_DOOR] = tileDoorHandling;
  worldTiles[WORLD_GOAL] = tileGoalHandling;
  worldTiles[WORLD_WATER] = tileWaterHandling;
  worldTiles[WORLD_KEY] = tileKeyHandling;
  worldTiles[WORLD_ORB] = tileOrbHandling;

function isTileTransparent(tileType) {
  if(tileType == WORLD_KEY ||
     tileType == WORLD_TREE ||
     tileType == WORLD_GOAL ||
     tileType == WORLD_ORB) {
    return true;
  }
  return false;
}
function tileKeyHandling(character,characterWorldCol,characterWorldRow) {
  character.keys ++;
  character.score += 100;
  worldGrid[characterWorldRow][characterWorldCol] = WORLD_ROAD;
  console.log("you have " + character.keys + " keys!");
}
function tileWallHandling(character,characterWorldCol,characterWorldRow) {
  character.inWall = true;
}
function tileGroundHandling(character,characterWorldCol,characterWorldRow) {
  // character does not interact with the ground
}
function tileDoorHandling(character,characterWorldCol,characterWorldRow) { // <-- jokes are real
  if(character.keys > 0) {
    worldGrid[characterWorldRow][characterWorldCol] = WORLD_ROAD;
    character.keys -= 1;
    character.score += 50;
    console.log("you have " + character.keys + " keys!");
  } else {
    tileWallHandling(character,characterWorldCol,characterWorldRow);
  }
}
function tileWaterHandling (character,characterWorldCol,characterWorldRow){
  if(character.canSwim) {
    tileGroundHandling(character,characterWorldCol,characterWorldRow);
    character.onWater = true;
  } else {
    tileWallHandling(character,characterWorldCol,characterWorldRow);
  }
}
function tileGoalHandling(character,characterWorldCol,characterWorldRow) {
  loadLevel(levels[0]);
}
function tileOrbHandling(character,characterWorldCol,characterWorldRow) {
  character.canSwim = true;
  worldGrid[characterWorldRow][characterWorldCol] = WORLD_ROAD;
  console.log("you can now swim!!");
}
