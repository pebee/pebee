'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _storage = _interopRequireDefault(require("./../utils/storage"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

var GCS = new _storage.default();
var upload = (0, _multer.default)(); // get all files from given directory

router.get('/files', function (req, res) {
  GCS.getObjects(req.query['directory']).then(function (files) {
    res.send(pebee.api.responses.single(files));
  });
}); // download file

router.get('/download', function (req, res) {
  GCS.downloadFile(req.query['filename']).then(function (content) {
    res.send(content);
  }).catch(function (e) {
    pebee.logger.info(e);
    res.status(400).send({
      message: _t('pebee.storage.fileDownloadFailure')
    });
  });
}); // delete file

router.post('/delete', function (req, res) {
  GCS.deleteFile(req.body['filename']).then(function () {
    res.send({
      message: _t('pebee.storage.fileDeleteSuccess')
    });
  }).catch(function (e) {
    pebee.logger.info(e);
    res.status(400).send({
      message: _t('pebee.storage.fileDeleteFailure')
    });
  });
}); // upload files

router.post('/upload', upload.array('files'), function (req, res, next) {
  try {
    GCS.uploadFiles(req.files, req.body['directory']);
    res.send({
      message: _t('pebee.storage.fileUploadSuccess')
    });
  } catch (e) {
    res.status(400).send({
      message: _t('pebee.storage.fileUploadFailure')
    });
  }
}); // create new directory

router.post('/create_dir', function (req, res) {
  try {
    GCS.createDirectory(req.body['directory'], req.body['newDir']);
    res.send({
      message: _t('pebee.storage.folderCreateSuccess')
    });
  } catch (e) {
    res.status(400).send({
      message: _t('pebee.storage.folderCreateError')
    });
  }
});
var _default = router;
exports.default = _default;