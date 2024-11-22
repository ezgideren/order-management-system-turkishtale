import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export default class AuthController {
    async login(req, res, next) {
        try {
            const { username, password } = req.body;

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
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                },
                accessToken: token
            });
        } catch (error) {
            next(error);
        }
    }

    async verify(req, res, next) {
        try {
            const user = await User.findById(req.user.userId)
                .select('-password')
                .exec();

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            return res.json({ user });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            await User.findById(req.user.userId).exec();
            return res.json({ message: 'Logged out successfully' });
        } catch (error) {
            next(error);
        }
    }
}

