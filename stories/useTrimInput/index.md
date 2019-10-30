# useTrimInput

对 `输入框` 进行 去除空格 处理

## 使用场景

- 当需要去除用户输入的文本的前后空格 或全部空格时

## 如何使用

```jsx
import React from 'react'
import { useTrimInput } from '../../src'
import { Form, Input } from 'antd'

export const Example = () => {
  const [trimValue, setTrimValue] = useTrimInput()
  const [fullTrimValue, setFullTrimValue] = useTrimInput(true)
  return (
    <Form>
      <Form.Item label="前后不能有空格">
        <Input
          value={trimValue}
          onChange={setTrimValue}
          placeholder="请输入姓名"
        />
      </Form.Item>
      <Form.Item label="所有不能有空格">
        <Input
          value={fullTrimValue}
          onChange={setFullTrimValue}
          placeholder="请输入姓名"
        />
      </Form.Item>
    </Form>
  )
}


```

## API

| 属性       | 说明                             | 类型      | 默认值  |
| ---------- | -------------------------------- | --------- | ------- |
| isFullTrim | 是否全部去除(默认只去除首尾空格) | `boolean` | `false` |

