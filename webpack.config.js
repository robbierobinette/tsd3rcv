const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: false,
  plugins : [
    new webpack.SourceMapDevToolPlugin({
      fileContext: 'dist',
      exclude: ['vendor.js']
    })
  ],
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  entry: {
    app: './src/app.ts',
    usmap: './src/usmap.ts',
    usmap2: './src/usmap2.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
