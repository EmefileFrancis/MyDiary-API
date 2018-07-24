'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entries = require('./src/routes/entries');

var _entries2 = _interopRequireDefault(_entries);

var _prod = require('./src/middleware/prod');

var _prod2 = _interopRequireDefault(_prod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const appDebug = require('debug')('app:http');

var app = (0, _express2.default)();

(0, _prod2.default)(app);

app.use(_express2.default.json());
app.use('/api/v1/entries', _entries2.default);

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  return console.log('Listening on port ' + port);
});

exports.default = server;
//# sourceMappingURL=index.js.map