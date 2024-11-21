export const canManageOrders = (role) => {
    return role === 'server' || role === 'admin';
};
export const canAccessKitchen = (role) => {
    return role === 'kitchen' || role === 'admin';
};
export const canManageMenu = (role) => {
    return role === 'admin';
};
