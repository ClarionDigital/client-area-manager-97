
import React from 'react';
import { UploadedEmployee } from '@/types/admin';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdminPagination from './AdminPagination';

interface CardPreviewProps {
  employees: UploadedEmployee[];
  onGoBack: () => void;
  onSubmit: () => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ employees, onGoBack, onSubmit }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState<Record<number, boolean>>({});
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardLoad = (id: number) => {
    setIsLoading(prev => ({ ...prev, [id]: false }));
  };

  // Determine card type based on employee matricula
  const getCardType = (matricula: string) => {
    if (matricula.startsWith('3')) return '3'; // Light
    if (matricula.startsWith('7')) return '7'; // Conecta
    return '3'; // Default to Light
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Confirmar Cartões
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={onGoBack}
            className="border-[#062b48] text-[#062b48]"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-[#062b48] hover:bg-[#031e33] text-white"
          >
            Enviar para Alternativa
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentEmployees.map((employee) => (
          <div key={employee.id} className="flex flex-col items-center">
            <div className="text-sm font-semibold mb-2 text-gray-700">{employee.nome} ({employee.matricula})</div>
            <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ width: '292px', height: '451px' }}>
              {isLoading[employee.id] !== false && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="h-8 w-8 border-4 border-[#ecbd00] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <iframe 
                src={`https://areadocliente.alternativacard.com/up/card-light.php?nome=${encodeURIComponent(employee.nome)}&nome_completo=${encodeURIComponent(employee.nome)}&matricula=${encodeURIComponent(employee.matricula)}&foto=${employee.fotoUrl ? encodeURIComponent(employee.fotoUrl) : ""}&id=${getCardType(employee.matricula)}&keep_case=true&no_resize=true`}
                className="absolute inset-0 w-full h-full border-0"
                style={{ border: 'none', overflow: 'hidden' }}
                onLoad={() => handleCardLoad(employee.id)}
                frameBorder="0"
                scrolling="no"
                title={`Card de ${employee.nome}`}
              />
            </div>
          </div>
        ))}
      </div>
      
      {employees.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <AdminPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CardPreview;
