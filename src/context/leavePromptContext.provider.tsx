import React from 'react'
import { Prompt } from 'react-router-dom'
import LeavePromptContext, {
  LeavePromptValueOptions,
  LeavePromptTipsOptions,
} from './leavePrompt'
import useLeavePrompt from '../hooks/useLeavePrompt'

const LeavePromptProvider: React.FC<{
  promptTips?: LeavePromptTipsOptions
  children: (promptValue: LeavePromptValueOptions) => React.ReactNode
}> = (props) => {
  const { promptTips, children } = props
  const {
    onLocationWillChange,
    promptContextProviderValue,
    promptValue,
  } = useLeavePrompt(promptTips)
  return (
    <LeavePromptContext.Provider value={promptContextProviderValue}>
      <Prompt message={onLocationWillChange} />
      {children(promptValue)}
    </LeavePromptContext.Provider>
  )
}

export default LeavePromptProvider
