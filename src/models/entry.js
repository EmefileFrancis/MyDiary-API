import Joi from 'joi';

const entries = [
  {
    id: 1,
    userId: 2,
    title: 'First Entry Title',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
    date: new Date('July 15, 2017 09:12:00'),
  },
  {
    id: 2,
    userId: 2,
    title: 'Second Entry Title',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
    + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    date: new Date('July 15, 2017 09:12:00'),
  },
  {
    id: 3,
    userId: 1,
    title: 'Third Entry Title',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
    + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    date: new Date('July 15, 2017 09:12:00'),
  },
  {
    id: 4,
    userId: 1,
    title: 'Fourth Entry Title',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
    + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    + 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    date: 'July 15, 2017 09:12:00',
  },
];

function validateEntry(entry) {
  const schema = {
    id: Joi.number().min(1).required(),
    userId: Joi.number().min(1).required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    date: Joi.string(),
  };

  return Joi.validate(entry, schema);
}

export { entries, validateEntry };
