import React from 'react'
import { History } from 'history'

export interface SetPromptWhenWillLeaveProps {
  cancelAction?: boolean
  prompt?: boolean
}

export interface PromptContextProps {
  history: History | null
  isPromptWhenWillLeave: boolean
  isConfirmToLeaveFromCancelAction: boolean
  setPromptWhenWillLeave: (options?: SetPromptWhenWillLeaveProps) => void
  setConfirmTips: (options: PromptTipsProps) => void
}

export interface PromptTipsProps {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
}
export interface PromptValueProps extends PromptTipsProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const PromptContext = React.createContext<PromptContextProps>({
  history: null,
  isPromptWhenWillLeave: true,
  isConfirmToLeaveFromCancelAction: false,
  setPromptWhenWillLeave: () => {},
  setConfirmTips: () => {},
})

export default PromptContext
