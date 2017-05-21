const object = require('src/plugins/object')

describe('plugin/object', () => {
  describe('name', () => {
    it('should be Object', () => {
      expect(object.name).to.equal('Object')
    })
  })
  describe('add', () => {
    it('returns original object', () => {
      const actual = object.add({ foo: 'bar' })
      expect(actual).to.deep.equal({ foo: 'bar' })
    })
    it('throws if argument is not an object', () => {
      expect(() => object.add('foo')).to.throw(/Must supply a valid object/)
    })
  })
  describe('create', () => {
    it('returns a new instance of the object with mods applied', () => {
      const original = { foo: 'bar' }
      const actual = object.create(original, { foo: 'biz' })
      expect(original).to.deep.equal({ foo: 'bar' })
      expect(actual).to.deep.equal({ foo: 'biz' })
      expect(actual).to.not.equal(original)
    })
    it('throws if mods argument is not an object', () => {
      expect(() => object.create({ foo: 'bar' }, 'biz')).to.throw(/Must supply a valid object/)
    })
  })
})
