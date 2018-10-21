'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var responses = _interopRequireWildcard(require("./../utils/api/responses"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // check permission for basic CRUD operations depending on request method


router.all(/(^\/$)|(^\/(\d+|all)$)/, function (req, res, next) {
  if (req.method !== 'OPTIONS') {
    var permissionLabel = pebee.functions.generateCRUDPermissionLabel('users', req.method);

    if (pebee.functions.validatePermission(req.user, permissionLabel) || process.env.USE_AUTH === '0') {
      next();
    } else {
      res.status(401).send(pebee.api.responses.notAuthorized());
    }
  } else {
    next();
  }
});
/**
 * Return all users
 */

router.get('/all', function (req, res) {
  pebee.models.User.findAll().then(function (users) {
    var mappedUsers = users.map(function (user) {
      return user.serialize();
    });
    res.send(pebee.api.responses.list(mappedUsers));
  });
});
/**
 * Return paginated users
 */

router.get('/', function (req, res) {
  var query = pebee.functions.preparePaginationQuery(req, pebee.models.User);
  query['paranoid'] = false;
  pebee.models.User.scope(['withAccountCategory']).findAll(query).then(function (users) {
    var mappedUsers = users.map(function (user) {
      return user.serialize();
    });
    pebee.models.User.count({
      paranoid: false
    }).then(function (totalRows) {
      res.send(pebee.api.responses.list(mappedUsers, totalRows));
    });
  });
});
/**
 * Return single user by given ID
 */

router.get('/:id', function (req, res) {
  pebee.models.User.scope(['withAccountCategory']).findById(req.params['id'], {
    paranoid: false
  }).then(function (user) {
    if (user) {
      res.send(responses.single(user.serialize()));
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('User does not exist'), {
        id: req.params['id']
      }));
    }
  });
});
/**
 * Create new user
 */

router.post('/', function (req, res) {
  pebee.models.User.create(req.body).then(function (user) {
    res.send(pebee.api.responses.created(user.serialize()));
  }).catch(function (e) {
    res.status(422).send(pebee.api.responses.modelError(e));
  });
});
/**
 * Update user with given ID
 */

router.put('/:id', function (req, res) {
  pebee.models.User.findById(req.params['id'], {
    paranoid: false
  }).then(function (user) {
    if (user) {
      user.update(req.body).then(function (self) {
        res.send(pebee.api.responses.updated(self.serialize()));
      }).catch(function (e) {
        res.status(422).send(pebee.api.responses.modelError(e));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('User does not exist'), {
        id: req.params['id']
      }));
    }
  }).catch(function (e) {
    res.status(422).send({
      message: _t('Error while updating user')
    });
  });
});
/**
 * Restore user with given ID
 */

router.put('/:id/restore', function (req, res) {
  pebee.models.User.findById(req.params['id'], {
    paranoid: false
  }).then(function (user) {
    if (user) {
      user.restore().then(function () {
        res.send(pebee.api.responses.restored(_t('pebee.users.restoreUser')));
      }).catch(function (e) {
        res.status(422).send(pebee.api.responses.modelError(e));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('User does not exist'), {
        id: req.params['id']
      }));
    }
  }).catch(function (e) {
    res.status(422).send({
      message: _t('Error while restoring user')
    });
  });
});
/**
 * Delete user with given ID
 */

router.delete('/:id', function (req, res) {
  pebee.models.User.findById(req.params['id']).then(function (user) {
    if (user) {
      user.destroy().then(function () {
        res.send(pebee.api.responses.deleted(_t('User has been deleted')));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('User does not exist'), {
        id: req.params['id']
      }));
    }
  }).catch(function (e) {
    res.status(400).send({
      message: _t('Error while deleting user')
    });
  });
});
var _default = router;
exports.default = _default;