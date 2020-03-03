# useList

可添加,减少的动态列表

## 使用场景

- 动态表单

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 动态的增加删除
 */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from '../src/index.tsx'

const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle, onClear } = useList({
    title: '表单',
  })
  return (
    <>
      {list.map(id => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)}>
              <Icon type="plus" /> 删除
            </Button>
          </Form.Item>
        )
      })}
      <Button type="dashed" onClick={onAdd}>
        <Icon type="plus" /> 新增
      </Button>
      {list.length >= 1 && (
        <>
          <Button type="danger" onClick={onReset}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </>
  )
}

export default Example

```

```jsx
/**
 * title: 默认值
 * desc: 默认显示2个列表项
 */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from '../src/index.tsx'

const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle, onClear } = useList({
    title: '表单',
    count: 2
  })
  return (
    <>
      {list.map(id => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)}>
              <Icon type="plus" /> 删除
            </Button>
          </Form.Item>
        )
      })}
      <Button type="dashed" onClick={onAdd}>
        <Icon type="plus" /> 新增
      </Button>
      {list.length >= 1 && (
        <>
          <Button type="danger" onClick={onReset}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </>
  )
}

export default Example

```

## API

```
const { list, onAdd, onRemove, onReset, onClear, onGetTitle } = useList(options)
```

| 属性          | 说明                                       | 类型                                                                       | 默认值 |
| ------------- | ------------------------------------------ | -------------------------------------------------------------------------- | ------ |
| options.title | 每一项表单的名字, 支持一个函数自定义格式化 | `string \| React.ReactNode \| ((id: number) => string \| React.ReactNode)` | `-`    |
| options.count | 默认生成的列表个数                         | `number`                                                                   | `0`    |

## 返回值说明

| 属性       | 说明                                       | 类型                                        | 默认值 |
| ---------- | ------------------------------------------ | ------------------------------------------- | ------ |
| list       | 一个自增 id 组成的数组, 用它来渲染你的表单 | `number[]`                                  | `-`    |
| onAdd      | 没调用一次, list 新增一条记录              | `()=> void`                                 | `-`    |
| onRemove   | 删除 list 对应 id 的记录                   | `( id: number)=> void`                      | `-`    |
| onRest     | 重置 list 为初始状态                       | `()=> void`                                 | `-`    |
| onClear    | 清空 list                                  | `()=> void`                                 | `-`    |
| onGetTitle | 获取id 对应的标题                          | `( id: number) => string \ React.ReactNode` | `-`    |
