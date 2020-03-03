# 介绍

**react-7h-hooks** 提供一些偏业务的实用 react hooks, 让你每天只工作 7 小时 !

![https://www.npmjs.com/package/react-7h-hooks](https://img.shields.io/npm/dm/react-7h-hooks.svg?style=flat-square)
![https://www.npmjs.com/package/react-7h-hooks](https://img.shields.io/npm/l/react-7h-hooks.svg?style=flat-square)
![https://www.npmjs.com/package/react-7h-hooks](https://img.shields.io/npm/v/react-7h-hooks.svg?style=flat-square)
![https://codecov.io/gh/lijinke666/react-7h-hooks](https://codecov.io/gh/lijinke666/react-7h-hooks/branch/master/graph/badge.svg)
![https://app.netlify.com/sites/react-7h-hooks/deploys](https://github.com/lijinke666/react-7h-hooks/workflows/Node%20CI/badge.svg)
![https://app.netlify.com/sites/react-7h-hooks/deploys](https://api.netlify.com/api/v1/badges/216fcb8a-7c65-47f1-a1eb-040dbaeb4548/deploy-status)

## 安装

> 使用 npm

```bash
npm i react-7h-hooks --save
```

> 使用 yarn

```bash
yarn add react-7h-hooks
```

## 如何使用

```js
import React from 'react'
import { useTrimInput } from 'react-7h-hooks'

const Example = () => {
  const [trimValue, setTrimValue] = useTrimInput()
  const [fullTrimValue, setFullTrimValue] = useTrimInput(true)
  return (
    <>
      <input
        value={trimValue}
        onChange={setTrimValue}
      />
      <input
        value={fullTrimValue}
        onChange={setFullTrimValue}
      />
    </>
  )
}

export default Example
```

## 文档

[查看](https://react-7h-hooks.netlify.com/)

## 推荐

- [swr](https://github.com/zeit/swr) 网络请求
- [react-use](https://github.com/streamich/react-use) 常用的一些基础 hooks
- [@umijs/hooks](https://github.com/umijs/hooks) 乌米提供的一些实用的高级 hooks

## License

[MIT](https://github.com/lijinke666/react-7h-hooks/blob/master/LICENSE)

