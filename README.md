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

## Plugins

Fixd uses plugins to allow the developer to specify which type of fixtures to 
use. At initialization you must specify which plugins you wish to utilize. From 
the example above:

```javascript
fixd.use('object')
```

The `use` method will use a built-in (single string), a path to a custom plugin, 
or an already `require`'d plugin object.

Custom plugins must be an object with two methods: `add` and `create`
