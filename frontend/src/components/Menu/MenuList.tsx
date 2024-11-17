import React from 'react';
import { MenuItem } from '@/types';
import { MenuItemCard } from './MenuItemCard';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface MenuListProps {
    items: MenuItem[];
    onUpdateItem: (itemId: string, updates: Partial<MenuItem>) => void;
    onDeleteItem: (itemId: string) => void;
    onToggleAvailability: (itemId: string) => void;
    categories: string[];
}

export const MenuList: React.FC<MenuListProps> = ({
                                                      items,
                                                      onUpdateItem,
                                                      onDeleteItem,
                                                      onToggleAvailability,
                                                      categories
                                                  }) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

    const filteredItems = React.useMemo(() => {
        return selectedCategory === 'all'
            ? items
            : items.filter(item => item.category === selectedCategory);
    }, [items, selectedCategory]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <span className="text-sm text-muted-foreground">
                    {filteredItems.length} items
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                    <MenuItemCard
                        key={item.itemId}
                        item={item}
                        onUpdate={onUpdateItem}
                        onDelete={onDeleteItem}
                        onToggleAvailability={onToggleAvailability}
                    />
                ))}
            </div>
        </div>
    );
};