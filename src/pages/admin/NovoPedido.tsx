
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';
import NovoPedidoTab from '@/components/admin/tabs/NovoPedidoTab';

const NovoPedido: React.FC = () => {
  const { 
    novoPedido, 
    selectedCardType, 
    handleDownloadPlanilha, 
    handleUploadPlanilha,
    handleSubmitOrder,
    setNovoPedido
  } = useAdmin();
  const { toast } = useToast();

  const handleOnSubmitOrder = () => {
    handleSubmitOrder();
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve",
    });
  };

  return (
    <NovoPedidoTab 
      novoPedido={novoPedido}
      selectedCardType={selectedCardType}
      onDownloadTemplate={handleDownloadPlanilha}
      onUploadPlanilha={handleUploadPlanilha}
      onSubmitOrder={handleOnSubmitOrder}
      setNovoPedido={setNovoPedido}
    />
  );
};

export default NovoPedido;
