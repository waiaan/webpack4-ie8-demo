const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    overlay: true,
    host: '0.0.0.0',
    contentBase: './dist'
  }
})
