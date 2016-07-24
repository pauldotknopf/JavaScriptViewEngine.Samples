var hotInstance = require('hot-instance');
var path = require('path');

var modulesCached = {};

function getModule(module) {
    if (module in modulesCached) {
        return modulesCached[module];
    }
    modulesCached[module] = hotInstance(require.resolve(module));
    return getModule(module);
};

module.exports = {
    renderView: function (callback, path, model, viewBag, routeValues, area) {
        var module = getModule('./default');
        if (!module.exists) {
            callback('The module does not exist.', null);
        } else {
            module.instance.renderView(callback, path, model, viewBag, routeValues, area);
        }
    },
    renderPartialView: function (callback, path, model, viewBag, routeValues, area) {
        var module = getModule('./default');
        if (!module.exists) {
            callback('The module does not exist.', null);
        } else {
            module.instance.renderPartialView(callback, path, model, viewBag, routeValues, area);
        }
    }
};

//var hotInstance = require('hot-instance');
//var path = require('path');

//var modulesCached = {};

//function getModule(module) {
//    if (module in modulesCached) {
//        return modulesCached[module].instance;
//    }
//    modulesCached[module] = hotInstance(path.resolve(module));
//    return getModule(module);
//};

//module.exports = {
//    renderView: function (callback, path, model, viewBag, routeValues, area) {
//        console.log('test');
//        getModule('default').renderView(callback, path, model, viewBag, routeValues, area);
//    },
//    renderPartialView: function (callback, path, model, viewBag, routeValues, area) {
//        console.log('test');
//        getModule('default').renderView(callback, path, model, viewBag, routeValues, area);
//    }
//};