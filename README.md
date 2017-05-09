# Fixd

A Utility for Fixtures

## Installation

`npm i fixd --save-dev`

## Quick Start

```javascript
// Require the library
const fixd = require('fixd')

// Tell fixed which plugins to use
fixd.use('object')

// Add a fixture
fixd.addObject('foo', { foo: 'bar' })

// Create a new instance of the fixture
const fooFixture = fixd.create('foo')
```
