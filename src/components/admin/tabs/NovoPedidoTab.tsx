
import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadedEmployee } from '@/types/admin';
import EmployeeTable from '../EmployeeTable';
import ToolbarActions from '../ToolbarActions';
import PhotoUploader from '../PhotoUploader';
import OrderSubmitButton from '../OrderSubmitButton';
import CardPreview from '../CardPreview';
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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

  const handleAdvance = () => {
    if (validateOrder()) {
      setIsPreviewMode(true);
      window.scrollTo(0, 0);
    }
  };

  const handleGoBack = () => {
    setIsPreviewMode(false);
  };

  const handleSubmit = () => {
    onSubmitOrder();
    setIsPreviewMode(false);
  };

  if (isPreviewMode) {
    return (
      <CardPreview 
        employees={novoPedido}
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Criar Novo Pedido
        </h2>
        <ToolbarActions 
          selectedCardType={selectedCardType}
          onDownloadTemplate={onDownloadTemplate}
          onUploadPlanilha={onUploadPlanilha}
        />
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
            <EmployeeTable 
              employees={novoPedido}
              onDeleteEmployee={handleDeleteEmployee}
              onOpenPhotoUploader={handleOpenPhotoUploader}
              onUpdateEmployee={handleUpdateEmployee}
            />
          </TableBody>
        </Table>
      </div>
      
      {novoPedido.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleAdvance}
            className="bg-[#062b48] hover:bg-[#031e33] text-white rounded-md px-4 py-2 flex items-center"
          >
            Avançar
          </button>
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
