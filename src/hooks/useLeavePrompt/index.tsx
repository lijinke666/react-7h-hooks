import { useState, useMemo, useCallback, useContext } from 'react'
import { Location } from 'history'
import { useHistory } from 'react-router-dom'
import LeavePromptContext, {
  LeavePromptTipsOptions,
  SetPromptOptions,
  LeavePromptContextOptions,
} from '../../context/leavePrompt'

export const _defaultPromptTips: LeavePromptTipsOptions = {
  title: '确认离开?',
  description: '离开不保留任何数据',
  okText: '确认',
  cancelText: '取消',
} as const

const useLeavePrompt = (
  defaultPromptTips: LeavePromptTipsOptions = _defaultPromptTips,
) => {
  const promptContext = useContext<LeavePromptContextOptions>(
    LeavePromptContext,
  )
  const history = useHistory()
  const [isPromptWhenWillLeave, setIsPromptWhenWillLeave] = useState<boolean>(
    false,
  )
  const [nextJumpLocation, setNextJumpLocation] = useState<
    Pick<Location, 'pathname' | 'search'>
  >({
    pathname: '',
    search: '',
  })
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false)
  const [
    isConfirmToLeaveFromCancelAction,
    setIsConfirmToLeaveFromCancelAction,
  ] = useState<boolean>(false)
  const [isFromCancelAction, setIsFromCancelAction] = useState<boolean>(false)
  const [promptTips, setPromptTips] = useState<LeavePromptTipsOptions>(
    defaultPromptTips,
  )
  const onLocationWillChange = useCallback(
    ({ search, pathname }: Location) => {
      if (isPromptWhenWillLeave) {
        setNextJumpLocation({
          search,
          pathname,
        })
        setConfirmModalVisible(true)
        return false
      }
      return true
    },
    [isPromptWhenWillLeave],
  )

  const onCloseConfirmModal = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  const onConfirm = useCallback(() => {
    setIsPromptWhenWillLeave(false)
    setConfirmModalVisible(false)
    setTimeout(() => {
      history?.push(nextJumpLocation)
    }, 0)
    if (isFromCancelAction) {
      setIsConfirmToLeaveFromCancelAction(true)
      setTimeout(() => {
        setIsConfirmToLeaveFromCancelAction(false)
      }, 0)
    }
  }, [isFromCancelAction, history, nextJumpLocation])

  const setPromptWhenWillLeaveForConsumer = useCallback(
    ({ prompt = true, cancelAction }: SetPromptOptions = {}) => {
      const { pathname = '', search = '' } = (history && history.location) || {}
      setIsPromptWhenWillLeave(prompt)
      setNextJumpLocation({
        pathname,
        search,
      })

      if (cancelAction) {
        setIsFromCancelAction(true)
        setConfirmModalVisible(true)
      }
    },
    [history],
  )

  const setConfirmTipsForConsumer = useCallback(
    (customConfirmTips: LeavePromptTipsOptions) => {
      setPromptTips({
        ...defaultPromptTips,
        ...customConfirmTips,
      })
    },
    [defaultPromptTips],
  )

  const promptContextProviderValue = useMemo(() => {
    return {
      isConfirmToLeaveFromCancelAction,
      isPromptWhenWillLeave,
      setPrompt: setPromptWhenWillLeaveForConsumer,
      setConfirmTips: setConfirmTipsForConsumer,
    }
  }, [
    isConfirmToLeaveFromCancelAction,
    isPromptWhenWillLeave,
    setPromptWhenWillLeaveForConsumer,
    setConfirmTipsForConsumer,
  ])

  const promptValue = useMemo(() => {
    return {
      ...defaultPromptTips,
      ...promptTips,
      visible: confirmModalVisible,
      onConfirm,
      onCancel: onCloseConfirmModal,
    }
  }, [
    promptTips,
    defaultPromptTips,
    onConfirm,
    onCloseConfirmModal,
    confirmModalVisible,
  ])

  return {
    promptValue,
    onLocationWillChange,
    promptContextProviderValue,
    ...promptContext,
  }
}

export default useLeavePrompt
