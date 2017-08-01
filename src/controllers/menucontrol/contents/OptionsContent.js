import Content from './Content'

export default class OptionsContent extends Content {
  constructor ({ game }) {
    super()
    this.game = game
  }

  musicOn() {
    this.game.music.mute = false
  }
 
  musicOff() {
    this.game.music.mute = true
  }

  incVolume() {
    if (this.game.music.volume < 1 ) { this.game.music.volume += 0.1 } 
    if (this.game.music.volume > 1) { this.game.music.volume = 1 }
  }

  decVolume() {
    if (this.game.music.volume > 0) { this.game.music.volume -= 0.1 }
    if (this.game.music.volume < 0) { this.game.music.volume = 0 }
  }

  pauseGame() {
    this.game.state.paused = false
  }

  unpauseGame() {
    this.game.state.paused = true
  }

  createSections () {
    this.sectionName('options')
    console.log(this.game.state.paused)
    if (!this.game.state.paused) {
      this.button('Jatka peliä', this.unpauseGame, this)
    } else {
       this.button('Pysäytä peli', this.pauseGame, this)
    }
    this.text('Äänen voimakkuus: ' + Math.round(this.game.music.volume*100) + '%')
    if (this.game.music.mute) {
      this.button('Äänet päälle', this.musicOn, this)
    } else {
      this.button('Äänet pois', this.musicOff, this)  
    }
    this.button('Volyymi +', this.incVolume, this) 
    this.button('Volyymi -', this.decVolume, this)
    this.button('Lopeta', this.game.gameEvents.finishGame, this.game.gameEvents)
  }
}
