import React from 'react'
import { Prompt } from 'react-router-dom'
import PromptContext, { PromptValueOptions, PromptTipsOptions } from './prompt'
import usePrompt from '../hooks/usePrompt'

interface Props {
  children: (promptValue?: PromptValueOptions) => React.ReactNode
}

const createPromptContextProvider = (promptTips?: PromptTipsOptions) => (
  props: Props,
) => {
  const {
    onLocationWillChange,
    promptContextProviderValue,
    promptValue,
  } = usePrompt(promptTips)
  return (
    <PromptContext.Provider value={promptContextProviderValue}>
      <Prompt message={onLocationWillChange} />
      {props.children(promptValue)}
    </PromptContext.Provider>
  )
}

export default createPromptContextProvider
