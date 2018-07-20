'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entry = require('../models/entry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.send(_entry.entries);
});

router.get('/:id', function (req, res) {
  var entry = _entry.entries.find(function (c) {
    return c.id === parseInt(req.params.id, 10);
  });
  if (!entry) res.status(404).send('Entry with specified ID not found.');
  res.send(entry);
});

router.get('/userId/:userId', function (req, res) {
  var entriesByUser = _entry.entries.filter(function (c) {
    return c.userId === parseInt(req.params.userId, 10);
  });
  if (entriesByUser === undefined || entriesByUser.length === 0) res.sendStatus(404).send('No entry with specified userId.');
  res.send(entriesByUser);
});

router.post('/', function (req, res) {
  var result = (0, _entry.validateEntry)(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  var newEntry = {
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    date: req.body.date
  };

  _entry.entries.push(newEntry);
  res.send(newEntry);
});

exports.default = router;
//# sourceMappingURL=entries.js.map