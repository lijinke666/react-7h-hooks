# useList

可添加,减少的动态列表

## 使用场景

- 动态表单

## 如何使用

```jsx
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from 'react-7h-hooks'

export const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle } = useList({
    title: '表单',
    count: 0
  })
  return (
    <>
      {list.map(id => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={onRemove(id)}>
              <Icon type="plus" /> 删除
            </Button>
          </Form.Item>
        )
      })}
      <Button type="dashed" onClick={onAdd}>
        <Icon type="plus" /> 新增
      </Button>
      {list.length >= 1 && (
        <Button type="danger" onClick={onReset}>
          重置
        </Button>
      )}
    </>
  )
}

```

## API

| 属性  | 说明                                       | 类型                                                                          | 默认值 |
| ----- | ------------------------------------------ | ----------------------------------------------------------------------------- | ------ |
| title | 每一项表单的名字, 支持一个函数自定义格式化 | `string \| React.ReactNode \| ((id: number) => string \| React.ReactNode)` | `-`    |
| count | 默认生成的列表个数                         | `number`                                                                      | `0`    |

