const findIt = require('../findIt')
module.exports = function base(selectorWrapper, next) {
  return (limitAstPath) => {
    const results = findIt(selectorWrapper, this.AST, limitAstPath)
    const deleteIdxs = []
    if (results.length) {
      results.forEach((item, idx) => {
        let flag = next(item)
        if (!flag) {
          deleteIdxs.unshift(idx)
        }
      })
      /* 找到的astPath */
      return results.filter((item,idx) => !deleteIdxs.includes(idx))
    }
    return []
  }
}