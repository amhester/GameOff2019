const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.js',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
            },
          },
          // Please note we are not running postcss here
        ],
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            // On development we want to see where the file is coming from, hence we preserve the [path]
            name: '[path][name].[ext]',
            limit: 8192,
          },
        }],
      },
      {
        // Load all icons
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: [{
          loader: 'file-loader',
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
  ],
};
