/**
 * Single Account Category reducer
 */

import { fromJS } from 'immutable';

import {
    FETCH_ACCOUNT_CATEGORY_SUCCESS,
    FETCH_ACCOUNT_CATEGORY_FAILURE,

    RESET_ACCOUNT_CATEGORY,

    FETCH_PERMISSIONS_SUCCESS
} from './constants';


const initialState = fromJS({
    accountCategory: {},
    errorMessage: null,
    permissions: []
});


function singleAccountCategoryReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_ACCOUNT_CATEGORY_SUCCESS:
            return state
                .set('accountCategory', action.data);

        case FETCH_ACCOUNT_CATEGORY_FAILURE:
            return state
                .set('accountCategory', {})
                .set('errorMessage', action.data);

        case RESET_ACCOUNT_CATEGORY:
            return state
                .set('accountCategory', {})
                .set('errorMessage', null);

        case FETCH_PERMISSIONS_SUCCESS:
            return state
                .set('permissions', action.data);

        default:
            return state;
    }

}


export default singleAccountCategoryReducer;