import React from 'react'
import { History } from 'history'

export interface SetPromptWhenWillLeaveProps {
  cancelAction?: boolean
  prompt?: boolean
}

export interface PromptContextProps {
  history: History | null
  isPromptWhenWillLeave?: boolean
  isConfirmToLeaveFromCancelAction?: boolean
  setPromptWhenWillLeave?: (options?: SetPromptWhenWillLeaveProps) => void
}

export interface PromptTipsProps {
  title?: React.ReactNode | string
  description?: React.ReactNode | string
  ok?: React.ReactNode | string
  cancel?: React.ReactNode | string
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
})

export default PromptContext
