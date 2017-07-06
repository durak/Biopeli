/**
 * Generates a random name for the city
 */

export default class CityNameGenerator {

  /**
   * @param {Object[]} param.cityNames - list of names that the generator uses  
   */
  constructor ({cityNames}) {
    this.cityNames = cityNames
  }

  /**
  * Generates the name from two randomly chosen names from the list 
  *
  * @returns {String} - newly generated name
  */
  generateName () {
    var first = this.getRandomId()
    var second = this.getRandomId()

    if (second === first) {
      second++
      if (second === this.cityNames.length) {
        second = 0
      }
    }

    var name = this.getStart(first) + this.getEnd(second, first)

    return name
  }

  /**
   * Generates a start for the new name
   * 
   * @param {int} param.id - id of the word to be used 
   * @returns {String} - start for the new name
   */
  getStart (id) {
    var no = this.cityNames[id]

    if (no.full !== undefined) {
      return no.name.slice(0, no.full)
    }

    return no.name.slice(0, no.point)
  }

  /**
   * Generater an end for the new name
   * 
   * @param {int} id - id of the word to be used
   * @param {int} first - id of the name used in the first part
   * @returns {String} - end for the new name
   */
  getEnd (id, first) {
    var no = this.cityNames[id]

    if (this.cityNames[first].full !== undefined) {
      return no.name
    }

    return no.name.slice(no.point)
  }

  /**
   * Ramndomly chooses an id to be used
   * 
   * @returns {int} - randomly chosen id
   */
  getRandomId () {
    var r = Math.random()
    return Math.floor(r * (this.cityNames.length))
  }
}
