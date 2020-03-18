import { useCallback, useEffect } from 'react'
import { UseNextTickOptions } from './index.interface'

const useNextTick = (fn?: UseNextTickOptions) => {
  const nextTick = useCallback((handler?: UseNextTickOptions) => {
    if (handler) {
      Promise.resolve().then(() => handler())
    }
  }, [])

  useEffect(() => {
    if (fn) {
      nextTick(fn)
    }
    return () => {}
  }, [fn, nextTick])

  return fn ?? nextTick
}

export default useNextTick
