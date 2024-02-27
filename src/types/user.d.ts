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