[![Travis](https://img.shields.io/travis/TechnologyAdvice/fixd.svg)](https://travis-ci.org/TechnologyAdvice/fixd)
[![Codecov](https://img.shields.io/codecov/c/github/TechnologyAdvice/fixd.svg)](https://codecov.io/gh/TechnologyAdvice/fixd)

# Fixd

Fixd is a JavaScript utility for creating better fixtures. Fixtures created with Fixd are stored in the library and, when needed, are created as non-referenced, frozen instances to prevent side effects in testing data.

## Installation

`npm i fixd --save-dev`

## Quick Start

```javascript
'use strict'
const fixd = require('fixd')

// Add a new fixture
fixd.add('foo', { fizz: 'buzz', baz: { quz: 'baz' } })

// Access fixture
const foo = fixd.foo // -> { fizz: 'buzz', baz: { quz: 'baz' } }

// Throws error
foo.fizz = 'bazz' // -> ERROR: Cannot assign to read only property
```

_Note: While `Object.freeze` will prevent modifications, `use strict` must be applied to the document in order to throw error on attempted mutation`_

## Creating New Instances

Because the objects are frozen, Fixd provides the `create` method for returning a new, modified instance.

```javascript
fixd.create('foo', (foo) => {
  foo.fizz = 'bazz'
  return foo
}) // -> { fizz: 'bazz', baz: { quz: 'baz' } }
```

The above will not modify the `foo` object, instead will return a new, reference-free, frozen instance of the object.

## License

Fixd is developed and maintained by TechnologyAdvice and released under the ISC license