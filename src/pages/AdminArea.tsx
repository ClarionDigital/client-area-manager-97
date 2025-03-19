
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Crop } from "lucide-react";

// Import components
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import CardsTab from "@/components/admin/tabs/CardsTab";
import DataTab from "@/components/admin/tabs/DataTab";
import FinancialTab from "@/components/admin/tabs/FinancialTab";
import PhotoCropTab from "@/components/admin/tabs/PhotoCropTab";

// Import sample data
import { CardData, TransactionData, CardDataWithPhoto } from "@/types/admin";

// Sample data
const segundasVias: CardData[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", data: "12/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", data: "15/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", data: "18/05/2023", status: "Pendente", valor: "--", tipo: "Conecta" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", data: "20/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", data: "22/05/2023", status: "Cancelado", valor: "--", tipo: "Conecta" },
  { id: 6, nome: "Fernanda Lima", matricula: "3025467", data: "25/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 7, nome: "Ricardo Souza", matricula: "7056234", data: "26/05/2023", status: "Pendente", valor: "--", tipo: "Conecta" },
  { id: 8, nome: "Juliana Alves", matricula: "3037654", data: "27/05/2023", status: "Pago", valor: "--", tipo: "Light" },
  { id: 9, nome: "Eduardo Mendes", matricula: "7069872", data: "28/05/2023", status: "Cancelado", valor: "--", tipo: "Conecta" },
  { id: 10, nome: "Patrícia Rocha", matricula: "3045678", data: "29/05/2023", status: "Pago", valor: "--", tipo: "Light" },
];

const dadosCartoes: CardDataWithPhoto[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", data: "12/05/2023", status: "Ativo", valor: "--" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light", data: "15/05/2023", status: "Ativo", valor: "--" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta", data: "18/05/2023", status: "Pendente", valor: "--" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light", data: "20/05/2023", status: "Ativo", valor: "--" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta", data: "22/05/2023", status: "Inativo", valor: "--" },
  { id: 6, nome: "Fernanda Lima", matricula: "3025467", cargo: "Diretora", setor: "Comercial", validade: "12/2024", foto: true, tipo: "Light", data: "25/05/2023", status: "Ativo", valor: "--" },
];

const transacoes: TransactionData[] = [
  { id: 3582, cliente: "Maria Santos", valor: "--", data: "22/05/2023", status: "Confirmado", metodo: "Cartão" },
  { id: 3581, cliente: "João Silva", valor: "--", data: "21/05/2023", status: "Confirmado", metodo: "Pix" },
  { id: 3580, cliente: "Ana Oliveira", valor: "--", data: "20/05/2023", status: "Pendente", metodo: "Pix" },
  { id: 3579, cliente: "Carlos Eduardo", valor: "--", data: "19/05/2023", status: "Cancelado", metodo: "Cartão" },
  { id: 3578, cliente: "Patrícia Rocha", valor: "--", data: "18/05/2023", status: "Confirmado", metodo: "Pix" },
  { id: 3577, cliente: "Ricardo Souza", valor: "--", data: "17/05/2023", status: "Pendente", metodo: "Cartão" },
  { id: 3576, cliente: "Juliana Alves", valor: "--", data: "16/05/2023", status: "Confirmado", metodo: "Pix" },
];

const AdminArea = () => {
  const { toast } = useToast();
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [activeTab, setActiveTab] = useState("cartoes");
  const [walletBalance, setWalletBalance] = useState(500);
  
  const handleExcluirCartao = (id: number) => {
    setCartoesGerados(cartoesGerados.filter(cartao => cartao.id !== id));
    toast({
      title: "Cartão excluído",
      description: "O cartão foi removido com sucesso",
    });
  };
  
  const handleUploadPlanilha = () => {
    toast({
      title: "Planilha enviada",
      description: "Os dados da planilha serão processados em breve",
    });
  };

  const handleConfirmarPagamento = (id: number) => {
    setCartoesGerados(cartoesGerados.map(cartao => 
      cartao.id === id ? { ...cartao, status: "Pago" } : cartao
    ));
    toast({
      title: "Pagamento confirmado",
      description: "Status do pagamento atualizado para 'Pago'",
    });
  };
  
  const handleDownloadPlanilha = () => {
    toast({
      title: "Download iniciado",
      description: "A planilha está sendo baixada",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Logo size="md" className="hidden md:block" />
            <Header 
              title="ÁREA LIGHT ADM" 
              subtitle="Gerenciamento de cartões, segundas vias e controle financeiro"
            />
          </div>
          <button 
            onClick={() => setActiveTab("financeiro")} 
            className="flex items-center gap-2 bg-[#52aa85] text-white px-4 py-2 rounded-lg hover:bg-[#3a7960] transition-colors"
          >
            <DollarSign size={20} />
            <div>
              <div className="text-sm font-medium">Carteira</div>
              <div className="text-lg font-bold">R$ {walletBalance.toFixed(2)}</div>
            </div>
          </button>
        </div>
        
        <Card className="border-[#52aa85]/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#52aa85] to-[#004c48] text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Logo size="sm" className="md:hidden" />
              <div>
                <CardTitle className="text-2xl font-bold">Painel de Controle</CardTitle>
                <CardDescription className="text-white/80">
                  Gerencie segundas vias, cartões e controle financeiro
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="cartoes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="cartoes" className="text-sm md:text-base">Cartões Gerados</TabsTrigger>
                <TabsTrigger value="dados" className="text-sm md:text-base">Dados e Cartões</TabsTrigger>
                <TabsTrigger value="foto" className="text-sm md:text-base">Recorte de Foto</TabsTrigger>
                <TabsTrigger value="financeiro" className="text-sm md:text-base">Financeiro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <CardsTab 
                  cards={cartoesGerados}
                  onConfirmPayment={handleConfirmarPagamento}
                  onDelete={handleExcluirCartao}
                  onDownload={handleDownloadPlanilha}
                  onUpload={handleUploadPlanilha}
                />
              </TabsContent>
              
              <TabsContent value="dados" className="space-y-6">
                <DataTab 
                  cards={dadosCartoes}
                  onDownloadSpreadsheet={handleDownloadPlanilha}
                />
              </TabsContent>
              
              <TabsContent value="foto" className="space-y-6">
                <PhotoCropTab />
              </TabsContent>
              
              <TabsContent value="financeiro" className="space-y-6">
                <FinancialTab transactions={transacoes} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArea;
