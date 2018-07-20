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
      const titles = [];
      res.body.forEach((e) => {
        titles.push(e.title);
      });
      expect(titles).to.have.members(['First Entry Title', 'Second Entry Title', 'Third Entry Title', 'Fourth Entry Title']);
    });
  });

  describe('GET /:id', () => {
    it('should return a entry if valid id is passed', async () => {
      const res = await request(server.default).get('/api/v1/entries/1');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('title', 'First Entry Title');
    });

    it('should return 404 if an invalid id is passed', async () => {
      const res = await request(server.default).get('/api/v1/entries/10');
      expect(res.status).to.equal(404);
    });
  });
});
