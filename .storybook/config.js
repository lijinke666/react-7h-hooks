import { configure, addParameters } from '@storybook/react'
import '@storybook/addon-console'
import 'antd/dist/antd.css'
import theme from './theme'

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx?$/), module)

addParameters({
  options: {
    theme
  }
})
