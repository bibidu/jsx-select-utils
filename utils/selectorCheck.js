module.exports = function check(selector) {
  if (typeof selector !== 'string' || selector.includes(' ')) {
    return false
  }
  return true
}