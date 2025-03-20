
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  sorting?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  onSortingChange?: (field: string, direction: 'asc' | 'desc') => void;
  additionalFilters?: React.ReactNode;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  sorting,
  onSortingChange,
  additionalFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const handleResetFilters = () => {
    onSearchChange('');
    onStatusFilterChange('todos');
    onTypeFilterChange('todos');
  };

  const toggleSort = (field: string) => {
    if (!onSortingChange) return;
    
    const newDirection = 
      sorting?.field === field && sorting.direction === 'asc' ? 'desc' : 'asc';
    
    onSortingChange(field, newDirection);
  };
  
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
        
        <div className="flex gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button 
                variant={
                  statusFilter !== 'todos' || typeFilter !== 'todos' 
                    ? "default" 
                    : "outline"
                }
                className="min-w-[120px]"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                {(statusFilter !== 'todos' || typeFilter !== 'todos') && (
                  <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs">
                    {(statusFilter !== 'todos' ? 1 : 0) + 
                     (typeFilter !== 'todos' ? 1 : 0)}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filtrar resultados</h4>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger className="w-full" id="status-filter">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type-filter">Tipo de Cartão</Label>
                  <Select value={typeFilter} onValueChange={onTypeFilterChange}>
                    <SelectTrigger className="w-full" id="type-filter">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Light">Light</SelectItem>
                      <SelectItem value="Conecta">Conecta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {additionalFilters}
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={handleResetFilters}>
                    Limpar filtros
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Aplicar
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {onSortingChange && (
            <div className="flex rounded-md border border-input">
              <Button 
                variant="ghost" 
                size="icon"
                className={`rounded-none rounded-l-md ${sorting?.direction === 'asc' && sorting?.field === 'nome' ? 'bg-primary/10' : ''}`}
                onClick={() => toggleSort('nome')}
                title="Ordenar por nome"
              >
                <ArrowDownAZ className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-10" />
              <Button 
                variant="ghost" 
                size="icon"
                className={`rounded-none rounded-r-md ${sorting?.direction === 'desc' && sorting?.field === 'data' ? 'bg-primary/10' : ''}`}
                onClick={() => toggleSort('data')}
                title="Ordenar por data"
              >
                <ArrowUpZA className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
