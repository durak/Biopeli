export default class GameTimerListener {
  constructor ({ city, player, menuView, topBarController }) {
    this.city = city
    this.player = player
    this.menuView = menuView
    this.topBarController = topBarController
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimeEvent} timerEvent
  */
  onTimer (timerEvent) {
    var produced = 0
    for (let structure of this.player.structures) {
      produced += structure.produce(timerEvent)
    }
    //this.player.countPoints(produced) // Replace with desired functionality  

    let transaction = this.city.buyTurnips(produced)
    var fulfilledPct = transaction.percentage
    this.player.countPoints(fulfilledPct)
    this.player.cash += transaction.earnings
    this.topBarController.update({
      time: timerEvent.toString(),
      score: this.player.points,
      cash: this.player.cash,
      fulfilledPct: fulfilledPct
    })
    
    this.menuView.redraw()
  }
}
