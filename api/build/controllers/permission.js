'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // validate permissions - in this case we use account category permissions


router.all(/(^\/$)|(^\/(\d+|all)$)/, function (req, res, next) {
  if (req.method !== 'OPTIONS') {
    var permissionLabel = pebee.functions.generateCRUDPermissionLabel('account-categories', req.method);

    if (pebee.functions.validatePermission(req.user, permissionLabel)) {
      next();
    } else {
      res.status(401).send(pebee.api.responses.notAuthorized());
    }
  } else {
    next();
  }
});
router.get('/all', function (req, res) {
  pebee.models.Permission.findAll().then(function (permissions) {
    var mappedPermissions = permissions.map(function (permission) {
      return permission.serialize();
    });
    res.send(pebee.api.responses.list(mappedPermissions));
  });
});
var _default = router;
exports.default = _default;