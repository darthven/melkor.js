const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.ts', 
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {loader: 'html-loader'}
      }
    ]
  },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new UglifyJsPlugin({uglifyOptions: {     
      ecma: 8,      
      output: {
        comments: false,
        beautify: false,        
      },    
      warnings: false
    }
  })],
  output: {
    filename: 'src/index.js',
    path: path.resolve(__dirname)
  }
}