import express from 'express';
import { postUser, getUsers } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

// Routes
router.post('/add', validateUser, postUser);
router.get('/:id', getUsers);
router.get('/', getUsers);
//router.post('/users', postUser);

// Other user routes

export default router;
