// Identity
exports.id = a => a

// No-Operation
// In JS land the closest we can get to "do nothing" is returning undefined
exports.noop = (...args) => undefined

// Equals
exports.eq = (a, b) => a === b

// Greater than
exports.gt = (a, b) => a > b

// Greater than or equals
exports.gte = (a, b) => a >= b

// Less than
exports.lt = (a, b) => a < b

// Less than or equal
exports.lte = (a, b) => a <= b

// Expose Object methods
exports.keys = a => Object.keys(a)

exports.values = a => Object.values(a)

exports.entries = a => Object.entries(a)

exports.pairs = exports.entries

exports.toEntries = exports.entries

exports.toPairs = exports.entries

exports.fromEntries = a => Object.fromEntries(a)

exports.fromPairs = a => Object.fromEntries(a)

// Comparison
exports.isTrue = a => a === true

exports.isFalse = a => a === false

exports.isFunction = a => typeof a === 'function'

exports.isArray = Array.isArray

exports.isString = a => typeof a === 'string'

exports.isNumber = a => typeof a === 'number'

exports.isNull = a => a === null

exports.length = a => {
  let arr = []
  if (exports.isArray(a)) {
    arr = a
  }

  if (exports.isObject(a)) {
    arr = exports.keys(a)
  }

  return arr.length
}

// @TODO add more types checks
exports.isObject = a =>
  typeof a === 'object' && !exports.isNull(a) && !exports.isArray(a)

exports.isSymbol = a => typeof a === 'symbol'

exports.isUndefined = a => typeof a === 'undefined'

exports.isDefined = a => !exports.isUndefined(a)

// Access
exports.first = a => {
  if (exports.isArray(a)) {
    return a[0]
  }

  if (exports.isObject(a)) {
    return exports.first(exports.pairs(a))
  }
}

exports.last = a => {
  if (exports.isArray(a)) {
    return a[exports.length(a) - 1]
  }

  if (exports.isObject(a)) {
    return exports.last(exports.pairs(a))
  }
}

// Checks

exports.isEmpty = a => exports.length(a) === 0

exports.isNotEmpty = a => !exports.isEmpty(a)
