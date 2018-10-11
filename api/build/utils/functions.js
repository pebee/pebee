'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformSequelizeError = exports.generateCRUDPermissionLabel = exports.validatePermission = exports.preparePaginationQuery = void 0;

var _underscore = require("underscore");

var _local = require("../../build/utils/local");

/**
 * Globally used functions
 */

/**
 * Prepare 'findAll' query to limit results for pagination purposes.
 * 
 * @param {Object} req Express request
 */
var preparePaginationQuery = function preparePaginationQuery(req, model) {
  var modelAttributes = (0, _underscore.keys)(model.rawAttributes);
  var order = req.query['order'] ? req.query['order'].toLowerCase() : '';
  var query = {
    page: parseInt(req.query['page']) || 1,
    limit: parseInt(req.query['limit']) || 10,
    order: [[modelAttributes.includes(req.query['orderBy']) ? req.query['orderBy'] : 'id', order === 'desc' ? 'DESC' : 'ASC']]
  };
  query['offset'] = query.page * query.limit - query.limit;
  return query;
};
/**
 * Check if user has given permission
 */


exports.preparePaginationQuery = preparePaginationQuery;

var validatePermission = function validatePermission(user, permissionLabel) {
  if (user && user.accountCategory && user.accountCategory.permissions) {
    return (0, _underscore.find)(user.accountCategory.permissions, function (permission) {
      return permission.label === permissionLabel;
    });
  }

  return;
};
/**
 * Generates permission label basing on model plural name for simple CRUD operations
 */


exports.validatePermission = validatePermission;

var generateCRUDPermissionLabel = function generateCRUDPermissionLabel(name, method) {
  var permissionLabel;

  switch (method) {
    case 'POST':
      permissionLabel = "can-add-".concat(name);
      break;

    case 'PUT':
      permissionLabel = "can-update-".concat(name);
      break;

    case 'DELETE':
      permissionLabel = "can-delete-".concat(name);
      break;

    default:
      permissionLabel = "can-view-".concat(name);
      break;
  }

  return permissionLabel;
};
/**
 * Transform SequelizeError to more readable form
 */


exports.generateCRUDPermissionLabel = generateCRUDPermissionLabel;

var transformSequelizeError = function transformSequelizeError(error) {
  switch (error.constructor.name) {
    case 'ForeignKeyConstraintError':
      return {
        message: (0, _local._t)('pebee.db.foreignKeyConstraintError')
      };

    case 'UniqueConstraintError':
      return {
        message: error.message
      };

    case 'ValidationError':
      var message = Array.isArray(error.errors) && error.errors[0] ? error.errors[0].message : error.message;
      return {
        message: message
      };

    default:
      return {
        message: (0, _local._t)('pebee.db.error')
      };
  }
};

exports.transformSequelizeError = transformSequelizeError;