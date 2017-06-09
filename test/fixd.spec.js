// Setup
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

// Source
const fixd = require('../fixd')

describe('fixd', () => {
  describe('add', () => {
    it('throws an error if attempting to assign to already reserved namespace', () => {
      expect(() => fixd.add('add', {})).to.throw(/Cannot add fixture to already reserved namespace 'add'/)
    })
    it('adds a frozen fixture to the library', () => {
      fixd.add('foo', { fizz: 'buzz' })
      expect(fixd.foo).to.deep.equal({ fizz: 'buzz' })
      expect(Object.isFrozen(fixd.foo)).to.be.true()
    })
  })
  describe('create', () => {
    before(() => {
      fixd.add('bar', { bin: 'baz' })
    })
    it('returns the value of the fixture if no modifier is supplied', () => {
      const result = fixd.create('bar')
      expect(result).to.deep.equal({ bin: 'baz' })
      expect(Object.isFrozen(result)).to.be.true
    })
    it('throws an error if attempting to pass a non-function modifier', () => {
      expect(() => fixd.create('bar', 'bin')).to.throw(/Modifier must be a function/)
    })
    it('creates an object and returns a frozen fixture', () => {
      const result = fixd.create('bar', (obj) => {
        obj.bin = 'biz'
        return obj
      })
      expect(result).to.deep.equal({ bin: 'biz' })
      expect(Object.isFrozen(result)).to.be.true()
    })
  })
})
