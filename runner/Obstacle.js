function Obstacle () {
  this.x = canvas.width;
  this.height = Math.random() * 50 + 20;
  this.width = 25;
  this.y = groundLevel - this.height;
  this.speed = 10;
  this.color = "green";

  this.draw = function() {
    colorRect(this.x, this.y,this.width, this.height,this.color);
  }
  this.move = function() {
    this.x -= this.speed;
  }
  this.offscreeen = function() {
    if(this.x + this.width <=0) {
      return true;
    }
    return false;
  }
  this.hits = function(runner) {
    if(runner.x > this.x + this.width || // left of runner?
       runner.x + runner.width < this.x || // right of runner?
       runner.y + runner.height < this.y) { // under runner? 
       return false;
    }
    return true;
  }
}
