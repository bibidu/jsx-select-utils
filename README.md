# jsx-select-utils
The parser can receive JSX AST of babel, then return a lots of methods, 
such as,
- `querySelector(nodePath: /* ast节点 */Node {}, selector: string): Boolean`
- `querySelectorAll(selector: string): [Node {}]`
- `getParent(nodePath: /* ast节点 */Node {}, selector: string): [Node {}]`


## Usage
```js
const jsxSelectUtils = require('jsx-select-utils')

const code = `
<div id="p">
  <span >{'title'}</span>
  <div>
    <span>
      <span className="title red-title">{'title'}</span>
    </span>
  </div>
</div>
`
const ast = require('@babel/parser').parse(code, {
  sourceType: "module",
  plugins: [
    "jsx"
  ]
})

const { querySelector, getParent } = jsxSelectUtils(ast)

querySelectorAll('span')
getParent(querySelectorAll('span')[0], 'div')
getParent(querySelectorAll('span')[1], 'div')
querySelector(querySelectorAll('span')[2], 'title')

```

Output:
```js
// [Node {}, Node {}, ......] /* tagName="div"的节点的asts */

// [Node {}] /* 第一个tagName="span" 的父节点的asts */

// [Node {}, Node {}] /* 第二个tagName="span" 的父节点的asts */

// true
```
