const merge = require('webpack-merge');
const base = require('./base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin()
  ]
})
