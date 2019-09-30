
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
    <img src="https://api.netlify.com/api/v1/badges/216fcb8a-7c65-47f1-a1eb-040dbaeb4548/deploy-status" />
  </a>
</p>

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
import React, { useCallback } from 'react'
import { useDownload } from 'react-7h-hooks'
import { Button } from 'antd'

export const Example = () => {
  const createDownloadInstance = useDownload()

  const onClick = useCallback(() => {
    const instance = createDownloadInstance({
      name: 'favicon',
      data: require('./favicon.ico'),
    })
    instance.download()
  }, [])

  return (
    <Button icon="download" type="primary" onClick={onClick}>
      下载图标
    </Button>
  )
}
```

## :metal: 文档

[https://react-7h-hooks.netlify.com/](https://react-7h-hooks.netlify.com/)

## :page_facing_up: License

[MIT](https://github.com/lijinke666/react-7h-hooks/blob/master/LICENSE)
