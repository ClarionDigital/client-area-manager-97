import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Download, Send, Trash, Camera, PlusCircle } from "lucide-react";
import { UploadedEmployee } from '@/types/admin';
import UploadSpreadsheet from '../UploadSpreadsheet';
import EmployeeEditor from '../EmployeeEditor';
import PhotoUploader from '../PhotoUploader';
import { useToast } from "@/hooks/use-toast";

interface NovoPedidoTabProps {
  novoPedido: UploadedEmployee[];
  selectedCardType: string;
  onDownloadTemplate: () => void;
  onUploadPlanilha: (cardType: string) => void;
  onSubmitOrder: () => void;
  setNovoPedido: React.Dispatch<React.SetStateAction<UploadedEmployee[]>>;
}

const NovoPedidoTab: React.FC<NovoPedidoTabProps> = ({
  novoPedido,
  selectedCardType,
  onDownloadTemplate,
  onUploadPlanilha,
  onSubmitOrder,
  setNovoPedido
}) => {
  const { toast } = useToast();
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<UploadedEmployee | null>(null);

  const handleDeleteEmployee = (id: number) => {
    setNovoPedido(prev => prev.filter(emp => emp.id !== id));
    toast({
      title: "Funcionário removido",
      description: "O funcionário foi removido da lista"
    });
  };

  const handleOpenPhotoUploader = (employeeId: number) => {
    const employee = novoPedido.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setPhotoDialogOpen(true);
    }
  };

  const handlePhotoSave = (employeeId: number, photoUrl: string) => {
    setNovoPedido(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, foto: true, fotoUrl: photoUrl } 
        : emp
    ));
  };

  const handleUpdateEmployee = (updatedEmployee: UploadedEmployee) => {
    setNovoPedido(prev => prev.map(emp => 
      emp.id === updatedEmployee.id 
        ? updatedEmployee
        : emp
    ));
  };

  const validateOrder = () => {
    const missingPhotos = novoPedido.filter(emp => !emp.foto);
    
    if (missingPhotos.length > 0) {
      const names = missingPhotos.map(emp => emp.nome).join(', ');
      toast({
        title: "Fotos obrigatórias",
        description: `Os seguintes funcionários não possuem foto: ${names}`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (validateOrder()) {
      onSubmitOrder();
    }
  };

  const handleDownloadTemplate = () => {
    const header = "Nome,Nome Completo,Matrícula,Foto";
    const sampleData = [
      "João,João da Silva,3001234,",
      "Maria,Maria Souza,3005678,",
      "Pedro,Pedro Oliveira,7009876,"
    ].join("\n");
    
    const csvContent = `${header}\n${sampleData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `modelo-cartoes-${selectedCardType.toLowerCase() === 'todos' ? 'geral' : selectedCardType.toLowerCase()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onDownloadTemplate();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Criar Novo Pedido
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Baixar Modelo
          </Button>
          <UploadSpreadsheet
            onUpload={onUploadPlanilha}
            onDownloadTemplate={handleDownloadTemplate}
          />
        </div>
      </div>
      
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
            {novoPedido.length > 0 ? (
              novoPedido.map((employee) => (
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
                      <div className="flex items-center">
                        <span className="text-green-600 font-medium mr-2">Sim</span>
                        {employee.fotoUrl && (
                          <div className="h-6 w-6 rounded-full overflow-hidden border border-gray-200">
                            <img 
                              src={employee.fotoUrl} 
                              alt={`Foto de ${employee.nome}`}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600 font-medium">Não</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EmployeeEditor 
                        employee={employee}
                        onSave={handleUpdateEmployee}
                        onPhotoUpload={handleOpenPhotoUploader}
                      />
                      <Button 
                        variant={employee.foto ? "outline" : "default"}
                        size="sm"
                        className={`h-8 text-xs ${!employee.foto ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                        onClick={() => handleOpenPhotoUploader(employee.id)}
                      >
                        <Camera className="h-3.5 w-3.5 mr-1" />
                        {employee.foto ? 'Ver Foto' : 'Adicionar Foto'}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteEmployee(employee.id)}
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
                  Nenhum funcionário adicionado. Importe uma planilha para começar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {novoPedido.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="orange" 
            size="lg" 
            onClick={handleSubmit}
            className="px-8"
          >
            <Send className="mr-2 h-5 w-5" />
            ENVIAR PEDIDO
          </Button>
        </div>
      )}

      {selectedEmployee && (
        <PhotoUploader
          open={photoDialogOpen}
          onOpenChange={setPhotoDialogOpen}
          employeeId={selectedEmployee.id}
          employeeName={selectedEmployee.nome}
          employeeType={selectedEmployee.tipo}
          onPhotoSave={handlePhotoSave}
        />
      )}
    </div>
  );
};

export default NovoPedidoTab;
