import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
export const UserRoleSelector = () => {
    const { setUserRole } = useApp();
    const handleRoleChange = (role) => {
        setUserRole(role);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: () => handleRoleChange('server'), children: "Servis" }), _jsx(Button, { variant: "outline", onClick: () => handleRoleChange('admin'), children: "Hale" }), _jsx(Button, { variant: "outline", onClick: () => handleRoleChange('kitchen'), children: "Tom" })] }));
};
