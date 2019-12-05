const parser = require('@babel/parser')
const createUtil = require('./src')


const code = `<div id="p">
  <span id="span">{'title'}</span>
  <p class="p">
    <span>
      <span>{'title'}</span>
    </span>
  </p>
</div>`


const ast = parser.parse(code, {
  sourceType: "module",
  plugins: [
    "jsx"
  ]
})
const utils = createUtil(ast)
const spans = utils.querySelector('span')
const result = utils.getParent(spans[1], 'p')
const result1 = utils.getParent(spans[1], '.p')
console.log(`============`)
console.log(result.nodePath.node.openingElement.name.name)
console.log(result1.nodePath.node.openingElement.name.name)
console.log(result.nodePath === result1.nodePath)
// console.log(result.findIt)
// console.log(result.nodePath.type)