const production = (process.env.NODE_ENV === 'production');

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const babelrcFile = fs.readFileSync('./.babelrc');
const babelrc = JSON.parse(babelrcFile);
const HappyPack = require('happypack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCss = new ExtractTextPlugin('style.css');

const merge = require('extendify')({
    isDeep: true,
    arrays: 'concat'
});

const devConfig = {
    devtool: 'source-map',
    debug: true
};

const prodConfig = {
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, 'wwwroot'),
            verbose: true,
            dry: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = merge({
    entry: {
        client: [
            './Public/Client.js'
        ],
        server: [
            './Public/Server.js'
        ]
    },
    module: {
        loaders: [
            { test: /\.(jpeg|jpeg|gif|png|tiff)$/, loader: 'file' },
            { test: /\.js?$/, include: /Public/, exclude: '/Public/Vendor/', loaders: ['happypack/loader'] },
            { test: /\.scss$/, include: /Public/, exclude: '/Public/Vendor/', loader: extractCss.extract('css!sass') },
        ]
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'this',
        path: path.join(__dirname, 'wwwroot', 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        extractCss,
        new HappyPack({
            loaders: [`babel?${JSON.stringify(babelrc)}`, 'eslint']
        })
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: path.join('wwwroot', 'dist', '[name]-manifest.json')
        // })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            Components: path.join(__dirname, 'Public', 'Components'),
            Routes: path.join(__dirname, 'Public', 'Routes'),
            Store: path.join(__dirname, 'Public', 'Store', 'Store')
        }
    }
}, production ? prodConfig : devConfig);
