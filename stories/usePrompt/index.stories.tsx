/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Button } from 'antd'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { createPromptContextProvider, usePrompt } from '../../src'

const history = createBrowserHistory()

const Component = () => {
  const {
    setPromptWhenWillLeave,
    setConfirmTips,
    isConfirmToLeaveFromCancelAction,
  } = usePrompt()

  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    if (isConfirmToLeaveFromCancelAction) {
      setEdit(false)
    }
  }, [isConfirmToLeaveFromCancelAction])

  useEffect(() => {
    setPromptWhenWillLeave({
      prompt: edit,
    })
  }, [edit, setPromptWhenWillLeave])

  const onCancelEdit = useCallback(() => {
    setPromptWhenWillLeave({
      cancelAction: true,
    })
  }, [setPromptWhenWillLeave])

  useEffect(() => {
    setConfirmTips({
      title: '自定义提示标题',
      description: '你确定要离开吗?',
      okText: '确定离开',
      cancelText: '取消',
    })
  }, [setConfirmTips])
  return (
    <>
      <p>
        当前状态: {edit ? '编辑' : '预览'}
        {edit && <Button onClick={onCancelEdit}>取消</Button>}
      </p>

      <p>
        <Button type="primary" onClick={() => setEdit(value => !value)}>
          切换编辑状态
        </Button>
      </p>

      <p>
        <Button disabled={!edit} onClick={() => history.push('/test')}>
          离开当前页面
        </Button>
      </p>
    </>
  )
}

export const Example = () => {
  const PromptContextProvider = createPromptContextProvider()

  return (
    <Router history={history}>
      <PromptContextProvider>
        {promptValue => (
          <>
            <Component />
            <Modal {...promptValue} onOk={promptValue!.onConfirm}>
              {promptValue!.description}
            </Modal>
          </>
        )}
      </PromptContextProvider>
    </Router>
  )
}

export default {
  title: 'usePrompt',
  parameters: { notes: require('./index.md') },
}
