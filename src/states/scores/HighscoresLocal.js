import Phaser from 'phaser'
import MenuBuilder from '../../controllers/menucontrol/MenuBuilder'
import utils from '../../utils'
import config from '../../../assets/json/configurations'

export default class HighscoresLocal extends Phaser.State {
  init (gameData, scores) {
    this.gameData = gameData
    this.scores = scores
  }

  binSearch (val) {
    var min = 0, 
        max = this.scores.length--,
        mid

    while (min < max) {
      mid = (min + max) >> 1
      var diff = this.scores[mid] - val
      if(diff < 0) {
        max = mid--
      } else if (diff > 0) {
        min = mid++
      } else {
        break
      }
    }

    return mid
  }

  addScores () {
    var i = this.binSearch(this.scores)
    var start = (i >= 5) ? i - 5 : 0
    var end = (start + 5 < this.scores.length) ? start + 5 : this.scores.length
    for (i = start; i < end; i++) {
      this.menu.createDescription(
        '' + (i + 1) + ': ' + 
        this.scores[i].player + ' - ' + 
        this.scores[i].points + '\n'
      )
    }
  }

  create () {
    this.menu = new MenuBuilder(this, 'start', this.camera.height * 1 / 10, this.gameData.config)
    this.menu.createTitle('Tulokset')

    this.addScores()

    this.menu.createButton('Uusi peli', () => { 
      this.state.start('Start', true, false, this.gameData) 
    })

    this.menu.createButton('Top 10', () => {
        this.state.start('HighscoresTop10', true, false, this.gameData, this.scores)
    })

    this.menu.finishMenu()
  }
}
