'use strict'
const merge = require('lodash.merge')

const fixd = {
  /**
   * Add a fixture to the fixd library and freezes if not in namespace
   * @param {String} name A string name to represent the fixture
   * @param {*} value The fixture value
   */
  add: (name, val) => {
    if (Object.keys(fixd).indexOf(name) >= 0) {
      throw new Error(`Cannot add fixture to already reserved namespace '${name}'.`)
    }
    fixd[name] = Object.freeze(val)
  },
  /**
   * Allows mutation of already existing fixture by providing name of fixture and
   * modifier method
   * @param {String} name The namespace of the fixture to mutate
   * @param {Function} modifier A function to modify the fixture
   */
  mutate: (name, modifier) => {
    if (!modifier || typeof modifier !== 'function') {
      throw new Error('Modifier must be a function')
    }
    return Object.freeze(modifier(merge({}, fixd[name])))
  }
}

module.exports = fixd
