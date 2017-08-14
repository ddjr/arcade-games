function Runner() {

  this.x = 50;
  this.y = 300;
  this.speed = 0;
  this.width = 25;
  this.height = 50;
  this.isDucking = false;

  this.draw = function() {
    colorRect(this.x, this.y, this.width , this.height, "white");
  }
  this.jump = function() {
    if(this.y < groundLevel - this.height) {
      return;
    }
    this.speed -= 35;
  }
  this.duck = function() {
    this.speed += 5;
  }
  this.move = function() {
    if(this.isDucking) {
      this.duck();
    }
    this.speed += GRAVITY;
    this.speed *= AIR_RESISTENCE;
    this.y += this.speed;
    if(this.y >= groundLevel- this.height) {
      this.y = groundLevel- this.height;
      this.speed = 0;
    }
  }
  this.reset = function() {
    this.y = 300;
    this.speed = 0;
  }
}
