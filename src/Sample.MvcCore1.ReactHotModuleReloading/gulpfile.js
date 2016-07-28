/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var webpack = require('webpack');
var config = require('./webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var http = require('http');

gulp.task('default', ['dev-server']);

gulp.task('dev-server', function () {
    
    var compiler = webpack(config);
    var app = express();

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
    }));

    app.use(webpackHotMiddleware(compiler));

    var server = http.createServer(app);
    server.listen(5001, 'localhost', function (err) {
        if (err) throw err;
        var addr = server.address();
        console.log('Listening at http://%s:%d', addr.address, addr.port);
    });
});