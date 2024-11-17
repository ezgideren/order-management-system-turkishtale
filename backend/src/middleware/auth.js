// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.userId);

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: 'Invalid token or inactive user'
            });
        }

        req.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid authentication token'
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Not authorized to perform this action'
            });
        }
        next();
    };
};