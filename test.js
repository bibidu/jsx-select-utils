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

function getAstInfo(asts) {
  return asts.map(item => {
    const openingElement = item.get('openingElement')
    const attrs = openingElement.get('attributes')
    const classItem = attrs.filter(attr => attr.get('name').isJSXIdentifier({ name: 'className' }))
    const idItem = attrs.filter(attr => attr.get('name').isJSXIdentifier({ name: 'id' }))
    return {
      tag: openingElement.get('name').node.name,
      class: classItem.length ? classItem[0].get('value').node.value : '',
      id: idItem.length ? idItem[0].get('value').node.value : '',
    }
  })
}

const search = SelectCSS(ast)
console.log('------- result -------')

console.log(getAstInfo(search.find('div .title')))
// [ { tag: 'div', class: 'title', id: '' } ]

console.log(getAstInfo(search.find('div')))
// [
//   { tag: 'div', class: 'container', id: '' },
//   { tag: 'div', class: 'title', id: '' },
//   { tag: 'div', class: 'body', id: '' }
// ]
