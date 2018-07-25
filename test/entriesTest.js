import request from 'supertest';
import chai from 'chai';
import { entries } from '../dist/src/models/entry';

const expect = chai.expect;
const server = require('../dist/index');

describe('api/v1/entries', () => {
  describe('GET /', () => {
    it('should return all entries', async () => {
      const res = await request(server.default).get('/api/v1/entries');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(4);
      expect(res.body[0]).to.have.property('title', 'First Entry Title');
      expect(res.body[res.body.length - 1]).to.have.property('title', 'Fourth Entry Title');
    });
  });

  describe('GET /:id', () => {
    it('should return an entry if valid id is passed', async () => {
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

  describe('GET /:userId', () => {
    it('should return all entries with the same userId', async () => {
      const res = await request(server.default).get('/api/v1/entries/userId/1');

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
      const titles = [];
      res.body.forEach((e) => {
        titles.push(e.title);
      });
      expect(titles).to.have.members(['Third Entry Title', 'Fourth Entry Title']);
    });

    it('should return 404 if no entry has the specified userId', async () => {
      const res = await request(server.default).get('/api/v1/entries/userId/10');

      expect(res.status).to.equal(404);
    });
  });

  describe('DELETE /:id', () => {
    it('should return 404 if id is invalid', async () => {
      const res = await request(server.default).delete('/api/v1/entries/100');

      expect(res.status).to.equal(404);
    });

    it('should delete the entry if id is valid', async () => {
      const res = await request(server.default).delete('/api/v1/entries/1');

      expect(res.status).to.equal(200);
      expect(entries.length).to.equal(2);
    });
  });

  describe('PUT /:id', () => {
    it('should return 404 if Id not found', async () => {
      const res = await request(server.default).put('/api/v1/entries/100').send({
        userId: 1, title: 'Another Entry Title', body: 'Another Entry body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(404);
    });

    it('should return 400 if input is not valid', async () => {
      const res = await request(server.default).put('/api/v1/entries/3').send({
        id: 3, userId: 1, body: 'Another Entry body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(400);
    });

    it('should update the specified entry', async () => {
      const res = await request(server.default).put('/api/v1/entries/3').send({
        id: 3, userId: 1, title: 'Another Entry Title', body: 'Another Entry body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(200);
      expect(entries.find(c => c.id === 3)).to.have.property('id', 3);
      expect(entries.find(c => c.id === 3)).to.have.property('title', 'Another Entry Title');
    });
  });

  describe('POST /', () => {
    it('should return 400 if id is less than 1', async () => {
      const res = await request(server.default).post('/api/v1/entries').send({
        id: 0, userId: 1, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(400);
    });

    it('should return 400 if userId is not specified', async () => {
      const res = await request(server.default).post('/api/v1/entries').send({
        id: 0, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(400);
    });

    it('should return 400 if userId is less than 1', async () => {
      const res = await request(server.default).post('/api/v1/entries').send({
        id: 1, userId: 0, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(400);
    });

    it('should save the entry if it is valid', async () => {
      const res = await request(server.default).post('/api/v1/entries').send({
        id: 6, userId: 1, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.status).to.equal(200);
      expect(entries.length).to.equal(6);
    });

    it('should return the entry if it is valid', async () => {
      const res = await request(server.default).post('/api/v1/entries').send({
        id: 9, userId: 1, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      });
      expect(res.body).to.have.property('id', 9);
      expect(res.body).to.have.property('title', 'Fifth Entry Title');
    });
  });
});
