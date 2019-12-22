import { useCallback, useEffect } from 'react'

type UseNextTickParams = (handler?: () => void) => void

const useNextTick = (fn?: UseNextTickParams) => {
  const nextTick = useCallback((handler?: UseNextTickParams) => {
    if (handler) {
      Promise.resolve().then(() => handler())
    }
  }, [])

  useEffect(() => {
    if (fn) {
      nextTick(fn)
    }
    return () => {}
  }, [nextTick, fn])

  return fn ?? nextTick
}

export default useNextTick
