"use strict";

require("./../config/bootstrap");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _controllers = _interopRequireDefault(require("./controllers"));

var _auth = require("./utils/api/auth");

var _storage = _interopRequireDefault(require("./utils/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parsers
new _storage.default().getObjects('Media').then(function (res) {
  console.log(res);
});
var app = (0, _express.default)();
app.listen(process.env.API_PORT, function () {
  console.log('PeBeeCMS API listening on port ' + process.env.API_PORT);
});
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

if (process.env.USE_AUTH === '1') {
  app.use(/^((?!\/api\/login)).*$/, _auth.authorize);
}

app.use('/api', _controllers.default);