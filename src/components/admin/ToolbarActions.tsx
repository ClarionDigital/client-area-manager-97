
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import UploadSpreadsheet from './UploadSpreadsheet';

interface ToolbarActionsProps {
  selectedCardType: string;
  onDownloadTemplate: () => void;
  onUploadPlanilha: (cardType: string) => void;
  onExportData?: () => void;
  novoPedido?: any[];
}

const ToolbarActions: React.FC<ToolbarActionsProps> = ({
  selectedCardType,
  onDownloadTemplate,
  onUploadPlanilha,
  onExportData,
  novoPedido = []
}) => {
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

  const handleExportData = () => {
    if (!onExportData || novoPedido.length === 0) return;
    
    const header = "Nome,Nome Completo,Matrícula,Tipo,Validade,Foto";
    
    const csvData = novoPedido.map(employee => {
      const primeiroNome = employee.nome.split(' ')[0];
      return `${primeiroNome},${employee.nome},${employee.matricula},${employee.tipo},${employee.validade || '12/2024'},${employee.foto ? 'Sim' : 'Não'}`;
    }).join("\n");
    
    const csvContent = `${header}\n${csvData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `pedido-cartoes-${selectedCardType.toLowerCase() === 'todos' ? 'geral' : selectedCardType.toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onExportData();
  };

  return (
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
      {onExportData && novoPedido && novoPedido.length > 0 && (
        <Button 
          variant="outline"
          onClick={handleExportData}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar Pedido
        </Button>
      )}
    </div>
  );
};

export default ToolbarActions;
