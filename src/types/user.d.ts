// types/user.d.ts

export interface beforeUser extends Omit<User, 'id'> { }
export interface User {
	id: number;
	nickname: string;
	name: string;
	lastName: string;
	email: string;
	birthDate: Date | string;
}
export interface Professor {
	userId: number;
	institutionId: number | null;
	description: string;
	biography: string;
	website: string;
}

export interface Associated {
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}