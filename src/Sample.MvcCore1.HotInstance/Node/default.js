﻿module.exports = {
    renderView: function (callback, path, model, viewBag, routeValues, area) {
        callback(null, {
            html: "<html><head></head><body><p><strong>Model:</strong> " + JSON.stringify(model) + "</p><p><strong>ViewBag:</strong> " + JSON.stringify(viewBag) + "</p></body>",
            status: 200,
            redirect: null
        });
    },
    renderPartialView: function (callback, path, model, viewBag, routeValues, area) {
        callback(null, {
            html: "<p><strong>Mdfgdodel:</strong> " + JSON.stringify(model) + "</p><p><strong>ViewBag:</strong> " + JSON.stringify(viewBag) + "</p>"
        });
    }
};