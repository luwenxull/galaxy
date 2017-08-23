let path = require('path');
let webpack = require('webpack');
module.exports = function(env) {
  return {
    entry: {
      index: './test/test.js',
    },
    devtool: 'inline-source-map',
    output: {
      path: path.join(__dirname, './test'),
      filename: '[name].js',
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['manifest'],
      }),
    ],
    module: {
      rules: [],
    },
    resolve: {
      extensions: ['.js'],
    },
  }
};