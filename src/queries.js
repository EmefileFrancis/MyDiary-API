
import pg from 'pg';
import bcrypt from 'bcrypt';
import {
  User, generateAuthToken, validateUser, validateForLogin,
} from './models/user';

const connectData = {
  user: 'eduonix',
  database: 'mydiarydb',
  password: 'password',
  port: 5432,
};

const pool = new pg.Pool(connectData);

function signUpUser(req, res) {
  const result = validateUser(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, data: result.error.details[0].message });
  }

  pool.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({ success: false, data: err });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const data = new User(req.body.username, hash, req.body.email, 0, new Date());
      client.query('insert into users(username, password, email, numberofentries, createdon) values($1, $2, $3, $4, $5)',
        [data.username, data.password, data.email, data.numberofentries, data.createdon],
        (error) => {
          if (error) {
            return res.status(500).json({ success: false, data: error });
          }
          const token = generateAuthToken(data);
          res.header('x-auth-token', token)
            .send({
              success: true,
              message: 'User added.',
            });
          done();
        });
    });
  });
}

function loginUser(req, res) {
  const result = validateForLogin(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, data: result.error.details[0].message });
  }
  pool.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({ success: false, data: err });
    }
    client.query('select email, password from users where email=$1', [req.body.email],
      (error, data) => {
        if (error) {
          return res.status(500).json({ success: false, data: error });
        }
        console.log('data.password', data.rows[0].password);
        bcrypt.compare(req.body.password, data.rows[0].password, (reject) => {
          if (reject) {
            return res.status(400).send('Invalid email or password');
          }
          const token = generateAuthToken(data);
          res.header('x-auth-token', token).send({
            success: true,
            message: 'Logged in',
          });
        });
        done();
      });
  });
}


export { pg, signUpUser, loginUser };
