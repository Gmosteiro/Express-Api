import { body, ValidationChain } from 'express-validator';

export const validateUser: ValidationChain[] = [
	body('nickname').notEmpty().withMessage('Nickname is required'),
	body('name').notEmpty().withMessage('Name is required'),
	body('lastName').notEmpty().withMessage('Last Name is required'),
	body('email').isEmail().withMessage('Invalid email address'),
	body('birthDate').notEmpty().isDate().withMessage('Invalid birth date format'),
	// Add more validations as needed
];
