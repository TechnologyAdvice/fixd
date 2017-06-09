'use strict'
const merge = require('lodash.merge')
const freeze = require('deep-freeze')

const fixd = {
  /**
   * Add a fixture to the fixd library and freezes if not in namespace
   * @param {String} name A string name to represent the fixture
   * @param {*} value The fixture value
   */
  add: (name, val) => {
    if (fixd[name]) {
      throw new Error(`Cannot add fixture to already reserved namespace '${name}'.`)
    }
    fixd[name] = freeze(val)
  },
  /**
   * Returns a fixture and allows for (option) modification
   * @param {String} name The namespace of the fixture to mutate
   * @param {Function} [modifier] A function to modify the fixture
   */
  create: (name, modifier) => {
    if (!modifier) {
      return fixd[name]
    }
    if (typeof modifier !== 'function') {
      throw new Error('Modifier must be a function')
    }
    return freeze(modifier(merge({}, fixd[name])))
  }
}

module.exports = fixd
