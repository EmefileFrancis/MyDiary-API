import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config';

class User {
  constructor(username, password, email, numberofentries, createdon) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.numberofentries = numberofentries;
    this.createdon = createdon;
  }
}

function generateAuthToken(user) {
  const token = jwt.sign({ username: user.username, email: user.email }, 'jwtPrivateKey');
  return token;
}

function validateUser(user) {
  const schema = {
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
  };

  return Joi.validate(user, schema);
}

export { User, generateAuthToken, validateUser };
