var characterSprite1 = document.createElement("img");
var characterSprite2 = document.createElement("img");
var worldPics = [];
var picsToLoad = 0; // Set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
  picsToLoad --;
  //console.log(picsToLoad);
  if(picsToLoad == 0) {
    imageLoadingDoneSoStartGame();
  }
}
function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = "img/" + fileName;
}
function loadImageForWorldCode(worldCode, fileName) {
  worldPics[worldCode] = document.createElement("img");
  beginLoadingImage(worldPics[worldCode] , fileName);
}
function loadImages() {
  var imageList= [
    {varName: characterSprite1, theFile: "marioSpriteSheet.png" },
    {varName: characterSprite2, theFile: "character.png" },
    {worldType: WORLD_ROAD, theFile: "softsand_special.png" },
    {worldType: WORLD_WALL, theFile: "sandstone_brick.png" },
    {worldType: WORLD_FILL, theFile: "softsand.png" },
    {worldType: WORLD_TREE, theFile: "tree.png" },
    {worldType: WORLD_CRACK, theFile: "sandstone_crackedbrick.png" },
    {worldType: WORLD_KEY, theFile: "key.png" },
    {worldType: WORLD_DOOR, theFile: "sandstone_door.png" },
    {worldType: WORLD_GOAL, theFile: "cup.png" }
  ];

  picsToLoad = imageList.length;
  for(var i=0; i<imageList.length;i++) {
    if(imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
    }
  }

}
