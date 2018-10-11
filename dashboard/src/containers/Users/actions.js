/**
 * Users actions
 */

import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,

    DELETE_USER,
    DELETE_USER_FAILURE,
    DELETE_USER_SUCCESS,

    RESTORE_USER,
    RESTORE_USER_FAILURE,
    RESTORE_USER_SUCCESS,

    UPDATE_PAGINATOR,
    RESET_PAGINATOR
} from './contants';



export function fetchUsers(data) {
    return {
        type: FETCH_USERS,
        data
    };
};

export function fetchUsersSuccess(data) {
    return {
        type: FETCH_USERS_SUCCESS,
        data
    };
};

export function fetchUsersFailure() {
    return {
        type: FETCH_USERS_FAILURE
    };
};

export function updatePagination(data) {
    return {
        type: UPDATE_PAGINATOR,
        data
    };
};


export const resetPagination = () => {
    return {
        type: RESET_PAGINATOR
    }
};


export const deleteUser = (data) => {
    return {
        type: DELETE_USER,
        data
    }
};


export const deleteUserSuccess = () => {
    return {
        type: DELETE_USER_SUCCESS
    }
};


export const deleteUserFailure = () => {
    return {
        type: DELETE_USER_FAILURE
    }
};


export const restoreUser = data => {
    return {
        type: RESTORE_USER,
        data
    }
};


export const restoreUserSuccess = data => {
    return {
        type: RESTORE_USER_SUCCESS,
        data
    }
};


export const restoreUserFailure = () => {
    return {
        type: RESTORE_USER_FAILURE
    }
};