const path = require('path')

const fixd = {
  /**
   * @property {Object} fixtures
   */
  fixtures: {},
  
  /**
   * Attempts to load plugin by path/name
   * @param {String} plugin The path or name of the plugin
   * @returns {Object}
   */
  loadPlugin: (plugin) => {
    try {
      // Try to load a built-in plugin
      return require(path.resolve(__dirname, `./plugins/${plugin}.js`))
    } catch (e) {
      try {
        // Try to load plugin from path
        return require(plugin)
      } catch (e) {
        throw new Error(`Could not load plugin ${plugin}`)
      }
    }
  },
  
  /**
   * Validates plugin
   * @param {Object} plugin The plugin to validate
   * @returns {Boolean}
   */
  validatePlugin: (plugin) => {
    const add = plugin.add && typeof plugin.add === 'function'
    const create = plugin.create && typeof plugin.create === 'function'
    return (add && create)
  },
  
  /**
   * Attempts to load and validate plugin
   * @param {Object|String} plugin The plugin object, name, or path
   * @returns {Object}
   */
  getPlugin: (plugin) => {
    let plug = typeof plugin === 'string'
      ? fixd.loadPlugin(plugin)
      : plugin
    // If not a valid plugin, throw
    if (!fixd.validatePlugin(plug)) throw new Error('Invalid plugin, please see documentation')
    // Return valid plugin
    return plug
  },
  
  /**
   * Instructs fixd to use plugin, creates addPLUGIN method
   * @param {Object|String} plugin The plugin name, path, or object to apply
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
