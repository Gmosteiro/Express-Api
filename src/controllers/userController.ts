// src/controllers/userController.ts

import { Request, Response } from 'express';
import { createUser, getUserById } from '../services/userService';
import { log } from 'console';

export const handleCreateUser = async (req: Request, res: Response) => {
	try {

		const userData = req.body;

		console.log("userData " + JSON.stringify(userData));

		const newUser = await createUser(userData);
		res.status(201).json(newUser);

	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

export const handleGetUser = async (req: Request, res: Response) => {
	try {

		const userId = req.params.id; // Assuming the user ID is part of the request parameters
		const user = await getUserById(userId);

		if (!user) {
			res.status(404).send('User not found');
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
