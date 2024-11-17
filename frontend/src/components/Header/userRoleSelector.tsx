import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

export const UserRoleSelector = () => {
    const { setUserRole } = useApp();

    return (
        <>
            <Button variant="outline" onClick={() => setUserRole('primary_server')}>
                Servis
            </Button>
            <Button variant="outline" onClick={() => setUserRole('secondary_server')}>
                Hale
            </Button>
            <Button variant="outline" onClick={() => setUserRole('kitchen_staff')}>
                Tom
            </Button>
        </>
    );
};