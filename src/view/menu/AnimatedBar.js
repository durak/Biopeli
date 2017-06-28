export default class AnimatedBar {
  constructor ({ game, group, horizontal, width, height, x, y }) {
    this.game = game
    this.horizontal = horizontal
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.colors = { background: '#2e221f', bar: '#67244f' }
    this.duration = 250
    this.group = group

    this.draw()
  }

  draw () {
    let bitmapBg = this.game.add.bitmapData(this.width, this.height)
    bitmapBg.ctx.fillStyle = this.colors.background
    bitmapBg.ctx.beginPath()
    bitmapBg.ctx.rect(0, 0, this.width, this.height)
    bitmapBg.ctx.fill()

    this.background = this.group.create(this.x, this.y, bitmapBg, null, this.group)

    let bitmapBar = this.game.add.bitmapData(this.width, this.height)
    bitmapBar.ctx.fillStyle = this.colors.bar
    bitmapBar.ctx.beginPath()
    bitmapBar.ctx.rect(0, 0, this.width, this.height)
    bitmapBar.ctx.fill()

    this.bar = this.group.create(this.x, this.y, bitmapBar, null, this.group)
  }

  /**
   * Animate bar fill to new value
   *
   * @param {number} value - Percentage value between [0, 100]
   * @memberof AnimatedBar
   */
  setPercentage (value) {
    if(this.horizontal){
      let inPixels = value * this.width / 100
      this.game.add.tween(this.bar).to({ width: inPixels }, this.duration, 'Linear', true)
    }else{
      let inPixels = value * this.height / 100
      this.game.add.tween(this.bar).to({ height: inPixels }, this.duration, 'Linear', true)
    }
  }
}
