import express from 'express';
import { createUser, loginUser } from './controller.js';
import { fetchData } from './dateController.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/listings', fetchData);

export default router;
