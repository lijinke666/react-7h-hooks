# usePrompt

对 `react-router-dom` 的 `Prompt` 组件 和 `React.createContext` 的一系列封装

## 使用场景

- 当即将离开当前页面, 需要给与用户二次确认提示
- 当编辑表单时, 如果点了浏览器的返回按钮 或者页面的返回按钮 需要给与用户二次确认提示

## 如何使用

> 第一步: 在你的 入口 引入 context Provider

```jsx
import { createPromptContextProvider } from 'react-7h-hooks'

export const App = () => {
  const PromptContextProvider = createPromptContextProvider({
    // 自定义提示文字配置
  })

  return (
    <Router>
      <PromptContextProvider>
        //  这里的 promptValue 就是 全局 context 里面的 弹框提示
        {promptValue => (
          // 自定义你自己的 模态框 比如 antd 的 Modal
          <Modal {...promptValue}/>
        )}
      </PromptContextProvider>
    </Router>
  )
}
```

> 第二步: 如代码所示

```jsx
const Page = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const {
    setPromptWhenWillLeave,
    setConfirmTips,
    isConfirmToLeaveFromCancelAction,
  } = usePrompt()

  // [可选] 自定义提示文本 本质就是修改 context 里面的promptValue
  useEffect(() => {
    setConfirmTips({
      title: '自定义提示标题',
      description: '你确定要离开吗?',
      okText: '确定离开',
      cancelText: '取消',
    })
  }, [])

  // [必须] (路由级别的改变) 表名什么时候离开页面需要提示
  useEffect(() => {
    setPromptWhenWillLeave({
      prompt: edit,
    })
  }, [edit])

  // [可选] (页面界面的改变) 当点击页面上的取消按钮时,但是并没有路由改变,如果也需要提示
  const onCancelEdit = useCallback(() => {
    setPromptWhenWillLeave({
      cancelAction: true,
    })
  }, [])

  // [可选] (页面界面的改变) 如果是由 取消按钮触发的 提示
  // 根据是否点击了提示框中确定的确定按钮 做出相应的逻辑处理
  useEffect(() => {
    if (isConfirmToLeaveFromCancelAction) {
      setEdit(false)
    }
  }, [isConfirmToLeaveFromCancelAction])

  return (
    <>
      <Button onClick={onCancelEdit}>取消</Button>
      <Button type="primary" onClick={() => setEdit(true)}>
        切换编辑状态
      </Button>
      <Button onClick={() => history.push('/test')}>离开当前页面</Button>
    </>
  )
}
```

## API

| 属性                             | 说明                                | 类型                                                | 默认值               |
| -------------------------------- | ----------------------------------- | --------------------------------------------------- | -------------------- |
| setPromptWhenWillLeave           | 设置当前页面是否需要提示            | `SetPromptWhenWillLeaveProps`                       | `-`                  |
| setConfirmTips                   | 设置提示文本                        | `PromptTipsProps`                                   | `DefaultConfirmTips` |
| isConfirmToLeaveFromCancelAction | 是否点击了确认                      | `boolean`                                           | `false`              |
| createPromptContextProvider      | 创建一个 prompt 的 context Provider | `(history: History, defaultConfirmTips) => Context` | `-`                  |


## SetPromptWhenWillLeaveProps

```js
(options?: {
  cancelAction?: boolean
  prompt?: boolean
}) => void
```

## DefaultConfirmTips

```js
{ title: '确认离开?', description: '离开不保留任何数据', okText: '确认', cancelText: '取消', }
```

## PromptTipsProps

```js
export interface PromptTipsProps {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
}
```

## PromptValueProps

```js
export interface PromptTipsProps {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
}
export interface PromptValueProps extends PromptTipsProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}
```
