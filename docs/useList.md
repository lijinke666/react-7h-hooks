# useList

可添加,减少的动态列表

## 使用场景

- 动态表单
- 输入一组数据时

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 动态的增加删除
 */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from 'react-7h-hooks'

const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle, onClear } = useList({
    title: '表单',
  })
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form {...layout}>
      {list.map((id, i) => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)} style={{marginTop: 10}}>
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
          <Button type="danger" onClick={onReset} style={{margin: '0 10px'}}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </Form>
  )
}

export default Example
```

```jsx
/**
 * title: 默认值
 * desc: 默认显示2个列表项, 会重置输入框的值
 */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from 'react-7h-hooks'

const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle, onClear } = useList({
    title: '表单',
    count: 2,
  })
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form {...layout}>
      {list.map(id => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)} style={{marginTop: 10}}>
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
          <Button type="danger" onClick={onReset} style={{margin: '0 10px'}}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </Form>
  )
}

export default Example
```

```jsx
/**
 * title: 动态标题
 * desc: 自定义组合标题-记住index (eg. 当前表单1，表单2, 表单3, 将表单2删除后, 新增后, 下一个标题为 `表单4`)
 */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from 'react-7h-hooks'

const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle, onClear } = useList({
    title: (currentId, index) => {
      return `表单${index + 1}`
    },
    rememberIndex: true,
    count: 3
  })
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form {...layout}>
      {list.map((id, i) => {
        return (
          <Form.Item label={onGetTitle(id)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)} style={{marginTop: 10}}>
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
          <Button type="danger" onClick={onReset} style={{margin: '0 10px'}}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </Form>
  )
}

export default Example
```

```jsx
/**
 * title: 动态标题
 * desc: 自定义组合标题-不记住index, 以实际表单项为序号（默认）
 */
import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import { useList } from 'react-7h-hooks'

const Example = () => {
  const { list, onAdd, onRemove, onReset, onGetTitle, onClear } = useList({
    title: (currentId, index) => {
      return `表单${index + 1}`
    },
    rememberIndex: false
  })
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };
  return (
    <Form {...layout}>
      {list.map((id, i) => {
        return (
          <Form.Item label={onGetTitle(id, i)} key={id}>
            <Input />
            <Button type="dashed" onClick={() => onRemove(id)} style={{marginTop: 10}}>
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
          <Button type="danger" onClick={onReset} style={{margin: '0 10px'}}>
            重置
          </Button>
          <Button type="dashed" onClick={onClear}>
            清空
          </Button>
        </>
      )}
    </Form>
  )
}

export default Example
```

## API

```js
const { list, onAdd, onRemove, onReset, onClear, onGetTitle, idIndexMapper } = useList(options)
```

| 属性                  | 说明                                       | 类型                                                                                        | 默认值  |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- | ------- |
| options.title         | 每一项表单的名字, 支持一个函数自定义格式化 | `string` \| `React.ReactNode` \| `(id: string, index: number) => string \| React.ReactNode` | `-`     |
| options.count         | 默认生成的列表个数                         | `number`                                                                                    | `0`     |
| options.rememberIndex | 新增一项时是否记住上一次的index            | `boolean`                                                                                   | `false` |

## 返回值说明

| 属性          | 说明                                       | 类型                                         | 默认值 |
| ------------- | ------------------------------------------ | -------------------------------------------- | ------ |
| list          | 一个自增 id 组成的数组, 用它来渲染你的表单 | `string[]`                                   | `-`    |
| onAdd         | 没调用一次, list 新增一条记录              | `()=> void`                                  | `-`    |
| onRemove      | 删除 list 对应 id 的记录                   | `( id: string)=> void`                       | `-`    |
| onRest        | 重置 list 为初始状态                       | `()=> void`                                  | `-`    |
| onClear       | 清空 list                                  | `()=> void`                                  | `-`    |
| onGetTitle    | 获取 id 对应的标题                         | `( id: string) => string \| React.ReactNode` | `-`    |
| idIndexMapper | id 和 index 对应的 map                     | `Map<id: string, index: number>`             | `-`    |
