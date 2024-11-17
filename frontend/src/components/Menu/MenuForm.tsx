import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MenuItem } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { MENU_CATEGORIES } from '../../lib/constants';

export const MenuForm = () => {
    const { menuItems, setMenuItems } = useApp();
    const [error, setError] = React.useState<string>('');
    const [formData, setFormData] = React.useState({
        name: '',
        price: '',
        category: '',
        preparedKitchen: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name.trim()) {
            setError('Please enter an item name');
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setError('Please enter a valid price');
            return;
        }
        if (!formData.category) {
            setError('Please select a category');
            return;
        }

        const newItem: MenuItem = {
            itemId: Date.now().toString(),
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            category: formData.category,
            preparedKitchen: formData.preparedKitchen,
            available: true
        };

        setMenuItems([...menuItems, newItem]);

        // Reset form
        setFormData({
            name: '',
            price: '',
            category: '',
            preparedKitchen: true
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter item name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {MENU_CATEGORIES.map(category => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="preparedKitchen"
                    checked={formData.preparedKitchen}
                    onChange={(e) => setFormData(prev => ({ ...prev, preparedKitchen: e.target.checked }))}
                    className="rounded border-gray-300"
                />
                <Label htmlFor="preparedKitchen">Prepared in Kitchen</Label>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Button type="submit">Add Menu Item</Button>
        </form>
    );
};