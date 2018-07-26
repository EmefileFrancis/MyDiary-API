import chai from 'chai';
import request from 'supertest';
import server from '../dist/index';

const expect = chai.expect;

describe('/api/v1/users', () => {
  describe('POST /', () => {
    it('should return 400 if username is lesser than 2', (done) => {
      request(server).post('/api/v1/users')
        .send({ username: '1', password: 'password', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('data', '"username" length must be at least 2 characters long');
          done();
        });
    });

    it('should return 400 if username is not provided', (done) => {
      request(server).post('/api/v1/users')
        .send({ password: 'password', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('data', '"username" is required');
          done();
        });
    });

    it('should return 400 if email is not provided', (done) => {
      request(server).post('/api/v1/users')
        .send({ username: 'francis', password: 'password' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('data', '"email" is required');
          done();
        });
    });

    it('should return 400 if email is not a valid mail address', (done) => {
      request(server).post('/api/v1/users')
        .send({ username: 'francis', password: 'password', email: 'francisgmailcom' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('data', '"email" must be a valid email');
          done();
        });
    });

    it('should return 400 if password is not provided', (done) => {
      request(server).post('/api/v1/users')
        .send({ username: 'francis', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('data', '"password" is required');
          done();
        });
    });

    it('should return 400 if password is less than 3', (done) => {
      request(server).post('/api/v1/users')
        .send({ username: 'francis', password: '12', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('data', '"password" length must be at least 3 characters long');
          done();
        });
    });
  });
});
