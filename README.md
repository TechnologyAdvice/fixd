[![Travis](https://img.shields.io/travis/TechnologyAdvice/fixd.svg)](https://travis-ci.org/TechnologyAdvice/fixd)
[![Codecov](https://img.shields.io/codecov/c/github/TechnologyAdvice/fixd.svg)](https://codecov.io/gh/TechnologyAdvice/fixd)

# Fixd

Fixd is a JavaScript utility for creating better fixtures. Fixtures created with Fixd are stored in the library and, when needed, are created as non-referenced instances to prevent side effects in testing data.

## Installation

`npm i fixd --save-dev`

## Quick Start

```javascript
// Require the library
const fixd = require('fixd')

// Add a fixture
fixd.addObject('foo', { foo: 'bar' })

// Create a new instance of the fixture
const fooOne = fixd.create('foo') // -> { foo: 'bar' }

// Create a different instance with alterations to original object
const fooTwo = fixd.create('foo', { foo: 'baz' }) // -> { foo: 'baz' }
```

## Plugins

Fixd uses plugins to allow the developer to specify which type of fixtures to 
use. At initialization you must specify which plugins you wish to utilize:

```javascript
fixd.use(<PLUGIN>)
```

The `use` method will use a built-in (single string), a path to a custom plugin, 
or an already `require`'d plugin object.

Custom plugins must be an object with property `name` and two methods: `add` and 
`create`:

- `name`: Specifies the reference to the plugin to be used
- `add`: Does any checks/validation or modification, then returns the fixture. This fixture is saved to Fixd's main object and retrieved on `create`
- `create`: Creates a new instance by returning the original fixture plus any modifications. This should return a new instance of the fixture.

## Built-In Plugins

Fixd comes with the following built-in fixture plugins which are loaded at initialization of the library.

### Object

Adds ability to create object fixtures:

```javascript
fixd.addObject('foo', { foo: 'bar' })

const fooFixture = fixd.create('foo') // -> { foo: 'bar' }
```

On `create`, an optional (`Object`) argument can be passed to alter the original fixture:

```javascript
const fooFixture = fixd.create('foo', { foo: 'bam' }) // -> { foo: 'bam' }
```

### Array

Adds ability to create array fixtures:

```javascript
fixd.addArray('bar', [ 'bin', 'baz', 'quz' ])

const barFixture = fixd.create('bar') // -> [ 'bin', 'baz', 'quz' ]
```

On `create`, an optional (`Object`) argument can be passed with params `add` and `remove` to modify the original fixture:

```javascript
const barFixture = fixd.create('bar', { 
  add: [ 'zap', 'zip' ], 
  remove: [ 'quz' ] 
}) // -> [ 'bin', 'baz', 'zap', 'zip' ]
```

### JSON

Adds ability to create JSON fixtures:

```javascript
fixd.addJSON('fizz', { "buzz": true })

const fizzFixture = fixd.create('fizz') // -> { "buzz": true }
```

On create, an optional (`Object`) argument can be passed to alter the original fixture:

```javascript
const fizzFixture = fixd.create('fizz', { zap: 'bang' }) // -> { "buzz": true, "zap": "bang" }
```

## License

Fixd is developed and maintained by TechnologyAdvice and released under the ISC license