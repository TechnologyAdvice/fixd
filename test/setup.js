const chai = require('chai')
const dirtyChai = require('dirty-chai')
const mod = require('module')
const path = require('path')

global.expect = chai.expect
chai.use(dirtyChai)

// allow require() from project root
process.env.NODE_PATH = path.join(process.cwd(), process.env.NODE_PATH || '')
mod._initPaths()