
import React, { useState, useMemo } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Send } from "lucide-react";
import SearchFilters from "@/components/admin/SearchFilters";
import AdminPagination from "@/components/admin/AdminPagination";

const TodosCartoes: React.FC = () => {
  const { 
    uploadedEmployees, 
    handleDownloadPlanilha, 
    handleRequestSecondCopy, 
    handleDeleteUploadedEmployee 
  } = useAdmin();
  const { toast } = useToast();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [sorting, setSorting] = useState({ field: 'nome', direction: 'asc' as 'asc' | 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const handleSortingChange = (field: string, direction: 'asc' | 'desc') => {
    setSorting({ field, direction });
  };

  const filteredEmployees = useMemo(() => {
    return uploadedEmployees.filter(employee => 
      (search === "" || 
        employee.nome.toLowerCase().includes(search.toLowerCase()) || 
        employee.matricula.includes(search)) &&
      (typeFilter === "todos" || employee.tipo === typeFilter)
    ).sort((a, b) => {
      if (sorting.field === 'nome') {
        return sorting.direction === 'asc' 
          ? a.nome.localeCompare(b.nome) 
          : b.nome.localeCompare(a.nome);
      }
      return 0;
    });
  }, [uploadedEmployees, search, typeFilter, sorting]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Todos os Cartões Cadastrados
        </h2>
        <Button
          variant="outline"
          onClick={handleDownloadPlanilha}
        >
          Exportar Lista
        </Button>
      </div>
      
      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nome</TableHead>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-brand-primary/5">
                  <TableCell className="font-medium">{employee.nome.split(' ')[0]}</TableCell>
                  <TableCell>{employee.nome}</TableCell>
                  <TableCell>
                    <span className={`${employee.matricula.startsWith('3') ? 'text-brand-primary' : 'text-blue-600'} font-medium`}>
                      {employee.matricula}
                    </span>
                  </TableCell>
                  <TableCell>
                    {employee.foto ? (
                      <span className="text-green-600 font-medium">Sim</span>
                    ) : (
                      <span className="text-red-600 font-medium">Não</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="orange" 
                        size="sm" 
                        className="h-8 text-xs"
                        onClick={() => handleRequestSecondCopy(employee.id)}
                      >
                        PEDIR SEGUNDA VIA
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteUploadedEmployee(employee.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  Nenhum cartão encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <AdminPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
    </div>
  );
};

export default TodosCartoes;
