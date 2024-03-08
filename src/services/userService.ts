import prisma from '../config/db';
import { User, Professor, Associated, beforeUser } from '../types/user';

export const createUser = async (bUser: beforeUser): Promise<User | null> => {
	try {
		const newUser = await prisma.user.create({
			data: {
				nickname: bUser.nickname,
				name: bUser.name,
				lastName: bUser.lastName,
				email: bUser.email,
				birthDate: `${bUser.birthDate}T00:00:00.000Z`,
			}
		});

		return newUser;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const addProfessor = async (prof: Professor, institutionId: number): Promise<Professor | null> => {

	try {
		const professor = await prisma.professor.create({
			data: {
				userId: prof.userId,
				institutionId: institutionId,
				description: prof.description,
				biography: prof.biography,
				website: prof.website
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

export const getAllUsers = async (): Promise<User[]> => {
	try {
		const users = await prisma.user.findMany();
		return users.map(user => ({
			...user,
			birthDate: new Date(user.birthDate).toLocaleDateString()
		}));
	} catch (error) {
		console.error(error);
		return [];
	}
}

export const updateUser = async (id: number, bUser: beforeUser): Promise<User | null> => {

}

