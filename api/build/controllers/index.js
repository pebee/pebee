'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user"));

var _auth = _interopRequireDefault(require("./auth"));

var _accountCategory = _interopRequireDefault(require("./accountCategory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use('/users', _user.default);
router.use('/account_categories', _accountCategory.default);
router.use('/', _auth.default);
var _default = router;
exports.default = _default;