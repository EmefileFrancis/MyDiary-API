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

export default router;
