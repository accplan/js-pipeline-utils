const { Arr } = require('../src/Arr')

describe('Arr implements all functions presented in Array.prototype', () => {
  const arr = [7, 4, 2, 3, 0, 1, , 8, 2, 5, 9, 6]

  it('find', () => {
    const func = x => x % 2 === 0
    expect(arr |> Arr.find(func)).toEqual(arr.find(func))
  })

  it('findIndex', () => {
    const func = x => x % 2 === 0
    expect(arr |> Arr.findIndex(func)).toEqual(arr.findIndex(func))
  })

  it('filter', () => {
    const func = x => x % 2 === 0
    expect(arr |> Arr.filter(func)).toEqual(arr.filter(func))
  })

  it('map', () => {
    const func = x => x * 2
    expect(arr |> Arr.map(func)).toEqual(arr.map(func))
  })

  it('forEach', () => {
    const createFunction = () => {
      const result = []
      return {
        func: x => result.push(x * 2),
        getResult() {
          return result
        },
      }
    }

    const func1 = createFunction()
    const func2 = createFunction()

    arr |> Arr.forEach(func1.func)
    arr.forEach(func2.func)

    expect(func1.getResult()).toEqual(func2.getResult())
  })

  it('reduce', () => {
    const func = (acc, i) => acc + i
    expect(arr |> Arr.reduce(func, 0)).toEqual(arr.reduce(func, 0))
  })

  it('reduceRight', () => {
    const func = (acc, i) => acc + i
    expect(arr |> Arr.reduceRight(func, 0)).toEqual(arr.reduceRight(func, 0))
  })

  it('concat', () => {
    const arr2 = [11, 12, 13]
    expect(arr |> Arr.concat(arr2)).toEqual(arr.concat(arr2))
  })

  it('entries', () => {
    expect(arr |> Arr.entries()).toEqual(arr.entries())
  })

  it('every', () => {
    const func1 = x => x > 5
    const func2 = x => x < 10
    expect(arr |> Arr.every(func1)).toEqual(arr.every(func1))
    expect(arr |> Arr.every(func2)).toEqual(arr.every(func2))
  })

  it('some', () => {
    const func1 = x => x === 5
    const func2 = x => x === 12345
    expect(arr |> Arr.some(func1)).toEqual(arr.some(func1))
    expect(arr |> Arr.some(func2)).toEqual(arr.some(func2))
  })

  it('fill', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1 |> Arr.fill(0, 2, 4)).toEqual(arr2.fill(0, 2, 4))
    expect(arr1).toEqual(arr2)
  })

  it('flat', () => {
    const arr2 = [1, 2, [3, 4, [5, 6, [7, 8]]]]
    expect(arr2 |> Arr.flat()).toEqual(arr2.flat())
    expect(arr2 |> Arr.flat(2)).toEqual(arr2.flat(2))
    expect(arr2 |> Arr.flat(Infinity)).toEqual(arr2.flat(Infinity))
  })

  it('flatMap', () => {
    const arr2 = ["it's Sunny in", '', 'California']
    const func = x => x.split(' ')
    expect(arr2 |> Arr.flatMap(func)).toEqual(arr2.flatMap(func))
  })

  it('includes', () => {
    expect(arr |> Arr.includes(2)).toEqual(arr.includes(2))
    expect(arr |> Arr.includes(100)).toEqual(arr.includes(100))
  })

  it('indexOf', () => {
    expect(arr |> Arr.indexOf(2)).toEqual(arr.indexOf(2))
    expect(arr |> Arr.indexOf(100)).toEqual(arr.indexOf(100))
  })

  it('lastIndexOf', () => {
    expect(arr |> Arr.lastIndexOf(2)).toEqual(arr.lastIndexOf(2))
    expect(arr |> Arr.lastIndexOf(100)).toEqual(arr.lastIndexOf(100))
  })

  it('join', () => {
    expect(arr |> Arr.join(' + ')).toEqual(arr.join(' + '))
  })

  it('keys', () => {
    expect([...(arr |> Arr.keys())]).toEqual([...arr.keys()])
  })

  it('values', () => {
    expect([...(arr |> Arr.values())]).toEqual([...arr.values()])
  })

  it('shift', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1 |> Arr.shift()).toEqual(arr2.shift())
    expect(arr1).toEqual(arr2)
  })

  it('pop', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1 |> Arr.pop()).toEqual(arr2.pop())
    expect(arr1).toEqual(arr2)
  })

  it('push', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1.push(122)).toEqual(arr2 |> Arr.push(122))
    expect(arr1).toEqual(arr2)
  })

  it('unshift', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1.unshift(122)).toEqual(arr2 |> Arr.unshift(122))
    expect(arr1).toEqual(arr2)
  })

  it('reverse', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1 |> Arr.reverse()).toEqual(arr2.reverse())
  })

  it('slice', () => {
    expect(arr |> Arr.slice(-2)).toEqual(arr.slice(-2))
    expect(arr |> Arr.slice(1, 4)).toEqual(arr.slice(1, 4))
  })

  it('sort', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]

    const func = (a, b) => {
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    }

    arr1.sort(func)
    arr2 |> Arr.sort(func)

    expect(arr1).toEqual(arr2)
  })

  it('splice', () => {
    const arr1 = [...arr]
    const arr2 = [...arr]
    expect(arr1 |> Arr.splice(-2, 0, 12345, 1000)).toEqual(
      arr2.splice(-2, 0, 12345, 1000)
    )
    expect(arr1).toEqual(arr2)
  })

  it('toString', () => {
    expect(arr |> Arr.toString()).toEqual(arr.toString())
  })

  it('toLocaleString', () => {
    const number = 1337
    const date = new Date()
    const arr = [number, date, 'foo']
    expect(arr |> Arr.toLocaleString()).toEqual(arr.toLocaleString())
  })

  it('copyWithin', () => {
    expect(arr |> Arr.copyWithin(0, 4)).toEqual(arr.copyWithin(0, 4))
  })
})
