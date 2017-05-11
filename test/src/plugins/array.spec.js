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
      const original = [ 'foo', 'bar' ]
      const actual = array.create(original, [ 'baz' ])
      expect(original).to.deep.equal([ 'foo', 'bar' ])
      expect(actual).to.deep.equal([ 'foo', 'bar', 'baz' ])
    })
    it('throws if mods argument is not an array', () => {
      expect(() => array.create([ 'foo' ], 'bar')).to.throw(/Must supply a valid array/)
    })
  })
})
