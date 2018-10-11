/**
 * Login page reducer
 */

import { fromJS } from 'immutable';
import { LOGIN_FAILURE, LOGIN_SUCCESS, CLOSE_LOGIN_FAILURE_MESSAGE } from './constants';


const initialState = fromJS({
    loginFailure: false
});


function loginReducer(state = initialState, action) {

    switch (action.type) {
        case LOGIN_FAILURE:
            return state.set('loginFailure', true);
        case LOGIN_SUCCESS:
            return state.set('loginFailure', false);
        case CLOSE_LOGIN_FAILURE_MESSAGE:
            return state.set('loginFailure', false);
        default:
            return state;
    }

};


export default loginReducer;