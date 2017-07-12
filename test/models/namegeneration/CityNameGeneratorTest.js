const assert = require("assert")
const sinon = require("sinon")
import CityNameGenerator from '../../../src/models/namegeneration/CityNameGenerator'

describe('Tests for city name generation', () => {
  var namegen, randomStub, oneFull

  beforeEach(() => {
    randomStub = sinon.stub()

    oneFull = [
      {name: 'Helsinki', point: 6},
      {name: 'Turku', point: 3, full: 5}
    ]
    namegen = new CityNameGenerator({cityNames: oneFull})
  })

  it('getStart works', () => {
    assert.equal(namegen.getStart(0), 'Helsin')
    assert.equal(namegen.getStart(1), 'Turku')
  })

  it('getEnd works', () => {
    assert.equal(namegen.getEnd(0, 1), 'Helsinki')
    assert.equal(namegen.getEnd(1, 0), 'ku')
  })

  it('Name is generated correctly', () => {
    namegen.getRandomId = randomStub
    randomStub.onCall(0).returns(0)
    randomStub.onCall(1).returns(1)
    var name = namegen.generateName()
    assert.equal(name, 'Helsinku')
  })

  it('Changes first and second if same', () => {
    namegen.getRandomId = randomStub
    randomStub.onCall(0).returns(0)
    randomStub.onCall(1).returns(0)
    var name = namegen.generateName()
    assert.equal(name, 'Helsinku')
  })

  it('Changes first and second if same and last', () => {
    namegen.getRandomId = randomStub
    randomStub.onCall(0).returns(1)
    randomStub.onCall(1).returns(1)
    var name = namegen.generateName()
    assert.equal(name, 'TurkuHelsinki')
  })

  it('getRandomId works', () => {
    namegen.mathRandom = randomStub
    randomStub.returns(6.87)
    assert.equal(namegen.getRandomId(), 13)
  })
})
