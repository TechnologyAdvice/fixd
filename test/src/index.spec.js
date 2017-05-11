const fixd = require('src/index')
const path = require('path')

describe('fixd', () => {
  describe('loadPlugin', () => {
    it('loads a built-in plugin if a name is provided', () => {
      const actual = fixd.loadPlugin('object')
      expect(actual).to.have.all.keys([ 'name', 'add', 'create' ])
    })
    it('loads a custom path plugin if path specified', () => {
      const actual = fixd.loadPlugin(path.resolve(__dirname, '../../src/plugins/object.js'))
      expect(actual).to.have.all.keys([ 'name', 'add', 'create' ])
    })
    it('throws if plugin can not be loaded', () => {
      expect(() => fixd.loadPlugin('/bad/path.js')).to.throw(/Could not load plugin/)
    })
  })
  describe('validatePlugin', () => {
    it('returns true if plugin is valid', () => {
      const actual = fixd.validatePlugin({ name: 'foo', add: () => null, create: () => null })
      expect(actual).to.be.true()
    })
    it('returns false if the plugin is invalid', () => {
      const actual = fixd.validatePlugin({ name: { foo: 'bar' } })
      expect(actual).to.be.false()
    })
  })
  describe('getPlugin', () => {

  })
  describe('use', () => {

  })
  describe('create', () => {

  })
})
