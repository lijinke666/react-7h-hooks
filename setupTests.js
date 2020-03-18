/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function(id) {
  clearTimeout(id)
}
global.__MOCK_URL__ = '__MOCK_URL__'
global.URL.createObjectURL = jest.fn(() => global.__MOCK_URL__)
global.fetch = () => {
  return new Promise(resolve => resolve({ blob: jest.fn(() => true) }))
}
copyProps(window, global)

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: jest.fn(),
//   }),
// }))

Enzyme.configure({ adapter: new Adapter() })
