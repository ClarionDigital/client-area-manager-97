
import React, { useState } from 'react';
import PreenchidosLinkTab from '@/components/admin/tabs/PreenchidosLinkTab';
import LinkGenerator from '@/components/admin/LinkGenerator';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration purposes
const mockPreenchidosPorLink = [
  {
    id: 1,
    nome: "João da Silva",
    primeiroNome: "João",
    matricula: "3123456",
    tipo: "Light",
    foto: true,
    validade: "12/2024",
    cargo: "Analista",
    setor: "TI",
    email: "joao@example.com",
    telefone: "(21) 98765-4321",
    empresa: "Light",
    dataPreenchimento: "01/05/2023",
    linkId: "LINK-123"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    primeiroNome: "Maria",
    matricula: "7234567",
    tipo: "Conecta",
    foto: true,
    validade: "12/2024",
    cargo: "Gerente",
    setor: "Comercial",
    email: "maria@example.com",
    telefone: "(21) 91234-5678",
    empresa: "Conecta",
    dataPreenchimento: "05/05/2023",
    linkId: "CARTAO-INDIVIDUAL"
  },
  {
    id: 3,
    nome: "Pedro Santos",
    primeiroNome: "Pedro",
    matricula: "3789012",
    tipo: "Light",
    foto: false,
    validade: "12/2024",
    cargo: "Técnico",
    setor: "Operações",
    email: "pedro@example.com",
    telefone: "(21) 95678-1234",
    empresa: "Light",
    dataPreenchimento: "10/05/2023",
    linkId: "LINK-456"
  },
  {
    id: 4,
    nome: "Ana Souza",
    primeiroNome: "Ana",
    matricula: "7345678",
    tipo: "Conecta",
    foto: true,
    validade: "12/2024",
    cargo: "Coordenadora",
    setor: "RH",
    email: "ana@example.com",
    telefone: "(21) 99876-5432",
    empresa: "Conecta",
    dataPreenchimento: "15/05/2023",
    linkId: "CARTAO-INDIVIDUAL"
  }
];

const PreenchidosLinks: React.FC = () => {
  const [preenchidosPorLink] = useState(mockPreenchidosPorLink);
  const { toast } = useToast();

  const handleDownloadPlanilha = () => {
    // Mock function to simulate downloading a spreadsheet
    toast({
      title: "Planilha Baixada",
      description: "A planilha foi baixada com sucesso.",
    });
  };

  const handleSubmitOrder = () => {
    // Mock function to simulate submitting an order
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">Preenchidos por Link e Portal Individual</h1>
      
      <LinkGenerator />
      
      <PreenchidosLinkTab 
        preenchidosPorLink={preenchidosPorLink}
        onDownload={handleDownloadPlanilha}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};

export default PreenchidosLinks;
