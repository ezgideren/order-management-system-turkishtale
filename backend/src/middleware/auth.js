import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const TOKEN_EXPIRY = '1h';
const SALT_ROUNDS = 12;

export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check token expiration
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: 'Token expired' });
        }

        const user = await User.findById(decoded.userId)
            .select('-password -resetToken');

        if (!user || user.tokenVersion !== decoded.tokenVersion) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        req.user = {
            userId: user._id,
            role: user.role,
            tokenVersion: user.tokenVersion
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication required' });
    }
};
