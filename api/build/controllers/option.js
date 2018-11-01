'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // return all options


router.get('/all', function (req, res) {
  pebee.models.Option.findAll().then(function (options) {
    var mappedOptions = options.map(function (option) {
      return option.serialize();
    });
    res.send(pebee.api.responses.list(mappedOptions));
  });
}); // get current language

router.get('/language', function (req, res) {
  pebee.models.Option.findById('lang').then(function (option) {
    if (option) {
      res.send({
        statusCode: 200,
        data: {
          language: _t("pebee.options.".concat(option.value)),
          code: option.value
        }
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), {
        key: 'lang'
      }));
    }
  });
}); // get available options for specified key

router.get('/available-options', function (req, res) {
  Promise.resolve(pebee.models.Option.getAvailableOptions(req.query['key'])).then(function (options) {
    res.send({
      statusCode: 200,
      data: options
    });
  }).catch(function (e) {
    res.status(400).send({
      statusCode: 400,
      message: e.message
    });
  });
}); // change language by 'code' query parameter
// example: /api/options/change-language?code=pl

router.get('/change-language', function (req, res) {
  pebee.models.Option.findById('lang').then(function (option) {
    if (option) {
      return option.update({
        value: req.query['code'] || ''
      }).then(function (self) {
        res.send(pebee.api.responses.updated(self.serialize()));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), {
        key: 'lang'
      }));
    }
  }).catch(function (e) {
    pebee.logger.error(e);
    res.status(422).send(pebee.api.responses.modelError(e));
  });
}); // return single option by key

router.get('/:key', function (req, res) {
  pebee.models.Option.findById(req.params['key']).then(function (option) {
    if (option) {
      res.send(pebee.api.responses.single(option.serialize()));
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), {
        key: req.params['key']
      }));
    }
  });
}); // create new option

router.post('/', function (req, res) {
  pebee.models.Option.create(req.body).then(function (option) {
    res.send(pebee.api.responses.created(option.serialize()));
  }).catch(function (e) {
    res.status(422).send(pebee.api.responses.modelError(e));
  });
}); // update single option

router.put('/:key', function (req, res) {
  pebee.models.Option.findById(req.params['key']).then(function (option) {
    if (option) {
      return option.update(req.body).then(function (self) {
        res.send(pebee.api.responses.updated(self.serialize()));
      });
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), {
        key: req.params['key']
      }));
    }
  }).catch(function (e) {
    res.status(422).send(pebee.api.responses.modelError(e));
  });
}); // delete single option (if not protected)

router.delete('/:key', function (req, res) {
  pebee.models.Option.findById(req.params['key']).then(function (option) {
    if (option) {
      if (option.get('isProtected')) {
        res.status(400).send({
          statusCode: 400,
          message: _t('pebee.options.forbidDeleteProtected')
        });
      } else {
        return option.destroy().then(function () {
          res.send(pebee.api.responses.deleted({
            message: _t('pebee.options.deleteSuccess')
          }));
        });
      }
    } else {
      res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), {
        key: req.params['id']
      }));
    }
  }).catch(function (e) {
    pebee.logger.error(e);
    res.status(400).send({
      message: _t('pebee.global.operationError')
    });
  });
});
var _default = router;
exports.default = _default;