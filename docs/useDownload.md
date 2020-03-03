# useDownload

对 `HTML5` 的 `download` 属性的封装

## 使用场景

- 当需要下载图片或 excel 之类的文件时

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 下载图片
 */
import React, { useCallback } from 'react'
import { useDownload } from '../src/index.tsx'
import { Button } from 'antd'

const Example = () => {
  const createDownloadInstance = useDownload()

  const onClick = useCallback(() => {
    const instance = createDownloadInstance({
      name: 'favicon',
      // data: require('../favicon.ico'),
    })
    instance.download()
  }, [])

  return (
    <Button icon="download" type="primary" onClick={onClick}>
      下载图标
    </Button>
  )
}

export default Example
```

## API

```js
const createDownloadInstance = useDownload(options)
createDownloadInstance.download()
```

| 属性         | 说明     | 类型             | 默认值 |
| ------------ | -------- | ---------------- | ------ |
| options.name | 文件名   | `string`         | `-`    |
| options.data | 文件内容 | `string \| Blob` | `-`    |
| options.type | 文件类型 | `string`         | `-`    |

