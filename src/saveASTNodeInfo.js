const t = require('@babel/types')
const traverse = require('@babel/traverse').default

module.exports = function saveASTNodeInfo(ast) {
  const store = {
    ids: {},
    classNames: {},
    tags: {}
  }

  traverse(ast, {
    JSXElement(path) {
      const tagName = path.node.openingElement.name.name
      const attributes = path.node.openingElement.attributes
      // 以key为标签名，缓存节点
      if (!store.tags[tagName]) {
        store.tags[tagName] = []
      }
      store.tags[tagName].push(path)

      for (let i = 0; i < attributes.length; i++) {
        const currentAttrNode = attributes[i]
        const attrName = currentAttrNode.name.name
        if (['className', 'id'].includes(attrName)) {
          const attrValue = extractJSXAttrValue(currentAttrNode)
          attrValue.forEach(valueItem => {
            // 以key为id名、className名，缓存节点
            if (!store[`${attrName}s`][valueItem]) {
              store[`${attrName}s`][valueItem] = []
            }
            store[`${attrName}s`][valueItem].push(path)
          })
        }
      }
    }
  })
  return store
}

function extractJSXAttrValue(attrNode) {
  if (t.isStringLiteral(attrNode.value)) {
    return splitBy(attrNode.value.value)
  }
  if (t.isJSXExpressionContainer(attrNode.value) && t.isStringLiteral(attrNode.value.expression)) {
    return splitBy(attrNode.value.expression.value)
  }
  return []
}

function splitBy(value, splitStr = ' ') {
  return value.split(splitStr)
}
