import express from 'express';
import entries from '../models/entry';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(entries);
});

router.get('/:id', (req, res) => {
  const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
  if (!entry) res.status(404).send('Entry with specified ID not found.');
  res.send(entry);
});

router.get('/userId/:userId', (req, res) => {
  const entriesByUser = entries.filter(c => c.userId === parseInt(req.params.userId, 10));
  if (entriesByUser === undefined || entriesByUser.length === 0) res.status(404).send('No entry with specified userId.');
  res.send(entriesByUser);
});


export default router;
