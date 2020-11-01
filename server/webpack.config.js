/* eslint-disable  */
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        // include: /node_modules/,
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
  plugins: [
    new DotEnv(),
    new CopyWebpackPlugin({ patterns: ['./prisma/schema.prisma', './../node_modules/@prisma/client'] }),
  ],
  target: "node",
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
};
