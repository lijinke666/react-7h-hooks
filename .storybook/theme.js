import { create } from '@storybook/theming'
import { name, repository } from '../package.json'

export default create({
  base: 'light',
  brandTitle: name,
  brandUrl: repository
})
