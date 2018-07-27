import express from 'express';
import { signUpUser, loginUser } from '../queries';

const router = express.Router();

router.post('/auth/signup', signUpUser);
router.post('/auth/login', loginUser);

export default router;
