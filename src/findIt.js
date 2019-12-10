const traverse = require('@babel/traverse').default

module.exports = function findIt(selectorWrapper, AST, limitAstPath) {
  const { type, selector } = selectorWrapper
  if (limitAstPath) {
    const tagName = limitAstPath.node.openingElement.name.name
    const className = extractJSXAttr(limitAstPath.node.openingElement.attributes, 'className')
    const id = extractJSXAttr(limitAstPath.node.openingElement.attributes, 'id')
    const find = (
      (type === 'tag' && selector === tagName)
      || (type === 'className' && selector === className)
      || (type === 'id' && selector === id)
    )
    return find ? [limitAstPath] : []
  }
  
  const results = traverseAstToFindSelector(selectorWrapper, AST)
  return results
}

function traverseAstToFindSelector(selectorWrapper, AST) {
  const { type , selector } = selectorWrapper
  const results = []
  traverse(AST, {
    JSXElement(path) {
      const attrs = path.node.openingElement.attributes
      if (!attrs) path.stop()

      const tagName = path.node.openingElement.name.name
      const className = extractJSXAttr(attrs, 'className')
      const id = extractJSXAttr(attrs, 'id')
      const find = (
        (type === 'tag' && selector === tagName)
        || (type === 'className' && selector === className)
        || (type === 'id' && selector === id)
      )
      if (find) {
        results.push(path)
      }
    }
  })
  return results
}


function extractJSXAttr(attributes, attrName) {
  if (!attributes) return

  for (let i = 0; i < attributes.length; i++) {
    const item = attributes[i]
    if (item.name.name === attrName) {
      return item.value.value
    }
  }
  return
}
