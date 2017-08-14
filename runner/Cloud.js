function Cloud() {
  this.x = canvas.width;
  this.y = Math.random() * 50 + 30;
  this.speed = 3;
  this.width = 70;
  this.draw = function() {
    colorRect(this.x, this.y, this.width, 25, "white");
    colorRect(this.x + 20, this.y -20, 25, 20, "white");
  }
  this.move = function() {
    this.x -= this.speed;
  }
  this.offscreeen = function() {
    if(this.x + this.width < 0) {
      return true;
    }
    return false;
  }
}
