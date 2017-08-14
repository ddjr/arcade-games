
function npcClass() {
  this.x = 75;
  this.y = 75;
  this.canSwim = false;
  this.sprite; // Character picture displayed
  this.spriteWater;
  this.name = "Untitled Character";
  this.lastLocation; // Characters last position
  this.keys = 0; // Keys that unlock doors
  this.onWater = false;
  this.hasCamera = false;
  this.startCol = 10;
  this.startRow = 10;

  this.keyHeld_Up = false;
  this.keyHeld_Down = false;
  this.keyHeld_Left = false;
  this.keyHeld_Right = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, leftKey, downKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;

  }

  this.reset = function(image, water_image, name) {
  this.sprite = image;
  this.name = name;
  this.spriteWater = water_image;
  this.speed = 0;
  this.keys = 0;
  this.ang = -Math.PI/2;
  this.x = this.startCol * WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE/2;
  this.y = this.startRow  * WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE/2;
  this.lastLocation = { x:this.x, y:this.y };
  } // end  this.reset

  this.move = function() {
    var willMove = Math.random() * 500;

    if(willMove < 2 ) {
      this.y -= MOVE_SPEED;
    } else if(willMove < 4 ) {
      this.y += MOVE_SPEED;
    } else if(willMove < 6){
      this.x -= MOVE_SPEED;
    } else if(willMove < 8) {
      this.x += MOVE_SPEED;
    }
    characterWorldHanding(this , this.hasCamera);
    this.lastLocation = { x:this.x, y:this.y };// should come after characterWorldHanding()

  }
  this.draw = function() {
    if(this.onWater) {
      drawBitMapRotation(this.spriteWater, this.x, this.y, this.ang);
    } else {
      drawBitMapRotation(this.sprite, this.x, this.y, this.ang);
    }
    this.onWater = false;
  }
} // end of carClass
