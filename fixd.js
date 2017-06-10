'use strict'
const merge = require('lodash.merge')

const fixd = {
  /**
   * Deeply freezes an object
   * @param {*} obj The object to freeze
   * @returns {*}
   */
  freeze: (obj) =>  {
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
   * Add a fixture to the fixd library and freezes if not in namespace
   * @param {String} name A string name to represent the fixture
   * @param {*} value The fixture value
   */
  add: (name, val) => {
    if (fixd[name]) {
      throw new Error(`Cannot add fixture to already reserved namespace '${name}'.`)
    }
    fixd[name] = fixd.freeze({ $fixdVal: val })
  },
  /**
   * Returns a fixture and allows for (option) modification
   * @param {String} name The namespace of the fixture to mutate
   * @param {Function} modifier A function to modify the fixture
   */
  create: (name, modifier) => {
    if (typeof modifier !== 'function') {
      throw new Error('Modifier must be a function')
    }
    return fixd.freeze(modifier(merge(Array.isArray(fixd[name].$fixdVal) ? [] : {}, fixd[name].$fixdVal)))
  }
}

module.exports = new Proxy(fixd, {
  get: function(target, name) {
    if (typeof name === 'symbol') return target
    if (['freeze', 'add', 'create'].indexOf(name) >= 0) return target[name]
    return target[name].$fixdVal
  },
  set: (obj, prop) => {
    throw new TypeError('Fixd objects are not extensible')
  }
})
