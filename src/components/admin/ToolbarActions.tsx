
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Bell, AlertCircle } from "lucide-react";
import UploadSpreadsheet from './UploadSpreadsheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";
import { exportDataAsCSV, downloadTemplateCSV } from '@/utils/cardHelpers';

interface ToolbarActionsProps {
  selectedCardType: string;
  onDownloadTemplate: () => void;
  onUploadPlanilha: (cardType: string) => void;
  onExportData?: () => void;
  novoPedido?: any[];
  hasNotifications?: boolean;
}

const ToolbarActions: React.FC<ToolbarActionsProps> = ({
  selectedCardType,
  onDownloadTemplate,
  onUploadPlanilha,
  onExportData,
  novoPedido = [],
  hasNotifications = false
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleDownloadTemplate = () => {
    const headers = ["Nome", "Nome Completo", "Matrícula", "Foto"];
    const sampleData = [
      "João,João da Silva,3001234,",
      "Maria,Maria Souza,3005678,",
      "Pedro,Pedro Oliveira,7009876,"
    ];
    
    downloadTemplateCSV(
      headers,
      sampleData,
      `modelo-cartoes-${selectedCardType.toLowerCase() === 'todos' ? 'geral' : selectedCardType.toLowerCase()}.csv`
    );
    
    onDownloadTemplate();
  };

  const handleExportData = () => {
    if (!onExportData || novoPedido.length === 0) return;
    
    const headers = ["Nome", "Nome Completo", "Matrícula", "Tipo", "Validade", "Foto"];
    
    const fieldMappings = {
      primeiroNome: (employee: any) => employee.nome.split(' ')[0],
      nomeCompleto: (employee: any) => employee.nome,
      matricula: (employee: any) => employee.matricula,
      tipo: (employee: any) => employee.tipo,
      validade: (employee: any) => employee.validade || '12/2024',
      foto: (employee: any) => employee.foto ? 'Sim' : 'Não'
    };
    
    exportDataAsCSV(
      novoPedido,
      headers,
      fieldMappings,
      `pedido-cartoes-${selectedCardType.toLowerCase() === 'todos' ? 'geral' : selectedCardType.toLowerCase()}`
    );
    
    onExportData();
  };
  
  const showNotificationToast = () => {
    toast({
      title: "Notificações",
      description: "Você tem 3 novos pedidos para processar",
      variant: "default",
    });
  };

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row space-x-2'} w-full md:w-auto`}>
      {hasNotifications && (
        <Button 
          variant="outline"
          onClick={showNotificationToast}
          className="flex items-center gap-2 relative md:mr-2"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
          {!isMobile && <span>Notificações</span>}
        </Button>
      )}
      
      <Button 
        variant="outline"
        onClick={handleDownloadTemplate}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        {!isMobile && "Baixar Modelo"}
        {isMobile && "Modelo"}
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
          {!isMobile && "Exportar Pedido"}
          {isMobile && "Exportar"}
        </Button>
      )}
    </div>
  );
};

export default ToolbarActions;
