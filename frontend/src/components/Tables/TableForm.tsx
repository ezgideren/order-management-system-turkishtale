import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

export const TableForm = () => {
    const { tables, setTables } = useApp();
    const [error, setError] = React.useState<string>('');
    const [formData, setFormData] = React.useState({
        seats: '',
        position: { x: 0, y: 0 }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.seats || parseInt(formData.seats) <= 0) {
            setError('Please enter a valid number of seats');
            return;
        }

        const newTable: Table = {
            id: Math.max(...tables.map(t => t.id), 0) + 1,
            seats: parseInt(formData.seats),
            status: 'available',
            position: { x: 0, y: 0 },
            rotation: 0
        };

        setTables([...tables, newTable]);
        setFormData({ seats: '', position: { x: 0, y: 0 } });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Table</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="seats">Number of Seats</Label>
                        <Input
                            id="seats"
                            type="number"
                            value={formData.seats}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                seats: e.target.value
                            }))}
                            min="1"
                            placeholder="Enter number of seats"
                        />
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit">Add Table</Button>
                </form>
            </CardContent>
        </Card>
    );
};