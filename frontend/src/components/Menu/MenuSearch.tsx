// src/components/Menu/MenuSearch.tsx
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";

interface MenuSearchProps {
    searchQuery: string;
    onSearch: (query: string) => void;
    onClear: () => void;
    isSearching: boolean;
}

export const MenuSearch: React.FC<MenuSearchProps> = ({
                                                          searchQuery,
                                                          onSearch,
                                                          onClear,
                                                          isSearching
                                                      }) => {
    return (
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Input
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search menu items..."
                    className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {isSearching && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClear}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
};