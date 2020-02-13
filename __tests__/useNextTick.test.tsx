import { renderHook, act } from '@testing-library/react-hooks'
import { useNextTick } from '../src'

describe('useNextTick', () => {
  let autoTrigger
  let trigger
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
