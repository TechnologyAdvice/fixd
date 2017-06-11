'use strict'
const clone = require('lodash.clonedeep')

const fixd = {
  /**
   * Deeply freezes an object
   * @param {*} obj The object to freeze
   * @returns {*}
   */
  freeze: (obj) => {
    Object.freeze(obj)
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      if (obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])) {
        fixd.freeze(obj[prop])
      }
    })
    return obj
  },
  /**
   * Retrieves a value from the fixd library
   * @param {Object} target Target object to retrieve from
   * @param {String} name Property name to retrieve
   * @returns {*} The value of the property
   */
  get: (target, name) => {
    if (typeof name === 'symbol') return target
    if (['freeze', 'get', 'set', 'create'].indexOf(name) >= 0) return target[name]
    return fixd[name].$fixdVal
  },
  /**
   * Add a property to the fixd library and freezes if not in namespace
   * @param {Object} obj The object to set
   * @param {String} prop A string name to represent the fixture
   * @param {*} value The value to set
   * @returns {Boolean}
   */
  set: (obj, prop, value) => {
    if (fixd[prop]) {
      throw new Error(`Cannot add fixture to already reserved namespace '${prop}'.`)
    }
    fixd[prop] = fixd.freeze({ $fixdVal: clone(value) })
    return true
  },
  /**
   * Returns a fixture and allows for (option) modification
   * @param {String} name The namespace of the fixture to mutate
   * @param {Function} modifier A function to modify the fixture
   * @returns {*} Unreferenced, immutable copy of object
   */
  create: (name, modifier) => {
    if (typeof modifier !== 'function') {
      throw new Error('Modifier must be a function')
    }
    return fixd.freeze(modifier(clone(fixd[name].$fixdVal)))
  }
}

module.exports = new Proxy(fixd, fixd)
