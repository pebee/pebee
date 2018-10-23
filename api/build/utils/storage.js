'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storage = require("./../../config/storage");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GCSFile = function GCSFile(file, name) {
  _classCallCheck(this, GCSFile);

  this.fullName = file.name;
  this.name = name;
  this.createDate = file.metadata.timeCreated;
  this.contentType = file.metadata.contentType;
};

var GoogleCloudStorage =
/*#__PURE__*/
function () {
  function GoogleCloudStorage() {
    _classCallCheck(this, GoogleCloudStorage);

    this.storage = _storage.storage;
    this.bucket = _storage.bucket;
  }
  /**
   * Download given file from GCS
   * 
   * @param {String} filename Full name of file to be downloaded
   */


  _createClass(GoogleCloudStorage, [{
    key: "downloadFile",
    value: function downloadFile(filename) {
      var bucketFile = this.bucket.file(filename);

      if (bucketFile) {
        return bucketFile.download().then(function (result) {
          return result[0];
        });
      } else {
        return new Promise(function (resolve, reject) {
          reject('File does not exist');
        });
      }
    }
    /**
     * Upload multiple files
     * 
     * @param {Array} files Array of files
     * @param {String} directory Name of directory to which files will be uploaded
     */

  }, {
    key: "uploadFiles",
    value: function uploadFiles(files, directory) {
      var _this = this;

      files.forEach(function (file) {
        var bucketFile = _this.bucket.file(directory + file.originalname);

        var bucketFileStream = bucketFile.createWriteStream({
          contentType: 'auto',
          resumable: false
        });
        bucketFileStream.on('error', function (err) {
          throw err;
        });
        bucketFileStream.on('finish', function () {});
        bucketFileStream.end(file.buffer);
      });
    }
    /**
     * Create new directory with name <newDir> with it's base <baseDir>
     * e.g. baseDir = 'Media/Users' and newDir = 'user#1' will create 'Media/Users/user#1' folder
     * 
     * @param {String} baseDir Base path of new folder
     * @param {String} newDir Name of new folder
     */

  }, {
    key: "createDirectory",
    value: function createDirectory(baseDir, newDir) {
      var bucketFilename = baseDir && baseDir !== '' ? baseDir + newDir : newDir;
      bucketFilename += '/';
      var bucketFile = this.bucket.file(bucketFilename);
      var bucketFileStream = bucketFile.createWriteStream({
        contentType: 'auto'
      });
      bucketFileStream.on('error', function (err) {
        throw err;
      });
      bucketFileStream.on('finish', function () {});
      bucketFileStream.end();
    }
    /**
     * Return all files and folders from given directory
     * 
     * @param {String} directory Name of the directory to be read from
     */

  }, {
    key: "getObjects",
    value: function getObjects() {
      var directory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!directory.endsWith('/') && directory !== '') {
        directory += '/';
      }

      return this.bucket.getFiles({
        directory: directory
      }).then(function (result) {
        var objects = result[0];
        var files = [],
            folders = [];
        objects.forEach(function (object) {
          var objectWithoutDir = object.name.substring(object.name.indexOf(directory) + directory.length, object.name.length); // check if current object is the directory itself

          if (objectWithoutDir === '') return;
          var objectNameArray = objectWithoutDir.split('/');
          var gcsFile = new GCSFile(object, objectNameArray[0]);

          if (objectNameArray.length === 1) {
            files.push(gcsFile);
          } else if (objectNameArray.length === 2 && object.name.endsWith('/')) {
            folders.push(gcsFile);
          }
        });
        return {
          files: files,
          folders: folders
        };
      });
    }
  }]);

  return GoogleCloudStorage;
}();

var _default = GoogleCloudStorage;
exports.default = _default;