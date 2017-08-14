var snake, apple
var debug_mode = false;
const GRID_SCALE = 25

function setup() {
  frameRate(10)
  createCanvas(600,400)
  reset()
}
function reset() {
  snake = new Snake()
  apple = new Apple()
}
function draw() {
  // Game Logic
  if(snake.didEat(apple)) { apple = new Apple() } // must go before snake.update
  snake.update()
  if(snake.hitTail()) { reset() }
  // Drawing
  background(51)
  snake.show()
  apple.show()
}
function mousePressed() {
  if(debug_mode) { snake.length++ }
}
function keyPressed() {
  if(keyCode == UP_ARROW) {
    snake.direction(0,-GRID_SCALE)
  } else if (keyCode == DOWN_ARROW) {
    snake.direction(0,GRID_SCALE)
  } else if (keyCode == LEFT_ARROW) {
    snake.direction(-GRID_SCALE,0)
  } else if (keyCode == RIGHT_ARROW) {
    snake.direction(GRID_SCALE,0)
  }
}
