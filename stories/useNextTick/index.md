# useNextTick

想在下一个 `event loop` 做一些事情的时候

## 使用场景

- 需要在页面加载后, 或延迟执行, 可以用于获取 dom 等场景

## 如何使用

```jsx
import React, { useCallback } from 'react'
import { useNextTick } from 'react-7h-hooks'

export const Example = () => {
  useNextTick(() => {
    message.info('自动触发')
  })
  const nextTick = useNextTick()
  const onClick = useCallback(() => {
    nextTick(() => {
      message.warn('手动触发')
    })
  }, [nextTick])

  return (
    <Button onClick={onClick}>手动触发</Button>
  )
}

```

## API

| 属性       | 说明                             | 类型      | 默认值  |
| ---------- | -------------------------------- | --------- | ------- |
| handler | 自定义处理函数 | `Function` | `-` |

