/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var clientConfig = require('./webpack.config.client.js');
var serverConfig = require('./webpack.config.server.js')
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var http = require('http');

gulp.task('default', ['compile']);

gulp.task('dev', ['dev-server-watch', 'dev-client-server'])

gulp.task('dev-server-watch', function () {
    var compiler = webpack(serverConfig);
    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, function(err, stats) {
        gutil.log("[webpack]", stats.toString({}));
    });
});

gulp.task('dev-client-server', function() {
    var compiler = webpack(clientConfig);
    
    var app = express();
    app.use(webpackDevMiddleware(compiler, {
        publicPath: clientConfig.output.publicPath,
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

gulp.task('client-compile', function(cb) {
    var compiler = webpack(clientConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        cb();
    });
});

gulp.task('server-compile', function(cb) {
    var compiler = webpack(serverConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        cb();
    });
});

gulp.task('compile', ['server-compile', 'client-compile']);