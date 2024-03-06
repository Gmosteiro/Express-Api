import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createUser } from './../services/userService';

export const postUser = async (req: Request, res: Response) => {
	try {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}

		const { nickname, name, lastName, email, birthDate, institution, bio, website } = req.body;

		const userData = req.body;
		const newUser = await createUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' });
	}
};