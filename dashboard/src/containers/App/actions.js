/**
 * App actions
 */

import { FETCH_ACCOUNT_SUCCESS, FETCH_ACCOUNT_FAILURE } from './constants';



export function fetchAccountSuccess(data) {
    localStorage.setItem('account', JSON.stringify(data));

    return {
        type: FETCH_ACCOUNT_SUCCESS,
        data
    };
};


export function fetchAccountFailure() {
    localStorage.removeItem('account');

    return {
        type: FETCH_ACCOUNT_FAILURE
    };
};