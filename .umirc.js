import pkg from './package.json'

export default {
  title: pkg.name,
  description: pkg.description,
  favicon: '//cdn.lijinke.cn/7h-hook.png',
  logo: '//cdn.lijinke.cn/7h-hook.png',
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
