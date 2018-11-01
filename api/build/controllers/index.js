'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _pebeeExtensions = _interopRequireDefault(require("pebee-extensions"));

var _user = _interopRequireDefault(require("./user"));

var _auth = _interopRequireDefault(require("./auth"));

var _accountCategory = _interopRequireDefault(require("./accountCategory"));

var _permission = _interopRequireDefault(require("./permission"));

var _storage = _interopRequireDefault(require("./storage"));

var _option = _interopRequireDefault(require("./option"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use('/users', _user.default);
router.use('/account_categories', _accountCategory.default);
router.use('/permissions', _permission.default);
router.use('/storage', _storage.default);
router.use('/options', _option.default);
router.use('/', _auth.default);

for (var extension in _pebeeExtensions.default) {
  router.use("/extensions/".concat(extension), _pebeeExtensions.default[extension].router);
}

var _default = router;
exports.default = _default;