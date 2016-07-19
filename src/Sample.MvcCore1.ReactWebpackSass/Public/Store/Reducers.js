import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import ModelModule from './Modules/ModelModule';
import ViewBagModule from './Modules/ViewBagModule';

export default combineReducers({
    model: ModelModule,
    form: form,
    routing: routerReducer,
    viewBag: ViewBagModule
});
