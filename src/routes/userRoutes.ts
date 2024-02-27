import express from 'express';
import { createUser } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

// Routes
router.post('/users', validateUser, createUser);

// Other user routes

export default router;
