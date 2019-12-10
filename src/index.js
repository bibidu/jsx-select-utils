
const Check = require('./Check')
const separateSelector = require('./separateSelector')

class SelectCSS {
  constructor(ast) {
    this.AST = ast
    this.Check = {}
    Object.getOwnPropertyNames(Check).forEach(k => {
      this.Check[k] = Check[k].bind(this)
    })
  }
  
  getSelectorChunks(selector) {
    selector = selector
      .replace(/\s/g, ' $blank$ ')
      .split(' ')
      .map(item => item === '$blank$' ? { type: 'parent', selector: '' } : separateSelector(item))
    return selector
  }
  
  find(selector) {
    // [
    //   { type: 'tag', selector: 'div' },
    //   { type: 'parent' },
    //   { type: 'tag', selector: 'li' },
    // ]
    const selectorChunk = this.getSelectorChunks(selector)
    const fn = selectorChunk.reduce((next, chunk) => {
      const fn = chunk.type === 'parent' ? this.Check.parent : this.Check.base
      return fn(chunk, next)
    }, () => true)
  
    return fn()
  }
}

module.exports = function(ast) {
  return new SelectCSS(ast)
}