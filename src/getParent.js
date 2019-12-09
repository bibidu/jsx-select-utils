const t = require('@babel/types')
const verifySelectorIsMatched = require('./verifySelectorIsMatched')

module.exports = function getParent(nodePath, selector) {
  console.log(selector)
  const isMatchJSXElement = (path, selector) => verifySelectorIsMatched(path, selector)
  const limitFunc = path => t.isJSXElement(path) && isMatchJSXElement(path, selector)
  const parentNodePaths = findParentWithLimit(nodePath, limitFunc)
  
  return parentNodePaths
}

function findParentWithLimit(path, limitFunc) {
  const results = []
  let current = path
  const hasOver = () => t.isProgram(current)

  while (!hasOver()) {
    current = current.findParent(() => true)
    if (limitFunc(current)) {
      results.push(current)
    }
  }
  return results
}