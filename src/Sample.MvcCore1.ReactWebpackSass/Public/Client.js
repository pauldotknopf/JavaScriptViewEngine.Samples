import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'Store';
import routes from 'Routes';

import './Styles/Style.scss';

const store = configureStore(window.__data, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('content')
);
