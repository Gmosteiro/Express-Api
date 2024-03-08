import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createUser, getUserById, getAllUsers } from './../services/userService';
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
