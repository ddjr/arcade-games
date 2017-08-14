const MOVE_SPEED = 5;
const JUMP_POWER = 12.0;
const DOUBLE_JUMP_FRAME_BUFFER = 10;

const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const GRAVITY = 0.6;

function characterClass() {
  this.x = 75, this.y = 75;
  this.speedX = 0 , this.speedY = 1;
  this.prevX = this.x , this.prevY = this.y;
  this.col =  Math.floor(this.x / WORLD_BLOCK_SIZE);
  this.row = Math.floor(this.y / WORLD_BLOCK_SIZE);
  this.score = 0;
  this.color = 'white';
  this.radius = 20;
  this.canDoubleJump = true;
  this.doubleJumpFrameBuffer = 0;
  this.sprite; // Character picture displayed
  this.name = "Untitled Character";
  this.lastLocation; // Characters last position
  this.keys = 0; // Keys that unlock doors
  this.onGround = false;

  this.keyHeld_Left = false;
  this.keyHeld_Right = false;

  this.controlKeyUp;
  this.controlKeySpace;
  this.controlKeyRight;
  this.controlKeyLeft;

  this.setupInput = function(upKey, rightKey, leftKey, spaceKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyLeft = leftKey;
    this.controlKeySpace = spaceKey;

  }

  this.reset = function() {
    this.keys = 0;
    this.doubleJumpFrameBuffer = 0;
    this.canDoubleJump = false;
      for(var eachRow=0; eachRow<WORLD_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<WORLD_COLS; eachCol++) {
          if(worldGrid[eachRow][eachCol] == WORLD_PLAYER_START) {
            worldGrid[eachRow][eachCol] = WORLD_ROAD;
            this.ang = -Math.PI/2;
            this.x = eachCol * WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE/2;
            this.y = eachRow * WORLD_BLOCK_SIZE + WORLD_BLOCK_SIZE/2;
            this.prevX = this.x;
            this.prevY = this.y;
            this.col =  Math.floor(this.x / WORLD_BLOCK_SIZE);
            this.row = Math.floor(this.y / WORLD_BLOCK_SIZE);
            return;
          } // end of if start location
        } // end of for eachCol world
      } // end of for eachRow
      console.log("NO PLAYER START FOUND FOR CAR " + this.name);
    } // end  this.reset

  this.isOnWall = function() {
    if(returnTileTypeAtColRow(this.col,this.row)) {
      return true;
    }
    return false;
  }
  this.move = function() {
    this.prevX = this.x;
    this.prevY = this.y;

    if(this.onGround) {
      this.speedX *= GROUND_FRICTION;
    } else {
      this.speedX *= AIR_RESISTANCE;
      this.speedY += GRAVITY;
      if(this.doubleJumpFrameBuffer > 0) { // Prevents double Jump from activing as soon as player jumps
        this.doubleJumpFrameBuffer --;
      }
      if(this.speedY > this.radius) { // Prevents hero from falling too fast
        this.speedY = this.radius;
      }
    }
  //  console.log(this.doubleJumpFrameBuffer);
    if(this.keyHeld_Left){
      this.speedX = -MOVE_SPEED;
    }
    if(this.keyHeld_Right) {
      this.speedX = MOVE_SPEED;
    }

    //console.log("speedX: " + this.speedX + " x: " + this.x );
    //console.log("speedY: " + this.speedY + " y: " + this.y);


    if(this.speedY < 0 && returnTileTypeAtPixelCoord(this.x, this.y - this.radius) == WORLD_WALL) { // Head collision
      this.y = (Math.floor(this.y/WORLD_BLOCK_SIZE)) * WORLD_BLOCK_SIZE + this.radius; // pushs player's head out of above block
      this.speedY = 0;
    }
    if(this.speedY > 0 && returnTileTypeAtPixelCoord(this.x, this.y + this.radius) == WORLD_WALL) { // Feet collision
      this.y = (1+ Math.floor(this.y/WORLD_BLOCK_SIZE)) * WORLD_BLOCK_SIZE - this.radius; // pushs player's feet out of below block
      this.speedY = 0;
      this.onGround = true;
      this.canDoubleJump = true;
      this.doubleJumpFrameBuffer = 0;
      jumpSpamLock = false;
    } else if(returnTileTypeAtPixelCoord(this.x, this.y + this.radius +2) == WORLD_ROAD) {
      this.onGround = false;
    }
    if(this.speedX < 0 && returnTileTypeAtPixelCoord(this.x - this.radius, this.y ) == WORLD_WALL) { // Left side collision
      this.x = (Math.floor(this.x/WORLD_BLOCK_SIZE)) * WORLD_BLOCK_SIZE + this.radius; // pushs player's left side out of side block
    }
    if(this.speedX > 0 && returnTileTypeAtPixelCoord(this.x + this.radius, this.y ) == WORLD_WALL) { // Right side collision
      this.x = (1+ Math.floor(this.x/WORLD_BLOCK_SIZE)) * WORLD_BLOCK_SIZE - this.radius; // pushs player's right side out of side block
    }




    this.x += this.speedX;
    this.y += this.speedY;
    this.col =  Math.floor(this.x / WORLD_BLOCK_SIZE);
    this.row = Math.floor(this.y / WORLD_BLOCK_SIZE);

    cameraFollow(this);




    //characterWorldHanding(this);
  }

  this.draw = function() {
    colorCircle(this.x,this.y, this.radius, this.color);
    //console.log(characterSprite1)
    //drawBitMapRotation(characterSprite1, this.x, this.y, 0);
    drawBitMapRotation(characterSprite2, this.x, this.y, 0);
    // canvasContext.drawImage(characterSprite1, // image
    //   0, 0, 32, 32, // section of image to display
    //   this.x, this.y, 32*2, 32*2); // );


    // colorCircle(this.x + this.speedX, this.y+ this.speedY, this.r, 'red');
    // colorCircle(this.prevX, this.prevY, this.r, 'red');
      //drawBitMapRotation(this.sprite, this.x, this.y, this.ang);
  }
  this.pushToLastLocation = function() {
    this.x = this.prevX;
    this.y = this.prevY;
  }
} // end of carClass
