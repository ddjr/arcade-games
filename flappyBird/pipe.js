function Pipe() {
  this.gap = 100;
  this.gapY = (Math.random() * (canvas.height -this.gap- 40)) +  this.gap + 20;
  this.x = canvas.width;
  this.speed = 10;
  this.width = 30;
  this.color = "white";
  this.draw = function() {
    drawRect(this.x, 0, this.width, this.gapY - this.gap, this.color);
    drawRect(this.x, this.gapY, this.width, canvas.height - this.gapY, this.color);
  }
  this.move = function() {
    this.x -= this.speed;
  }
  this.offscreeen = function() {
    if(this.x < 0) {
      return true;
    }
    return false;
  }
  this.hits = function(bird) {
    if(this.x <= bird.x && this.x + this.width >= bird.x) {
     if(bird.y < this.gapY - this.gap || bird.y > this.gapY ) {
        return true;
      }
      return false;
    }
  }
}
