const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  target: "node",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    clean: true,
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
  },
  externals: [
    function (context, request, callback) {
      if (/config.json$/.test(request)) {
        return callback(null, "commonjs ./config.json");
      }
      callback();
    },
  ],

  plugins: [
    new webpack.ProgressPlugin(),
    new UglifyJsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "config.json"),
          to: path.resolve(__dirname, "dist/config.json"),
        },
      ],
    }),
  ],
};
