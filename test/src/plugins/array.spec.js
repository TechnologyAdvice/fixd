const array = require('src/plugins/array')

describe('plugins/array', () => {
  describe('name', () => {
    it('should be Array', () => {
      expect(array.name).to.equal('Array')
    })
  })
  describe('add', () => {
    it('returns original array', () => {
      const actual = array.add([ 'foo', 'bar' ])
      expect(actual).to.deep.equal([ 'foo', 'bar' ])
    })
    it('throws if arument is not an array', () => {
      expect(() => array.add('foo')).to.throw(/Must supply a valid array/)
    })
  })
  describe('create', () => {
    it('returns a new instance of the array with mods applied', () => {
      const original = [ 'foo', { fizz: 'buzz' }, 'bar' ]
      const actual = array.create(original, {
        add: [ 'baz' ],
        remove: [ 'bar' ]
      })
      expect(original[1]).to.not.equal(actual[1])
      expect(original[1]).to.deep.equal(actual[1])
    })
    it('throws if mods argument is not an object', () => {
      expect(() => array.create([ 'foo' ], 'bar')).to.throw(/Must supply a valid object/)
    })
    it('throws if mods.add argument is not an array', () => {
      expect(() => array.create([ 'foo' ], { add: 'foo' })).to.throw(/Add property must be an array/)
    })
    it('throws if mods.remove argument is not an array', () => {
      expect(() => array.create([ 'foo' ], { remove: 'foo' })).to.throw(/Remove property must be an array/)
    })
  })
})
