import { PrismaClient } from '@prisma/client';
import { sendWelcomeEmail } from '../utils/emailService';

const prisma = new PrismaClient();

export const createUser = async (userData: UserCreateInput) => {
	const newUser = await prisma.user.create({ data: userData });

	await prisma.profile.create({
		data: {
			userId: newUser.id,
			// other profile data...
		},
	});

	await sendWelcomeEmail(newUser.email);

	return newUser;
};