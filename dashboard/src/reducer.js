import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import intlReducer from './containers/Intl/reducer';


const createReducer = asyncReducers => {
    return combineReducers({
        router: routerReducer,
        language: intlReducer,
        ...asyncReducers
    });
}


export default createReducer;