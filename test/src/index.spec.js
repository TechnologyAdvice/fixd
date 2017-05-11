const fixd = require('src/index')
const path = require('path')

const testPluginPath = path.resolve(__dirname, '../../src/plugins/object.js')

describe('fixd', () => {
  describe('loadPlugin', () => {
    it('loads a built-in plugin if a name is provided', () => {
      const actual = fixd.loadPlugin('object')
      expect(actual).to.have.all.keys([ 'name', 'add', 'create' ])
    })
    it('loads a custom path plugin if path specified', () => {
      const actual = fixd.loadPlugin(testPluginPath)
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
    beforeEach(() => {
      sandbox.stub(fixd, 'loadPlugin').returns({ foo: 'bar' })
      sandbox.stub(fixd, 'validatePlugin').returns(true)
    })
    it('loads plugin, validates, and returns when a string value is passed', () => {
      const actual = fixd.getPlugin('foo')
      expect(actual).to.deep.equal({ foo: 'bar' })
    })
    it('loads plugin, validates, and returns when a object value is passed', () => {
      const actual = fixd.getPlugin({ foo: 'bar' })
      expect(actual).to.deep.equal({ foo: 'bar' })
    })
    it('throws when invalid plugin is passed', () => {
      fixd.validatePlugin.restore()
      sandbox.stub(fixd, 'validatePlugin').returns(false)
      expect(() => fixd.getPlugin({ foo: 'bar' })).to.throw(/Invalid plugin, please see documentation/)
    })
  })
  describe('use', () => {
    it('creates fixd addObject for plugin after loading', () => {
      fixd.use(testPluginPath)
      expect(fixd.addObject).to.be.a('function')
      delete fixd.addObject
    })
    describe('addObject', () => {
      beforeEach(() => {
        fixd.use(testPluginPath)
      })
      afterEach(() => {
        delete fixd.addObject
        if (fixd.fixtures.foo) delete fixd.fixtures.foo
      })
      it('adds a fixture to the library', () => {
        fixd.addObject('foo', { foo: 'bar' })
        expect(fixd.fixtures.foo.data).to.deep.equal({ foo: 'bar' })
        expect(fixd.fixtures.foo.create).to.be.a('function')
      })
      it('throws an error if name argument is not a string', () => {
        expect(() => fixd.addObject([ 'foo' ], { foo: 'bar' }))
          .to.throw(/Must supply a \(string\) name value for the fixture/)
      })
      it('throws if a fixture by the specified name already exists', () => {
        fixd.addObject('foo', { foo: 'bar' })
        expect(() => fixd.addObject('foo', { foo: 'bar' }))
          .to.throw(/Fixture foo already exists, must be unique/)
      })
    })
  })
  describe('create', () => {
    before(() => {
      fixd.use(testPluginPath)
    })
    after(() => {
      delete fixd.addObject
    })
    it('returns a new instance of the fixture', () => {
      fixd.addObject('foo', { foo: 'bar' })
      expect(fixd.create('foo')).to.deep.equal({ foo: 'bar' })
    })
    it('throws if fixture is not found', () => {
      expect(() => fixd.create('fizz')).to.throw(/Fixture fizz was not found/)
    })
  })
})
