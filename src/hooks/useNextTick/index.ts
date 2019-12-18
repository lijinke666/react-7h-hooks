import { useCallback, useEffect } from 'react'

type UseNextTickParams = () => void

const useNextTick = (fn?: UseNextTickParams) => {
  let timer

  const nextTick = useCallback(
    (handler: UseNextTickParams) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setTimeout(handler, 0)
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

  return nextTick
}

export default useNextTick
