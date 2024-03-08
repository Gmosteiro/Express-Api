import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
	const { nickname, birthDate } = req.body;

	if (!isValidDate(birthDate)) {
		return res.status(400).json({ error: 'Invalid birthDate. Expected ISO-8601 DateTime.' });
	}

	const existingUser = await prisma.user.findUnique({
		where: { nickname },
	});

	if (existingUser) {
		return res.status(400).json({ error: 'A user with this nickname already exists' });
	}

	next();
};
function isValidDate(dateString: string): boolean {
	const timestamp: number = Date.parse(dateString);
	return !isNaN(timestamp);
}
