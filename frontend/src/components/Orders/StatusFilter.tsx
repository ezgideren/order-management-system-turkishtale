import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
    </Select>
);