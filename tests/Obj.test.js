const { Arr } = require('../src/Arr')
const { Obj } = require('../src/Obj')

describe('Obj', () => {
  const o = {
    firstName: 'Bob',
    lastName: 'Smith',
    phone: '+1 (555) 555-55-55',
    birthDay: new Date('1990-12-11'),
  }

  const numbers = {
    a: 1,
    b: 10,
    c: 15,
    d: 6,
    e: -10,
    f: -4,
    g: 1,
    h: 6,
  }

  const numbers2 = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'a',
    4: 'c',
    5: 'a',
    6: 'a',
  }

  it('map', () => {
    const obj1 =
      o
      |> Object.entries
      |> Arr.map(([key, value]) => [value, key])
      |> Object.fromEntries

    const obj2 = o |> Obj.map((key, value) => [value, key])
    expect(obj1).toEqual(obj2)
  })

  it('mutmap', () => {
    const obj2 = { ...o }
    const obj1 =
      o
      |> Object.entries
      |> Arr.map(([key, value]) => [key, key + ':' + value + '!!!'])
      |> Object.fromEntries

    obj2 |> Obj.mutmap((key, value) => key + ':' + value + '!!!')

    expect(obj1).toEqual(obj2)
  })

  it('forEach', () => {
    const result1 = []
    o
      |> Object.entries
      |> Arr.forEach(([key, value]) => result1.push(key, value))

    const result2 = []
    o |> Obj.forEach((key, value) => result2.push(key, value))

    expect(result1).toEqual(result2)
  })

  it('filter', () => {
    const obj1 =
      o
      |> Object.entries
      |> Arr.filter(([key, value]) => value > 5)
      |> Object.fromEntries

    const obj2 = o |> Obj.filter((key, value) => value > 5)

    expect(obj1).toEqual(obj2)
  })

  it('mutfilter', () => {
    const obj1 =
      o
      |> Object.entries
      |> Arr.filter(([key, value]) => value > 5)
      |> Object.fromEntries

    const obj2 = { ...o }
    obj2 |> Obj.mutfilter((key, value) => value > 5)

    expect(obj1).toEqual(obj2)
  })

  it('reduce', () => {
    const result1 =
      numbers
      |> Object.entries
      |> Arr.reduce(
        (acc, [key, value]) => {
          acc.keys.push(key)
          acc.sum += value
          return acc
        },
        { keys: [], sum: 0 }
      )
    const result2 =
      numbers
      |> Obj.reduce(
        (acc, key, value) => {
          acc.keys.push(key)
          acc.sum += value
          return acc
        },
        {
          keys: [],
          sum: 0,
        }
      )

    expect(result1).toEqual(result2)
  })

  describe('invert', () => {
    it('without combineRule, drop repeating keys', () => {
      const result = numbers2 |> Obj.invert(false)
      expect(result).toEqual({ a: '6', b: '1', c: '4' })
    })

    it('combineRule with initialValue', () => {
      const result =
        numbers
        |> Obj.invert({
          combineRule: (acc, key) => acc.concat(key),
          initialValue: [],
        })
      expect(result).toEqual({
        1: ['a', 'g'],
        6: ['d', 'h'],
        10: ['b'],
        15: ['c'],
        '-10': ['e'],
        '-4': ['f'],
      })
    })

    it('combineRule with standard behaviour', () => {
      const result = numbers |> Obj.invert()
      expect(result).toEqual({
        1: ['a', 'g'],
        6: ['d', 'h'],
        10: ['b'],
        15: ['c'],
        '-10': ['e'],
        '-4': ['f'],
      })
    })

    describe('combineRule without initialValue', () => {
      it('sum of numbers', () => {
        const result =
          numbers2
          |> Obj.invert({
            combineRule: (sum, key) => sum + key,
          })
        expect(result).toEqual({ a: 14, b: 1, c: 6 })
      })

      it('concatenation of strings', () => {
        const result =
          numbers
          |> Obj.invert({
            combineRule: (sum, key) => sum + key,
          })
        expect(result).toEqual({
          1: 'ag',
          6: 'dh',
          10: 'b',
          15: 'c',
          '-10': 'e',
          '-4': 'f',
        })
      })
    })
  })

  it('sortByKeys', () => {
    const result = numbers2 |> Obj.sortByKeys((a, b) => b - a)
    expect(result).toEqual([
      ['6', 'a'],
      ['5', 'a'],
      ['4', 'c'],
      ['3', 'a'],
      ['2', 'c'],
      ['1', 'b'],
      ['0', 'a'],
    ])
  })

  it('sortByValues', () => {
    const result = numbers |> Obj.sortByValues((a, b) => a - b)

    expect(result).toEqual([
      ['e', '-10'],
      ['f', '-4'],
      ['a', '1'],
      ['g', '1'],
      ['d', '6'],
      ['h', '6'],
      ['b', '10'],
      ['c', '15'],
    ])
  })
})
