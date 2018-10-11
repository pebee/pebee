'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.verifyToken = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate JWT token with encrypted data using Secret Key.
 * 
 * @param {Object} data Data to be encrypted within token
 */
var createToken = function createToken(data) {
  return _jsonwebtoken.default.sign(data, process.env.AUTH_SECRET_KEY, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRATION)
  });
};
/**
 * Verifies if given token is valid and returns it's decrypted data (if valid).
 * 
 * @param {String} token Token to be verified
 */


exports.createToken = createToken;

var verifyToken = function verifyToken(token) {
  return _jsonwebtoken.default.verify(token, process.env.AUTH_SECRET_KEY);
};
/**
 * Grab token from authorization header, verify it and return it's decrypted data.
 * If token is invalid (or there is no token), return 401 unauthorized response.
 * 
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Middleware next method to continue request
 */


exports.verifyToken = verifyToken;

var authorize = function authorize(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    try {
      var authorizationToken = req.cookies['authorizationToken'];

      if (authorizationToken) {
        var tokenData = verifyToken(authorizationToken);
        pebee.models.User.scope(['withPermissions']).findById(tokenData.id).then(function (user) {
          if (user) {
            req.user = user.serialize();
            next();
          } else {
            throw new Error();
          }
        });
      } else {
        throw new Error();
      }
    } catch (e) {
      pebee.logger.info(e);
      res.clearCookie('authorizationToken', {
        httpOnly: true
      });
      res.status(401).send(pebee.api.responses.notAuthorized());
    }
  }
};

exports.authorize = authorize;