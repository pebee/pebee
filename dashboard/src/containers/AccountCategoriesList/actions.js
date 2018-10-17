/**
 * Account Categories list actions
 */


import {
    FETCH_ACCOUNT_CATEGORIES,
    FETCH_ACCOUNT_CATEGORIES_FAILURE,
    FETCH_ACCOUNT_CATEGORIES_SUCCESS,

    DELETE_ACCOUNT_CATEGORY,
    DELETE_ACCOUNT_CATEGORY_FAILURE,
    DELETE_ACCOUNT_CATEGORY_SUCCESS,

    RESTORE_ACCOUNT_CATEGORY,
    RESTORE_ACCOUNT_CATEGORY_FAILURE,
    RESTORE_ACCOUNT_CATEGORY_SUCCESS
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


export const deleteAccountCategory = data => {
    return {
        type: DELETE_ACCOUNT_CATEGORY,
        data
    }
};

export const deleteAccountCategoryFailure = data => {
    return {
        type: DELETE_ACCOUNT_CATEGORY_FAILURE,
        data
    }
};


export const restoreAccountCategory = data => {
    return {
        type: RESTORE_ACCOUNT_CATEGORY,
        data
    }
};