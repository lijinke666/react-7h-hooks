# useLeavePrompt

对 `react-router-dom` 的 `Prompt` 组件, `浏览器 history` 和 `React.createContext` 的一系列封装

## 使用场景

- 即将离开当前页面, 需要给与用户二次确认提示
- 当编辑表单时, 如果点了浏览器的返回按钮, 或者页面的返回按钮 需要给与用户二次确认提示

## 代码演示

在项目入口 **配置全局 LeavePromptProvider**

```js
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LeavePromptProvider } from 'react-7h-hooks'
import { Modal } from 'antd'

const App = () => {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <LeavePromptProvider>
        //  这里的 promptValue 就是 全局 context 里面的 弹框提示
        {promptValue => (
          // 自定义你自己的 模态框 比如 antd 的 Modal
          // 本质上如果离开页面时需要提示, 会自动更新这里的 promptValue, 从而打开弹窗
          <Modal {...promptValue} onOk={promptValue.onConfirm}>
            {promptValue.description}
          </Modal>
        )}
      </LeavePromptProvider>
    </Router>
  )
}
```

```jsx
/**
 * title: 基本使用
 * desc: history.push 跳转路由时自动弹出提示
 */
import React, { useEffect } from 'react'
import { Modal, Button } from 'antd'
import { Router, useHistory } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LeavePromptProvider, useLeavePrompt } from 'react-7h-hooks'

const Example = () => {
  const history = useHistory()
  const { setPrompt } = useLeavePrompt()

  useEffect(() => {
    // 设置提醒
    setPrompt({
      prompt: true,
    })
  }, [])

  return <Button onClick={() => history.push('/test')}>离开当前页面</Button>
}

const App = () => {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <LeavePromptProvider>
        {promptValue => (
          <>
            <Example />
            <Modal {...promptValue} onOk={promptValue.onConfirm}>
              {promptValue.description}
            </Modal>
          </>
        )}
      </LeavePromptProvider>
    </Router>
  )
}

export default App
```


```jsx
/**
 * title: 编辑场景
 * desc: 在编辑表单时取消编辑的时候自动弹出提示
 */
import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Button } from 'antd'
import { Router, useHistory } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LeavePromptProvider, useLeavePrompt } from 'react-7h-hooks'

const Example = () => {
  const [edit, setEdit] = useState(false)
  const {
    isConfirmToLeaveFromCancelAction,
    setPrompt,
  } = useLeavePrompt()

  useEffect(() => {
    // 如果点击了确认, 设置为非编辑状态
    if (isConfirmToLeaveFromCancelAction) {
      setEdit(false)
    }
  }, [isConfirmToLeaveFromCancelAction])

  useEffect(() => {
    // 如果是编辑, 那么就设置提醒
    setPrompt({
      prompt: edit,
    })
  }, [edit, setPrompt])

  const onCancelEdit = useCallback(() => {
    // 表示是从页面某一个按钮触发的
    setPrompt({
      cancelAction: true,
    })
  }, [setPrompt])

  return (
    <>
      <p>
        当前状态: {edit ? '编辑' : '预览'}
        {edit && (
          <Button onClick={onCancelEdit} style={{ marginLeft: 10 }}>
            取消
          </Button>
        )}
      </p>

      <p>
        <Button type="primary" onClick={() => setEdit(value => !value)}>
          切换编辑状态
        </Button>
      </p>
    </>
  )
}

const App = () => {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <LeavePromptProvider>
        {promptValue => (
          <>
            <Example />
            <Modal {...promptValue} onOk={promptValue.onConfirm}>
              {promptValue.description}
            </Modal>
          </>
        )}
      </LeavePromptProvider>
    </Router>
  )
}

export default App
```

```jsx
/**
 * title: 动态设置文案
 * desc: 需要在当前页面特殊设置提示文案时
 */
import React, { useEffect } from 'react'
import { Modal, Button, Divider } from 'antd'
import { Router, useHistory } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { LeavePromptProvider, useLeavePrompt } from 'react-7h-hooks'

const Example = () => {
  const history = useHistory()
  const { setPrompt, setConfirmTips } = useLeavePrompt()

  useEffect(() => {
    setPrompt({
      prompt: true,
    })
  }, [])

  useEffect(() => {
    setConfirmTips({
      title: '自定义提示标题',
      description: '你确定要离开吗?',
      okText: '确定离开',
      cancelText: '取消',
    })
  }, [])

  return <Button onClick={() => history.push('/test')}>离开当前页面</Button>
}

const App = () => {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <LeavePromptProvider promptTips={{
        title: 'title',
        description: 'description',
        okText: 'okText',
        cancelText: 'cancelText',
      }}>
        {promptValue => (
          <>
            <pre>{JSON.stringify(promptValue, undefined, 2)}</pre>
            <Divider/>
            <Example />
            <Modal {...promptValue} onOk={promptValue.onConfirm}>
              {promptValue.description}
            </Modal>
          </>
        )}
      </LeavePromptProvider>
    </Router>
  )
}

export default App
```

## API

```js
import { LeavePromptProvider } from 'react-7h-hooks'
const { setPrompt, setConfirmTips, isConfirmToLeaveFromCancelAction } = useLeavePrompt(options)
```

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| setPrompt | 设置当前页面是否需要提示 | `(options: SetPromptOptions) => void` | `-` |
| setConfirmTips | 设置提示文本 | `(options: LeavePromptTipsOptions) => void` | `DefaultConfirmTips` |
| isConfirmToLeaveFromCancelAction | 是否点击了确认 | `boolean` | `false` |

## LeavePromptProvider

```js
import { LeavePromptProvider } from 'react-7h-hooks'
```

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| promptTips | prompt 的 context Provider | `LeavePromptTipsOptions` | `DefaultConfirmTips` |
| children | react children | `(promptValue?: LeavePromptValueOptions) => React.ReactNode` | `-` |

## SetPromptOptions

| 属性                 | 说明       | 类型      | 默认值  |
| -------------------- | ---------- | --------- | ------- |
| options.cancelAction | 是否是取消 | `boolean` | `false` |
| options.prompt       | 是否提示   | `boolean` | `false` |

## LeavePromptTipsOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options.title | 标题 | `ReactNode` \| `string` | `确认离开?` |
| options.description | 描述 | `ReactNode` \| `string` | `离开不保留任何数据` |
| options.okText | 确认按钮文本 | `ReactNode` \| `string` | `确认` |
| options.cancelText | 取消按钮文本 | `ReactNode` \| `string` | `取消` |

## LeavePromptValueOptions

```js
export interface LeavePromptTipsOptions {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
}

export interface LeavePromptValueOptions extends LeavePromptTipsOptions {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}
```
