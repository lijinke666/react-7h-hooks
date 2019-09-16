import { useState, useMemo, useContext, useCallback } from 'react'
import { PromptContext } from '../../context'
import { ConfirmTipsProps, PromptContextProps, SetPromptWhenWillLeaveProps } from '../../context/prompt'
import { Location } from 'history'

const usePrompt = () => {
  const { history } = useContext<PromptContextProps>(PromptContext)
  const [isPromptWhenWillLeave, setIsPromptWhenWillLeave] = useState<boolean>(false)
  const [nextJumpLocation, setNextJumpLocation] = useState<Pick<Location, 'pathname' | 'search'>>({
    pathname: '',
    search: '',
  })
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false)
  const [isConfirmToLeaveFromCancelAction, setIsConfirmToLeaveFromCancelAction] = useState<boolean>(false)
  const [isFromCancelAction, setIsFromCancelAction] = useState<boolean>(false)
  const defaultConfirmTips = useMemo(() => {
    return {
      title: '确认离开?',
      description: '离开不保留任何数据',
      ok: '确认',
      cancel: '取消',
    }
  }, [])
  const [confirmTips, setConfirmTips] = useState<ConfirmTipsProps>(defaultConfirmTips)

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
    [isPromptWhenWillLeave]
  )

  const onCloseConfirmModal = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  const onConfirmCancelEdit = useCallback(() => {
    setIsPromptWhenWillLeave(false)
    setConfirmModalVisible(false)
    setTimeout(() => {
      history && history.push(nextJumpLocation)
    }, 0)
    if (isFromCancelAction) {
      setIsConfirmToLeaveFromCancelAction(true)
      setTimeout(() => {
        setIsConfirmToLeaveFromCancelAction(false)
      }, 0)
    }
  }, [nextJumpLocation, isFromCancelAction])

  const setPromptWhenWillLeaveForConsumer = useCallback(
    ({ prompt = true, cancelAction }: SetPromptWhenWillLeaveProps = {}) => {
      const { pathname, search } = history!.location
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
    []
  )

  const setConfirmTipsForConsumer = useCallback(
    (customConfirmTips: ConfirmTipsProps) => {
      setConfirmTips({
        ...defaultConfirmTips,
        ...customConfirmTips,
      })
    },
    [defaultConfirmTips]
  )

  const promptContextProviderValue = useMemo(() => {
    return {
      isConfirmToLeaveFromCancelAction,
      isPromptWhenWillLeave,
      setPromptWhenWillLeave: setPromptWhenWillLeaveForConsumer,
      setConfirmTips: setConfirmTipsForConsumer,
    }
  }, [
    isConfirmToLeaveFromCancelAction,
    isPromptWhenWillLeave,
    setPromptWhenWillLeaveForConsumer,
    setConfirmTipsForConsumer,
  ])

  return {
    ...confirmTips,
    onConfirmCancelEdit,
    confirmModalVisible,
    onLocationWillChange,
    onCloseConfirmModal,
    promptContextProviderValue,
  }
}

export default usePrompt
