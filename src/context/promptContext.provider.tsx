import React from 'react'
import { Prompt } from 'react-router'
import PromptContext, {
  PromptContextProps,
  PromptValueProps,
  PromptTipsProps,
} from './prompt'
import usePrompt from '../hooks/usePrompt'

interface Props {
  children: (promptValue?: PromptValueProps) => React.ReactNode
}

const createPromptContextProvider = (
  history: PromptContextProps['history'],
  promptTips?: PromptTipsProps,
) => (props: Props) => {
  const {
    onLocationWillChange,
    promptContextProviderValue,
    promptValue,
  } = usePrompt(promptTips)
  return (
    <PromptContext.Provider
      value={{
        ...promptContextProviderValue,
        history,
      }}
    >
      <Prompt message={onLocationWillChange} />
      {props.children(promptValue)}
    </PromptContext.Provider>
  )
}

export default createPromptContextProvider
