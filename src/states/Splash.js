import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('menuBg', 'assets/images/low-poly-bg.png')
    this.load.spritesheet('button', 'assets/images/button_sprite_sheet.png', 193, 71)
    this.load.image('emptyButton', 'assets/images/empty_button.png')

    this.load.image('forest', 'assets/images/tiles/forest.png')
    this.load.image('water', 'assets/images/tiles/water.png')
    this.load.image('grass', 'assets/images/tiles/grass.png')
    this.load.image('farm', 'assets/images/structures/farm.png')
    this.load.image('granary', 'assets/images/structures/granary.png')
  }

  create () {
    this.state.start('Game')
  }
}
