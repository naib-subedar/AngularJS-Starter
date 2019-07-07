// webpack.config.js
var path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = {
    mode: 'development',
    entry: {
      app: './main.js',
    },
    output: {
      filename: '[name].js',
      publicPath: 'dist'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        }
      ]
    },
    plugins: [
        new BrowserSyncPlugin({
          // browse to http://localhost:3000/ during development,
          // ./public directory is being served
          watch: true,
          host: 'localhost',
          port: 3000,
          server: { 
            baseDir: ['app'],
            serveStaticOptions: { 
              extensions: ['html']
            },
            middleware: [ historyApiFallback()]
          },
        })
    ],
    watch: true
  };
  