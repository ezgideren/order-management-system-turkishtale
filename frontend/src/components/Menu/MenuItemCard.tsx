import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Trash, ChefHat, Store } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MenuItemCardProps {
    item: MenuItem;
    onUpdate?: (itemId: string, updates: Partial<MenuItem>) => void;
    onDelete?: (itemId: string) => void;
    onToggleAvailability?: (itemId: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
                                                              item,
                                                              onUpdate,
                                                              onDelete,
                                                              onToggleAvailability
                                                          }) => {
    const { toggleItemAvailability, deleteMenuItem } = useApp();

    const handleToggleAvailability = () => {
        if (onToggleAvailability) {
            onToggleAvailability(item.itemId);
        } else {
            toggleItemAvailability(item.itemId);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(item.itemId);
        } else {
            deleteMenuItem(item.itemId);
        }
    };

    return (
        <Card className={!item.available ? 'opacity-60' : undefined}>
            <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                    {item.name}
                    {item.preparedKitchen ? (
                        <ChefHat className="h-5 w-5 text-orange-500" />
                    ) : (
                        <Store className="h-5 w-5 text-blue-500" />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                    <Badge variant="outline">{item.category}</Badge>
                    <p className="text-sm text-gray-500">
                        Prepared in: {item.preparedKitchen ? 'Kitchen' : 'Front Station'}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Button
                    variant={item.available ? "outline" : "default"}
                    onClick={handleToggleAvailability}
                >
                    {item.available ? 'Mark Unavailable' : 'Mark Available'}
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-red-500">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "{item.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};