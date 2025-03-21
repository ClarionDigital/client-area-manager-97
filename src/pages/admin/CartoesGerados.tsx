
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import CardsTab from '@/components/admin/tabs/CardsTab';
import { useToast } from '@/hooks/use-toast';

const CartoesGerados: React.FC = () => {
  const { cartoesGerados, handleDownloadPlanilha, handleUploadPlanilha } = useAdmin();
  const { toast } = useToast();
  
  const handleConfirmPayment = (id: number) => {
    toast({
      title: "Pagamento confirmado",
      description: "O pagamento do cartão foi confirmado com sucesso",
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: "Cartão excluído",
      description: "O cartão foi removido com sucesso",
    });
  };

  return (
    <CardsTab 
      cards={cartoesGerados}
      onDownload={handleDownloadPlanilha}
      onUpload={handleUploadPlanilha}
      onConfirmPayment={handleConfirmPayment}
      onDelete={handleDelete}
    />
  );
};

export default CartoesGerados;
