'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user"));

var _auth = _interopRequireDefault(require("./auth"));

var _accountCategory = _interopRequireDefault(require("./accountCategory"));

var _permission = _interopRequireDefault(require("./permission"));

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use('/users', _user.default);
router.use('/account_categories', _accountCategory.default);
router.use('/permissions', _permission.default);
router.use('/storage', _storage.default);
router.use('/', _auth.default);
var _default = router;
exports.default = _default;