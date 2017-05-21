const deepAssign = require('deep-assign')

module.exports = {
  /**
   * @property {String} plugin name
   */
  name: 'JSON',
  /**
   * Adds a JSON object as a fixture
   * @param {String} json The JSON object to set as default fixture
   * @returns {Object}
   */
  add: (json) => {
    try {
      return JSON.parse(json)
    } catch (e) {
      throw new Error(`Must supply valid JSON`)
    }
  },

  /**
   * Creates a new instance of the fixture with any required modifications
   * @param {Object} data The original fixture data
   * @param {Object} mods Any modification for this specific instance
   * @returns {String}
   */
  create: (data, mods = {}) => {
    if (typeof mods !== 'object') throw new Error(`Must supply a valid object`)
    return JSON.stringify(deepAssign({}, data, mods))
  }
}
