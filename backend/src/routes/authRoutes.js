// backend/routes/authRoutes.js
import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/verify', authenticate, authController.verify);

export default router;