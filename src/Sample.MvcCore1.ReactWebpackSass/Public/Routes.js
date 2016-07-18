import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Layout, Home } from 'Components';

export default (
    <Route path="/" component={Layout}>
        <Route>
            <IndexRoute component={Home} />
        </Route>
    </Route>
);
