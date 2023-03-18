const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');

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
    //open: true,
    hot: true,
    watchFiles: ["./src", "./dist"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },  
      {
        test: /\.(svg|png|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
      }    
    ],
  },
  plugins: [
      new Dotenv({
        path: "./.env",
        prefix: 'process.env.',        
      }),
      new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/srcindex.html",
      favicon: "./src/favicon.ico",
      inject: true,
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
  //mode: "production",
};
