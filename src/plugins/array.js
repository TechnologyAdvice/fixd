const deepAssign = require('deep-assign')
const { without } = require('halcyon')

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
   * @param {Object} mods Any modification for this specific instance
   * @param {Array} mods.add Array of additions to concat
   * @param {Array} mods.remove Array of items to remove
   * @returns {Array}
   */
  create: (data, mods = { add: [], remove: [] }) => {
    // Validate mods
    if (typeof mods !== 'object') throw new Error(`Must supply a valid object`)
    if (mods.add && !Array.isArray(mods.add)) throw new Error(`Add property must be an array`)
    if (mods.remove && !Array.isArray(mods.remove)) throw new Error(`Remove property must be an array`)
    mods.add = mods.add || []
    mods.remove = mods.remove || []
    // Deep assign nested objects
    data = data.map((x) => typeof x === 'object' ? deepAssign({}, x) : x)
    mods.add = mods.add.map(x => typeof x === 'object' ? deepAssign({}, x): x)
    // Apply modifications and return
    return without(mods.remove, [ ...data ]).concat([ ...mods.add ])
  }
}
