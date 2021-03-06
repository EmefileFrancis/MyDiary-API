import express from 'express';
import { entries, validateEntry } from '../models/entry';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(entries);
});

router.get('/:id', (req, res) => {
  const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
  if (!entry) res.status(404).send({ message: 'Entry with specified ID not found.' });
  res.send(entry);
});

router.get('/userId/:userId', (req, res) => {
  const entriesByUser = entries.filter(c => c.userId === parseInt(req.params.userId, 10));
  if (entriesByUser === undefined || entriesByUser.length === 0) res.status(404).send({ message: 'Entry with specified ID not found.' });
  res.send(entriesByUser);
});

router.post('/', (req, res) => {
  const result = validateEntry(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  const newEntry = {
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    date: req.body.date,
  };

  entries.push(newEntry);
  res.send(newEntry);
});

router.put('/:id', (req, res) => {
  const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
  if (!entry) res.status(404).send({ message: 'Entry with specified ID not found.' });

  const result = validateEntry(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  entry.userId = req.body.userId;
  entry.title = req.body.title;
  entry.body = req.body.body;
  entry.date = req.body.date;

  res.send(entries);
});

router.delete('/:id', (req, res) => {
  const entry = entries.find(c => c.id === parseInt(req.params.id, 10));
  if (!entry) res.status(404).send({ message: 'Entry with specified ID not found.' });

  const index = entries.indexOf(entry);
  entries.splice(index, 1);
  res.send(entries);
});

export default router;
