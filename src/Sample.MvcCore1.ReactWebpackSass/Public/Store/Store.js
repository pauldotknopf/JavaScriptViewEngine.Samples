import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducers from './Reducers';

let devTools = f => f;
if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    devTools = window.devToolsExtension();
}

export default function configureStore(initialState, history) {
    const enhancer = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history)),
      devTools
    )(createStore);

    return enhancer(reducers, initialState);
}
