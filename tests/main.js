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

  // Composition
  test('make: It should return a function', () => {
    const got = mod.make('foo', 'bar')
    assert.strictEqual(typeof got, 'function')
  }),
  test('make: It should pass the rest of the arguments to the function it returns', () => {
    const state = []
    const fn = (...args) => state.push(...args)

    const got = mod.make(fn, 'bar', 'baz', 1, 2, 3)
    got()
    assert.strictEqual(state.length, 5)
    assert.strictEqual(state[0], 'bar')
    assert.strictEqual(state[1], 'baz')
    assert.strictEqual(state[2], 1)
    assert.strictEqual(state[3], 2)
    assert.strictEqual(state[4], 3)
  }),

  // Comparison
  test('eq: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod.eq(op1, op2)
    assert.strictEqual(got, want)
  }),
  test('_eq', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod._eq(op1, op2)
    assert.strictEqual(got(), want)
  }),

  test('gt: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod.gt(op1, op2)
    assert.strictEqual(got, want)
  }),
  test('_gt', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod._gt(op1, op2)
    assert.strictEqual(got(), want)
  }),

  test('gte: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod.gte(op1, op2)
    assert.strictEqual(got, want)
  }),
  test('_gte', () => {
    const op1 = 1
    const op2 = 2
    const want = false
    const got = mod._gte(op1, op2)
    assert.strictEqual(got(), want)
  }),

  test('lt: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = true
    const got = mod.lt(op1, op2)
    assert.strictEqual(got, want)
  }),
  test('_lt', () => {
    const op1 = 1
    const op2 = 2
    const want = true
    const got = mod._lt(op1, op2)
    assert.strictEqual(got(), want)
  }),

  test('lte: It should compare primitives', () => {
    const op1 = 1
    const op2 = 2
    const want = true
    const got = mod.lte(op1, op2)
    assert.strictEqual(got, want)
  }),
  test('_lte', () => {
    const op1 = 1
    const op2 = 2
    const want = true
    const got = mod._lte(op1, op2)
    assert.strictEqual(got(), want)
  }),
  test('isPrimitive: It should handle objects', () => {
    const input = {}
    const got = mod.isPrimitive(input)
    assert.strictEqual(got, false)
  }),
  test('isPrimitive: It should handle arrays', () => {
    const input = []
    const got = mod.isPrimitive(input)
    assert.strictEqual(got, false)
  }),
  test('isPrimitive: It should handle functions', () => {
    const input = () => {}
    const got = mod.isPrimitive(input)
    assert.strictEqual(got, false)
  }),
  test('_isPrimitive', () => {
    const input = () => {}
    const got = mod._isPrimitive(input)()
    assert.strictEqual(got, false)
  }),
  test('isNotPrimitive: It should handle objects', () => {
    const input = {}
    const got = mod.isNotPrimitive(input)
    assert.strictEqual(got, true)
  }),
  test('isNotPrimitive: It should handle arrays', () => {
    const input = []
    const got = mod.isNotPrimitive(input)
    assert.strictEqual(got, true)
  }),
  test('isNotPrimitive: It should handle functions', () => {
    const input = () => {}
    const got = mod.isNotPrimitive(input)
    assert.strictEqual(got, true)
  }),
  test('_isNotPrimitive', () => {
    const input = []
    const got = mod._isNotPrimitive(input)()
    assert.strictEqual(got, true)
  }),

  // Object methods
  test('keys: It should call Object.keys', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.keys(given)
    const got = mod.keys(given)
    assert.deepEqual(got, want)
  }),
  test('_keys', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.keys(given)
    const got = mod._keys(given)
    assert.deepEqual(got(), want)
  }),

  test('values: It should call Object.values', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.values(given)
    const got = mod.values(given)
    assert.deepEqual(got, want)
  }),
  test('_values', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.values(given)
    const got = mod._values(given)
    assert.deepEqual(got(), want)
  }),

  test('entries: It should call Object.entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.entries(given)
    assert.deepEqual(got, want)
  }),
  test('_entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod._entries(given)
    assert.deepEqual(got(), want)
  }),

  test('pairs: Is an alias for entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.pairs(given)
    assert.deepEqual(got, want)
  }),
  test('_pairs', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod._pairs(given)
    assert.deepEqual(got(), want)
  }),

  test('toEntries: Is an alias for entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.toEntries(given)
    assert.deepEqual(got, want)
  }),
  test('_toEntries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod._toEntries(given)
    assert.deepEqual(got(), want)
  }),

  test('toPairs: Is an alias for entries', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod.toPairs(given)
    assert.deepEqual(got, want)
  }),
  test('_toPairs', () => {
    const given = { a: 'foo', b: 'bar' }
    const want = Object.entries(given)
    const got = mod._toPairs(given)
    assert.deepEqual(got(), want)
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
  test('_fromEntries', () => {
    const given = [
      ['a', 'foo'],
      ['b', 'bar']
    ]
    const want = Object.fromEntries(given)
    const got = mod._fromEntries(given)
    assert.deepEqual(got(), want)
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
  test('_fromPairs', () => {
    const given = [
      ['a', 'foo'],
      ['b', 'bar']
    ]
    const want = Object.fromEntries(given)
    const got = mod._fromPairs(given)
    assert.deepEqual(got(), want)
  }),

  test('assign: It should call Object.assign', () => {
    const o1 = { foo: 1 }
    const o2 = { bar: 2 }
    const want = Object.assign(o1, o2)
    const got = mod.assign(o1, o2)
    assert.deepEqual(got, want)
  }),
  test('_assign', () => {
    const o1 = { foo: 1 }
    const o2 = { bar: 2 }
    const want = Object.assign(o1, o2)
    const got = mod._assign(o1, o2)
    assert.deepEqual(got(), want)
  }),

  test('mkMerge: It should offload to assign when objects passed', () => {
    const o1 = { foo: 1 }
    const o2 = { bar: 2 }
    const want = Object.assign(o1, o2)
    const got = mod.mkMerge()(o1, o2)
    assert.deepEqual(got, want)
  }),

  test('mkMerge: It should not mutate by default for objects', () => {
    const o1 = { foo: 1 }
    const o2 = { bar: 2 }
    const want = Object.assign({}, o1, o2)
    const got = mod.mkMerge()(o1, o2)
    assert.deepEqual(got, want)
    assert.strictEqual(o1.hasOwnProperty('bar'), false)
  }),

  test('mkMerge: It should allow to mutate objects', () => {
    const o1 = { foo: 1 }
    const o2 = { bar: 2 }
    const want = Object.assign({}, o1, o2)
    const got = mod.mkMerge(true)(o1, o2)
    assert.deepStrictEqual(got, want)
    assert.strictEqual(o1.hasOwnProperty('bar'), true)
  }),

  test('mkMerge: It should offload to concat when arrays passed', () => {
    const o1 = [1]
    const o2 = [2]
    const o3 = [3]
    const want = [1, 2, 3]
    const got = mod.mkMerge()(o1, o2, o3)
    assert.deepEqual(got, want)
  }),

  test('mkMerge: It should not mutate by default for arrays', () => {
    const o1 = [1]
    const o2 = [2]
    const o3 = [3]
    const want = [1, 2, 3]
    const got = mod.mkMerge()(o1, o2, o3)
    assert.deepEqual(got, want)
    assert.strictEqual(o1.includes(2), false)
  }),

  test('mkMerge: It should allow to mutate arrays', () => {
    const o1 = [1]
    const o2 = [2]
    const o3 = [3]
    const want = [1, 2, 3]
    const got = mod.mkMerge(true)(o1, o2, o3)
    assert.deepStrictEqual(got, want)
    assert.strictEqual(o1.includes(2), true)
    assert.strictEqual(o1.includes(3), true)
  }),
  test('_mkMerge', () => {
    const o1 = { foo: 1 }
    const o2 = { bar: 2 }
    const want = Object.assign(o1, o2)
    const got = mod._mkMerge()(o1, o2)
    assert.deepEqual(got(), want)
  }),

  // Comparison
  // Boolean question
  test('isTrue: It should check if something is "true"', () => {
    const got = mod.isTrue(true)
    assert.strictEqual(got, true)
  }),
  test('_isTrue', () => {
    const got = mod._isTrue(true)
    assert.strictEqual(typeof got, 'function')
    const delayedGot = got()
    assert.strictEqual(delayedGot, true)
  }),

  test('isTrue: neg: It should check if something is "true"', () => {
    const got = mod.isTrue(false)
    assert.strictEqual(got, false)
  }),

  test('isFalse: It should check if something is "false"', () => {
    const got = mod.isFalse(false)
    assert.strictEqual(got, true)
  }),
  test('_isFalse', () => {
    const got = mod._isFalse(false)
    assert.strictEqual(got(), true)
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
  test('_isFunction', () => {
    assert.strictEqual(true, mod._isFunction(function a () {})())
    assert.strictEqual(true, mod._isFunction(() => {})())
  }),

  test('isArray: should check if things are arrays', () => {
    assert.strictEqual(true, mod.isArray([]))
    assert.strictEqual(false, mod.isArray({}))
  }),
  test('_isArray', () => {
    assert.strictEqual(true, mod._isArray([])())
    assert.strictEqual(false, mod._isArray({})())
  }),

  test('isString: should check if things are strings', () => {
    assert.strictEqual(true, mod.isString(''))
    assert.strictEqual(false, mod.isString({}))
  }),
  test('_isString', () => {
    assert.strictEqual(true, mod._isString('')())
    assert.strictEqual(false, mod._isString({})())
  }),

  test('isNumber: should check if things are numbers', () => {
    assert.strictEqual(true, mod.isNumber(1))
    assert.strictEqual(false, mod.isNumber('1'))
    assert.strictEqual(false, mod.isNumber({}))
  }),
  test('_isNumber', () => {
    assert.strictEqual(true, mod._isNumber(1)())
    assert.strictEqual(false, mod._isNumber('1')())
    assert.strictEqual(false, mod._isNumber({})())
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
  test('_isNull', () => {
    assert.strictEqual(true, mod._isNull(null)())
    assert.strictEqual(false, mod._isNull(undefined)())
    assert.strictEqual(false, mod._isNull({})())
    assert.strictEqual(false, mod._isNull('str')())
    assert.strictEqual(false, mod._isNull(1)())
    assert.strictEqual(false, mod._isNull(() => {})())
  }),

  test('length: should return length of "loopable" things', () => {
    assert.strictEqual(1, mod.length([1]))
    assert.strictEqual(1, mod.length({ a: 1 }))
    assert.strictEqual(0, mod.length([]))
    assert.strictEqual(0, mod.length({}))
  }),
  test('_length', () => {
    assert.strictEqual(1, mod._length([1])())
    assert.strictEqual(1, mod._length({ a: 1 })())
    assert.strictEqual(0, mod._length([])())
    assert.strictEqual(0, mod._length({})())
  }),

  test('isObject: should check if things are objects', () => {
    assert.strictEqual(false, mod.isObject([]))
    assert.strictEqual(true, mod.isObject({}))
  }),
  test('_isObject', () => {
    assert.strictEqual(false, mod._isObject([])())
    assert.strictEqual(true, mod._isObject({})())
  }),

  test('isSymbol: should check if things are symbols', () => {
    assert.strictEqual(true, mod.isSymbol(Symbol()))
    assert.strictEqual(false, mod.isSymbol({}))
  }),
  test('_isSymbol', () => {
    assert.strictEqual(true, mod._isSymbol(Symbol())())
    assert.strictEqual(false, mod._isSymbol({})())
  }),

  test('isUndefined: should check if things are undefineds', () => {
    assert.strictEqual(true, mod.isUndefined(undefined))
    assert.strictEqual(false, mod.isUndefined('undefined'))
    assert.strictEqual(false, mod.isUndefined(false))
    assert.strictEqual(false, mod.isUndefined({}))
  }),
  test('_isUndefined', () => {
    assert.strictEqual(true, mod._isUndefined(undefined)())
    assert.strictEqual(false, mod._isUndefined('undefined')())
    assert.strictEqual(false, mod._isUndefined(false)())
    assert.strictEqual(false, mod._isUndefined({})())
  }),

  test('isDefined: should be the opposite of `isUndefined`', () => {
    assert.strictEqual(false, mod.isDefined(undefined))
    assert.strictEqual(true, mod.isDefined('undefined'))
    assert.strictEqual(true, mod.isDefined(false))
    assert.strictEqual(true, mod.isDefined({}))
  }),
  test('_isDefined', () => {
    assert.strictEqual(false, mod._isDefined(undefined)())
    assert.strictEqual(true, mod._isDefined('undefined')())
    assert.strictEqual(true, mod._isDefined(false)())
    assert.strictEqual(true, mod._isDefined({})())
  }),
  test('isBoolean: should be true when passed true or false; false otherwise', () => {
    assert.strictEqual(true, mod.isBoolean(true))
    assert.strictEqual(true, mod.isBoolean(false))
    assert.strictEqual(false, mod.isBoolean())
  }),
  test('_isBoolean', () => {
    assert.strictEqual(true, mod._isBoolean(true)())
    assert.strictEqual(true, mod._isBoolean(false)())
    assert.strictEqual(false, mod._isBoolean()())
  }),

  // Access
  test('first: should return first item in array', () => {
    const arr = [1, 2, 3]
    assert.strictEqual(1, mod.first(arr))
  }),
  test('_first', () => {
    const arr = [1, 2, 3]
    assert.strictEqual(1, mod._first(arr)())
  }),

  test('first: should return first item in object', () => {
    const obj = { a: 1, b: 2 }
    assert.deepEqual(['a', 1], mod.first(obj))
  }),

  test('last: should return last item in array', () => {
    const arr = [1, 2, 3]
    assert.strictEqual(3, mod.last(arr))
  }),
  test('_last', () => {
    const arr = [1, 2, 3]
    assert.strictEqual(3, mod._last(arr)())
  }),

  test('last: should return last item in object', () => {
    const obj = { a: 1, b: 2 }
    assert.deepEqual(['b', 2], mod.last(obj))
  }),

  test('keyIn: should check if key in array', () => {
    const got = mod.keyIn('a', ['c', 'b', 'a'])
    assert.strictEqual(got, true)
  }),

  test('keyIn: should check if key not in array', () => {
    const got = mod.keyIn('d', ['c', 'b', 'a'])
    assert.strictEqual(got, false)
  }),

  test('keyIn: should check if key in object', () => {
    const got = mod.keyIn('a', { c: 'b', a: 'd' })
    assert.strictEqual(got, true)
  }),

  test('keyIn: should check if key not in object', () => {
    const got = mod.keyIn('x', { c: 'b', a: 'd' })
    assert.strictEqual(got, false)
  }),

  test('_keyIn', () => {
    const got = mod._keyIn('a', ['c', 'b', 'a'])
    assert.strictEqual(got(), true)
  }),

  test('keyNotIn: should check if key in array', () => {
    const got = mod.keyNotIn('a', ['c', 'b', 'a'])
    assert.strictEqual(got, false)
  }),

  test('keyNotIn: should check if key not in array', () => {
    const got = mod.keyNotIn('d', ['c', 'b', 'a'])
    assert.strictEqual(got, true)
  }),

  test('keyNotIn: should check if key in object', () => {
    const got = mod.keyNotIn('a', { c: 'b', a: 'd' })
    assert.strictEqual(got, false)
  }),

  test('keyNotIn: should check if key not in object', () => {
    const got = mod.keyNotIn('x', { c: 'b', a: 'd' })
    assert.strictEqual(got, true)
  }),

  test('_keyNotIn', () => {
    const got = mod._keyNotIn('a', ['c', 'b', 'a'])
    assert.strictEqual(got(), false)
  }),


  // Checks
  test('isEmpty: should check length of array or object is empty', () => {
    assert.strictEqual(true, mod.isEmpty([]))
    assert.strictEqual(true, mod.isEmpty({}))
    assert.strictEqual(false, mod.isEmpty([1]))
    assert.strictEqual(false, mod.isEmpty({ a: 1 }))
  }),
  test('_isEmpty', () => {
    assert.strictEqual(true, mod._isEmpty([])())
    assert.strictEqual(true, mod._isEmpty({})())
    assert.strictEqual(false, mod._isEmpty([1])())
    assert.strictEqual(false, mod._isEmpty({ a: 1 })())
  }),

  test('isNotEmpty: should be opposite of `isEmpty`', () => {
    assert.strictEqual(false, mod.isNotEmpty([]))
    assert.strictEqual(false, mod.isNotEmpty({}))
    assert.strictEqual(true, mod.isNotEmpty([1]))
    assert.strictEqual(true, mod.isNotEmpty({ a: 1 }))
  }),
  test('_isNotEmpty', () => {
    assert.strictEqual(false, mod._isNotEmpty([])())
    assert.strictEqual(false, mod._isNotEmpty({})())
    assert.strictEqual(true, mod._isNotEmpty([1])())
    assert.strictEqual(true, mod._isNotEmpty({ a: 1 })())
  }),
  test('allTrue: It should return true only if all items are true', () => {
    assert.strictEqual(true, mod.allTrue([true, 1 === 1]))
    assert.strictEqual(false, mod.allTrue([false, 1 === 0]))
  }),
  test('_allTrue', () => {
    assert.strictEqual(true, mod._allTrue([true, 1 === 1])())
    assert.strictEqual(false, mod._allTrue([false, 1 === 0])())
  }),
  test('allFalse: It should return true only if all items are false', () => {
    assert.strictEqual(false, mod.allFalse([true, 1 === 1]))
    assert.strictEqual(true, mod.allFalse([false, 1 === 0]))
    assert.strictEqual(false, mod.allFalse([false, 1 === 1]))
  }),
  test('_allFalse', () => {
    assert.strictEqual(false, mod._allFalse([true, 1 === 1])())
    assert.strictEqual(true, mod._allFalse([false, 1 === 0])())
    assert.strictEqual(false, mod._allFalse([false, 1 === 1])())
  }),

  // Lazy things
  test('any: It should return first function in array that passes the predicate', () => {
    const pred = mod.isTrue
    const arr = [mod._isFalse(true), mod._isTrue(true), () => 'break if this']
    const got = mod.any(pred, arr)
    assert.notStrictEqual(got, false)
    assert.notStrictEqual(got, 'break if this')
    assert.notStrictEqual(typeof got, 'function')
  }),
  test('any: It should handle mixed functions and non functions in array', () => {
    const pred = a => a === 'xxx'
    const arr = [mod._isFalse(true), mod._isTrue(true), 'xxx']
    const got = mod.any(pred, arr)
    assert.notStrictEqual(got, false)
    assert.notStrictEqual(typeof got, 'function')
  }),
  test('anyTrue: It should return true if any item is true', () => {
    assert.strictEqual(true, mod.anyTrue([false, 1 === 1]))
    assert.strictEqual(false, mod.anyTrue([false, 1 === 0]))
    assert.strictEqual(false, mod.anyTrue([false, () => 1 === 0]))
  }),
  test('anyFalse: It should return true if any item is False', () => {
    assert.strictEqual(true, mod.anyFalse([false, 1 === 1]))
    assert.strictEqual(false, mod.anyFalse([true, 1 === 1, () => 1 === 1]))
  }),

  // Loops/Collections
  test('forEach: It should loop over an array', () => {
    const want = [1, 0, [1]]
    let got = undefined

    const fn = (...args) => {
      got = args
    }
    mod.forEach([1], fn)
    assert.deepStrictEqual(got, want)
  }),
  test('forEach: It should loop over an object', () => {
    const want = [['k', 1], 0, [['k', 1]]]
    let got = undefined

    const fn = (...args) => {
      got = args
    }
    mod.forEach({ k: 1 }, fn)
    assert.deepStrictEqual(got, want)
  }),
  test('forEach: It should loop over an object, allowing for k,v', () => {
    const wantK = 'k'
    const wantV = 'v'
    let gotK,
      gotV = undefined

    const fn = ([k, v]) => {
      gotK = k
      gotV = v
    }
    mod.forEach({ k: 'v' }, fn)
    assert.deepStrictEqual(gotK, wantK)
    assert.deepStrictEqual(gotV, wantV)
  })
]

run(cases)
