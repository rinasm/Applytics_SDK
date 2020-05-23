const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
  entry: "./src/SDK/index.ts",
  devtool: "null",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "applytics.js",
    path: path.resolve(__dirname, "src/dist"),
  },
};
