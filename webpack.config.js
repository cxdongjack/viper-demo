const path = require('path');
var webpack = require('webpack');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
	rules: [
	  { test: /\.js/, use: 'viper-loader' }
	]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
    //new UglifyJSPlugin()
  ]
};
