import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useApp } from '@/contexts/AppContext';


interface TableFormData {
    seats: number;
}

export const TableForm: React.FC = () => {
    const { tables, addTable } = useApp();
    const [seats, setSeats] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const seatCount = Number(seats);

        if (!seatCount || seatCount < 1 || seatCount > 12) {
            setError('Please enter a valid number of seats (1-12)');
            return;
        }

        addTable(seatCount);
        setSeats('');
        setError('');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Table</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="seats">Number of Seats</Label>
                        <Input
                            id="seats"
                            type="number"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            min={1}
                            max={12}
                        />
                        {error && (
                            <span className="text-sm text-red-500">{error}</span>
                        )}
                    </div>
                    <Button type="submit">Add Table</Button>
                </form>
            </CardContent>
        </Card>
    );
};