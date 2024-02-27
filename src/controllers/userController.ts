import { Request, Response } from 'express';
import prisma from '../config/db';
import { validationResult } from 'express-validator';
import { User } from '../types/user';

export const createUser = async (req: Request, res: Response): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	}

	const { nickname, name, lastName, email, birthDate, institution, bio, website } = req.body;

	try {
		const user = await prisma.user.create({
			data: {
				nickname,
				name,
				lastName,
				email,
				birthDate,
				institution,
				bio,
				website
			}
		});
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const addProfessor = async (user: User, institutionId: number): Promise<Professor | null> => {

	try {
		const professor = await prisma.professor.create({
			data: {
				userId: user.id,
				institutionId: institutionId,
				description: user.description ?? '',
				biography: user.bio ?? '',
				website: user.website ?? ''
			}
		});

		return professor;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const addAssociated = async (user: User): Promise<Associated | null> => {
	try {
		const associated = await prisma.associated.create({
			data: {
				userId: user.id,
			}
		});
		return associated;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const getUserById = async (id: number): Promise<User | null> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		});
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Other controller methods for user management (updateUser, deleteUser, etc.)
