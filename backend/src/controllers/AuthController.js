import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Invalid request' });
            }

            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                },
                accessToken: token
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async verify(req, res) {
        try {
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            res.json({ user });
        } catch (error) {
            res.status(401).json({ message: 'Verification failed' });
        }
    }

    async logout(req, res) {
        try {
            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default AuthController;