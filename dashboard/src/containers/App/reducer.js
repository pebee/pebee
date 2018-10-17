/**
 * App Reducer
 */

import { fromJS, Map } from 'immutable';

import { FETCH_ACCOUNT_FAILURE, FETCH_ACCOUNT_SUCCESS } from './constants';
import { LOGIN_SUCCESS } from './../Login/constants';


const initialState = fromJS({
    isLoggedIn: !!localStorage.getItem('account'),
    loggedInUser: Map(JSON.parse(localStorage.getItem('account')))
});


function appReducer(state = initialState, action) {

    switch(action.type) {
        case FETCH_ACCOUNT_FAILURE:
            return state
                .set('isLoggedIn', false)
                .set('loggedInUser', Map({}));

        case FETCH_ACCOUNT_SUCCESS:
            return state
                .set('isLoggedIn', true)
                .set('loggedInUser', Map(action.data));

        case LOGIN_SUCCESS:
            return state
                .set('isLoggedIn', true)
                .set('loggedInUser', Map(action.data.data));
            
        default:
            return state;
    }

}


export default appReducer;