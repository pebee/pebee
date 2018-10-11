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

    CLOSE_MESSAGE
} from './constants';


const initialState = fromJS({
    user: {},
    loading: false,
    message: null,
    messageType: 'success'
});


const editUserReducer = (state = initialState, action) => {

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
                .set('message', 'pebee.editUser.successMessage')
                .set('messageType', 'success');

        case SAVE_USER_FAILURE:
            return state
                .set('loading', false)
                .set('message', action.data.message)
                .set('messageType', 'error');

        case CLOSE_MESSAGE:
            return state.set('message', null);
            
        default:
            return state;
    }

}


export default editUserReducer;