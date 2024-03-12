import express from 'express';
import { postUser, getUsers, removeUser } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateUser, postUser);
router.post('/remove/:id', removeUser);
router.get('/:id', getUsers);
router.get('/', getUsers);

export default router;
