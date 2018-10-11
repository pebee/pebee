/**
 * Edit User actions
 */

import {
    FETCH_USER,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS,
    RESET_USER,

    SAVE_USER,
    SAVE_USER_FAILURE,
    SAVE_USER_SUCCESS,

    CLOSE_MESSAGE
} from './constants';


export const fetchUser = (data) => {
    return {
        type: FETCH_USER,
        data
    }
};


export const resetUser = () => {
    return {
        type: RESET_USER
    }
};


export const fetchUserSuccess = data => {
    return {
        type: FETCH_USER_SUCCESS,
        data
    }
};


export const fetchUserFailure = () => {
    return {
        type: FETCH_USER_FAILURE
    }
};


export const saveUser = (data) => {
    return {
        type: SAVE_USER,
        data
    }
};


export const saveUserSuccess = data => {
    return {
        type: SAVE_USER_SUCCESS,
        data
    }
};


export const saveUserFailure = data => {
    return {
        type: SAVE_USER_FAILURE,
        data
    }
};


export const closeMessage = () => {
    return {
        type: CLOSE_MESSAGE
    }
};