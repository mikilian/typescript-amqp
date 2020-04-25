/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

const TypingsBundlerPlugin = require('typings-bundler-plugin');
const path                 = require('path');
const nodeExternals        = require('webpack-node-externals');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'AmqpLib',
    umdNamedDefine: true
  },
  plugins: [
    new TypingsBundlerPlugin({
      out: 'index.d.ts'
    })
  ],
  resolve: {
    extensions: [ '.ts' ]
  },
  target: 'node',
  externals: [ nodeExternals() ]
};
