const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  mode: 'development',
  optimization: {
    runtimeChunk: true,
    splitChunks: {
        minChunks: 1,
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
    },
  },
  resolve: {
    alias: {
      fs: path.resolve(__dirname, 'node_modules/browserfs/dist/shims/fs.js'),
      child_process: path.resolve(__dirname, 'src/child_process'),
      module: path.resolve(__dirname, 'src/module'),
      BrowserFS: require.resolve(
        path.resolve(__dirname, 'node_modules/browserfs/dist/browserfs.js')
      ),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Browser-Webpack',
      multihtmlCatch: true,
      filename: 'index.html',
      template: path.join(__dirname, 'index.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/browserfs/dist',
        to: 'browserfs',
      }
    ])
  ]
};
