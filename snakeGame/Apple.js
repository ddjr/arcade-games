class Apple {
  constructor() {
    this.pickLocation()
  }
  pickLocation() {
    var cols = floor(width/GRID_SCALE)
    var rows = floor(height/GRID_SCALE)
    this.x = floor(random(cols)) * GRID_SCALE
    this.y = floor(random(rows)) * GRID_SCALE
  }
  show() {
    fill('gold')
    rect(this.x, this.y,GRID_SCALE, GRID_SCALE)
  }
}
