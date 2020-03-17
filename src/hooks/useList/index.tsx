import { useState, useCallback, useEffect, useRef } from 'react'
import { uuid } from '../../utils/uuid'
import { isFunction } from '../../utils/function'

export interface UseListOptions {
  title?: string | React.ReactNode | FunctionTitle
  count?: number
  rememberIndex?: boolean
}

export type FunctionTitle = (
  id: string,
  index: number,
) => string | React.ReactNode

export interface UseListReturn {
  list: string[]
  idIndexMapper: Map<string, number>
  onAdd: () => void
  onRemove: (id: string) => void
  onReset: () => void
  onClear: () => void
  onGetTitle: (id?: string, index?: number) => string | React.ReactNode
}

const useList = (
  { title, count, rememberIndex }: UseListOptions = {
    title: '',
    count: 0,
    rememberIndex: false,
  },
): UseListReturn => {
  const [list, setList] = useState<string[]>([])
  const idIndexMapper = useRef<UseListReturn['idIndexMapper']>(new Map())

  const setNextIdIndexMapper = useCallback<(id: string) => void>(
    id => {
      const lastId = Array.from(idIndexMapper.current.keys())[
        idIndexMapper.current.size - 1
      ]
      const lastIndex = idIndexMapper.current.get(lastId) || 0
      const nextIndex = list.length === 0 ? 0 : lastIndex + 1
      idIndexMapper.current.set(id, nextIndex)
    },
    [list.length],
  )

  const onAdd = useCallback(() => {
    const id = uuid()
    setNextIdIndexMapper(id)
    setList([...list, id])
  }, [list, setNextIdIndexMapper])

  const onRemove = useCallback(
    (currentListId: string) => {
      setList(list.filter(listId => listId !== currentListId))
      idIndexMapper.current.delete(currentListId)
    },
    [list],
  )

  const clearIdIndexMapper = useCallback(() => {
    idIndexMapper.current.clear()
  }, [])

  const getList = useCallback(() => {
    clearIdIndexMapper()
    if (!count) {
      return []
    }
    return Array.from({ length: count }, (_, i) => {
      const id = uuid()
      idIndexMapper.current.set(id, i)
      return id
    })
  }, [count, clearIdIndexMapper])

  const onReset = useCallback(() => {
    setList(getList)
  }, [getList])

  const onClear = useCallback(() => {
    setList([])
  }, [])

  const getCurrentIndex = useCallback<(id: string, index: number) => number>(
    (id, index) => {
      if (rememberIndex) {
        return idIndexMapper.current.get(id) || 0
      }
      return index
    },
    [rememberIndex],
  )

  const onGetTitle = useCallback(
    (currentId, index) => {
      if (isFunction(title)) {
        return (title as FunctionTitle)(
          currentId,
          getCurrentIndex(currentId, index),
        )
      }
      return title
    },
    [getCurrentIndex, title],
  )

  useEffect(() => {
    setList(getList())
  }, [count, getList])

  return {
    idIndexMapper: idIndexMapper.current,
    list,
    onAdd,
    onRemove,
    onReset,
    onClear,
    onGetTitle,
  }
}

export default useList
