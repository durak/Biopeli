import Content from './Content'
/**
 * Controller of side menu of the game
 */
export default class SideMenuContent extends Content {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ city, gameEvents }) {
    super()
    this.city = city
    this.gameEvents = gameEvents
  }

  /**
   * Create blueprint of the menu's contents
   */
  createSections () {
    this.sectionName('city')
    this.text('City: ' + this.city.name)
    this.text('Population: ' + this.city.population)
    this.text('Yearly demand: ' + this.city.turnipDemand.yearDemand)
    this.text('Demand supplied: ' + this.format(this.city.turnipDemand.collectedSupply))
    this.text('Current turnip price: ' + this.city.turnipDemand.currentPrice())
    this.button('Lopeta', this.gameEvents.finishGame, this.gameEvents)

    if (!this.owner.hasStateValue('selectedTile')) {
      return
    }

    var tile = this.owner.stateValue('selectedTile')

    this.section('tile')
    this.text('Ground type: ' + tile.tileType.name)
    this.text('X: ' + tile.x + ', Y: ' + tile.y)
    this.text('Flowers: ' + tile.flowers)
    if (tile.owner != null) {
      this.text('Land owner: ' + tile.owner.ownerName)
    }

    if (tile.structure != null) {
      var structure = tile.structure

      this.section('structure')
      this.text('"' + structure.ownerName + '"')
      this.text('"' + structure.structureName + '"')
      this.text('Structure: ' + structure.structureType.name)
      this.text('Founding year: ' + structure.foundingYear)
      this.text('Size: ' + structure.size)
      this.text('Production input: ' + structure.productionInput)
      this.text('Production per time: ' + structure.calculateProductionEfficiency())

      this.section('ruin')
      this.text('Structure health: ' + structure.health.toString())
      this.animatedBar(200, 50, true, structure.health.percent())
      if (structure.health.percent() < 1) {
        this.button('Repair: ', structure.healthManager.fix, structure.healthManager, 'emptyButton')
      } else {
        this.button('Perfect condition', () => {}, null, 'unusableButton')
      }
    }

    this.tileActions(tile)
  }

  tileActions (tile) {
    if (tile == null) {
      return
    }

    if (tile.structure == null) {
      this.section('actions')
      this.buttonActionsForTile(tile)
    }
  }

  buttonActionsForTile (tile) {
    var allowedStructures = tile.tileType.allowedStructures

    for (let structureType of allowedStructures) {
      this.owner.changeButton(
        structureType.name,
        1,
        this.owner.wrapFunction(this.owner.addState, this.owner, 'structureType', structureType),
        this
      )
    }
  }
}