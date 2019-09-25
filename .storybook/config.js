import { configure } from '@storybook/react'
import 'antd/dist/antd.css';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx?$/), module)
