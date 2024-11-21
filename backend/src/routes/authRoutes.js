import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authenticate } from '../middleware/auth.js';
import { userValidation } from '../middleware/validate.js';

const router = express.Router();
const authController = new AuthController();

// These endpoints will be accessible at /auth/login, /auth/logout, etc.
router.post('/login', userValidation.login, authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/verify', authenticate, authController.verify);

export default router;