const path = require('path');
const isDev = require('yargs').argv.development;
const webpack = require('webpack');

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'none',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      includes: path.resolve(__dirname, 'frontend/scripts/includes'),
    },
    extensions: ['.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
    })
  ]
};
