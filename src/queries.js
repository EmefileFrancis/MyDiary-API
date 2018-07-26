
import pg from 'pg';
import bcrypt from 'bcrypt';
import { User, generateAuthToken, validateUser } from './models/user';

const connectData = {
  user: 'eduonix',
  database: 'mydiarydbtest',
  password: 'password',
  port: 5432,
};

const pool = new pg.Pool(connectData);

function insertANewUser(req, res) {
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

export { pg, insertANewUser };
