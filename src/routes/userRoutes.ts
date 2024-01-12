// src/routes/userRoutes.ts

import express from 'express';
import { handleCreateUser, handleGetUser } from '../controllers/userController';

const router = express.Router();

// POST /user
router.post('/', handleCreateUser);

// Get user by ID
router.get('/:id', handleGetUser);

export default router;
