import { useState, useCallback, useMemo } from 'react'
import { trim } from '../../utils/string'

const useTrimInput = () => {
  const [value, setValue] = useState<string>('')
  const setTrimValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [value, setValue]
  )

  const trimValue = useMemo<string>(() => {
    return trim(value)
  }, [value])

  return [trimValue, setTrimValue]
}

export default useTrimInput
