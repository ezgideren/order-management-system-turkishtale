import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export default class AuthController {
    async login(username, password, res) {
        try {
            if (!username || !password) {
                return res.status(400).json({ message: 'Invalid request' });
            }

            const user = await User.findOne({ username }).exec();
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            return res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                },
                token: token
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async verify(userId, res) {
        try {
            const user = await User.findById(userId)
                .select('-password')
                .exec();

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            return res.json({
                success: true,
                user
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async logout(userId, res) {
        try {
            await User.findById(userId).exec();
            return res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
