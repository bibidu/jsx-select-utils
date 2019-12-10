const parser = require('@babel/parser')
const SelectCSS = require('./src')

const code = `
<div className="container">
  <div className="title">
    <ul className="paragraph">
      <li>1</li>
      <li>2</li>
    </ul>
  </div>
  <div className="body">
    <h1>body</h1>
    <ul className="paragraph">
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</div>`
const ast = parser.parse(code, {
  sourceType: "module",
  plugins: [
    "jsx"
  ]
})
const search = SelectCSS(ast)
console.log('------- result -------')
console.log(search.find('div .title').length) // 1
console.log(search.find('ul li').length) // 4
// console.log(search.find('.body h1')) // [Node {/* h1节点的AST */}]
