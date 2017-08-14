function Bird() {
  this.x = 100;
  this.y = 100;
  this.speed = -6;
  this.lift = 20;

  this.draw = function () {
    drawCircle(this.x , this.y, 10, "white");
  }
  this.move = function() {
    this.speed += gravity;
    this.speed *= AIR_RESISTENCE;
    if(this.speed > MAX_SPEED) {
      this.speed = MAX_SPEED;
    }
    this.y += this.speed;
    if(this.y > canvas.height) {
      this.y = canvas.height;
    } else if (this.y < 0 ) {
      this.y = 0;
      this.speed = 0;
    }
  }
  this.didCollide = function() {
    return false;
  }
}
