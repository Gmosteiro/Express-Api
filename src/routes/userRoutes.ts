import express from 'express';
import { postUser, getUsers } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

// Routes
router.post('/add', validateUser, postUser);
router.post('/users', validateUser, postUser); 
router.get('/:id', getUsers);
router.get('/', getUsers);

// Other user routes

export default router;
