const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const MONACO_DIR = path.join(__dirname, "node_modules/monaco-editor");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ["style-loader", {
          "loader": "css-loader",
          "options": {
            "url": false,
          },
        }],
      },
      {
        test: /\.ttf$/,
        include: MONACO_DIR,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [new MonacoWebpackPlugin()]
};
