// import app from '../dist/app';
const assert = require('chai').assert;
const app = require('../dist/app');

describe('App', () => {
  it('should return hello', () => {
    const result = app.hello();
    assert.equal(result, 'hello');
  });

  it('should return hello, Francis', () => {
    const result = app.helloMe('Francis');
    assert.equal(result, 'hello, Francis!');
  });
});
