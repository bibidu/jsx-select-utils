const saveASTNodeInfo = require('./saveASTNodeInfo')
const querySelector = require('./querySelector')
const getParent = require('./getParent')


module.exports = function createUtil(ast) {
  // 缓存语法树分析的信息
  const store = saveASTNodeInfo(ast)
  return {
    querySelector: (selector) => querySelector(store, selector),
    getParent: (nodePath, selector) => getParent(nodePath, selector)
  }
}






