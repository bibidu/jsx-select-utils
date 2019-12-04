const t = require('@babel/types')

module.exports = function getParent(nodePath) {
  const limitFunc = path => t.isJSXElement(path) || t.isProgram(path)
  const parentNodePath = findParentWithLimit(nodePath, limitFunc)
  
  return {
    isProgram: t.isProgram(parentNodePath),
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