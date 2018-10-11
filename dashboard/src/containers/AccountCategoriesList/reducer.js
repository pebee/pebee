/**
 * Account Categories list reducer
 */


import { fromJS } from 'immutable';
import {
    FETCH_ACCOUNT_CATEGORIES,
    FETCH_ACCOUNT_CATEGORIES_SUCCESS,
    FETCH_ACCOUNT_CATEGORIES_FAILURE
} from './constants';



const initialState = fromJS({
    accountCategories: [],
    errorMessage: null
});


const accountCategoriesListReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_ACCOUNT_CATEGORIES:
            return state
                .set('accountCategories', [])
                .set('errorMessage', null);

        case FETCH_ACCOUNT_CATEGORIES_SUCCESS:
            return state
                .set('accountCategories', action.data)
                .set('errorMessage', null);

        case FETCH_ACCOUNT_CATEGORIES_FAILURE:
            return state
                .set('error', true)
                .set('errorMessage', action.data);
        default:
            return state;
    }

}


export default accountCategoriesListReducer;