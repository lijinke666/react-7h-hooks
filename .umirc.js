import pkg from './package.json'

export default {
  title: pkg.name,
  description: pkg.description,
  favicon: './docs/logo.png',
  logo: './docs/logo.png',
  resolve: {
    includes: ['docs', 'src'],
  },
  theme: {
    '@primary-color': '#31c27c',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        style: true, // or 'css'
      },
    ],
  ],
}
