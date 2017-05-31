// +label
// +menuOptions[]
// +targetTile
// update
// getComponent
// getAllComponents
// addComponent
// sendMessage
// broadcastMessage

import MenuView from '../sprites/MenuView'
import MenuOptionManager from './MenuOptionManager'

export default class Menu {
  constructor({ game, menuViewWidth }) {
    this.game = game
    this.label = 'Klikkaa kartan ruutua'
    this.targetTile = undefined
    this.menuOptions = []

    this.menuView = new MenuView({
      game: this.game,
      menu: this,
      menuViewWidth: menuViewWidth
    })
    
  }

  update () {
    // if activePointer.isDown and the cursor is over a menuOption
    if (this.game.input.activePointer.isDown) {
      // do menuOption action and sendMessage to Map
      // update menuOptions
    }
    this.menuView.redraw()
  }
  
  setLabel(label) {
    this.label = label
  }
  
  setTargetTile (target) {
    this.targetTile = target
  }
  
}
