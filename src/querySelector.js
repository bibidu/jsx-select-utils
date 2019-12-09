const {
  selectorCheck,
  separateSelector,
 } = require('../utils')


module.exports = function querySelector(nodePath, selector) {
  if (!selectorCheck(selector)) return console.log('选择器校验失败!')

  const { type, name } = separateSelector(selector)
  if (type === 'tag') {
    return Boolean(nodePath.node.openingElement.name.name === name)
  }
  if (type === 'id') {
    return Boolean(
      nodePath.node.openingElement.attributes
      && nodePath.node.openingElement.attributes.find(attr => {
        return attr.name.name === 'id' && attr.value.value && attr.value.value.includes(name)
      })
    )
  }
  if (type === 'className') {
      return Boolean(
      nodePath.node.openingElement.attributes
      && nodePath.node.openingElement.attributes.find(attr => {
        return attr.name.name === 'className' && attr.value.value && attr.value.value.includes(name)
      })
    )
  }
  return false
}

