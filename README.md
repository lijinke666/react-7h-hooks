
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
    <a href="https://app.netlify.com/sites/react-7h-hooks/deploys">
    <img src="https://github.com/lijinke666/react-7h-hooks/workflows/Node%20CI/badge.svg" />
  </a>
  <a href="https://app.netlify.com/sites/react-7h-hooks/deploys">
    <img src="https://api.netlify.com/api/v1/badges/216fcb8a-7c65-47f1-a1eb-040dbaeb4548/deploy-status" />
  </a>
</p>

 ## :package: 安装

> 使用 npm

```bash
npm i react-7h-hooks --save
```

> 使用 yarn

```bash
yarn add react-7h-hooks
```

## :memo: 如何使用

```tsx
import React from 'react'
import { useTrimInput } from 'react-7h-hooks'

export const Example = () => {
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
```

## :book: 文档

[https://react-7h-hooks.netlify.com/](https://react-7h-hooks.netlify.com/)

## :star: 推荐

- [swr](https://github.com/zeit/swr) 网络请求
- [react-use](https://github.com/streamich/react-use) 常用的一些基础 hooks
- [@umijs/hooks](https://github.com/umijs/hooks) 乌米提供的一些实用的高级 hooks

## :page_facing_up: License

[MIT](https://github.com/lijinke666/react-7h-hooks/blob/master/LICENSE)
