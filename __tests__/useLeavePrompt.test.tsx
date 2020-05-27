import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { shallow } from 'enzyme'
import { Prompt } from 'react-router-dom'
import { useLeavePrompt, LeavePromptProvider } from '../src'
import { RouterWrapper } from './router'
import { _defaultPromptTips } from '../src/hooks/useLeavePrompt'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe('usePrompt', () => {
  let prompt
  let defaultTipPrompt
  beforeAll(() => {
    prompt = renderHook(
      () =>
        useLeavePrompt({
          title: 'title',
          description: 'description',
          okText: 'ok',
          cancelText: 'cancel',
        }),
      {
        wrapper: RouterWrapper,
      },
    )
    defaultTipPrompt = renderHook(() => useLeavePrompt(), {
      wrapper: RouterWrapper,
    })
  })
  it('should be defined', () => {
    expect(useLeavePrompt).toBeDefined()
    expect(defaultTipPrompt).toBeDefined()
  })
  it('should get custom prompt tips', () => {
    const { promptValue } = prompt.result.current
    expect({
      title: promptValue.title,
      description: promptValue.description,
      okText: promptValue.okText,
      cancelText: promptValue.cancelText,
    }).toStrictEqual({
      title: 'title',
      description: 'description',
      okText: 'ok',
      cancelText: 'cancel',
    })
  })

  it('should return promptContext Provider', () => {
    const Children = () => <div>1</div>
    const wrapper = shallow(
      <LeavePromptProvider>{() => <Children />}</LeavePromptProvider>,
    )
    expect(wrapper.find(Prompt)).toHaveLength(1)
    expect(wrapper.find(Children)).toHaveLength(1)
  })

  it('should merge default prompt tips', () => {
    let _promptValue
    const Children = () => <div>1</div>
    shallow(
      <LeavePromptProvider
        promptTips={{
          okText: 'test',
        }}
      >
        {(promptValue) => {
          _promptValue = promptValue
          return <Children />
        }}
      </LeavePromptProvider>,
    )
    expect(_promptValue.okText).toEqual('test')
  })

  it('should show prompt when will leave page', () => {
    const {
      setPrompt,
      isPromptWhenWillLeave,
      promptValue,
    } = prompt.result.current

    act(() => {
      setPrompt({ prompt: true })
    })

    expect(isPromptWhenWillLeave).toEqual(true)
    expect(promptValue.visible).toEqual(false)
  })

  it('should get default prompt tips', () => {
    const { promptValue } = defaultTipPrompt.result.current
    expect({
      title: promptValue.title,
      description: promptValue.description,
      okText: promptValue.okText,
      cancelText: promptValue.cancelText,
    }).toStrictEqual(_defaultPromptTips)
  })
})
