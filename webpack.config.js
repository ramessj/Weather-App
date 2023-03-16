const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {    
    watchFiles: ["./src/*"], // string [string] object [object]
    port: 3000,
    open: true,
    hot: true,
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
