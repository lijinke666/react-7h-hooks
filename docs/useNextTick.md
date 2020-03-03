# useNextTick

对 `useEffect` 和 `event loop microtask(微任务)` 的封装

## 使用场景

- 需要在事件循环的任务队列中最后执行
- 需要在页面加载后, 获取 dom 节点时

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 自动触发
 */
import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useNextTick } from '../src/index.tsx'

const Example = () => {
  const reTrigger = useNextTick(() => {
    message.info('自动触发')
  })
  return <Button onClick={() => reTrigger()}>再次自动触发</Button>
}

export default Example
```


```jsx
/**
 * title: 手动触发
 * desc: 根据业务逻辑手动执行
 */
import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useNextTick } from '../src/index.tsx'

const Example = () => {
  const nextTick = useNextTick()
  const onClick = useCallback(() => {
    nextTick(() => {
      message.warn('手动触发')
    })
  }, [nextTick])

  return <Button onClick={onClick}>手动触发</Button>
}

export default Example
```

## API

```
const reTrigger = useNextTick(handler)
```

| 属性    | 说明           | 类型       | 默认值 |
| ------- | -------------- | ---------- | ------ |
| handler | 自定义处理函数 | `Function` | `-`    |

