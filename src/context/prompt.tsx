import React from 'react'

export type ISetPromptWhenWillLeaveProps = boolean | {
  cancelAction?: boolean
  prompt?: boolean
}

export interface IPromptContextProps {
  isPromptWhenWillLeave: boolean
  isConfirmToLeaveFromCancelAction: boolean
  setPromptWhenWillLeave: (options?: ISetPromptWhenWillLeaveProps) => void
}

const PromptContext = React.createContext<IPromptContextProps>({
  isPromptWhenWillLeave: true,
  isConfirmToLeaveFromCancelAction: false,
  setPromptWhenWillLeave:()=>{}
})

export default PromptContext
