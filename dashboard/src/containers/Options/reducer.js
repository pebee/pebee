/**
 * Options reducer
 */


import { fromJS, List } from 'immutable';

import {
    FETCH_OPTIONS_FAILURE,
    FETCH_OPTIONS_SUCCESS
} from './constants';


const initialState = fromJS({
    options: [],
    message: null
});


function optionsReducer(state = initialState, action) {

    switch (action.type) {

        case FETCH_OPTIONS_SUCCESS:
            return state
                .set('options', List(action.data))
                .set('message', null);

        case FETCH_OPTIONS_FAILURE:
            return state
                .set('message', action.data);

        default:
            return state;

    }

}


export default optionsReducer;