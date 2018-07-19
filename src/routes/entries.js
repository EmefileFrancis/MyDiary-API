import express from 'express';
import entries from '../models/entry';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(entries);
});

export default router;
