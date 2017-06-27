import StructureFactory from '../../map/StructureFactory'
import ButtonAction from '../ButtonAction'

/**
 * Description goes here
 *
 * @param {ModelTile} tile
 * @param {StructureType} structureTypes
 * @param {GameTimer} gameTimer
 * @return {ButtonAction[]}
 */
export default function ForestActions(tile, structureTypes, gameTimer, player) {
  var sbuilder = new StructureFactory({
    tile: tile,
    structureTypes: structureTypes,
    gameTimer: gameTimer,
    player: player
  })

  var createDairyFarm = new ButtonAction({
    name: 'Build a dairy farm',
    functionToCall: sbuilder.build.dairyFarm,
    context: sbuilder
  })

  return [createDairyFarm]
}
