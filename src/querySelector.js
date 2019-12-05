const {
  selectorCheck,
  separateSelector,
 } = require('../utils')


module.exports = function querySelector(store, selector) {
  if (!selectorCheck(selector)) return console.log('选择器校验失败!')

  const { type, name } = separateSelector(selector)
  return store[`${type}s`][name] || []
}

