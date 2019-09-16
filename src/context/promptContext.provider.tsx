import React from 'react'
import { Prompt } from 'react-router'
import PromptContext, { PromptContextProps, PromptValueProps } from './prompt'
import usePrompt from '../hooks/usePrompt'

interface Props {
  children: (promptValue: PromptValueProps) => React.ReactNode
}

const createPromptContextProvider = (
  history: PromptContextProps['history']
) => (props: Props) => {
  const {
    promptValue,
    onLocationWillChange,
    promptContextProviderValue,
  } = usePrompt()
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
