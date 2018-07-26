import express from 'express';
import entries from './src/routes/entries';
import users from './src/routes/users';
import prod from './src/middleware/prod';

const app = express();

prod(app);

app.use(express.json());
app.use('/api/v1/entries', entries);
app.use('/api/v1/users', users);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
