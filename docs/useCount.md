# useCount

可添加减少,重置的计数器

## 使用场景

- 轮播图
- 具有上一页下一页功能的简单分页

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 动态的增加删除
 */
import React from 'react'
import { Button, Badge, Space } from 'antd'
import { useCount } from 'react-7h-hooks'

const Example = () => {
  const { count, onAdd, onSubtract, onReset, setCount } = useCount()
  return (
    <Space>
    <Badge count={count} showZero/>
    <Button onClick={onAdd}>+1</Button>
    <Button onClick={onSubtract}>-1</Button>
    <Button onClick={onReset}>重置</Button>
    <Button onClick={() => setCount(3)}>设置 current 为 3</Button>
    </Space>
  )
}

export default Example
```

```jsx
/**
 * title: 默认值
 * desc: 设置默认计数为3
 */
import React from 'react'
import { Button, Badge, Space } from 'antd'
import { useCount } from 'react-7h-hooks'

const Example = () => {
  const { count, onAdd, onSubtract, onReset, setCount } = useCount(3)
  return (
    <Space>
      <Badge count={count} showZero/>
      <Button onClick={onAdd}>+1</Button>
      <Button onClick={onSubtract}>-1</Button>
      <Button onClick={onReset}>重置</Button>
      <Button onClick={() => setCount(3)}>设置 current 为 3</Button>
    </Space>
  )
}

export default Example
```

```jsx
/**
 * title: 受控组件
 * desc: 和antd的Pagination组件组合使用
 */
import React from 'react'
import { Pagination } from 'antd'
import { useCount } from 'react-7h-hooks'

const Example = () => {
  const { count, onAdd, onSubtract, onReset, setCount } = useCount(1)

  const onChange = (page) => {
    setCount(page)
  }

  return (
    <Pagination simple current={count} total={50} onChange={onChange}/>
  )
}

export default Example
```

## API

```js
const { count, onAdd, onSubtract, onReset, setCount } = useCount(defaultCount)
```

<br/>

| 属性         | 说明   | 类型     | 默认值 |
| ------------ | ------ | -------- | ------ |
| defaultCount | 默认数 | `number` | `0`    |

## 返回值说明

| 属性       | 说明               | 类型                      | 默认值 |
| ---------- | ------------------ | ------------------------- | ------ |
| count      | 当前计数           | `number`                  | `0`    |
| onAdd      | 当前计数+1         | `() => void`              | `-`    |
| onSubtract | 当前计数-1         | `() => void`              | `-`    |
| onRest     | 重置为defaultCount | `() => void`              | `-`    |
| setCount   | 设置计数器         | `(count: number) => void` | `-`    |
