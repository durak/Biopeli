const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/map/structure/StructureFactory'

describe('StructureFactory tests', () => {
  var sfactory, gameTimer, player, addStructureSpy

  beforeEach(() => {
    addStructureSpy = sinon.spy()
    
    player = {
      addStructure: addStructureSpy,
      enoughCashFor: () => true ,
      cash: 0
    }
    
    gameTimer = {
      currentTimeEvent: {
        year: 7
      }
    }
    
    sfactory = new StructureFactory({
      gameTimer: gameTimer,
      player: player
    })

    sfactory.namer = {
      createBuildingName: ()=>'joku nimi',
      createOwnerName: ()=>'nimi joku'
    }
  })

  it('Constructor works', () => {
    assert.equal(gameTimer, sfactory.gameTimer)
    assert.equal(player, sfactory.player)
  })

  it('Build building works', () => {
    var tile = { structure: {}, flowers: 0 }
    var structureType = {}
    var createProducerSpy = sinon.spy()
    sfactory.createProducer = createProducerSpy
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile, tile.structure.tile)
    assert.equal(10, tile.structure.size)
    assert.equal(structureType, tile.structure.structureType)
    assert.equal(7, tile.structure.foundingYear)
    assert(createProducerSpy.calledWith(structureType, tile))
    assert(addStructureSpy.calledWith(tile.structure))
  })
  it('Build building does not do anything if checkMoney returns false', () => {
    var tile = { structure: undefined, flowers: 0 }
    var structureType = {}
    var checkMoneyStub = sinon.stub()
    checkMoneyStub.withArgs(structureType).returns(false)

    sfactory.checkMoney = checkMoneyStub
    sfactory.buildBuilding(tile, structureType)
    assert.equal(tile.structure, undefined)
  })

  it('Money checking works', () =>{
    player.cash = 2
    var st = {cost: 1}

    assert(sfactory.checkMoney(st))
    assert.equal(1, player.cash)

    assert(sfactory.checkMoney(st))
    assert.equal(0, player.cash)

    sfactory.checkMoney = () => false

    assert(!sfactory.checkMoney(st))
    assert.equal(0, player.cash)
  })
})
