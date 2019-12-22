import { useState, useCallback, useEffect } from 'react'

// TODO: 支持标题序列化 eg. 表单 1 表单 2
const _DEFAULT_ID_ = 0

export interface UseList {
  title?: string | React.ReactNode | ((id: number) => string | React.ReactNode)
  count?: number
}

export interface UseListReturn {
  list: number[]
  onAdd: () => void
  onRemove: (id: number) => void
  onReset: () => void
  onGetTitle: (id?: number) => string | React.ReactNode
}

const useList = (
  { title, count }: UseList = { title: '', count: 0 },
): UseListReturn => {
  const [id, setId] = useState<number>(_DEFAULT_ID_)
  const [list, setList] = useState<number[]>([])

  const onAdd = useCallback(() => {
    setId(id + 1)
    setList([...list, id])
  }, [list, id])

  const onRemove = useCallback(
    (currentListId: number) => {
      setList(list.filter(listId => listId !== currentListId))
    },
    [list],
  )

  const onReset = useCallback(() => {
    setList([])
    setId(_DEFAULT_ID_)
  }, [])

  const onGetTitle = useCallback(
    currentId => {
      if (typeof title === 'function') {
        return title(currentId)
      }
      return title
    },
    [title],
  )

  useEffect(() => {
    if (count) {
      setId(count)
      setList(new Array(count).fill(null).map((_, i) => i))
    } else {
      setId(_DEFAULT_ID_)
      setList([])
    }
  }, [count])

  return {
    list,
    onAdd,
    onRemove,
    onReset,
    onGetTitle,
  }
}

export default useList
