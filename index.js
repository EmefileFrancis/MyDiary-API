import express from 'express';
import Joi from 'joi';
import entries from './src/routes/entries';
import users from './src/routes/users';
import prod from './src/middleware/prod';

const app = express();

prod(app);

app.use(express.json());
app.use('/api/v1/entries', entries);
app.use('/api/v1', users);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
