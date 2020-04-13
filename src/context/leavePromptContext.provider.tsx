import React from 'react'
import { Prompt } from 'react-router-dom'
import LeavePromptContext, {
  LeavePromptValueOptions,
  LeavePromptTipsOptions,
} from './leavePrompt'
import useLeavePrompt from '../hooks/useLeavePrompt'

interface Props {
  children: (promptValue?: LeavePromptValueOptions) => React.ReactNode
}

const createLeavePromptContextProvider = (
  promptTips?: LeavePromptTipsOptions,
) => (props: Props) => {
  const {
    onLocationWillChange,
    promptContextProviderValue,
    promptValue,
  } = useLeavePrompt(promptTips)
  return (
    <LeavePromptContext.Provider value={promptContextProviderValue}>
      <Prompt message={onLocationWillChange} />
      {props.children(promptValue)}
    </LeavePromptContext.Provider>
  )
}

export default createLeavePromptContextProvider
