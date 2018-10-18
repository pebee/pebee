'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storage = require("./../../config/storage");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GoogleCloudStorage =
/*#__PURE__*/
function () {
  function GoogleCloudStorage() {
    _classCallCheck(this, GoogleCloudStorage);

    this.storage = _storage.storage;
    this.bucket = _storage.bucket;
  }

  _createClass(GoogleCloudStorage, [{
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

          if (objectNameArray.length === 1) {
            files.push(object);
          } else if (objectNameArray.length === 2 && object.name.endsWith('/')) {
            folders.push(object);
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