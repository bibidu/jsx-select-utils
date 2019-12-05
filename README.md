# jsx-select-utils
The parser can receive JSX AST of babel, then return a lots of methods, 
such as,
- `querySelector(selector: string)`
- `getParent(nodePath: /* ast节点 */Node {}, selector: string)`


## Usage
```js
const jsxSelectUtils = require('jsx-select-utils')

const code = `
<div id="p">
  <span >{'title'}</span>
  <div>
    <span>
      <span>{'title'}</span>
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

querySelector('span')
getParent(querySelector('span')[0], 'div')
getParent(querySelector('span')[1], 'div')

```

Output:
```js
// [Node {}, Node {}, ......] /* tagName="div"的节点的asts */

// { findIt: true, nodePath: Node {} } /* 第一个tagName="div" 的父节点的asts */

// { findIt: false, nodePath: Node {} } /* 第二个tagName="div" 的父节点的asts */
```
