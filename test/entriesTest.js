const request = require('supertest');
const expect = require('chai').expect;
let server; 


describe('api/v1/entries', () => {
   //beforeEach(() => { server = require('../dist/index'); });

   //afterEach(() => {
   //  server.close();
   //});

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
