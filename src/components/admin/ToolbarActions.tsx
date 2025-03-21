
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import UploadSpreadsheet from './UploadSpreadsheet';

interface ToolbarActionsProps {
  selectedCardType: string;
  onDownloadTemplate: () => void;
  onUploadPlanilha: (cardType: string) => void;
}

const ToolbarActions: React.FC<ToolbarActionsProps> = ({
  selectedCardType,
  onDownloadTemplate,
  onUploadPlanilha
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
    </div>
  );
};

export default ToolbarActions;
