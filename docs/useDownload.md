# useDownload

对 `HTML5` 的 `download` 属性的封装

## 使用场景

- 当需要下载图片或 excel 之类的文件时

## 代码演示

```jsx
/**
 * title: 下载JSON文件
 * desc: 指定文件类型 type = `json`
 */
import React, { useCallback } from 'react'
import { useDownload } from 'react-7h-hooks'
import { Button } from 'antd'

const Example = () => {
  const createDownloadInstance = useDownload()

  const onClick = useCallback(() => {
    const instance = createDownloadInstance({
      name: 'test.json',
      data: { text: '这是一个JSON文件' },
      type: 'json',
    })
    instance.download()
  }, [])

  return (
    <Button icon="download" type="primary" onClick={onClick}>
      点击下载
    </Button>
  )
}

export default Example
```

```jsx
/**
 * title: 下载文本
 * desc: 指定文件类型 type = `text`
 */
import React, { useCallback } from 'react'
import { useDownload } from 'react-7h-hooks'
import { Button } from 'antd'

const Example = () => {
  const createDownloadInstance = useDownload()

  const onClick = useCallback(() => {
    const instance = createDownloadInstance({
      name: 'test.txt',
      data: '一段文本',
      type: 'text',
    })
    instance.download()
  }, [])

  return (
    <Button icon="download" type="primary" onClick={onClick}>
      点击下载
    </Button>
  )
}

export default Example
```

```jsx
/**
 * title: 下载线上图片
 * desc: 指定一个url地址 type = `url`
 */
import React, { useCallback } from 'react'
import { useDownload } from 'react-7h-hooks'
import { Button } from 'antd'

const Example = () => {
  const createDownloadInstance = useDownload()

  const onClick = useCallback(() => {
    const instance = createDownloadInstance({
      name: 'logo.png',
      data: 'https://cdn.lijinke.cn/7h-hook.png',
      type: 'url',
    })
    instance.download()
  }, [])

  return (
    <Button icon="download" type="primary" onClick={onClick}>
      点击下载
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

<br/>

| 属性         | 说明     | 类型                      | 默认值 |
| ------------ | -------- | ------------------------- | ------ |
| options.name | 文件名   | `string`                  | `-`    |
| options.data | 文件内容 | `any`        | `-`    |
| options.type | 文件类型 | `text` \| `json` \| `url` | `-`    |
