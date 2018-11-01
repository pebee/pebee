/**
 * Options actions
 */


import {
    FETCH_OPTIONS,
    FETCH_OPTIONS_FAILURE,
    FETCH_OPTIONS_SUCCESS
} from './constants';


/* Fetch available options */
export const fetchOptions = () => {
    return {
        type: FETCH_OPTIONS
    }
};

export const fetchOptionsSuccess = data => {
    return {
        type: FETCH_OPTIONS_SUCCESS,
        data
    }
};

export const fetchOptionsFailure = data => {
    return {
        type: FETCH_OPTIONS_FAILURE,
        data
    }
};