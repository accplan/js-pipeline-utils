export const Obj = {
  map: fn => obj => {
    const newObj = {}
    Object.entries(obj).forEach(([key, value]) => {
      const [newKey, newValue] = fn(key, value)
      newObj[newKey] = newValue
    })
    return newObj
  },

  mutmap: fn => obj => {
    Object.keys(obj).forEach(key => {
      obj[key] = fn(key, obj[key])
    })
    return obj
  },

  forEach: fn => obj => {
    return Object.entries(obj).forEach(([key, value]) => fn(key, value))
  },

  filter: fn => obj => {
    const newObj = {}
    Object.keys(obj).forEach(key => {
      if (fn(key, obj[key])) newObj[key] = obj[key]
    })
    return newObj
  },

  mutfilter: fn => obj => {
    Object.keys(obj).forEach(key => {
      if (!fn(key, obj[key])) delete obj[key]
    })
    return obj
  },

  reduce: (fn, initialValue) => obj => {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => fn(acc, key, value),
      initialValue
    )
  },

  invert:
    (options = true) =>
    obj => {
      let combineRule, initialValue
      if (options === true) {
        combineRule = (acc, key) => acc.concat(key)
        initialValue = []
      } else {
        combineRule = options?.combineRule
        initialValue = options?.initialValue ?? null
      }

      const newObj = {}
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (typeof combineRule === 'function') {
          if (!isNaN(key)) key = parseFloat(key)
          if (!initialValue && isNaN(key)) {
            newObj[value] ??= ''
          } else {
            newObj[value] ??= initialValue
          }

          newObj[value] = combineRule(newObj[value], key)
        } else {
          newObj[value] = key
        }
      })
      return newObj
    },

  sortByKeys: fn => obj => {
    const newObj = []
    Object.keys(obj)
      .sort(fn)
      .forEach(key => newObj.push([key, obj[key]]))
    return newObj
  },

  sortByValues: fn => obj => {
    const invertedObj = obj |> Obj.invert()

    const newObj = []
    Object.keys(invertedObj)
      .sort(fn)
      .forEach(value => {
        invertedObj[value].forEach(key => newObj.push([key, value]))
      })

    return newObj
  },
}
