import { useState, useCallback, useMemo } from 'react'
import { trim } from '../../utils/string'

type UseTrimInputReturnValue = [
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void
]

const useTrimInput = (fullTrim: boolean = false): UseTrimInputReturnValue => {
  const [value, setValue] = useState<string>('')
  const setTrimValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [value, setValue]
  )

  const trimValue: string = useMemo(() => {
    return trim(value, fullTrim)
  }, [value, fullTrim])

  return [trimValue, setTrimValue]
}

export default useTrimInput
