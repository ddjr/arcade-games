var debugMode = false;
function debug_DrawMouseCoord() {
  if(debugMode) {
    var mouseTrackCol = mouseX / WORLD_BLOCK_SIZE;
    var mouseTrackRow = mouseY / WORLD_BLOCK_SIZE;
    var trackIndexUnderMouse = rowColToArrayIndex(Math.floor(mouseTrackCol), Math.floor(mouseTrackRow));
    colorText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'black');
  } // end of if debugMode
}
