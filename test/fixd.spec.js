'use strict'
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const fixd = require('../fixd')

describe('fixd', () => {
  describe('set', () => {
    it('throws an error if attempting to assign to already reserved namespace', () => {
      expect(() => fixd.set(null, 'set', {})).to.throw(/Cannot add fixture to already reserved namespace 'set'/)
    })
    it('adds a frozen fixture to the library', () => {
      fixd.set(null, 'foo', { fizz: 'buzz', baz: { quz: 'baz' } })
      expect(fixd.foo).to.deep.equal({ fizz: 'buzz', baz: { quz: 'baz' } })
      expect(Object.isFrozen(fixd.foo)).to.be.true()
    })
  })
  describe('get', () => {
    it('returns target object if symbol is passed (root fixd object)', () => {
      expect(fixd.get(fixd, Symbol('getTest'))).to.be.an('object')
    })
    it('returns fixd methods when specified', () => {
      expect(fixd.get(fixd, 'set')).to.be.a('function')
    })
    it('returns the value of a stored object when specified', () => {
      fixd.setTest = 'foo'
      expect(fixd.get(fixd, 'setTest')).to.equal('foo')
    })
  })
  describe('create', () => {
    before(() => {
      fixd.bar = { bin: 'baz' }
    })
    it('throws an error if the modifier is not supplied', () => {
      expect(() => fixd.create('bar')).to.throw(/Modifier must be a function/)
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
  describe('integration', () => {
    before(() => {
      fixd.testObject = { foo: 'bar' }
      fixd.testArray = [ 'foo', 'bar' ]
      fixd.testString = 'foo'
      fixd.testNumber = 42
    })
    after(() => {
      delete fixd.testObject
      delete fixd.testArray
      delete fixd.testString
      delete fixd.testNumber
    })
    it('sets and gets multiple types', () => {
      expect(fixd.testObject).to.be.an('object')
      expect(fixd.testArray).to.be.an('array')
      expect(fixd.testString).to.be.a('string')
      expect(fixd.testNumber).to.be.a('number')
    })
    it('mutates and returns multiple types', () => {
      expect(fixd.create('testObject', (obj) => {
        obj.foo = 'baz'
        return obj
      })).to.deep.equal({ foo: 'baz' })
      expect(fixd.create('testArray', (arr) => {
        arr[0] = 'fizz'
        return arr
      })).to.deep.equal([ 'fizz', 'bar' ])
      expect(fixd.create('testString', () => {
        return 'bar'
      })).to.equal('bar')
      expect(fixd.create('testNumber', () => {
        return 43
      })).to.equal(43)
    })
    it('throws an error if a mutation is attempted', () => {
      expect(() => {
        fixd.testObject.foo = 'baz'
      }).to.throw(/Cannot assign to read only property/)
      expect(() => {
        fixd.testArray[0] = 'baz'
      }).to.throw(/Cannot assign to read only property/)
      expect(() => {
        fixd.testString = 'bar'
      }).to.throw(/Cannot add fixture to already reserved namespace/)
      expect(() => {
        fixd.testNumber = 43
      }).to.throw(/Cannot add fixture to already reserved namespace/)
    })
    it('returns the fixd object when called', () => {
      expect(fixd).to.be.an('object')
    })
    it('returns methods of the fixd object when called', () => {
      expect(fixd.freeze).to.be.a('function')
    })
  })
})
