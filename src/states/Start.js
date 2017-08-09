import Phaser from 'phaser'

import MenuBuilder from '../controllers/menucontrol/MenuBuilder'
import CityNameGenerator from '../models/namegeneration/CityNameGenerator'
import utils from '../utils'

/**
 * Screen displayed when the game is started
 */
export default class Start extends Phaser.State {
  init (gameData) {
    this.gameData = gameData
  }

  create () {
    var cityName = new CityNameGenerator({
      cityNames: this.gameData.names.cityNames,
      randomWithBounds: utils.randomWithBounds
    }).generateName()

    this.menuMusic = this.add.audio('menu')
    this.menuMusic.play()
    this.menuMusic.loopFull()

    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4, this.gameData.config)
    this.menu.createTitle('Biopeli')
    this.menu.createDescription('MTechin tilaama peli biotaloudesta ja ruokaketjusta.')
    this.menu.createButton(
      'Aloita peli',
      () => { 
        this.state.start('Game', true, false, cityName, this.gameData, this.menuMusic.stop())
      }
    )
    this.menu.createButton(
      'Ohjeet', () => {
        this.state.start('Instructions', true, false, this.gameData, this.menuMusic.stop())
      }
    )
    this.menu.finishMenu()
  }
}
