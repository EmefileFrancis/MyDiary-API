import express from 'express';
import entries from './src/routes/entries';

// const appDebug = require('debug')('app:http');

const app = express();

app.use(express.json());
app.use('/api/v1/entries', entries);

const port = process.env.port || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
