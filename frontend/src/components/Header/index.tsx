import React from 'react';
import { UserRole } from '@/types';
import { Bell, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    userRole: UserRole;
    alertCount: number;
}

export const Header: React.FC<HeaderProps> = ({ userRole, alertCount }) => (
    <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">Turkish Tale</h1>
            </div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {alertCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {alertCount}
                        </span>
                    )}
                </Button>

                <div className="flex items-center space-x-2">
                    <UserCircle className="h-6 w-6" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Staff Member</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {userRole.replace('_', ' ')}
                        </span>
                    </div>
                </div>

                <Button variant="ghost" size="icon">
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </div>
    </header>
);