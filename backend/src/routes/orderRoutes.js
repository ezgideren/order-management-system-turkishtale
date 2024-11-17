import express from 'express';
import { orderController } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';
import { requirePermission, requireAnyPermission } from '../middleware/authorize.js';
import { PERMISSIONS } from '../models/User.js';

const router = express.Router();

router.use(authenticate);

router.post('/', requirePermission(PERMISSIONS.ORDER_MANAGEMENT), orderController.createOrder);
router.get('/', requireAnyPermission([PERMISSIONS.ORDER_MANAGEMENT, PERMISSIONS.KITCHEN_DISPLAY]), orderController.getOrders);
router.put('/:id/status', requireAnyPermission([PERMISSIONS.ORDER_MANAGEMENT, PERMISSIONS.KITCHEN_DISPLAY]), orderController.updateStatus);

export default router;