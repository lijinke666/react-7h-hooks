import React from 'react';

export type SetPromptWhenWillLeaveProps =
  | boolean
  | {
      cancelAction?: boolean;
      prompt?: boolean;
    };

export interface PromptContextProps {
  isPromptWhenWillLeave: boolean;
  isConfirmToLeaveFromCancelAction: boolean;
  setPromptWhenWillLeave: (options?: SetPromptWhenWillLeaveProps) => void;
}

const PromptContext = React.createContext<PromptContextProps>({
  isPromptWhenWillLeave: true,
  isConfirmToLeaveFromCancelAction: false,
  setPromptWhenWillLeave: () => {},
});

export default PromptContext;
