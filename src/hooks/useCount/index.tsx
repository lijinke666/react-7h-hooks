import { useCallback, useState, useEffect } from 'react'

export default function useCount(defaultCount = 0) {
  const [count, setCount] = useState<number>(defaultCount)

  const onChange = useCallback((index) => {
    setCount(index)
  }, [])

  const onSubtract = useCallback(() => {
    setCount(count - 1)
  }, [count])

  const onAdd = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const onReset = useCallback(() => {
    setCount(defaultCount)
  }, [defaultCount])

  useEffect(() => {
    setCount(defaultCount)
  }, [defaultCount])

  return {
    onAdd,
    onSubtract,
    count,
    setCount,
    onReset,
    onChange,
  }
}
