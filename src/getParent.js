const t = require('@babel/types')
const verifySelectorIsMatched = require('./verifySelectorIsMatched')

module.exports = function getParent(nodePath, selector) {
  console.log(selector)
  const isMatchJSXElement = (path, selector) => verifySelectorIsMatched(path, selector)
  const limitFunc = path => (t.isJSXElement(path) && isMatchJSXElement(path, selector)) || t.isProgram(path)
  const parentNodePath = findParentWithLimit(nodePath, limitFunc)
  
  return {
    findIt: !t.isProgram(parentNodePath),
    nodePath: parentNodePath
  }
}

function findParentWithLimit(path, limitFunc) {
  let current = path.findParent(() => true)
  while (!limitFunc(current)) {
    current = current.findParent(() => true)
  }
  return current
}