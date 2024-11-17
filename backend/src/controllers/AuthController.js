// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '8h' }
            );

            res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                },
                token
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Login failed'
            });
        }
    },

    logout: async (req, res) => {
        try {
            // Since we're using JWT, we don't need to do anything server-side
            // The client will remove the token
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
    },

    verify: async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Token verification failed'
            });
        }
    }
};