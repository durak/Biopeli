import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Building structures', () => {

  var game, gameState, gameAdvancer, gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Can build a wheat farm on grass', () => {
    gameAdvancer.clickTile(1, 1)
    gameStateChecker.checkButtonAmountInMenu(3)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkButtonAmountInMenu(4)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'wheat_farm', true)
  })

  it('Wheat farm buys land and has size and owned farmland', () => {
    gameAdvancer.buildBuilding(0, 0, 'grass', 1, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat_farm', true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 6)
    gameStateChecker.checkStructureOwnedFarmLand(0, 0, 6)
    gameStateChecker.checkStructureSize(0, 0, 6)
  })

  it('Farmland is based on grasstiles, not forest or water', () => {
    gameAdvancer.setTile(1, 1, 'forest')
    gameAdvancer.setTile(0, 1, 'water')
    gameAdvancer.buildBuilding(0, 0, 'grass', 1, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat_farm', true)
    gameStateChecker.checkTilesInformation(1, 1, 'forest', null, true)
    gameStateChecker.checkTilesInformation(0, 1, 'water', null, true)
    gameStateChecker.checkTilesInformation(1, 0, 'field', null, true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 3)
    gameStateChecker.checkStructureOwnedFarmLand(0, 0, 3)
    gameStateChecker.checkStructureSize(0, 0, 3)
  })

  it('Can build a dairy farm on grass', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 2)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'dairy_farm', true)
  })

  it('Can build a berry farm on grass', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 3)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'berry_farm', true)
  })

  it('Can build a mill on grass', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(1, 1, 'grass', 2, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'industrial', 'mill', true)
    gameStateChecker.checkStructureOwnedTiles(1, 1, 5)
    gameStateChecker.checkStructureSize(1, 1, 0)
  })

  it('Can build a fish_refinery on grass', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(1, 1, 'grass', 2, 2)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'industrial', 'fish_refinery', true)
    gameStateChecker.checkStructureOwnedTiles(1, 1, 1)
    gameStateChecker.checkStructureSize(1, 1, 0)
  })

  it('Can build a fishery on water', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(1, 1, 'water', 1, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'water_field', 'fishery', true)
    gameStateChecker.checkStructureOwnedTiles(1, 1, 1)
    gameStateChecker.checkStructureSize(1, 1, 1)
  })

  it('Can build a special structure (fertilizer factory) on grass', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(1, 1, 'grass', 3, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'grass', 'fertilizer_factory', true)
    gameStateChecker.checkStructureSize(1, 1, 0)
  })

  it('Building a fertilizer factory increases fertility nearby', () => {
    gameAdvancer.setTile(0, 1, 'grass')
    gameAdvancer.setTile(2, 1, 'grass')
    gameAdvancer.setTile(1, 0, 'grass')
    gameAdvancer.setTile(1, 2, 'grass')
    // prior to building
    gameStateChecker.checkFertility(0, 1, 66)
    gameStateChecker.checkFertility(2, 1, 66)
    gameStateChecker.checkFertility(1, 0, 66)
    gameStateChecker.checkFertility(1, 2, 66)
    
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(1, 1, 'grass', 3, 1)
    // after building
    gameStateChecker.checkFertility(0, 1, 86)
    gameStateChecker.checkFertility(2, 1, 86)
    gameStateChecker.checkFertility(1, 0, 86)
    gameStateChecker.checkFertility(1, 2, 86)
  })

  it('Can not build on tile with structure', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 1)
    gameAdvancer.clickTile(1, 1)
    gameStateChecker.checkButtonAmountInMenu(2)
  })

  it('Can not build producer on tile that is owned', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 1)
    gameAdvancer.clickTile(1, 2)
    gameStateChecker.checkButtonAmountInMenu(2)
  })

  it('Building a farm reduces the total amount of money', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 1)
    gameStateChecker.checkMoney(5000)
  })

  it('Cannot build with insufficient funds', () => {
    gameAdvancer.setMoney(765)
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 1)
    gameStateChecker.checkMoney(765)
    gameStateChecker.checkSelectedTile(1, 1)
    gameStateChecker.checkTilesInformation(1, 1, 'grass', null, true)
  })

  it('Back button returns to structure type selection', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 2, 1, 2)
    gameStateChecker.checkButtonAmountInMenu(3)
  })

  it('Back button works when insufficient funds', () => {
    gameAdvancer.setMoney(0)
    gameAdvancer.buildBuilding(1, 1, 'grass', 2, 1, 2)
    gameStateChecker.checkButtonAmountInMenu(3)
  })

  it('Mill steals land from producer, can be built on owned land', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(0, 0, 'grass', 1, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat_farm', true)
    gameStateChecker.checkTilesInformation(0, 1, 'field', null, true)
    gameStateChecker.checkTilesInformation(1, 0, 'field', null, true)
    gameStateChecker.checkTilesInformation(1, 1, 'field', null, true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 6)
    gameStateChecker.checkStructureOwnedFarmLand(0, 0, 6)
    gameStateChecker.checkStructureSize(0, 0, 6)
     gameAdvancer.buildBuilding(1, 1, 'field', 1, 1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat_farm', true)
    gameStateChecker.checkTilesInformation(0, 1, 'industrial', null, true)
    gameStateChecker.checkTilesInformation(1, 0, 'industrial', null, true)
    gameStateChecker.checkTilesInformation(1, 1, 'industrial', 'mill', true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 4)
    gameStateChecker.checkStructureOwnedTiles(1, 1, 5)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 4)
    gameStateChecker.checkStructureOwnedFarmLand(0, 0, 4)
    gameStateChecker.checkStructureSize(0, 0, 4)
  })  
})