import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

const Html = ({ component, store }) => {
    const _content = component ? ReactDOM.renderToString(component) : '';

    return (
        <html lang="en-us">
            <head>
                <title>React Webpack Sass Sample</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/dist/style.css" />
            </head>
            <body>
                <div id="content" dangerouslySetInnerHTML={{ __html: _content }} />
                <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} />
                <script src="/dist/client.js"></script>
            </body>
        </html>
    );
};

Html.propTypes = {
    component: PropTypes.node,
    store: PropTypes.object
};

export default Html;
