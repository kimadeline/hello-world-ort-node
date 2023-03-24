/* eslint-disable @typescript-eslint/naming-convention */
//@ts-check

"use strict";

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const ORT_NODE_BINDING_BIN_ROOT = path.join(__dirname, 'node_modules', 'onnxruntime-node', 'bin', 'napi-v3');
const DIST = path.resolve(__dirname, "dist");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: "node", // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: "none", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: "./src/extension.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: DIST,
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /onnxruntime_binding\.node$/,
        loader: 'node-loader',
        options: {
          name(resourcePath) {
            return path.relative(ORT_NODE_BINDING_BIN_ROOT, resourcePath);
          }
        }
      },
    ],
  },
  devtool: "nosources-source-map",
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/model.onnx", to: "model.onnx" }],
    }),
    new CopyPlugin({
      patterns: [{ from: ORT_NODE_BINDING_BIN_ROOT, to: DIST }],
    }),
  ],
};
module.exports = [extensionConfig];
