var isObject = function(e) {
  return e !== null && toString.call(e) === '[object Object]'
}

var isFunction = function(e) {
  if (!e) return !1
  try {
    return /^\s*\bfunction\b/.test(e)
  } catch (t) {
    return !1
  }
}

var isUndefined = function(e) {
  return undefined === e
}

var isArray = function(e) {
  return toString.call(e) === '[object Array]'
}

var isString = function(e) {
  return toString.call(e) === '[object String]'
}

var isEmpty = function(value) {
  if (value === null || value === undefined) return true
  if (isObject(value)) return Object.keys(value).length === 0
  if (isArray(value)) return value.length === 0

  return false
}

var isNotEmpty = function(value) {
  return !isEmpty(value)
}

module.exports = {
  isObject,
  isFunction,
  isUndefined,
  isArray,
  isString,
  isEmpty,
  isNotEmpty
}
