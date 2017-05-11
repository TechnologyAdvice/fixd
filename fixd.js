const fs = require('fs')
const path = require('path')
const fixd = require('./src/index')

// Auto-load built-in plugins
try {
  fs.readdirSync(path.resolve(__dirname, './src/plugins')).forEach((f) => {
    fixd.use(f.replace('.js', ''))
  })
} catch (e) {
  throw new Error('Error loading built-in plugins', e.message)
}

module.exports = fixd
