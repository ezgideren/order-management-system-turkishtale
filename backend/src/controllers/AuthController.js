import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

class AuthController {
    // Login method - handles user authentication
    async login(username, password, res) {
        try {
            // Input validation
            if (!username || !password) {
                return res.status(400).json({ message: 'Invalid request' });
            }

            // Find user in database
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Verify password using bcrypt
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token containing user ID and role
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }  // Token expires in 8 hours
            );

            // Return user data and token
            return res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                },
                accessToken: token
            });
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }

    // Verify method - validates user token
    async verify(userId, res) {
        try {
            // Find user by ID, exclude password field
            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            return res.json({ user });
        } catch (error) {
            return res.status(401).json({ message: 'Verification failed' });
        }
    }

    // Logout method - handles user logout
    async logout(userId, res) {
        try {
            // Simple success response as JWT handling is client-side
            return res.json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

export default AuthController;