import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { shallow } from 'enzyme'
import { Prompt } from 'react-router-dom'
import { usePrompt, createPromptContextProvider } from '../src'
import { routerWrapper } from './router'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe('usePrompt', () => {
  let prompt
  beforeAll(() => {
    prompt = renderHook(
      () =>
        usePrompt({
          title: 'title',
          description: 'description',
          okText: 'ok',
          cancelText: 'cancel',
        }),
      {
        wrapper: routerWrapper,
      },
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

  it('should merge default prompt tips', () => {
    let _promptValue
    const Provider = createPromptContextProvider({
      okText: 'test',
    })
    const Children = () => <div>1</div>
    shallow(
      <Provider>
        {promptValue => {
          _promptValue = promptValue
          return <Children />
        }}
      </Provider>,
    )
    expect(_promptValue.okText).toEqual('test')
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
