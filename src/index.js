const fs = require('fs')
const path = require('path')

const fixd = {
  /**
   * @property {Object} fixtures
   */
  fixtures: {},
  
  /**
   * Instructs fixd to use plugin, creates addPLUGIN method
   * @param {Object} plugin The plugin object to apply
   */
  use: function (plugin) {
    const pluginPath = path.resolve(__dirname, `./plugins/${plugin}.js`)
    try {
      fs.statSync(pluginPath)
      fixd[`add${plugin.charAt(0).toUpperCase() + plugin.slice(1)}`] = (name, ...args) => {
        // Validations
        if (!name || typeof name !== 'string') throw new Error('Must supply a (string) name value for the fixture')
        if (fixd.fixtures[name]) throw new Error(`Fixture ${name} already exists, must be unique`)

        // Setup fixture
        const plug = require(pluginPath)
        fixd.fixtures[name] = {
          data: plug.add(...args),
          create: plug.create
        }
      }
    } catch (e) {
      throw new Error(`Could not load plugin ${plugin}`)
    }
  },
  
  /**
   * Creates an instance of the fixture using the original data fixture and passing
   * any plugin-specific args to the `create` method for the plugin
   * @param {String} name The name of the fixture
   * @param {...Array} args Any plugin-specific arguments
   * @returns {*}
   */
  create: (name, ...args) => {
    if (!fixd.fixtures[name]) throw new Error(`Fixture ${name} was not found, please add before creating a new instance`)
    return fixd.fixtures[name].create(fixd.fixtures[name].data, ...args)
  }
}

module.exports = fixd
