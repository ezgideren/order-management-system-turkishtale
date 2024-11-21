import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/verify', authenticate, authController.verify);

export default router;