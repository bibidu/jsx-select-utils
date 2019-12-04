# jsx-utils
The parser can receive JSX AST of babel, then return a lots of methods, 
such as,
- `querySelector(selector: string)`
- `getParent(nodePath: /* ast节点 */Node {})`


## Usage
```js
const jsxUtils = require('jsx-utils')

const code = `
<div id="p">
  <span>{'title'}</span>
  <div>
    <span>
      <span>{'title'}</span>
    </span>
  </div>
</div>
`
const { ast } = require('@babel/core').transform(code)

const { querySelector, getParent } = jsxUtils(ast)

querySelector('div')
getParent(querySelector('div')[0])
getParent(querySelector('div')[1])

```

Output:
```js
// [Node {}, Node {}, ......] /* tagName="div"的节点的asts */

// { isProgram: true, nodePath: Node {} } /* 第一个tagName="div" 的父节点的asts */

// { isProgram: false, nodePath: Node {} } /* 第二个tagName="div" 的父节点的asts */
```
