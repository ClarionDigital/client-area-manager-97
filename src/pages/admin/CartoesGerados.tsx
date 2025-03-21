
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import CardsTab from '@/components/admin/tabs/CardsTab';
import { useToast } from '@/hooks/use-toast';

const CartoesGerados: React.FC = () => {
  const { cartoesGerados, handleDownloadPlanilha, handleUploadPlanilha } = useAdmin();
  const { toast } = useToast();
  
  // Add sample photo URLs to some cards for demonstration
  const cartoesComFotos = cartoesGerados.map(cartao => ({
    ...cartao,
    fotoUrl: cartao.id % 3 === 0 ? 'https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao.jpg' : undefined
  }));
  
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
      cards={cartoesComFotos}
      onDownload={handleDownloadPlanilha}
      onUpload={handleUploadPlanilha}
      onConfirmPayment={handleConfirmPayment}
      onDelete={handleDelete}
    />
  );
};

export default CartoesGerados;
