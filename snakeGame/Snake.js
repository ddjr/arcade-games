class Snake {
  constructor() {
    this.x = GRID_SCALE
    this.y = GRID_SCALE
    this.xspeed = GRID_SCALE
    this.yspeed = 0
    this.length = 0
    this.tail = []
  }
  update() {
    if(this.length === this.tail.length) {
      for(var i=0; i<this.length-1; i++) {
        this.tail[i] = this.tail[i+1]
      }
    }
    this.tail[this.length-1] = createVector(this.x, this.y)
    this.x += this.xspeed
    this.y += this.yspeed
    this.x = constrain(this.x , 0, width - GRID_SCALE)
    this.y = constrain(this.y , 0, height - GRID_SCALE)
  }
  show() {
    fill('red')
    for(var i=0; i<this.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, GRID_SCALE,GRID_SCALE)
    }
    rect(this.x, this.y, GRID_SCALE,GRID_SCALE)
  }

  direction(xspeed, yspeed) {
    this.xspeed = xspeed
    this.yspeed = yspeed
  }
  didEat(apple) {
    if(apple.x == this.x && apple.y == this.y) {
      console.log("EATTING APPLE")
      this.length++
      return true
    }
    return false
  }
  hitTail() {
    for(var i=0; i< this.length; i++) {
      if(this.x == this.tail[i].x && this.y == this.tail[i].y) {
        return true
      }
    }
    return false
  } // end didHitTail()
} // end class Snake
