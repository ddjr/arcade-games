var gravity = 0.9;
const AIR_RESISTENCE = 0.95;
const MAX_SPEED = 70;
var bird;
var pipe;
var counter = 0;
var score = 0;
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  var FPS = 30;

  setInterval(function() {
    counter++;
    if(counter % 50 == 0) {
      pipes.push(new Pipe());
      score++;
    }
    move();
    draw();

  }, 1000/FPS);

  window.addEventListener('keydown',function(event) {
    if(event.key == " ") {
      bird.speed -= bird.lift;
    }
  });
}

function reset() {
  score = -1;
  bird.y = canvas.width/2;
  bird.speed = 0;
  pipes = [];
}

function move() {
  bird.move();
  for(var i=pipes.length-1; i >= 0; i--) {
    pipes[i].move();
    if(pipes[i].offscreeen()){
      pipes.splice(i,1);
    }
    if(pipes[i].hits(bird)) {
      reset();
    }

  }
}

function draw() {
  drawRect(0,0, canvas.width, canvas.height, "black");
  bird.draw();
  for(var i=0; i<pipes.length; i++){
    pipes[i].draw();
  }
  colorText("score: " + score, 20, 20, "yellow");
}

function drawCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
function drawRect(x,y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height);
}
function colorText(showWords, textX,textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX,textY);
}
