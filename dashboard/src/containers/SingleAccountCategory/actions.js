/**
 * Single Account Category actions
 */

import {
    FETCH_ACCOUNT_CATEGORY,
    FETCH_ACCOUNT_CATEGORY_FAILURE,
    FETCH_ACCOUNT_CATEGORY_SUCCESS,

    RESET_ACCOUNT_CATEGORY,

    SAVE_ACCOUNT_CATEGORY,
    SAVE_ACCOUNT_CATEGORY_SUCCESS,
    SAVE_ACCOUNT_CATEGORY_FAILURE,
    FETCH_PERMISSIONS,
    FETCH_PERMISSIONS_SUCCESS
} from './constants';



export const fetchAccountCategory = data => {
    return {
        type: FETCH_ACCOUNT_CATEGORY,
        data
    }
};

export const fetchAccountCategorySuccess = data => {
    return {
        type: FETCH_ACCOUNT_CATEGORY_SUCCESS,
        data
    }
};

export const fetchAccountCategoryFailure = data => {
    return {
        type: FETCH_ACCOUNT_CATEGORY_FAILURE,
        data
    }
};

export const resetAccountCategory = () => {
    return {
        type: RESET_ACCOUNT_CATEGORY
    }
};


export const saveAccountCategory = data => {
    return {
        type: SAVE_ACCOUNT_CATEGORY,
        data
    }
};

export const saveAccountCategorySuccess = data => {
    return {
        type: SAVE_ACCOUNT_CATEGORY_SUCCESS,
        data
    }
};

export const saveAccountCategoryFailure = data => {
    return {
        type: SAVE_ACCOUNT_CATEGORY_FAILURE,
        data
    }
};


export const fetchPermissions = () => {
    return {
        type: FETCH_PERMISSIONS
    }
};

export const fetchPermissionsSuccess = data => {
    return {
        type: FETCH_PERMISSIONS_SUCCESS,
        data
    }
};