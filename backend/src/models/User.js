import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const USER_ROLES = {
    ADMIN: 'admin', //full system access
    SERVER: 'server', //service staff access
    KITCHEN: 'kitchen' //kitchen staff access
};

export const PERMISSIONS = {
    MENU_MANAGEMENT: 'menu_management', //menu crud operations
    ORDER_MANAGEMENT: 'order_management', //order handling
    TABLE_MANAGEMENT: 'table_management', //table assignments/status
    KITCHEN_DISPLAY: 'kitchen_display', //kitchen view
    USER_MANAGEMENT: 'user_management' //user administration
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

//Hashes password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//Compares provided password with stored hash
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

//Checks if user has specific permission. It is a security layer that enforces the role-based access control defined in ROLE_PERMISSIONS.
userSchema.methods.hasPermission = function(permission) {
    return this.permissions.includes(permission);
};

export const User = mongoose.model('User', userSchema);