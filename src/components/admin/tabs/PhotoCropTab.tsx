
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { UploadedEmployee } from '@/types/admin';
import { Search, CheckCircle2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PhotoCropTabProps {
  uploadedEmployees: UploadedEmployee[];
  showUploadedData: boolean;
  selectedCardType: string;
  onSubmitOrder: () => void;
}

const PhotoCropTab: React.FC<PhotoCropTabProps> = ({
  uploadedEmployees,
  showUploadedData,
  selectedCardType,
  onSubmitOrder
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  
  const filteredEmployees = uploadedEmployees.filter(employee => 
    employee.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    employee.matricula.includes(searchTerm)
  );

  const handleRequestSecondCopy = (employeeId: number) => {
    toast({
      title: "Segunda via solicitada",
      description: "A solicitação foi registrada com sucesso",
    });
  };

  const handleDeleteCard = (employeeId: number) => {
    toast({
      title: "Cartão excluído",
      description: "O cartão foi removido com sucesso",
    });
  };

  const toggleSelectCard = (employeeId: number) => {
    setSelectedCards(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCards.length === filteredEmployees.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(filteredEmployees.map(emp => emp.id));
    }
  };

  if (!showUploadedData) {
    return (
      <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
        <AlertDescription className="flex items-center justify-center py-8">
          Nenhum dado carregado. Por favor, envie uma planilha na aba anterior.
        </AlertDescription>
      </Alert>
    );
  }

  if (filteredEmployees.length === 0) {
    return (
      <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800">
        <AlertDescription className="flex items-center justify-center py-8">
          Nenhum funcionário encontrado com os critérios de busca atuais.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Cartões {selectedCardType === "Todos" ? "" : selectedCardType} Cadastrados
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="brand" 
            onClick={handleSelectAll}
          >
            {selectedCards.length === filteredEmployees.length ? "Desmarcar Todos" : "Selecionar Todos"}
          </Button>
          <Button
            variant="orange" 
            onClick={onSubmitOrder}
          >
            Finalizar Pedido ({selectedCards.length})
          </Button>
        </div>
      </div>
      
      <div className="flex items-center relative w-full mb-6">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Buscar por nome ou matrícula"
          className="pl-10 pr-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div 
            key={employee.id} 
            className={`relative rounded-lg border p-4 ${
              employee.tipo === "Light" 
                ? "border-[#52aa85]/20 bg-gradient-to-b from-white to-[#52aa85]/5" 
                : "border-[#0a5eb3]/20 bg-gradient-to-b from-white to-[#0a5eb3]/5"
            } shadow-sm transition-all duration-200 hover:shadow-md`}
          >
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => toggleSelectCard(employee.id)}
              >
                {selectedCards.includes(employee.id) ? (
                  <CheckCircle2 className="h-5 w-5 text-[#52aa85]" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                )}
              </Button>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-20 w-16 overflow-hidden rounded-md border bg-gray-100 flex items-center justify-center">
                {employee.foto ? (
                  <img 
                    src={`/placeholder.svg`} 
                    alt={employee.nome}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-xs text-center">Sem foto</div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{employee.nome}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Mat: <span className="font-medium text-gray-700">{employee.matricula}</span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {employee.cargo} - {employee.setor}
                </p>
                <p className="text-sm text-gray-500">
                  Validade: {employee.validade}
                </p>
                <div className="mt-3 flex gap-2">
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
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleDeleteCard(employee.id)}
                  >
                    DELETAR CARTÃO
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCropTab;
