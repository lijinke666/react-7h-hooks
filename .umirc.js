import pkg from './package.json'

export default {
  description: pkg.description,
  favicon: '//cdn.lijinke.cn/7h-hook.png',
  logo: '//cdn.lijinke.cn/7h-hook.png',
  outputPath: '_docs',
  theme: {
    '@primary-color': '#31c27c',
  },
  ssr: {},
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
