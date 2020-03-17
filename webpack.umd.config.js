/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const { version, name, description } = require('./package.json')

module.exports = {
  mode: 'production',
  entry: {
    [name]: path.resolve(__dirname, './src/index.tsx'),
  },

  output: {
    library: name,
    libraryTarget: 'umd',
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: '/node_modules/',
        include: [path.resolve('src')],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.BannerPlugin(` \n ${name} v${version} \n ${description}
     \n ${fs.readFileSync(path.resolve(__dirname, './LICENSE'))}
  `),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEBUG__: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
}
