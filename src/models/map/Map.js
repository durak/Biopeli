import ModelTile from './ModelTile'
import TileType from './TileType'

export default class Map {
  constructor ({ game, gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.game = game
    this.grid = []

    // World map size: top left corner x & y, width, height
    game.world.setBounds(0, 0, gridSizeX * tileWidth, gridSizeY * tileHeight)
  }

  addTileWithGridCoordinates (gx, gy, tileType) {
    var tile = new ModelTile({x: gx, y: gy, type: tileType})
    this.grid[gy * this.gridSizeX + gx] = tile
  }

  addTileWithPixelCoordinates (px, py, tileType) {
    console.log(px+" "+py+" "+tileType)

    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    this.addTileWithGridCoordinates(gx, gy, tileType)
  }

  getTileWithGridCoordinates (gx, gy) {
    return this.grid[gy * this.gridSizeX + gx]
  }

  getTileWithPixelCoordinates (px, py) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    return this.getTileWithGridCoordinates(gx, gy)
  }

  removeTileWithGridCoordinates (gx, gy) {
    this.grid[gy * this.gridSizeX + gx] = undefined
  }

  removeTileWithPixelCoordinates (px, py) {
    this.grid[this.pixelsToGridX(py) * this.gridSizeX + this.pixelsToGridX(px)] = undefined
  }

  /**
   * 
   * @param  events - see InputHandler
   */
  update (events) {
    var event = events.pointer
    if(event != undefined && event.x <= (this.game.camera.width - 256)){
      var x = event.x + this.game.game.camera.x
      var y = event.y + this.game.game.camera.y
      var test = this.getTileWithPixelCoordinates(x, y)

      if (typeof test !== 'undefined') {
        this.removeTileWithPixelCoordinates(x, y)
      }
    }
  }

  // TEST DATA
  createMapHalfForestHalfWater () {
    var limit = 0.2
    var tileTypes = TileType.call()
    var r = Math.random()

    for (var i = 0; i < this.gridSizeY; i++) {
      if (i % 2 === 0) {
        for (var j = 0; j < this.gridSizeX; j++) {
          if (r > limit) {
            this.addTileWithGridCoordinates(j, i, tileTypes.grass)
          } else {
            this.addTileWithGridCoordinates(j, i, tileTypes.farm)
          }
        }
      } else {
        for (var k = 0; k < this.gridSizeX; k++) {
          r = Math.random()
          if (r > limit) {
            this.addTileWithGridCoordinates(k, i, tileTypes.grass)
          } else {
            if (r > 0.08) {
              this.addTileWithGridCoordinates(k, i, tileTypes.forest2)
            } else {
              this.addTileWithGridCoordinates(k, i, tileTypes.water2)
            }
          }
          // last tile check
          if (i === (this.gridSizeY - 1) && k === (this.gridSizeX - 1)) {
            this.removeTileWithGridCoordinates(k, i)
          }
        }
      }
    }
  }

  // Pixel-Grid-Pixel conversion helpers

  pixelsToGridX (x) {
    return Math.floor(x / this.tileWidth)
  }

  pixelsToGridY (y) {
    return Math.floor(y / this.tileHeight)
  }

  gridToPixelsX (x) {
    return x * this.tileWidth
  }

  gridToPixelsY (y) {
    return y * this.tileHeight
  }
}
