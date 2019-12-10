module.exports = function separateSelector(inputSelector) {
  const firstWord = getString(inputSelector, 0, 1)
  let type = 'tag', selector = inputSelector
  switch (firstWord) {
    case '#': {
      type = 'id'
      selector = getString(selector, 1)
    }
    case '.': {
      type = 'className'
      selector = getString(selector, 1)
    }
  }
  return { type, selector }
}

function getString(str, start = 0, end = str.length) {
  return str.substring(start, end)
}