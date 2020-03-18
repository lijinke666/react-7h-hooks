import React from 'react'

export interface SetPromptWhenWillLeaveOptions {
  cancelAction?: boolean
  prompt?: boolean
}

export interface PromptContextOptions {
  isPromptWhenWillLeave: boolean
  isConfirmToLeaveFromCancelAction: boolean
  setPromptWhenWillLeave: (options?: SetPromptWhenWillLeaveOptions) => void
  setConfirmTips: (options: PromptTipsOptions) => void
}

export interface PromptTipsOptions {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
}
export interface PromptValueOptions extends PromptTipsOptions {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const PromptContext = React.createContext<PromptContextOptions>({
  isPromptWhenWillLeave: true,
  isConfirmToLeaveFromCancelAction: false,
  setPromptWhenWillLeave: () => {},
  setConfirmTips: () => {},
})

export default PromptContext
