import express from 'express';
import { tableController } from '../controllers/tableController.js';
import { authenticate } from '../middleware/auth.js';
import { requirePermission } from '../middleware/authorize.js';
import { PERMISSIONS } from '../models/User.js';

const router = express.Router();

router.use(authenticate);

router.get('/', requirePermission(PERMISSIONS.TABLE_MANAGEMENT), tableController.getAllTables);
router.post('/', requirePermission(PERMISSIONS.TABLE_MANAGEMENT), tableController.createTable);
router.put('/:id/status', requirePermission(PERMISSIONS.TABLE_MANAGEMENT), tableController.updateTableStatus);

export default router;