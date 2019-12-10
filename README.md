# jsx-select-utils
A util can help you find dom by enter CSS selectors in JSX. it has a method,

such as,
- `find(selector: string): array<Node {}>`


## Usage
```js
const jsxSelect = require('jsx-select-utils')

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
</div>
`
const ast = require('@babel/parser').parse(code, {
  sourceType: "module",
  plugins: [
    "jsx"
  ]
})

const { find } = jsxSelect(ast)

// case one
find('div .title').length

// case two
find('ul li').length

// case three
find('.body h1')

```

Output:
```js
1 // case one

4 // case two

[Node {/* .body下h1节点的AST */}] // case three
```
## Supported selectors

*add constantly according to CSS3.*

- Tag (`<tagname>`)
- ClassName (`className=""`)
- Id (`id=""`)
- Parent (`className=".a .b"`)