'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // check permission for basic CRUD operations


router.all(/(^\/$)|(^\/(\d+|all)$)/, function (req, res, next) {
  var permissionLabel = pebee.functions.generateCRUDPermissionLabel('account-categories', req.method);

  if (pebee.functions.validatePermission(req.user, permissionLabel)) {
    next();
  } else {
    res.status(401).send(pebee.api.responses.notAuthorized());
  }
}); // return all account categories

router.get('/all', function (req, res) {
  pebee.models.AccountCategory.scope('withUsersCount').findAll().then(function (accountCategories) {
    var mappedAccountCategories = accountCategories.map(function (accountCategory) {
      return accountCategory.serialize();
    });
    res.send(pebee.api.responses.list(mappedAccountCategories));
  });
}); // return single account category by given ID

router.get('/:id', function (req, res) {
  pebee.models.AccountCategory.scope(['withPermissions']).findById(req.params['id']).then(function (accountCategory) {
    if (accountCategory) {
      res.send(pebee.api.responses.single(accountCategory.serialize()));
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('Account category does not exist'), {
        id: req.params['id']
      }));
    }
  });
}); // return paginated account categories

router.get('/', function (req, res) {
  var query = pebee.functions.preparePaginationQuery(req, pebee.models.User);
  pebee.models.AccountCategory.findAll(query).then(function (accountCategories) {
    var mappedAccountCategories = accountCategories.map(function (accountCategory) {
      return accountCategory.serialize();
    });
    res.send(pebee.api.responses.list(mappedAccountCategories));
  });
}); // create new account category

router.post('/', function (req, res) {
  pebee.models.AccountCategory.create(req.body).then(function (accountCategory) {
    res.send(pebee.api.responses.created(accountCategory.serialize()));
  }).catch(function (e) {
    console.log(e);
    res.status(422).send({
      statusCode: 422,
      message: _t('Error while creating new account category')
    });
  });
}); // update specified account category

router.put('/:id', function (req, res) {
  pebee.models.AccountCategory.findById(req.params['id']).then(function (accountCategory) {
    if (accountCategory) {
      accountCategory.update(req.body).then(function (self) {
        res.send(pebee.api.responses.updated(self.serialize()));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('Account category does not exist'), {
        id: req.params['id']
      }));
    }
  }).catch(function (e) {
    res.status(422).send({
      message: _t('Error while updating account category')
    });
  });
}); // delete specified account category

router.delete('/:id', function (req, res) {
  pebee.models.AccountCategory.findById(req.params['id']).then(function (accountCategory) {
    if (accountCategory) {
      accountCategory.destroy().then(function () {
        res.send(pebee.api.responses.deleted(_t('Account category has been deleted')));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('Account category does not exist'), {
        id: req.params['id']
      }));
    }
  }).catch(function (e) {
    res.status(400).send({
      message: _t('Error while deleting account category')
    });
  });
});
var _default = router;
exports.default = _default;