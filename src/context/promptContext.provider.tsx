import React from 'react'
import { Prompt } from 'react-router'
import PromptContext, { PromptValueProps, PromptTipsProps } from './prompt'
import usePrompt from '../hooks/usePrompt'

interface Props {
  children: (promptValue?: PromptValueProps) => React.ReactNode
}

const createPromptContextProvider = (promptTips?: PromptTipsProps) => (
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
