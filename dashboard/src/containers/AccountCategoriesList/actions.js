/**
 * Account Categories list actions
 */


import {
    FETCH_ACCOUNT_CATEGORIES,
    FETCH_ACCOUNT_CATEGORIES_FAILURE,
    FETCH_ACCOUNT_CATEGORIES_SUCCESS
} from './constants';


export const fetchAccountCategories = () => {
    return {
        type: FETCH_ACCOUNT_CATEGORIES
    }
};

export const fetchAccountCategoriesSuccess = data => {
    return {
        type: FETCH_ACCOUNT_CATEGORIES_SUCCESS,
        data
    }
};

export const fetchAccountCategoriesFailure = data => {
    return {
        type: FETCH_ACCOUNT_CATEGORIES_FAILURE,
        data
    }
};