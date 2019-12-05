const { getString } = require('.')

module.exports = function separateSelector(selector) {
  const firstWord = getString(selector, 0, 1)
  let type = 'tag', name = selector
  switch (firstWord) {
    case '#': {
      type = 'id'
      name = getString(selector, 1)
    }
    case '.': {
      type = 'className'
      name = getString(selector, 1)
    }
  }
  return { type, name }
}