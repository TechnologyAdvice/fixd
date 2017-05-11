const json = require('src/plugins/json')

describe('plugin/json', () => {
  describe('name', () => {
    it('should be JSON', () => {
      expect(json.name).to.equal('JSON')
    })
  })
  describe('add', () => {
    it('returns original json object', () => {
      const actual = json.add(JSON.stringify({ foo: 'bar' }))
      expect(actual).to.deep.equal({ foo: 'bar' })
    })
    it('throws if argument is not an json', () => {
      expect(() => json.add({ foo: () => null })).to.throw(/Must supply valid JSON/)
    })
  })
  describe('create', () => {
    it('returns a new instance of the json with mods applied', () => {
      const original = { foo: 'bar' }
      const actual = json.create(original, { foo: 'biz' })
      expect(original).to.deep.equal({ foo: 'bar' })
      expect(actual).to.equal(JSON.stringify({ 'foo': 'biz' }))
    })
    it('throws if mods argument is not an json', () => {
      expect(() => json.create({ foo: 'bar' }, 'biz')).to.throw(/Must supply a valid object/)
    })
  })
})
