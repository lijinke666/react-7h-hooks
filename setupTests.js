/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.navigator = {
  userAgent: 'node.js',
}
global.requestAnimationFrame = (callback) => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = (id) => {
  clearTimeout(id)
}
global.__MOCK_URL__ = '__MOCK_URL__'
global.URL.createObjectURL = jest.fn(() => global.__MOCK_URL__)
global.fetch = () => {
  return new Promise((resolve) => resolve({ blob: jest.fn(() => true) }))
}

Enzyme.configure({ adapter: new Adapter() })
