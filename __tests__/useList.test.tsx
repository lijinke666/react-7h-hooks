import { renderHook, act } from '@testing-library/react-hooks'
import { useList } from '../src'

describe('useList', () => {
  it('should be defined', () => {
    const hook = renderHook(() => useList())
    expect(hook).toBeDefined()
  })
  it('should return empty list & list handler to be defined', () => {
    const { result } = renderHook(() => useList())
    expect(result.current.list).toEqual([])
    expect(result.current.onAdd).toBeInstanceOf(Function)
    expect(result.current.onRemove).toBeInstanceOf(Function)
    expect(result.current.onGetTitle).toBeInstanceOf(Function)
    expect(result.current.onReset).toBeInstanceOf(Function)
  })

  it('should get second list', () => {
    const { result } = renderHook(() => useList({ count: 2 }))
    expect(result.current.list).toHaveLength(2)
  })

  it('should get custom title when call onGetTitle', () => {
    const { result } = renderHook(() => useList({ count: 2, title: '测试' }))
    expect(result.current.onGetTitle()).toEqual('测试')
  })

  it('should get custom format title when call onGetTitle', () => {
    const { result } = renderHook(() =>
      useList({ count: 2, title: id => `测试-${id}` }),
    )
    expect(result.current.onGetTitle(1)).toEqual('测试-1')
    expect(result.current.onGetTitle(2)).toEqual('测试-2')
  })

  it.skip('should remove list when call onRemove', () => {
    const { result } = renderHook(() => useList({ count: 2 }))

    act(() => {
      result.current.onRemove(1)
    })
    expect(result.current.list).toHaveLength(1)
  })

  it('should add list when call onAdd', () => {
    const { result } = renderHook(() => useList())
    act(() => {
      result.current.onAdd()
    })
    expect(result.current.list).toHaveLength(1)
  })

  it('should reset list when call onReset', () => {
    const { result } = renderHook(() => useList())
    act(() => {
      result.current.onReset()
    })
    expect(result.current.list).toHaveLength(0)
  })

  it('should reset list when call onReset', () => {
    const { result } = renderHook(() => useList({ count: 2 }))
    act(() => {
      result.current.onReset()
    })
    expect(result.current.list).toHaveLength(2)
  })

  it('should clear list when call onClear', () => {
    const { result } = renderHook(() => useList({ count: 2 }))
    act(() => {
      result.current.onClear()
    })
    expect(result.current.list).toHaveLength(0)
  })
})
