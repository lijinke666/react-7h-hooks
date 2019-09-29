import React from 'react'
import { usePrompt, createPromptContextProvider, PromptContext } from '../src'
import { renderHook, act } from '@testing-library/react-hooks'
import { shallow } from 'enzyme'
import { Prompt } from 'react-router-dom'

describe('usePrompt', () => {
  let prompt
  beforeAll(() => {
    prompt = renderHook(() =>
      usePrompt({
        title: 'title',
        description: 'description',
        okText: 'ok',
        cancelText: 'cancel',
      })
    )
  })
  it('should be defined', () => {
    expect(usePrompt).toBeDefined()
  })
  it('should set prompt tips form usePrompt default config', () => {
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
    const Provider = createPromptContextProvider(null)
    const Children = () => <div>1</div>
    const wrapper = shallow(<Provider>{() => <Children />}</Provider>)
    expect(wrapper.find(Prompt)).toHaveLength(1)
    expect(wrapper.find(Children)).toHaveLength(1)
  })

  it('should show prompt when will leave page', () => {
    const {
      setPromptWhenWillLeave,
      isPromptWhenWillLeave,
      promptValue,
    } = prompt.result.current

    act(() => {
      setPromptWhenWillLeave({ prompt: true })
    })

    expect(isPromptWhenWillLeave).toEqual(true)
    expect(promptValue.visible).toEqual(false)
  })
})
