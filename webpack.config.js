const path = require("path");
module.exports = {
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
