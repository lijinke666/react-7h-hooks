import React from 'react'
import { Prompt } from 'react-router'
import PromptContext, { PromptContextProps } from './prompt'
import usePrompt from '../hooks/usePrompt'

interface Props {
  children: React.ReactNode
}

const createPromptContextProvider = (
  history: PromptContextProps['history']
) => (props: Props) => {
  const { onLocationWillChange, promptContextProviderValue } = usePrompt()
  return (
    <PromptContext.Provider
      value={{
        ...promptContextProviderValue,
        history,
      }}
    >
      <Prompt message={onLocationWillChange} />
      {props.children}
    </PromptContext.Provider>
  )
}

export default createPromptContextProvider
