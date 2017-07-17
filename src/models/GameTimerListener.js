/**
 * This is a listener for the GameTimer object
 */
export default class GameTimerListener {
  /**
   * @param {City} city
   * @param {Player} player
   * @param {MenuController} menuController
   * @param {TopBarController} topBarController
   * @param {GameEvents} gameEvents
   */
  constructor ({ city, player, menuController, topBarController, gameEvents }) {
    this.city = city
    this.player = player
    this.menuController = menuController
    this.topBarController = topBarController
    this.gameEvents = gameEvents
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimerEvent} timerEvent
  */
  onTimer (timerEvent) {
    var producedTurnips = this.countProductionFromStructures(this.player.structures, timerEvent)
    this.doTransaction(producedTurnips, timerEvent)

    this.redrawControllers()
    // is game over?
    this.gameEvents.isGameOver(timerEvent)
  }

  /**
   * Goes through given structures and sums yearly and weekly productions
   *
   * @param {Structure[]} structures
   * @param {TimerEvent} timerEvent
   */
  countProductionFromStructures (structures, timerEvent) {
    var sum = 0
    for (let structure of structures) {
      sum += structure.produce(timerEvent)
    }
    return sum
  }

  /**
   * Handles the transaction between city and the player
   *
   * @param {number} producedTurnips
   * @param {boolean} buyYearlyHarvest
   */
  doTransaction (producedTurnips, timerEvent) {
    let money = this.city.buyTurnips(producedTurnips, timerEvent.endOfYear)
    this.player.countPoints(money)
    this.player.cash += money
  }

  /**
   * Redraws top bar and menu controllers
   */
  redrawControllers () {
    this.topBarController.redraw()
    this.menuController.redraw()
  }
}
