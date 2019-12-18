import { useCallback, useEffect } from 'react'

type UseNextTickParams = (handler?: () => void) => void

const useNextTick = (fn?: UseNextTickParams) => {
  let timer

  const nextTick = useCallback(
    (handler?: UseNextTickParams) => {
      if (handler) {
        timer = setTimeout(handler, 0)
      }
    },
    [timer],
  )

  useEffect(() => {
    if (fn) {
      nextTick(fn)
      return () => {
        clearTimeout(timer)
      }
    }
    return () => {}
  }, [nextTick, timer, fn])

  return fn ?? nextTick
}

export default useNextTick
