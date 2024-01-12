// src/services/userService.ts

import { User } from '../models/user';
import { pool } from '../../../database';
import { QueryResult } from 'pg';

export const createUser = async (userData: User): Promise<User> => {
	const client = await pool.connect();
	try {

		console.log("userData: " + JSON.stringify(userData))


		const result = await client.query(
			'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
			[userData.name, userData.email]
		);

		return result.rows[0] as User;
	} finally {
		client.release();
	}
};


export const getUserById = async (userId: string): Promise<User | null> => {
	const client = await pool.connect();

	try {
		const queryResult: QueryResult = await client.query(
			'SELECT * FROM users WHERE id = $1',
			[userId]
		);

		// Check if a user was found
		if (queryResult.rows.length === 0) {
			return null;
		}

		// Extract user data from the query result
		const user: User = {
			id: queryResult.rows[0].id,
			name: queryResult.rows[0].name,
			lastname: queryResult.rows[0].lastname,
			email: queryResult.rows[0].email,
		};

		return user;
	} finally {
		client.release();
	}
};
