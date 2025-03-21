
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';
import PreenchidosLinkTab from '@/components/admin/tabs/PreenchidosLinkTab';

const PreenchidosLinks: React.FC = () => {
  const { preenchidosPorLink, handleDownloadPlanilha, handleSubmitOrder } = useAdmin();
  const { toast } = useToast();

  const handleOnSubmitOrder = () => {
    handleSubmitOrder();
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Preenchidos por Link e Portal Individual</h1>
      <PreenchidosLinkTab 
        preenchidosPorLink={preenchidosPorLink}
        onDownload={handleDownloadPlanilha}
        onSubmitOrder={handleOnSubmitOrder}
      />
    </div>
  );
};

export default PreenchidosLinks;
