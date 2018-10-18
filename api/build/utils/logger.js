'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _winston.default.createLogger({
  level: 'debug',
  format: _winston.default.format.json(),
  transports: [new _winston.default.transports.File({
    filename: 'pebee-logs.log'
  })]
});

var _default = logger;
exports.default = _default;