import express from 'express';
import { postUser } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

// Routes
router.post('/users', validateUser, postUser);
//router.post('/users', postUser);

// Other user routes

export default router;
