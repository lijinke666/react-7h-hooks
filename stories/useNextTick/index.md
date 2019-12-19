# useNextTick

对 `useEffect` 和 `setTimeout` 的封装

## 使用场景

- 想在下一个 `event loop` 做一些事情的时候
- 需要在页面加载后, 或延迟执行, 获取 dom 节点时

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

| 属性       | 说明                             | 类型      | 默认值  |
| ---------- | -------------------------------- | --------- | ------- |
| handler | 自定义处理函数 | `Function` | `-` |

