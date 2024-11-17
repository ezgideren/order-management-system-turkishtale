// backend/middleware/authorize.js
import { PERMISSIONS } from '../models/User.js';

export const requirePermission = (permission) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions || [];

        if (!userPermissions.includes(permission)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};

// Multiple permissions check (any of the permissions)
export const requireAnyPermission = (permissions) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions || [];

        if (!permissions.some(permission => userPermissions.includes(permission))) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};

// Multiple permissions check (all permissions required)
export const requireAllPermissions = (permissions) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions || [];

        if (!permissions.every(permission => userPermissions.includes(permission))) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};