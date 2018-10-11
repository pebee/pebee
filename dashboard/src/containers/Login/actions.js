/**
 * Login page actions
 */

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLOSE_LOGIN_FAILURE_MESSAGE
} from './constants';


export function login(data) {
    return {
        type: LOGIN,
        data
    };
};


export function closeLoginFailureMessage() {
    return {
        type: CLOSE_LOGIN_FAILURE_MESSAGE
    };
};


export function loginSuccess(data) {
    localStorage.setItem('account', JSON.stringify(data.data));

    return {
        type: LOGIN_SUCCESS,
        data
    };
};


export function loginFailure() {
    return {
        type: LOGIN_FAILURE
    };
};