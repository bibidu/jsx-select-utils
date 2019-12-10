// const findIt = require('../findIt')

module.exports = function parent(selectorWrapper, next) {
  return (astPath) => {
    let t = findASTParent(astPath)
    if (!t.findIt || t.isProgram) {
      return null
    }
    while (!t.isProgram) {
      if (t.findIt) {
        let rst = next(t.parent)
        if (rst.length) {
          return rst
        }
        t = findASTParent(t.parent)
      } else {
        return null
      }
    }
    return null
  }
}

function findASTParent(astPath) {
  if (astPath.node.type === 'Program') {
    return {
      findIt: false,
    }
  }
  let parent = astPath.findParent(() => true)
  while (!['JSXElement', 'Program'].includes(parent.node.type)) {
    // always 'ExpressionStatement'
    parent = parent.findParent(() => true)
  }
  return {
    findIt: true,
    parent,
    isProgram: parent.node.type === 'Program'
  }
}