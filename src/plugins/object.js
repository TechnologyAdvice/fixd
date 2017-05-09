module.exports = {
  /**
   * Adds an object as a fixture
   * @param {Object} object The object to set as default fixture
   * @returns {Object}
   */
  add: (object) => {
    if (typeof object !== 'object') throw new Error(`Must supply a valid object`)
    return object
  },
  
  /**
   * Creates a new instance of the fixture with any required modifications
   * @param {Object} data The original fixture data
   * @param {Object} mods Any modification for this specific instance
   * @returns {Object}
   */
  create: (data, mods = {}) => {
    if (typeof mods !== 'object') throw new Error(`Must supply a valid object`)
    return Object.assign({}, data, mods)
  }
}
