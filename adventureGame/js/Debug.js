var debugMode = false;
function debug_DrawMouseCoord() {
  if(debugMode) {
    var mouseTrackCol = mouseX / WORLD_BLOCK_SIZE;
    var mouseTrackRow = mouseY / WORLD_BLOCK_SIZE;
    colorText(mouseTrackCol+","+mouseTrackRow+":", mouseX, mouseY, 'black');
  } // end of if debugMode
}
