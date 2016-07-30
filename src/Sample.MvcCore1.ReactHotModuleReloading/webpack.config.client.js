var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      'webpack/hot/only-dev-server',
      './App/client'
    ],
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        filename: 'client.js',
        publicPath: '/dist/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'App')
        }]
    }
};
