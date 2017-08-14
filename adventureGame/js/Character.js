const MOVE_SPEED = 15;

function characterClass() {
  this.x = 75;
  this.y = 75;
  this.hitBox = 15;
  this.score = 0;
  this.canSwim = false;
  this.inWall = false;
  this.sprite; // Character picture displayed
  this.spriteWater;
  this.name = "Untitled Character";
  this.lastLocation; // Characters last position
  this.keys = 0; // Keys that unlock doors
  this.onWater = false;
  this.hasCamera = true;

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
    this.x = 8 * WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE/2;
    this.y = 4 * WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE/2;
    this.lastLocation = { x:this.x, y:this.y };
  } // end  this.reset

  this.move = function() {
    if(this.keyHeld_Up) {
      this.y -= MOVE_SPEED;
    }
    if(this.keyHeld_Down) {
      this.y += MOVE_SPEED;
    }
    if(this.keyHeld_Left){
      this.x -= MOVE_SPEED;
    }
    if(this.keyHeld_Right) {
      this.x += MOVE_SPEED;
    }
    characterWorldHanding(this);
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
