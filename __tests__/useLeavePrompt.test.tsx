import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import { shallow } from 'enzyme'
import React from 'react'
import { Prompt } from 'react-router-dom'
import { LeavePromptProvider, useLeavePrompt } from '../src'
import { LeavePromptTipsOptions } from '../src/context/leavePrompt'
import { DEFAULT_PROMPT_TIPS } from '../src/hooks/useLeavePrompt'
import { RouterWrapper } from './router'

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe('usePrompt', () => {
  let prompt: RenderHookResult<
    LeavePromptTipsOptions,
    ReturnType<typeof useLeavePrompt>
  >
  let defaultTipPrompt: RenderHookResult<
    LeavePromptTipsOptions,
    ReturnType<typeof useLeavePrompt>
  >
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
    let promptValue: LeavePromptTipsOptions
    const Children = () => <div>1</div>
    shallow(
      <LeavePromptProvider
        promptTips={{
          okText: 'test',
        }}
      >
        {(value) => {
          promptValue = value
          return <Children />
        }}
      </LeavePromptProvider>,
    )
    // @ts-expect-error
    expect(promptValue.okText).toEqual('test')
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
    }).toStrictEqual(DEFAULT_PROMPT_TIPS)
  })
})
