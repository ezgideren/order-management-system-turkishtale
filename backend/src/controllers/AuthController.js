import bcrypt from 'bcryptjs';

export const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Invalid request' });
            }

            const user = await User.findOne({ username })
                .select('+password +tokenVersion');

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    role: user.role,
                    tokenVersion: user.tokenVersion
                },
                process.env.JWT_SECRET,
                { expiresIn: TOKEN_EXPIRY }
            );

            // Set HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 // 1 hour
            });

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },

    logout: async (req, res) => {
        try {
            // Increment token version to invalidate existing tokens
            await User.findByIdAndUpdate(req.user.userId, {
                $inc: { tokenVersion: 1 }
            });

            res.clearCookie('token');
            res.json({ message: 'Success' });
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
