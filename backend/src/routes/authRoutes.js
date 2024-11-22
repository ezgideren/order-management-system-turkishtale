import { Router } from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/AuthController.js';
import { handleValidationErrors } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
const authController = new AuthController();

// Add a GET endpoint for verify
router.get('/verify', authenticate, async (req, res) => {
    await authController.verify(req.user.userId, res);
});

router.post('/login', [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
], async (req, res) => {
    await authController.login(req.body.username, req.body.password, res);
});

router.post('/logout', authenticate, async (req, res) => {
    await authController.logout(req.user.userId, res);
});

export default router;