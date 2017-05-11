const chai = require('chai')
const sinon = require('sinon')
const dirtyChai = require('dirty-chai')
const sinonChai = require('sinon-chai')
const mod = require('module')
const path = require('path')

// Globals
global.expect = chai.expect
global.sinon = sinon

// Chai
chai.use(dirtyChai)
chai.use(sinonChai)

// Sandbox
global.sandbox = sinon.sandbox.create()
afterEach(() => global.sandbox.restore())

// Allow require() from project root: ../../src/something => src/something
process.env.NODE_PATH = path.join(process.cwd(), process.env.NODE_PATH || '')
mod._initPaths()
