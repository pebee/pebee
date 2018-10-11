/**
 * Intl reducer
 */

import { fromJS } from 'immutable';


const initialState = fromJS({
    locale: localStorage.getItem('pebee-locale') || 'pl'
});


function intlReducer(state = initialState, action) {

    switch(action.type) {
        default:
            return state;
    }

}


export default intlReducer