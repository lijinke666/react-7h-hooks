
<h1 align="center">
react-7h-hooks
</h1>

<h4 align="center">
提供一些业务 react hooks , 让你每天只工作 7 小时
</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/react-7h-hooks" title="npm">
    <img src="https://img.shields.io/npm/dm/react-7h-hooks.svg?style=flat-square" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/react-7h-hooks" title="npm">
    <img src="https://img.shields.io/npm/l/react-7h-hooks.svg?style=flat-square" alt="npm">
  </a>
   <a href="https://badge.fury.io/js/react--7h-hooks" title="npm">
    <img src="https://img.shields.io/npm/v/react-7h-hooks.svg?style=flat-square" alt="npm version">
  </a>
  <a href="https://codecov.io/gh/lijinke666/react-7h-hooks">
    <img src="https://codecov.io/gh/lijinke666/react-7h-hooks/branch/master/graph/badge.svg" />
  </a>
</p>

 **开发中,请勿用于生产环境**

 ## :zap: 安装

> 使用 npm
```
npm i react-7h-hooks --save
```

> 使用 yarn
```
yarn add creact-7h-hooks
```

## :book: 如何使用

```jsx
import React from "react"
import { createPromptContextProvider, usePrompt } from "react-7h-hooks"
import { Modal } from "antd"

function App() {
  const PromptContextProvider = createPromptContextProvider(history)
  const {promptValue} = usePrompt()

  return (
    <PromptContextProvider>
      <Modal {...promptValue}/>
    </PromptContextProvider>
  )
}
```

## :metal: 文档

[TODO](https://cuke-ui.github.io/cuke-ui/)

## :page_facing_up: License

[MIT](https://github.com/lijinke666/react-7h-hooks/blob/master/LICENSE)
