import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validationResult } from 'express-validator';
import { createUser, getUserById, getAllUsers, updateUser } from './../services/userService';
import { User } from '../types/user.d';

export const postUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('postUser', req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const userData: User = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            const users: User[] = await getAllUsers();
            if (users.length === 0) {
                res.status(404).json({ error: 'No users found' });
            } else {
                res.status(200).json(users);
            }

        } else {
            const user = await getUserById(parseInt(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const router = express.Router();

// otro post diferente
router.post('/', [
    // Validar q no sean empty 
    body('nickname').notEmpty().isString(),
    body('name').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('birthDate').notEmpty().isISO8601(),
], postUser);

// un get para el put?
router.get('/:id?', [
    param('id').optional().isInt(),   // puede ser util
], getUsers);

		//el update con copia de tus errores xd
router.put('/:id', [

    param('id').isInt(),
    body('nickname').notEmpty().isString(),
    body('name').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('birthDate').notEmpty().isISO8601(),
], async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const updatedUser = await updateUser(id, userData);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default router;
