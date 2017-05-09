const path = require('path')

const fixd = {
  /**
   * @property {Object} fixtures
   */
  fixtures: {},
  
  /**
   * Attempts to load (or returns) plugin
   * @param {Object|String} plugin The plugin object, name, or path
   * @returns {Object}
   */
  getPlugin: (plugin) => {
    if (typeof plugin === 'string') {
      try {
        const pluginPath = path.indexOf('/') >= 0 
          ? plugin // Try user-supplied path
          : path.resolve(__dirname, `./plugins/${plugin}.js`) // Use built-in
        return require(pluginPath)
      } catch (e) {
        throw new Error(`Could not load plugin ${plugin}`)
      }
    } else if (plugin.add && plugin.create) {
      return plugin
    } else {
      throw new Error('Invalid plugin supplied, please see documentation')
    }
  }
  
  /**
   * Instructs fixd to use plugin, creates addPLUGIN method
   * @param {Object|String} plugin The plugin name or object to apply
   */
  use: function (plugin) {
    const plug = fixd.getPlugin(plugin)
    fixd[`add${plugin.charAt(0).toUpperCase() + plugin.slice(1)}`] = (name, ...args) => {
      // Validations
      if (!name || typeof name !== 'string') throw new Error('Must supply a (string) name value for the fixture')
      if (fixd.fixtures[name]) throw new Error(`Fixture ${name} already exists, must be unique`)
      // Setup fixture
      fixd.fixtures[name] = {
        data: plug.add(...args),
        create: plug.create
      }
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
