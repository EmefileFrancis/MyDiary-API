import express from 'express';
import entries from './src/routes/entries';
import prod from './src/middleware/prod';

// const appDebug = require('debug')('app:http');

const app = express();

prod(app);

app.use(express.json());
app.use('/api/v1/entries', entries);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
