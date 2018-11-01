'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelError = exports.loginError = exports.notAuthorized = exports.restored = exports.deleted = exports.updated = exports.created = exports.single = exports.list = exports.notFound = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notFound = function notFound(message, data) {
  return {
    statusCode: 404,
    message: message,
    data: data
  };
};

exports.notFound = notFound;

var list = function list(data, totalRows) {
  return {
    statusCode: 200,
    elementsCount: data.length,
    totalRows: totalRows,
    data: data
  };
};

exports.list = list;

var single = function single(data) {
  return {
    statusCode: 200,
    data: data
  };
};

exports.single = single;

var created = function created(data) {
  return {
    statusCode: 200,
    data: data
  };
};

exports.created = created;

var updated = function updated(data) {
  return {
    statusCode: 200,
    data: data
  };
};

exports.updated = updated;

var deleted = function deleted(message) {
  message = message ? message : _t('Object has been deleted');
  return {
    statusCode: 200,
    message: message
  };
};

exports.deleted = deleted;

var restored = function restored(message) {
  message = message ? message : _t('Object has been restored');
  return {
    statusCode: 200,
    message: message
  };
};

exports.restored = restored;

var notAuthorized = function notAuthorized(message) {
  message = message ? message : 'pebee.global.notAuthorized';
  return {
    statusCode: 401,
    message: _t(message)
  };
};

exports.notAuthorized = notAuthorized;

var loginError = function loginError(message) {
  message = message ? message : 'Wrong username or password';
  return {
    statusCode: 403,
    message: _t(message)
  };
};

exports.loginError = loginError;

var modelError = function modelError(error) {
  return _objectSpread({
    statusCode: 422
  }, pebee.functions.transformSequelizeError(error));
};

exports.modelError = modelError;