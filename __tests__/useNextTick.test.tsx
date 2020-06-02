import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'
import { useNextTick } from '../src'
import { UseNextTickOptions } from '../src/hooks/useNextTick/index.interface'

describe('useNextTick', () => {
  let autoTrigger: RenderHookResult<
    UseNextTickOptions,
    ReturnType<typeof useNextTick>
  >
  let trigger: RenderHookResult<
    UseNextTickOptions,
    ReturnType<typeof useNextTick>
  >
  const autoTriggerFn = jest.fn()
  beforeAll(() => {
    autoTrigger = renderHook(() => useNextTick(() => autoTriggerFn))
    trigger = renderHook(() => useNextTick())
  })
  it('should be defined', () => {
    expect(autoTrigger).toBeDefined()
    expect(trigger).toBeDefined()
  })
  it.skip('should return nextTick handler and call', () => {
    const handler = jest.fn()
    const nextTick = trigger.result.current
    expect(nextTick).toBeInstanceOf(Function)

    act(() => {
      nextTick(handler)
    })

    setTimeout(() => {
      expect(handler).toHaveBeenCalled()
    }, 200)
  })
  it('should return handler', () => {
    const nextTick = autoTrigger.result.current
    expect(nextTick).toBeInstanceOf(Function)
  })
})
