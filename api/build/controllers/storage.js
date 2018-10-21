'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _storage = _interopRequireDefault(require("./../utils/storage"));

var _multer = _interopRequireDefault(require("multer"));

var _storage2 = require("./../../config/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

var GCS = new _storage.default();
var upload = (0, _multer.default)();
router.get('/files', function (req, res) {
  GCS.getObjects(req.query['directory']).then(function (files) {
    res.send(pebee.api.responses.single(files));
  });
});
router.post('/upload', upload.array('files'), function (req, res, next) {
  req.files.forEach(function (file) {
    var bucketFile = _storage2.bucket.file(req.body['directory'] + file.originalname);

    var bucketFileStream = bucketFile.createWriteStream({
      contentType: 'auto',
      resumable: false
    });
    bucketFileStream.on('error', function (err) {
      return res.status(400).send(err);
    });
    bucketFileStream.on('finish', function () {});
    bucketFileStream.end(file.buffer);
  });
  res.send(req.body);
});
router.post('/create_dir', function (req, res) {
  var bucketFile = _storage2.bucket.file(req.body['directory'] + req.body['newDir'] + '/');

  var bucketFileStream = bucketFile.createWriteStream({
    contentType: 'auto'
  });
  bucketFileStream.on('error', function (err) {
    return res.status(400).send({
      message: _t('pebee.storage.folderCreateError')
    });
  });
  bucketFileStream.on('finish', function () {});
  bucketFileStream.end();
  res.send({
    message: _t('pebee.storage.folderCreateSuccess')
  });
});
var _default = router;
exports.default = _default;