export const Arr = new Proxy(
  {},
  {
    has: Array.prototype.hasOwnProperty,
    get:
      (_, prop) =>
      (...args) =>
      arr =>
        arr[prop](...args),
  }
)
