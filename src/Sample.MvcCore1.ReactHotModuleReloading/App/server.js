import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './components/App';

export function renderView(callback, path, model, viewBag, routeValues, area) {
    let content = ReactDOM.renderToString(<App />);
    let html = ReactDOM.renderToString(
        <html>
        <head>
            <title>Sample App3</title>
        </head>
        <body>
            <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
            <script src="/dist/client.js"></script>
        </body>
        </html>
    );
    callback(null, {
        html: '<!doctype html>' + html,
        status: 200,
        redirect: null
    });
}

export function renderPartialView(callback, path, model, viewBag, routeValues, area) {
    callback('Not implemented');
}