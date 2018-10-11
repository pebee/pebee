'use strict';


export const notFound = (message, data) => {
    return {
        statusCode: 404,
        message: message,
        data
    };
};


export const list = (data, totalRows) => {
    return {
        statusCode: 200,
        elementsCount: data.length,
        totalRows: totalRows,
        data
    };
};


export const single = (data) => {
    return {
        statusCode: 200,
        data
    };
};


export const created = (data) => {
    return {
        statusCode: 200,
        data
    };
};


export const updated = (data) => {
    return {
        statusCode: 200,
        data
    };
};


export const deleted = (message) => {
    message = message ? message : _t('Object has been deleted');

    return {
        statusCode: 200,
        message: message
    };
};


export const restored = message => {
    message = message ? message : _t('Object has been restored');

    return {
        statusCode: 200,
        message
    };
};


export const notAuthorized = (message) => {
    message = message ? message : 'You are not authorized to perform this operation';

    return {
        statusCode: 401,
        message: _t(message)
    };
};


export const loginError = (message) => {
    message = message ? message : 'Wrong username or password';

    return {
        statusCode: 403,
        message: _t(message)
    };
};


export const modelError = error => {
    return {
        statusCode: 422,
        ...pebee.functions.transformSequelizeError(error)
    };
};