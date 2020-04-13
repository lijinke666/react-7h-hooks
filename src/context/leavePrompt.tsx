import React from 'react'

export interface SetPromptOptions {
  cancelAction?: boolean
  prompt?: boolean
}

export interface LeavePromptContextOptions {
  isPromptWhenWillLeave: boolean
  isConfirmToLeaveFromCancelAction: boolean
  setPrompt: (options?: SetPromptOptions) => void
  setConfirmTips: (options: LeavePromptTipsOptions) => void
}

export interface LeavePromptTipsOptions {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
}
export interface LeavePromptValueOptions extends LeavePromptTipsOptions {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const LeavePromptContext = React.createContext<LeavePromptContextOptions>({
  isPromptWhenWillLeave: true,
  isConfirmToLeaveFromCancelAction: false,
  setPrompt: () => {},
  setConfirmTips: () => {},
})

export default LeavePromptContext
