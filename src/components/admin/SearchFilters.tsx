
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  typeFilter?: string;
  onTypeFilterChange?: (value: string) => void;
  sorting?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  onSortingChange?: (field: string, direction: 'asc' | 'desc') => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  sorting,
  onSortingChange
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar por nome ou matrícula"
            className="pl-10 pr-12"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1.5 h-7 w-7"
              onClick={() => onSearchChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
