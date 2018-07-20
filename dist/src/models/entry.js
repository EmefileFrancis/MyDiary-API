'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEntry = exports.entries = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var entries = [{
  id: 1,
  userId: 2,
  title: 'First Entry Title',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \n    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  date: new Date('July 15, 2017 09:12:00')
}, {
  id: 2,
  userId: 2,
  title: 'Second Entry Title',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  date: new Date('July 15, 2017 09:12:00')
}, {
  id: 3,
  userId: 1,
  title: 'Third Entry Title',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  date: new Date('July 15, 2017 09:12:00')
}, {
  id: 4,
  userId: 1,
  title: 'Fourth Entry Title',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  date: 'July 15, 2017 09:12:00'
}];

function validateEntry(entry) {
  var schema = {
    id: _joi2.default.number().min(1).required(),
    userId: _joi2.default.number().min(1).required(),
    title: _joi2.default.string().required(),
    body: _joi2.default.string().required(),
    date: _joi2.default.string()
  };

  return _joi2.default.validate(entry, schema);
}

exports.entries = entries;
exports.validateEntry = validateEntry;
//# sourceMappingURL=entry.js.map