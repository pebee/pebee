'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("./../utils/api/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();
/**
 * Login route. Verifies provided username and password. If they are correct
 * the API sets a HttpOnly cookie with Authorization Token for the session lifetime
 */


router.post('/login', function (req, res) {
  pebee.models.User.verifyPassword(req.body).then(function (user) {
    if (user) {
      var userData = user.serialize(),
          token;

      try {
        if (req.cookies['authorizationToken'] && (0, _auth.verifyToken)(req.cookies['authorizationToken'])) {
          token = req.cookies['authorizationToken'];
        } else {
          token = (0, _auth.createToken)({
            id: user.get('id')
          });
        }
      } catch (e) {
        throw e;
      }

      var cookieExpiration = parseInt(process.env.TOKEN_EXPIRATION) * 1000;
      res.cookie('authorizationToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + cookieExpiration)
      });
      res.send({
        message: _t('Login successful'),
        data: userData
      });
    } else {
      res.status(403).send(pebee.api.responses.loginError());
    }
  }).catch(function (e) {
    res.status(403).send(pebee.api.responses.loginError());
  });
});
router.get('/me', function (req, res) {
  res.send(req.user);
});
var _default = router;
exports.default = _default;