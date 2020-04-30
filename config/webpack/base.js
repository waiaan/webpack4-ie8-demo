const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: ['es5-shim', 'es5-shim/es5-sham', './src/pages/main/index.js']
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      template: path.resolve(__dirname, '../../public/index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../public/js'),
        to: './js'
      },
      {
        from: path.resolve(__dirname, '../../public/css'),
        to: './css'
      }
    ])
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime'
                ],
                [
                  '@babel/plugin-transform-modules-commonjs'
                ]
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              quiet: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ie8: true
        }
      })
    ]
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'common'
    // }
  }
}
