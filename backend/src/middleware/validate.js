import { body, param, query, validationResult } from 'express-validator';

// Utility function to handle validation results
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

export const userValidation = {
    create: [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required')
            .isLength({ min: 3, max: 20 })
            .withMessage('Username must be between 3 and 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage('Username can only contain letters, numbers and underscores'),

        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/\d/)
            .withMessage('Password must contain at least one number')
            .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter'),

        body('role')
            .isIn(['admin', 'server', 'kitchen'])
            .withMessage('Invalid role'),

        handleValidationErrors
    ],

    login: [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required'),

        body('password')
            .notEmpty()
            .withMessage('Password is required'),

        handleValidationErrors
    ]
};

// Menu Item Validations
export const menuValidation = {
    create: [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Menu item name is required')
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters'),

        body('price')
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number'),

        body('category')
            .isIn(['hot-dishes', 'cold-dishes', 'beverages', 'desserts'])
            .withMessage('Invalid category'),

        body('type')
            .isIn(['hot', 'cold'])
            .withMessage('Type must be either hot or cold'),

        body('preparationTime')
            .isInt({ min: 0 })
            .withMessage('Preparation time must be a positive number'),

        body('modificationOptions')
            .optional()
            .isArray()
            .withMessage('Modification options must be an array'),

        handleValidationErrors
    ],

    update: [
        param('id')
            .isMongoId()
            .withMessage('Invalid menu item ID'),

        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters'),

        body('price')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number'),

        handleValidationErrors
    ]
};

// Order Validations
export const orderValidation = {
    create: [
        body('tableNumber')
            .isInt({ min: 1 })
            .withMessage('Valid table number is required'),

        body('items')
            .isArray({ min: 1 })
            .withMessage('Order must contain at least one item'),

        body('items.*.menuItem')
            .isMongoId()
            .withMessage('Valid menu item ID is required'),

        body('items.*.quantity')
            .isInt({ min: 1 })
            .withMessage('Quantity must be at least 1'),

        body('items.*.modifications')
            .optional()
            .isArray()
            .withMessage('Modifications must be an array'),

        body('specialInstructions')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Special instructions cannot exceed 500 characters'),

        handleValidationErrors
    ],

    updateStatus: [
        param('id')
            .isMongoId()
            .withMessage('Invalid order ID'),

        body('status')
            .isIn(['new', 'in-progress', 'ready', 'completed'])
            .withMessage('Invalid order status'),

        handleValidationErrors
    ],

    updateItemStatus: [
        param('orderId')
            .isMongoId()
            .withMessage('Invalid order ID'),

        param('itemId')
            .isMongoId()
            .withMessage('Invalid item ID'),

        body('status')
            .isIn(['pending', 'preparing', 'ready', 'delivered'])
            .withMessage('Invalid item status'),

        handleValidationErrors
    ]
};

// Table Validations
export const tableValidation = {
    create: [
        body('number')
            .isInt({ min: 1 })
            .withMessage('Table number must be a positive integer'),

        body('capacity')
            .isInt({ min: 1 })
            .withMessage('Table capacity must be at least 1'),

        handleValidationErrors
    ],

    updateStatus: [
        param('id')
            .isMongoId()
            .withMessage('Invalid table ID'),

        body('status')
            .isIn(['available', 'occupied', 'reserved'])
            .withMessage('Invalid table status'),

        handleValidationErrors
    ]
};

// Query Validations
export const queryValidation = {
    pagination: [
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page must be a positive integer'),

        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1 and 100'),

        handleValidationErrors
    ],

    dateRange: [
        query('startDate')
            .optional()
            .isISO8601()
            .withMessage('Invalid start date format'),

        query('endDate')
            .optional()
            .isISO8601()
            .withMessage('Invalid end date format'),

        handleValidationErrors
    ]
};