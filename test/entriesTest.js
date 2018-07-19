const request = require('supertest');
const expect = require('chai').expect;
const server = require('../dist/index');

describe('api/v1/entries', () => {
  /* eslint-disable global-require */
  // beforeEach(() => { server });

  // afterEach(() => {
  //  server.close();
  // });

  describe('GET /', () => {
    it('should return all entries', async () => {
      const res = await request(server.default).get('/api/v1/entries');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(4);
      const members = [];
      res.body.forEach((e) => {
        members.push(e.title);
      });
      expect(members).to.have.members(['First Entry Title', 'Second Entry Title', 'Third Entry Title', 'Fourth Entry Title']);
    });
  });
});