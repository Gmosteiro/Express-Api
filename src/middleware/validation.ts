import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
	const { nickname } = req.body;

	const existingUser = await prisma.user.findUnique({
		where: { nickname },
	});

	if (existingUser) {
		return res.status(400).json({ error: 'A user with this nickname already exists' });
	}

	next();
};
