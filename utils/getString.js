module.exports = function getString(str, start = 0, end = str.length) {
  return str.substring(start, end)
}