import Phaser from 'phaser'
import MenuBuilder from '../controllers/menucontrol/MenuBuilder'

/**
 * Game instructions
 */
export default class extends Phaser.State {
  init (gameData) {
    this.gameData = gameData
  }

  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height / 4, this.gameData.config)
    this.menu.createTitle('Ohjeet')
    this.menu.createDescription(
      'Tarkkaile maaperän kosteutta ja ravinteita.\n' +
      'Rakenna alku- sekä jatkotuotantorakennuksia.\n' +
      'Vastaa kaupungin kysyntään.'
    )
    this.menu.createButton('Takaisin', () => { this.state.start('Start', true, false, this.gameData) })
    this.menu.finishMenu()
  }
}
