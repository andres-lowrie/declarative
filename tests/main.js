const assert = require('assert')

const { test, run } = require('./test')

const mod = require('../index')

const cases = [
  // Base
  test('id: it returns whatever was passed to it', () => {
    const given = 1
    const got = mod.id(given)
    assert.strictEqual(got, given)
  }),

  test('noop: It should do nothing', () => {
    const got = mod.noop(1)
    assert.strictEqual(got, undefined)
  }),

  test('noop: It should do nothing regardless of the arguments passed', () => {
    const got = mod.noop(1, 2, 3, 4)
    assert.strictEqual(got, undefined)
  }),

  // Comparison
  test('eq: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod.eq(op1, op2)
    assert.strictEqual(got, want)
  }),

  test('gt: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod.gt(op1, op2)
    assert.strictEqual(got, want)
  }),

  test('gte: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod.gte(op1, op2)
    assert.strictEqual(got, want)
  }),

  test('lt: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = true
    const got = mod.lt(op1, op2)
    assert.strictEqual(got, want)
  }),

  test('lte: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = true
    const got = mod.lte(op1, op2)
    assert.strictEqual(got, want)
  }),

  // Object methods
  test('keys: It should call Object.keys', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.keys(given)
    const got = mod.keys(given)
    assert.deepEqual(got, want)
  }),

  test('values: It should call Object.values', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.values(given)
    const got = mod.values(given)
    assert.deepEqual(got, want)
  }),

  test('entries: It should call Object.entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.entries(given)
    assert.deepEqual(got, want)
  }),

  test('pairs: Is an alias for entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.pairs(given)
    assert.deepEqual(got, want)
  }),

  test('toEntries: Is an alias for entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.toEntries(given)
    assert.deepEqual(got, want)
  }),

  test('toPairs: Is an alias for entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.toPairs(given)
    assert.deepEqual(got, want)
  }),

  test('fromEntries: It should call Object.fromEntries', () => {
    const given = [
      ['a', 'foo'],
      ['b', 'bar']
    ]
    const want = Object.fromEntries(given)
    const got = mod.fromEntries(given)
    assert.deepEqual(got, want)
  }),

  test('fromPairs: is an alias for fromEntries', () => {
    const given = [
      ['a', 'foo'],
      ['b', 'bar']
    ]
    const want = Object.fromEntries(given)
    const got = mod.fromPairs(given)
    assert.deepEqual(got, want)
  }),

  // Comparison
  // Boolean question
  test('isTrue: It should check if something is "true"', () => {
    const got = mod.isTrue(true)
    assert.strictEqual(got, true)
  }),

  test('isTrue: neg: It should check if something is "true"', () => {
    const got = mod.isTrue(false)
    assert.strictEqual(got, false)
  }),

  test('isFalse: It should check if something is "false"', () => {
    const got = mod.isFalse(false)
    assert.strictEqual(got, true)
  }),

  test('isFalse: neg: It should check if something is "false"', () => {
    const got = mod.isFalse(true)
    assert.strictEqual(got, false)
  }),

  // Type
  test('isFunction: should see if things are functions and not the built it in objects', () => {
    assert.strictEqual(
      true,
      mod.isFunction(function a () {})
    )
    assert.strictEqual(
      true,
      mod.isFunction(() => {})
    )
  }),

  test('isArray: should check if things are arrays', () => {
    assert.strictEqual(true, mod.isArray([]))
    assert.strictEqual(false, mod.isArray({}))
  }),

  test('isString: should check if things are strings', () => {
    assert.strictEqual(true, mod.isString(''))
    assert.strictEqual(false, mod.isString({}))
  }),

  test('isNumber: should check if things are numbers', () => {
    assert.strictEqual(true, mod.isNumber(1))
    assert.strictEqual(false, mod.isNumber('1'))
    assert.strictEqual(false, mod.isNumber({}))
  }),

  test('isNull: should check if things are null', () => {
    assert.strictEqual(true, mod.isNull(null))
    assert.strictEqual(false, mod.isNull(undefined))
    assert.strictEqual(false, mod.isNull({}))
    assert.strictEqual(false, mod.isNull('str'))
    assert.strictEqual(false, mod.isNull(1))
    assert.strictEqual(
      false,
      mod.isNull(() => {})
    )
  }),

  test('length: should return length of "loopable" things', () => {
    assert.strictEqual(1, mod.length([1]))
    assert.strictEqual(1, mod.length({ a: 1 }))
    assert.strictEqual(0, mod.length([]))
    assert.strictEqual(0, mod.length({}))
  }),

  test('isObject: should check if things are objects', () => {
    assert.strictEqual(false, mod.isObject([]))
    assert.strictEqual(true, mod.isObject({}))
  }),

  test('isSymbol: should check if things are symbols', () => {
    assert.strictEqual(true, mod.isSymbol(Symbol()))
    assert.strictEqual(false, mod.isSymbol({}))
  }),

  test('isUndefined: should check if things are undefineds', () => {
    assert.strictEqual(true, mod.isUndefined(undefined))
    assert.strictEqual(false, mod.isUndefined('undefined'))
    assert.strictEqual(false, mod.isUndefined(false))
    assert.strictEqual(false, mod.isUndefined({}))
  }),

  test('isDefined: should be the opposite of `isUndefined`', () => {
    assert.strictEqual(false, mod.isDefined(undefined))
    assert.strictEqual(true, mod.isDefined('undefined'))
    assert.strictEqual(true, mod.isDefined(false))
    assert.strictEqual(true, mod.isDefined({}))
  }),

  // Access
  test('first: should return first item in array', () => {
    const arr = [1, 2, 3]
    assert.strictEqual(1, mod.first(arr))
  }),

  test('first: should return first item in object', () => {
    const obj = { a: 1, b: 2 }
    assert.deepEqual(['a', 1], mod.first(obj))
  }),

  test('last: should return last item in array', () => {
    const arr = [1, 2, 3]
    assert.strictEqual(3, mod.last(arr))
  }),

  test('last: should return last item in object', () => {
    const obj = { a: 1, b: 2 }
    assert.deepEqual(['b', 2], mod.last(obj))
  }),

  // Checks
  test('isEmpty: should check length of array or object is empty', () => {
    assert.strictEqual(true, mod.isEmpty([]))
    assert.strictEqual(true, mod.isEmpty({}))
    assert.strictEqual(false, mod.isEmpty([1]))
    assert.strictEqual(false, mod.isEmpty({ a: 1 }))
  }),

  test('isNotEmpty: should be opposite of `isEmpty`', () => {
    assert.strictEqual(false, mod.isNotEmpty([]))
    assert.strictEqual(false, mod.isNotEmpty({}))
    assert.strictEqual(true, mod.isNotEmpty([1]))
    assert.strictEqual(true, mod.isNotEmpty({ a: 1 }))
  })
]

run(cases)
