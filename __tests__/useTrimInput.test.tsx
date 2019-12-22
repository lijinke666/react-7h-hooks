import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Input } from 'antd'
import { mount } from 'enzyme'
import { useTrimInput } from '../src'

describe('useTrimInput', () => {
  let trimInput
  let fullTrimInput
  beforeAll(() => {
    trimInput = renderHook(() => useTrimInput())
    fullTrimInput = renderHook(() => useTrimInput(true))
  })
  it('should be defined', () => {
    expect(trimInput).toBeDefined()
    expect(fullTrimInput).toBeDefined()
  })
  it('should return default empty value with trim input', () => {
    const [value, setValue] = trimInput.result.current
    expect(value).toEqual('')
    expect(setValue).toBeInstanceOf(Function)
  })
  it('should return default empty value with fullTrimInput', () => {
    const [value, setValue] = fullTrimInput.result.current
    expect(value).toEqual('')
    expect(setValue).toBeInstanceOf(Function)
  })
  it.skip('should get trimmed value when input change', () => {
    const [value, setValue] = trimInput.result.current
    const mockSetValue = jest.fn(setValue)
    const wrapper = mount(<Input value={value} onChange={mockSetValue} />)
    act(() => {
      wrapper.find('input').simulate('change', { target: { value: ' te st ' } })
    })
    expect(mockSetValue).toHaveBeenCalled()
    expect(value).toEqual('te st')
  })
  it.skip('should get full trimmed value when input change', () => {
    const [value, setValue] = fullTrimInput.result.current
    const mockSetValue = jest.fn(setValue)
    const wrapper = mount(<Input value={value} onChange={mockSetValue} />)
    act(() => {
      wrapper.find('input').simulate('change', { target: { value: ' te st ' } })
    })
    expect(mockSetValue).toHaveBeenCalled()
    expect(value).toEqual('test')
  })
})
