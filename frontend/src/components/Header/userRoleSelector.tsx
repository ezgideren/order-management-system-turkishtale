import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { UserRole} from "@/types/index";

export const UserRoleSelector = () => {
    const { setUserRole } = useApp();

    const handleRoleChange = (role: UserRole) => {
        setUserRole(role);
    };

    return (
        <>
            <Button variant="outline" onClick={() => handleRoleChange('server')}>
                Servis
            </Button>
            <Button variant="outline" onClick={() => handleRoleChange('admin')}>
                Hale
            </Button>
            <Button variant="outline" onClick={() => handleRoleChange('kitchen')}>
                Tom
            </Button>
        </>
    );
};