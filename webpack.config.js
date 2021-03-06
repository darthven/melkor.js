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
      },
      {
        test: /\.css$/,
        use: [ 'css-loader' ]
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
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 9000
  }
}