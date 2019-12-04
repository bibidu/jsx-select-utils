const { selectorCheck } = require('../utils')

module.exports = function querySelector(store, selector) {
  if (!selectorCheck(selector)) return console.log('选择器校验失败!')

  const firstWord = getString(selector, 0, 1)
  switch (firstWord) {
    case '#': {
      return store.ids[getString(selector, 1)] || []
    }
    case '.': {
      return store.classNames[getString(selector, 1)] || []
    }
    default: {
      return store.tags[selector] || []
    }
  }
}

function getString(str, start = 0, end = str.length) {
  return str.substring(start, end)
}