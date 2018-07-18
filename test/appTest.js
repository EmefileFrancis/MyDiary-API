const assert = require('chai').assert;

const app = require('../src/app');

describe('App', () => {
  it('should return hello', () => {
    assert.equal(app(), 'hello');
  });
});
