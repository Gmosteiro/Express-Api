// types/user.d.ts

enum UserType {
	Associated = 'associated',
	Professor = 'professor'
}
export interface User {
	id: number;
	nickname: string;
	name: string;
	lastName: string;
	email: string;
	birthDate: Date;
	description?: string;
	userType?: UserType;
	institution?: number;
	bio?: string;
	website?: string;
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