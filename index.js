// Identity
exports.id = a => a

// Composition
// constructs a function. Useful for lazy like looping
exports.make = (...args) => {
  const [fn, ...bargs] = args
  return () => fn(...bargs)
}

// No-Operation
// In JS land the closest we can get to "do nothing" is returning undefined
exports.noop = (...args) => undefined

// Equals
exports.eq = (a, b) => a === b
exports._eq = (a, b) => exports.make(exports.eq, a, b)

// Greater than
exports.gt = (a, b) => a > b
exports._gt = (a, b) => exports.make(exports.gt, a, b)

// Greater than or equals
exports.gte = (a, b) => a >= b
exports._gte = (a, b) => exports.make(exports.gte, a, b)

// Less than
exports.lt = (a, b) => a < b
exports._lt = (a, b) => exports.make(exports.lt, a, b)

// Less than or equal
exports.lte = (a, b) => a <= b
exports._lte = (a, b) => exports.make(exports.lte, a, b)

// Expose Object methods
exports.keys = a => Object.keys(a)
exports._keys = a => exports.make(exports.keys, a)

exports.values = a => Object.values(a)
exports._values = a => exports.make(exports.values, a)

exports.entries = a => Object.entries(a)
exports._entries = a => exports.make(exports.entries, a)

exports.pairs = exports.entries
exports._pairs = exports._entries

exports.toEntries = exports.entries
exports._toEntries = exports._entries

exports.toPairs = exports.entries
exports._toPairs = exports._entries

exports.fromEntries = a => Object.fromEntries(a)
exports._fromEntries = a => exports.make(exports.fromEntries, a)

exports.fromPairs = a => Object.fromEntries(a)
exports._fromPairs = a => exports.make(exports.fromPairs, a)

exports.assign = Object.assign
exports._assign = (...args) => exports.make(exports.assign, ...args)

exports.mkMerge = (mutate = false) => (...args) => {
  if (args.every(exports.isObject)) {
    if (mutate) {
      return exports.assign(...args)
    } else {
      return exports.assign({}, ...args)
    }
  }

  if (args.every(exports.isArray)) {
    if (mutate) {
      const [head, ...tail] = args
      head.push(...tail.flatMap(exports.id))
      return head
    } else {
      return [].concat(...args)
    }
  }
}
exports._mkMerge = (mutate = false) => (...args) =>
  exports.make(exports.mkMerge(mutate), ...args)

exports.merge = exports.mkMerge(true)
exports._merge = exports._mkMerge(true)

exports.impureMerge = exports.merge
exports._impureMerge = exports._merge

exports.pureMerge = exports.mkMerge(false)
exports._pureMerge = exports._mkMerge(false)

// Comparison
exports.isTrue = a => a === true
exports._isTrue = a => exports.make(exports.isTrue, a)

exports.isFalse = a => a === false
exports._isFalse = a => exports.make(exports.isFalse, a)

exports.isFunction = a => typeof a === 'function'
exports._isFunction = a => exports.make(exports.isFunction, a)

exports.isArray = Array.isArray
exports._isArray = (...args) => exports.make(exports.isArray, ...args)

exports.isNotArray = a => !Array.isArray(a)
exports._isNotArray = (...args) => exports.make(exports.isNotArray, ...args)

exports.isString = a => typeof a === 'string'
exports._isString = a => exports.make(exports.isString, a)

exports.isNumber = a => typeof a === 'number'
exports._isNumber = a => exports.make(exports.isNumber, a)

exports.isNull = a => a === null
exports._isNull = a => exports.make(exports.isNull, a)

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
exports._length = a => exports.make(exports.length, a)

// @TODO add more types checks
exports.isObject = a =>
  typeof a === 'object' && !exports.isNull(a) && !exports.isArray(a)

exports._isObject = a => exports.make(exports.isObject, a)

exports.isSymbol = a => typeof a === 'symbol'
exports._isSymbol = a => exports.make(exports.isSymbol, a)

exports.isUndefined = a => typeof a === 'undefined'
exports._isUndefined = a => exports.make(exports.isUndefined, a)

exports.isDefined = a => !exports.isUndefined(a)
exports._isDefined = a => exports.make(exports.isDefined, a)

// Access
exports.first = a => {
  if (exports.isArray(a)) {
    return a[0]
  }

  if (exports.isObject(a)) {
    return exports.first(exports.pairs(a))
  }
}
exports._first = a => exports.make(exports.first, a)

exports.last = a => {
  if (exports.isArray(a)) {
    return a[exports.length(a) - 1]
  }

  if (exports.isObject(a)) {
    return exports.last(exports.pairs(a))
  }
}
exports._last = a => exports.make(exports.last, a)

exports.keyIn = (k, a) => {
  if (exports.isArray(a)) {
    return a.includes(k)
  }

  if (exports.isObject(a)) {
    return a.hasOwnProperty(k)
  }
}
exports._keyIn = (k, a) => exports.make(exports.keyIn, k, a)

exports.keyNotIn = (...args) => !exports.keyIn(...args)
exports._keyNotIn = (...args) => exports.make(exports.keyNotIn, ...args)

// Checks

exports.isEmpty = a => exports.length(a) === 0
exports._isEmpty = a => exports.make(exports.isEmpty, a)

exports.isNotEmpty = a => !exports.isEmpty(a)
exports._isNotEmpty = a => exports.make(exports.isNotEmpty, a)

// Lazy things
exports.any = (pred, arr) => {
  for (let i = 0; i < arr.length; i++) {
    const thing = exports.isFunction(arr[i]) ? arr[i]() : arr[i]
    if (pred(thing)) {
      return true
    }
  }
  return false
}

exports.anyTrue = arr => exports.any(exports.isTrue, arr)
exports.anyFalse = arr => exports.any(exports.isFalse, arr)

// Loops/Collections
exports.forEach = (a, f) => {
  if (exports.isArray(a)) {
    return a.forEach(f)
  }
  return exports.forEach(exports.pairs(a), f)
}
