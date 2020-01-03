# useNextTick

对 `useEffect` 和 `event loop microtask(微任务)` 的封装

## 使用场景

- 需要在事件循环的任务队列中最后执行
- 需要在页面加载后, 获取 dom 节点时

## 如何使用

```jsx
import React, { useCallback } from 'react'
import { useNextTick } from 'react-7h-hooks'

export const Example = () => {
  const reTrigger = useNextTick(() => {
    message.info('自动触发')
  })
  const nextTick = useNextTick()
  const onClick = useCallback(() => {
    nextTick(() => {
      message.warn('手动触发')
    })
  }, [nextTick])

  return (
    <>
      <Button onClick={onClick}>手动触发</Button>
      <Button onClick={() => reTrigger()}>再次自动触发</Button>
    </>
  )
}

```

## API

| 属性                | 说明           | 类型       | 默认值 |
| ------------------- | -------------- | ---------- | ------ |
| (handler: Function) | 自定义处理函数 | `Function` | `-`    |

