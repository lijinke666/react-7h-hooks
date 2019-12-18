# useDownload

对 `HTML5` 的 `download` 属性的封装

## 使用场景

- 当需要下载图片或 excel 之类的文件时

## 如何使用

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

## API

| 属性                   | 说明           | 类型                                                        | 默认值 |
| ---------------------- | -------------- | ----------------------------------------------------------- | ------ |
| createDownloadInstance | 创建下载拦截器 | `(options: UseDownloadOptions) => { download: () => void}}` | `-`    |

## UseDownloadOptions

```js
interface UseDownloadOptions {
  name: string
  data: string | Blob
  type?: string
}
```
