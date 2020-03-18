import { useState, useCallback, useMemo } from 'react'
import { trim } from '../../utils/string'
import { UseTrimInputReturn } from './index.interface'

const useTrimInput = (fullTrim: boolean = false): UseTrimInputReturn => {
  const [value, setValue] = useState<string>('')
  const setTrimValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [setValue],
  )

  const trimValue = useMemo<string>(() => {
    return trim(value, fullTrim)
  }, [value, fullTrim])

  return [trimValue, setTrimValue]
}

export default useTrimInput
