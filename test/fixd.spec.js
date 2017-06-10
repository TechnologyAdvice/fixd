'use strict'
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const fixd = require('../fixd')

describe('fixd', () => {
  describe('add', () => {
    it('throws an error if attempting to assign to already reserved namespace', () => {
      expect(() => fixd.add('add', {})).to.throw(/Cannot add fixture to already reserved namespace 'add'/)
    })
    it('adds a frozen fixture to the library', () => {
      fixd.add('foo', { fizz: 'buzz', baz: { quz: 'baz' } })
      expect(fixd.foo).to.deep.equal({ fizz: 'buzz', baz: { quz: 'baz' } })
      expect(Object.isFrozen(fixd.foo)).to.be.true()
    })
  })
  describe('create', () => {
    before(() => {
      fixd.add('bar', { bin: 'baz' })
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
      fixd.add('testObject', { foo: 'bar' })
      fixd.add('testArray', [ 'foo', 'bar' ])
      fixd.add('testString', 'foo')
      fixd.add('testNumber', 42)
    })
    after(() => {
      delete fixd.testObject
      delete fixd.testArray
      delete fixd.testString
      delete fixd.testNumber
    })
    it('adds and retrieves multiple types', () => {
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
      }).to.throw(/Fixd properties are not extensible/)
      expect(() => {
        fixd.testNumber = 43
      }).to.throw(/Fixd properties are not extensible/)
    })
    it('returns the fixd object when called', () => {
      expect(fixd).to.be.an('object')
    })
    it('returns methods of the fixd object when called', () => {
      expect(fixd.freeze).to.be.a('function')
    })
  })
})
