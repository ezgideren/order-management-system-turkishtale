import React from 'react';
import { UserRole } from '@/types';
interface HeaderProps {
    userRole: UserRole;
    alertCount: number;
}
export declare const Header: React.FC<HeaderProps>;
export {};
