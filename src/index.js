const saveASTNodeInfo = require('./saveASTNodeInfo')
const querySelector = require('./querySelector')
const querySelectorAll = require('./querySelectorAll')
const getParent = require('./getParent')


module.exports = function createUtil(ast) {
  // 缓存语法树分析的信息
  const store = saveASTNodeInfo(ast)
  return {
    querySelector: (nodePath, selector) => querySelector(nodePath, selector),
    querySelectorAll: (selector) => querySelectorAll(store, selector),
    getParent: (nodePath, selector) => getParent(nodePath, selector)
  }
}






