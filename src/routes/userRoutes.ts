import express from 'express';
import { postUser, getUsers, remove, update } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

router.post('/add', validateUser, postUser);
router.put('/update/:id', validateUser, update);
router.post('/remove/:id', remove);
router.get('/:id', getUsers);
router.get('/', getUsers);

export default router;
