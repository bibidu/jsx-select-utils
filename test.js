const parser = require('@babel/parser')
const createUtil = require('./src')


const code = `<div id="p">
  <span>{'title'}</span>
  <div>
    <span>
      <span>{'title'}</span>
    </span>
  </div>
</div>`


const ast = parser.parse(code, {
  sourceType: "module",
  plugins: [
    "jsx"
  ]
})
const utils = createUtil(ast)
const divs = utils.querySelector('div')
const result = utils.getParent(divs[1])
console.log(`============`)
console.log(result.isProgram)
console.log(result.nodePath.type)