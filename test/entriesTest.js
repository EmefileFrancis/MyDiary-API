import request from 'supertest';
import chai from 'chai';
import server from '../dist/index';
import { entries } from '../dist/src/models/entry';

const expect = chai.expect;

describe('api/v1/entries', () => {
  describe('GET /', () => {
    it('should return all entries', (done) => {
      request(server).get('/api/v1/entries')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(4);
          expect(res.body[0]).to.have.property('title', 'First Entry Title');
          expect(res.body[res.body.length - 1]).to.have.property('title', 'Fourth Entry Title');
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('should return an entry if valid id is passed', (done) => {
      request(server).get('/api/v1/entries/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('id', 1);
          expect(res.body).to.have.property('title', 'First Entry Title');
          done();
        });
    });

    it('should return 404 if an invalid id is passed', (done) => {
      request(server).get('/api/v1/entries/10')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('GET /:userId', () => {
    it('should return all entries with the same userId', (done) => {
      request(server).get('/api/v1/entries/userId/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });

    it('should return 404 if no entry has the specified userId', (done) => {
      request(server).get('/api/v1/entries/userId/10')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('DELETE /:id', () => {
    it('should return 404 if id is invalid', (done) => {
      request(server).delete('/api/v1/entries/100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should delete the entry if id is valid', (done) => {
      request(server).delete('/api/v1/entries/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(entries.length).to.equal(2);
          done();
        });
    });
  });

  describe('PUT /:id', () => {
    it('should return 404 if Id not found', (done) => {
      request(server).put('/api/v1/entries/100').send({
        userId: 1, title: 'Another Entry Title', body: 'Another Entry body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should return 400 if input is not valid', (done) => {
      request(server).put('/api/v1/entries/3').send({
        id: 3, userId: 1, body: 'Another Entry body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should update the specified entry', (done) => {
      request(server).put('/api/v1/entries/3').send({
        id: 3, userId: 1, title: 'Another Entry Title', body: 'Another Entry body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(entries.find(c => c.id === 3)).to.have.property('id', 3);
          expect(entries.find(c => c.id === 3)).to.have.property('title', 'Another Entry Title');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should return 400 if id is less than 1', (done) => {
      request(server).post('/api/v1/entries').send({
        id: 0, userId: 1, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return 400 if userId is not specified', (done) => {
      request(server).post('/api/v1/entries').send({
        id: 0, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return 400 if userId is less than 1', (done) => {
      request(server).post('/api/v1/entries').send({
        id: 1, userId: 0, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should save the entry if it is valid', (done) => {
      request(server).post('/api/v1/entries').send({
        id: 6, userId: 1, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(entries.length).to.equal(6);
          done();
        });
    });

    it('should return the entry if it is valid', (done) => {
      request(server).post('/api/v1/entries').send({
        id: 9, userId: 1, title: 'Fifth Entry Title', body: 'Fifth Entry Body', date: 'July 15, 2017 09:12:00',
      })
        .end((err, res) => {
          expect(res.body).to.have.property('id', 9);
          expect(res.body).to.have.property('title', 'Fifth Entry Title');
          done();
        });
    });
  });
});
