// backend/routes/menuRoutes.js
import express from 'express';
import { menuController } from '../controllers/menuController.js';
import { authenticate } from '../middleware/auth.js';
import { requirePermission } from '../middleware/authorize.js';
import { PERMISSIONS } from '../models/User.js';

const router = express.Router();

// Public routes
router.get('/', menuController.getAllItems);

// Protected routes
router.use(authenticate);
router.post('/', requirePermission(PERMISSIONS.MENU_MANAGEMENT), menuController.createItem);
router.put('/:id', requirePermission(PERMISSIONS.MENU_MANAGEMENT), menuController.updateItem);
router.delete('/:id', requirePermission(PERMISSIONS.MENU_MANAGEMENT), menuController.deleteItem);
router.patch('/:id/availability', requirePermission(PERMISSIONS.MENU_MANAGEMENT), menuController.toggleAvailability);

export default router;

