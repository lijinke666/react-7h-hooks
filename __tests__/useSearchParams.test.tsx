import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks'
import { useSearchParams, UseSearchParamsSchemaType } from '../src'
import { RouterWrapper } from './router'
import { UseSearchParamsOptions } from '../src/hooks/useSearchParams/index.interface'

describe('useSearchParams', () => {
  const schema = {
    name: UseSearchParamsSchemaType.STRING,
    like: UseSearchParamsSchemaType.BOOLEAN,
    success: UseSearchParamsSchemaType.BOOLEAN,
    age: {
      type: UseSearchParamsSchemaType.NUMBER,
      default: 10,
    },
    test: {
      type: UseSearchParamsSchemaType.STRING,
      default: 'defaultValue',
    },
    friends: UseSearchParamsSchemaType.ARRAY,
  }
  let hook: RenderHookResult<
    UseSearchParamsOptions & { search: string },
    ReturnType<typeof useSearchParams>
  >
  beforeAll(() => {
    hook = renderHook(
      () =>
        useSearchParams({
          schema,
        }),
      {
        wrapper: RouterWrapper,
        initialProps: {
          search: '',
        },
      },
    )
  })
  it('should be defined', () => {
    expect(hook).toBeDefined()
  })
  it('should return default search params with empty location', () => {
    const { searchParams, set, remove, reset } = hook.result.current
    expect(searchParams).toStrictEqual({
      age: 10,
      test: 'defaultValue',
    })
    expect(set).toBeInstanceOf(Function)
    expect(remove).toBeInstanceOf(Function)
    expect(reset).toBeInstanceOf(Function)
  })
  it.skip('should get name from searchParams when call set', async () => {
    const { searchParams, set } = hook.result.current
    act(() => {
      set({ name: 'ljk' })
    })
    await hook.rerender()
    expect(searchParams).toStrictEqual({
      name: 'ljk',
      age: 10,
      test: 'defaultValue',
    })
  })
  it('should reset search params when call reset', () => {
    const { searchParams, set, reset } = hook.result.current
    act(() => {
      set({ name: 'ljk' })
    })
    act(() => {
      reset()
    })
    expect(searchParams).toStrictEqual({
      age: 10,
      test: 'defaultValue',
    })
  })
  it.skip('should remove target field when call remove', async () => {
    const { searchParams, remove } = hook.result.current
    act(() => {
      remove(['age'] as any)
    })
    hook.rerender()
    expect(searchParams).toStrictEqual({ test: 'defaultValue' })
  })
  it.skip('should remove all field when call remove', async () => {
    const { searchParams, remove } = hook.result.current
    act(() => {
      remove()
    })
    await hook.rerender()
    expect(searchParams).toStrictEqual({})
  })
})
