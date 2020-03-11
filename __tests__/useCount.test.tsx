import { renderHook, act } from '@testing-library/react-hooks'
import { useCount } from '../src'

describe('useCount', () => {
  it('should be defined', () => {
    const hook = renderHook(() => useCount())
    expect(hook).toBeDefined()
  })
  it('should return default count and some handler', () => {
    const { result } = renderHook(() => useCount())
    expect(result.current.count).toEqual(0)
    expect(result.current.setCount).toBeInstanceOf(Function)
    expect(result.current.onAdd).toBeInstanceOf(Function)
    expect(result.current.onReset).toBeInstanceOf(Function)
    expect(result.current.onSubtract).toBeInstanceOf(Function)
  })

  it('should get custom default count', () => {
    const { result } = renderHook(() => useCount(3))
    expect(result.current.count).toEqual(3)
  })

  it('should set count', () => {
    const { result } = renderHook(() => useCount(0))
    act(() => {
      result.current.setCount(3)
    })
    expect(result.current.count).toEqual(3)
  })

  it('should reset default count', () => {
    const { result } = renderHook(() => useCount(0))
    act(() => {
      result.current.setCount(3)
    })
    act(() => {
      result.current.onReset()
    })
    expect(result.current.count).toEqual(0)
  })

  it('should add count', () => {
    const { result } = renderHook(() => useCount(0))
    act(() => {
      result.current.onAdd()
    })
    expect(result.current.count).toEqual(1)
  })

  it('should subtract count', () => {
    const { result } = renderHook(() => useCount(3))
    act(() => {
      result.current.onSubtract()
    })
    expect(result.current.count).toEqual(2)
  })
})
