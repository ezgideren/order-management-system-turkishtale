// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const USER_ROLES = {
    ADMIN: 'admin',
    SERVER: 'server',
    KITCHEN: 'kitchen'
};

export const PERMISSIONS = {
    MENU_MANAGEMENT: 'menu_management',
    ORDER_MANAGEMENT: 'order_management',
    TABLE_MANAGEMENT: 'table_management',
    KITCHEN_DISPLAY: 'kitchen_display',
    USER_MANAGEMENT: 'user_management'
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
    [USER_ROLES.ADMIN]: [
        PERMISSIONS.MENU_MANAGEMENT,
        PERMISSIONS.ORDER_MANAGEMENT,
        PERMISSIONS.TABLE_MANAGEMENT,
        PERMISSIONS.KITCHEN_DISPLAY,
        PERMISSIONS.USER_MANAGEMENT
    ],
    [USER_ROLES.SERVER]: [
        PERMISSIONS.ORDER_MANAGEMENT,
        PERMISSIONS.TABLE_MANAGEMENT
    ],
    [USER_ROLES.KITCHEN]: [
        PERMISSIONS.KITCHEN_DISPLAY
    ]
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    permissions: [{
        type: String,
        enum: Object.values(PERMISSIONS)
    }]
}, {
    timestamps: true
});

// Set permissions based on role
userSchema.pre('save', function(next) {
    if (this.isModified('role')) {
        this.permissions = ROLE_PERMISSIONS[this.role] || [];
    }
    next();
});

// Hash password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Check permission method
userSchema.methods.hasPermission = function(permission) {
    return this.permissions.includes(permission);
};

export const User = mongoose.model('User', userSchema);