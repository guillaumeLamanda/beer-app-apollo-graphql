const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.graphqls$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".json", ".ts", ".tsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
};
