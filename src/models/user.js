import Joi from 'joi';
import jwt from 'jsonwebtoken';

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
    username: Joi.string().min(2).max(50).trim()
      .required(),
    password: Joi.string().min(3).trim().required(),
    email: Joi.string().trim().required().email(),
  };

  return Joi.validate(user, schema);
}

function validateForLogin(data) {
  const schema = {
    email: Joi.string().trim().required().email(),
    password: Joi.string().min(3).trim().required(),
  };

  return Joi.validate(data, schema);
}

export {
  User, generateAuthToken, validateUser, validateForLogin,
};
