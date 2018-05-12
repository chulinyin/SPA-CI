var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "index": "./js/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /mode_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 构建html文件
      template: "./index.html", // 模板文件路径
      inject: true,
    }),
  ],
  devServer: {
    compress: true,
    // port: env.port,
    hot: true
  },  
  devtool: 'source-map'
};