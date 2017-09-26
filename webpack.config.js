const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function(env) {
  return {
    entry: {
      index: './test/test.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'galaxy',
        template: 'template/index.ejs',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    module: {
      rules: [],
    },
    resolve: {
      extensions: ['.js'],
    },
  }
};