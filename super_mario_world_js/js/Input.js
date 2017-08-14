// Player 1 controls
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_SPACE = 32;

// Player 2 controls
const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;



var mouseX, mouseY;
var jumpSpamLock = false; // player has to release the jump key to double jump

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  hero.setupInput(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_LEFT_ARROW,KEY_SPACE);
  //player2.setupInput(KEY_W,KEY_D,KEY_A,KEY_S);
}
function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

function ketSet(character, evt, setTo) {
  var keyCode = evt.keyCode;

  if(keyCode == character.controlKeyLeft) {
     character.keyHeld_Left = setTo;
  }
  if(keyCode == character.controlKeyRight) {
     character.keyHeld_Right = setTo;
  }
  if(keyCode == character.controlKeyUp || keyCode == character.controlKeySpace) {
    if(character.onGround) {
      character.speedY = -JUMP_POWER;
      console.log("player jumped");
      jumpSpamLock = true;
      character.doubleJumpFrameBuffer = DOUBLE_JUMP_FRAME_BUFFER;
    } else if(character.canDoubleJump && character.doubleJumpFrameBuffer == 0 && jumpSpamLock == false) {
      character.canDoubleJump = false;
      character.speedY = -JUMP_POWER;
      console.log("player double jumped");
    }
  }
  evt.preventDefault();
}
function keyPressed(evt) {
  if(debugMode) {
    console.log("key pressed: " + evt.keyCode);
  }
  ketSet(hero,evt, true);
  //ketSet(player2,evt, true);
}
function keyReleased(evt) {
  ketSet(hero,evt, false);
  var keyCode = evt.keyCode;
  if(keyCode == hero.controlKeyUp || keyCode == hero.controlKeySpace) {
    jumpSpamLock = false;
  }
  //ketSet(player2,evt, false);
}
