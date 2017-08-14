var canvas, canvasContext;
var runner;
var groundLevel;
const GRAVITY = 3;
const AIR_RESISTENCE = 0.95;
var score = 0;
var highScore = 0;


var obstacles = [];
var clouds = [];;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  runner = new Runner();
  groundLevel = canvas.height - 1;
  obstacles.push(new Obstacle());
  clouds.push(new Cloud());
  var FPS = 30;
  setInterval(function() {
    score++;
    if(score % 25 == 0) {
      var dice = (Math.random()*6 + Math.random()*6);
      if(dice > 6) {
        obstacles.push(new Obstacle());
      }
      dice = (Math.random()*6 + Math.random()*6);
      if(dice > 10) {
        clouds.push(new Cloud());
      }
    }
    move();
    draw();
  }, 1000/FPS);

  window.addEventListener('keydown', function(event) {
    if(event.key == " " || event.key == "ArrowUp") {
      runner.jump();
    }
    if(event.key == "ArrowDown") {
      runner.isDucking = true;
    } else {
      runner.isDucking = false;
    }
  });
}
function reset() {
  if(score > highScore) {
    highScore = score;
  }
  score = 0;
  obstacles = [];
  runner.reset();
}
function move() {
  runner.move();
  for(var i=obstacles.length -1; i>=0; i--) {
    obstacles[i].move();
    if(obstacles[i].hits(runner)) {
      reset();
      return;
    } //end if hits
    if(obstacles[i].offscreeen()) {
      obstacles.splice(i,1);
    }

  } // end for each Obstacle
  for(var i=clouds.length -1; i>=0; i--) {
    clouds[i].move();
    if(clouds[i].offscreeen()) {
      clouds.splice(i,1);
    }

  } // end for each Obstacle
} // end move()
function draw() {
  // background
  colorRect(0,0,canvas.width, canvas.height, 'lightblue');
  for(var i=clouds.length -1; i>=0; i--) {
    clouds[i].draw();
  }
  runner.draw();
  for(var i=obstacles.length -1; i>=0; i--) {
    obstacles[i].draw();
  }

  canvasContext.font = "14px Arial";
  colorText("Highscore: " + Math.floor(highScore/2), 20,20,"black");
  colorText("Score: " + Math.floor(score/2), 20,35,"black");
}
