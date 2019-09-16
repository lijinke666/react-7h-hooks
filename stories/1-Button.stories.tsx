import React from 'react'
import { createPromptContextProvider, usePrompt } from '../src'
import { Modal } from 'antd'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export const UsePrompt = () => {
  const PromptContextProvider = createPromptContextProvider(history)
  const { promptValue } = usePrompt()

  return (
    <PromptContextProvider>
      11
      <Modal {...promptValue} />
    </PromptContextProvider>
  )
}

export default {
  title: 'usePrompt',
}
