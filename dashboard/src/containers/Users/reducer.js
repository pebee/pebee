/**
 * Users reducers
 */

import { fromJS, List, Map } from 'immutable';
import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USERS,
    UPDATE_PAGINATOR,
    RESET_PAGINATOR
} from './contants';


const initialState = fromJS({
    users: List([]),
    fetchError: false,
    loading: false,
    pagination: Map({
        total: null,
        current: 1,
        pageSize: 4
    })
});


function users(state = initialState, action) {

    switch (action.type) {
        case FETCH_USERS:
            return state.set('loading', true);

        case FETCH_USERS_SUCCESS:
            return state
                .set('users', List(action.data.data))
                .set('loading', false)
                .setIn(['pagination', 'total'], action.data.totalRows);

        case FETCH_USERS_FAILURE:
            return state
                .set('fetchError', true)
                .set('loading', false);

        case UPDATE_PAGINATOR:
            return state.set('pagination', Map(action.data));

        case RESET_PAGINATOR:
            return state.set('pagination', initialState.get('pagination'));
        default:
            return state;
    }

}


export default users;