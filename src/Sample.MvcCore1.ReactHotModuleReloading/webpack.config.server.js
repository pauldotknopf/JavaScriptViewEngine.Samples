var path = require('path');

module.exports = {
    entry: [
      './App/server'
    ],
    output: {
        path: path.join(__dirname, 'App', 'dist'),
        filename: 'server.js',
        // this is important for webpack modules that will be require('')'d from node.
        libraryTarget: 'this',
        publicPath: '/dist/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'App')
        }]
    }
};
