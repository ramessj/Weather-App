const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
require('dotenv').config({ path: './.env' }); 
const webpack = require('webpack');

const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {         
    port: 3000,
    open: true,
    hot: true,
    watchFiles: ["./src", "./dist"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/srcindex.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin( {
        test: /\.js(\?.*)?$/i,
        extractComments: false
      }     
      ),
    ],
  },
  mode: "development",
};
