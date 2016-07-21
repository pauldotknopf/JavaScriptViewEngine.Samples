import React from 'react';
import ReactDOM from 'react-dom/server';
import { Html } from 'Components';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import RouterContext from 'react-router/lib/RouterContext';
import routes from 'Routes';
import configureStore from 'Store';

export function renderView(callback, path, model, viewBag) {
    const _result = {
        html: null,
        status: 404,
        redirect: null
    };

    const _initialState = {
        model: model,
        viewBag: viewBag
    };

    const history = createHistory(path);

    match(
        { history: history, routes: routes, location: path },
        (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                _result.redirect = redirectLocation.pathname + redirectLocation.search;
            } else if (error) {
                _result.status = 500;
            } else if (renderProps) {
                const notFound = renderProps.routes.filter((route) => route.status === 404).length > 0;

                _result.status = notFound ? 404 : 200;

                const store = configureStore(_initialState, history);

                const component =
                (
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

                _result.html = ReactDOM.renderToString(<Html component={component} store={store} />);
                _result.html = `<!DOCTYPE html>${_result.html}`;
            } else {
                _result.status = 404;
            }
        }
    );

    callback(null, _result);
}
