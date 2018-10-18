/**
 * Edit User reducer
 */

import { fromJS } from 'immutable';
import {
    FETCH_USER_SUCCESS,
    RESET_USER,

    SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,

    CLOSE_MESSAGE,

    FETCH_ACCOUNT_CATEGORIES_SUCCESS
} from './constants';


const initialState = fromJS({
    user: {},
    loading: false,
    message: null,
    messageType: 'success',
    accountCategories: []
});


const singleUserReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return state.set('user', action.data);

        case RESET_USER:
            return state
                .set('user', {})
                .set('message', null);

        case SAVE_USER:
            return state.set('loading', true);

        case SAVE_USER_SUCCESS:
            return state
                .set('loading', false)
                .set('message', state.get('user').id ? 'pebee.singleUser.successMessage' : 'pebee.singleUser.userCreated')
                .set('messageType', 'success');

        case SAVE_USER_FAILURE:
            return state
                .set('loading', false)
                .set('message', action.data.message)
                .set('messageType', 'error');

        case CLOSE_MESSAGE:
            return state.set('message', null);

        case FETCH_ACCOUNT_CATEGORIES_SUCCESS:
            return state.set('accountCategories', action.data);
            
        default:
            return state;
    }

}


export default singleUserReducer;