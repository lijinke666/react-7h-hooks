import pkg from './package.json'

export default {
  description: pkg.description,
  favicon: '/logo.png',
  logo: './logo.png',
  outputPath: '_docs',
  theme: {
    '@primary-color': '#31c27c',
  },
  exportStatic: {},
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
