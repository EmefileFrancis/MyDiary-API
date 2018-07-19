'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entry = require('../models/entry');

var _entry2 = _interopRequireDefault(_entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.send(_entry2.default);
});

exports.default = router;
//# sourceMappingURL=entries.js.map