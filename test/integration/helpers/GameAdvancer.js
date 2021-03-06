import GameStub from './GameStub'
import GamestateChecker from './GamestateChecker'
import GameState from '../../../src/game/GameState'

// import config from './PseudoConfig'
import config from '../../../assets/json/configurations'
import tileTypes from './PseudoTiletypes'
import structureTypes from './PseudoStructuretypes'

import Structure from '../../../src/models/structure/Structure'
import pseudoTexts from './PseudoTexts'
import pseudoEvents from './PseudoEvents'
import pseudoStructureHints from './PseudoStructureHints'
import pseudoBioFacts from './PseudoBioFacts'

const assert = require("assert")

/**
 * Provides functions for simulating inputs of user and passing of time
 */
export default class GameAdvancer {

  /**
   * Initializes integration testing game
   */
  constructor(gameLength) {
    if(gameLength == null){
      gameLength = 1000
    }

    this.mapWidth = 20
    this.mapHeight = 20

    this.game = new GameStub({ width: config.gameSettings.windowSize.maxWidth, height: config.gameSettings.windowSize.maxHeight })
    this.Noise = class Noise{
      constructor(){
        this.callCount = 0
      }

      perlin2(){
        this.callCount ++
        return 1
      }
    }

    var gameData = {
      names: {
        structureNames: {
          ownerAdjectives: ['testing'],
          ownerNames: ['tester'],
          structureAdjectives: ['testive'],
          exaggerations: 'testiest'
        }
      },
      gameEvents: {
        events: pseudoEvents
      },
      structureHints: pseudoStructureHints,
      bioFacts: pseudoBioFacts
    }

    this.gameState = new GameState({
      cityName: 'testVille',
      startMoney: 15000,
      perlinNoise: this.Noise,
      state: this.game,
      mapSize: {width: this.mapWidth, height: this.mapHeight},
      tileSize: config.mapSettings.tileSize,
      menuWidth: config.sideMenuSettings.menuWidth,
      gameLength: gameLength,
      config: config,
      structureTypes: structureTypes,
      tileTypes: tileTypes,
      texts: pseudoTexts,
      gameData: gameData
    })

    this.gamestateChecker = new GamestateChecker({gameStub: this.game, gameState: this.gameState, gameAdvancer: this})

    var cm = this.gameState.cameraMover
    this.cameraXSpeed = cm.x
    this.cameraYSpeed = cm.y

    this.estimatedX = this.game.camera.x
    this.estimatedY = this.game.camera.y

    this.mapRealWidth = this.mapWidth * config.tileWidth
    this.mapRealHeight = this.mapHeight * config.tileHeight

    this.timeObject = { time: 0 }
    this.gameState.currentTime = function (timeObject) {
      var returnFunction = function () {
        return timeObject.time
      }

      return returnFunction
    }(this.timeObject)
    this.gameState.gameTimer.lastTime = 0

    this.tileTypes = tileTypes
    this.structureTypes = structureTypes

    this.structureFactory = this.gameState.structureFactory

    // The events are not shuffled
    this.gameState.eventRandomizer.shuffleEvents = (array) => {return array}
  }

  /**
   * Sets the time to wanted number and updates the game
   */
  update(time) {
    if(time == null) {
      time = 0
    }
    
    this.timeObject.time += time

    this.gameState.update()
  }

  /**
  * Makes several update calls with wanted time interval
  * @param {*} times 
  * @param {*} interval 
  */
  updateSeveralTimes(times, interval) {
    for (let i = 0; i < times; i++) {
      this.update(interval)
    }
  }

  /**
   * Click nth button that currently exist in menu
   * @param {*} n 
   */
  clickNthButton(n) {
    var button = this.gameState.menuView.activeButtons[n - 1]
    this.clickButton(button.x, button.y)
  }

  /**
   * Click nth button in bottom menu
   * @param {*} n 
   */
  clickNthBottomMenuButton(n) {
    var button = this.gameState.bottomMenuView.activeButtons[n - 1]
    this.clickBottomMenuButton(button.x, button.y)
  }

  /**
   * Simulates click of a pointer to certain point in camera
   * 
   * @param {number} x 
   * @param {number} y 
   */
  click(x, y) {
    this.game.setPointer(x, y)
    this.clickButton(x, y)
    this.gameState.inputHandler.onPointerDown()
  }

  clickTile(x, y){
    var tileSize = this.gameState.map.tileWidth
    this.game.setPointer(x * tileSize, y * tileSize)
    this.gameState.inputHandler.onPointerDown()
  }

  /**
   * Simulates click of a pointer to certain point in camera but only checks buttons
   * 
   * @param {number} x 
   * @param {number} y 
   */
  clickButton(x, y) {
    var buttons = this.gameState.menuView.activeButtons

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i]

      if (x == button.x && y == button.y) {
        button.callback.call(button.context)

        return
      }
    }

  }

  /**
   * Simulates click of a pointer to certain point in camera but only checks buttons
   * 
   * @param {number} x 
   * @param {number} y 
   */
  clickBottomMenuButton(x, y) {
    var buttons = this.gameState.bottomMenuView.activeButtons

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i]

      if (x == button.x && y == button.y) {
        button.callback.call(button.context)

        return
      }
    }

  }

  /**
   * Simulates cursor input
   * 
   * @param {boolean} up 
   * @param {boolean} down 
   * @param {boolean} left 
   * @param {boolean} right 
   */
  pressCursors(up, down, left, right) {
    this.game.setCursors(up, down, left, right)
    this.gameState.inputHandler.onCursorDown()

    if (up) (this.estimatedY - this.cameraYSpeed < 0) ? this.estimatedY = 0 : this.estimatedY -= this.cameraYSpeed
    if (left) (this.estimatedX - this.cameraXSpeed < 0) ? this.estimatedX = 0 : this.estimatedX -= this.cameraXSpeed
    if (down) (this.estimatedY + this.cameraYSpeed > this.mapRealHeight) ? this.estimatedY = this.mapRealHeight : this.estimatedY += this.cameraYSpeed
    if (right) (this.estimatedX + this.cameraXSpeed > this.mapRealWidth) ? this.estimatedX = this.mapRealWidth : this.estimatedX += this.cameraXSpeed
  }

  /**
   * Set the camera to wanted location (helper function)
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setCamera(x, y) {
    this.game.setCamera(x, y)
    this.estimatedX = x
    this.estimatedY = y
  }

  /**
   * Presumed location of camera
   * 
   * @return {{x: Number, y: Number}}
   */
  estimatedCameraLocation() {
    return {
      x: this.estimatedX,
      y: this.estimatedY
    }
  }

  /**
   * Set camera to starting position
   */
  resetCamera() {
    this.setCamera(0, 0)
  }

  /**
   * Helper method hat gives tile from map
   * 
   * @param {*} gridX 
   * @param {*} gridY 
   */
  getTile(gridX, gridY) {
    return this.gameState.map.getTileWithGridCoordinates(gridX, gridY)
  }

  /**
   * Sets the tile in map as preferred
   * 
   * @param {*} gridX 
   * @param {*} gridY 
   * @param {*} tileTypeName 
   */
  setTile(gridX, gridY, tileTypeName) {
    let moisture = 55
    let fertility = 66
    var tile = this.gameState.map.addTileWithGridCoordinates(gridX, gridY, this.tileTypes[tileTypeName], moisture, fertility)
  }

  setStructure(gridX, gridY, owner, name, structureTypeName, size, foundingYear, cost) {
    var tile = this.getTile(gridX, gridY)

    this.structureFactory.buildBuilding(tile, this.structureTypes[structureTypeName])

    var str = tile.structure
    str.owner = owner
    str.name = name
    str.size = size
    str.foundingYear = foundingYear
    str.cost = cost
  }

  buildBuilding (x, y, tileType, button, button2, button3) {
    if(button3 == null) button3 = 1
    this.setTile(x, y, tileType)
    this.clickTile(x, y)
    this.clickNthButton(button)
    this.clickNthButton(button2)
    this.clickNthButton(button3)
  }

  setTileWithStructure(gridX, gridY, tileTypeName, structureType, sowner, sname, ssize, sfoundingYear, scost) {
    this.setTile(gridX, gridY, tileTypeName)
    this.setStructure(gridX, gridY, sowner, sname, structureType, ssize, sfoundingYear, scost)
  }

  setMoney(value) {
    this.gameState.player.cash = value
  } 

  setRuiningTime(value) {
    var sf = this.gameState.structureFactory
    sf.minRuin = value
    sf.maxRuin = value
  }

  activateRandomEvents() {
    this.gameState.randomEventHandler.timeWindowRandomizer.tryNext = () => {return true}
  }

  deactivateRandomEvents() {
    this.gameState.randomEventHandler.timeWindowRandomizer.tryNext = () => {return false}
  }

  activateBioFacts() {
    this.gameState.bioFactsGenerator.timer.tryNext = () => {return true}
  }

  deactivateBioFacts() {
    this.gameState.bioFactsGenerator.timer.tryNext = () => {return false}
  }

  setPopulation(value) {
    this.gameState.city.population = value
  }

  getStructureProductionInTile(x, y) {
    this.clickTile(x, y)
    var productionString = this.findActiveText('Tuotto')
    // deselect the tile
    this.clickTile(x, y)
    // format (from PseudoTexts): "Tuotto (€/vko): ##"
    return JSON.parse(productionString.slice(16))
  }

  findActiveText(textLabel) {
    var activeTexts = this.gameState.menuView.activeTexts
    for (var i = 0; i < activeTexts.length; i++) {
      var activeText = activeTexts[i].text.text  
      if (activeText.includes(textLabel)) {
        return activeText
      }
    }
    return null
  }
}
