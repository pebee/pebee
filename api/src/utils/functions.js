'use strict';

import { keys, find } from 'underscore';
import { _t } from '../../build/utils/local';

/**
 * Globally used functions
 */


/**
 * Prepare 'findAll' query to limit results for pagination purposes.
 * 
 * @param {Object} req Express request
 */
export const preparePaginationQuery = (req, model) => {

    let modelAttributes = keys(model.rawAttributes);
    let order = req.query['order'] ? req.query['order'].toLowerCase() : '';
    
    let query = {
        page: parseInt(req.query['page']) || 1,
        limit: parseInt(req.query['limit']) || 10,
        order: [
            [
                modelAttributes.includes(req.query['orderBy']) ? req.query['orderBy'] : 'id',
                order === 'desc' ? 'DESC' : 'ASC'
            ]
        ],
    };

    query['offset'] = query.page * query.limit - query.limit;

    return query;

};


/**
 * Check if user has given permission
 */
export const validatePermission = (user, permissionLabel) => {
    if (user && user.accountCategory && user.accountCategory.permissions) {
        return find(user.accountCategory.permissions, (permission) => {
            return permission.label === permissionLabel;
        });
    }

    return;
};


/**
 * Generates permission label basing on model plural name for simple CRUD operations
 */
export const generateCRUDPermissionLabel = (name, method) => {

    let permissionLabel;

    switch (method) {
        case 'POST':
            permissionLabel = `can-add-${name}`;
            break;
        case 'PUT':
            permissionLabel = `can-update-${name}`;
            break;
        case 'DELETE':
            permissionLabel = `can-delete-${name}`;
            break;
        default:
            permissionLabel = `can-view-${name}`;
            break;
    }

    return permissionLabel;

};


/**
 * Transform SequelizeError to more readable form
 */
export const transformSequelizeError = error => {

    switch (error.constructor.name) {
        case 'ForeignKeyConstraintError':
            return { message: _t('pebee.db.foreignKeyConstraintError') };
        case 'UniqueConstraintError':
            return { message: error.message };
        case 'ValidationError':
            let message = (Array.isArray(error.errors) && error.errors[0]) ? error.errors[0].message : error.message;
            return { message: message };
        default:
            return { message: _t('pebee.db.error') };
    }

};