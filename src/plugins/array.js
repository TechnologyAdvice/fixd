module.exports = {
  /**
   * @property {String} plugin name
   */
  name: 'Array',
  /**
   * Adds an array as a fixture
   * @param {Array} array The array to set as default fixture
   * @returns {Array}
   */
  add: (array) => {
    if (!Array.isArray(array)) throw new Error(`Must supply a valid array`)
    return array
  },

  /**
   * Creates a new instance of the fixture with any required modifications
   * @param {Array} data The original fixture data
   * @param {Array} mods Any modification for this specific instance
   * @returns {Array}
   */
  create: (data, mods = []) => {
    if (!Array.isArray(mods)) throw new Error(`Must supply a valid array`)
    return mods.length ? [ ...data, ...mods ] : [ ...data ]
  }
}
