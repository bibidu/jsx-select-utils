const t = require('@babel/types')
const {
  separateSelector
 } = require('../utils')

module.exports = function verifySelectorIsMatched(path, selector) {
  const { type, name } = separateSelector(selector)
  const matchTagName = (path) => path.node.openingElement.name.name === name
  return (
    matchTagName(path)
    || (
      path.node.openingElement.attributes
      && path.node.openingElement.attributes.find(attr => {
        return (
          t.isJSXIdentifier(attr.name)
          && attr.name.name === type
          && t.isStringLiteral(attr.value)
          && attr.value.value.includes(name)
        )
      })
    )
  )
}