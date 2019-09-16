import React from 'react'
import PromptContext, { PromptContextProps } from './prompt'
import usePrompt from '../hooks/usePrompt'

interface Props {
  children: React.ReactNode
}

const createPromptContextProvider = (
  history: PromptContextProps['history']
) => (props: Props) => {
  const value = usePrompt()
  return (
    <PromptContext.Provider
      value={{
        ...value,
        history,
      }}
    >
      {props.children}
    </PromptContext.Provider>
  )
}

export default createPromptContextProvider
