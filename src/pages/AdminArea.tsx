
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

// Import components
import Logo from "@/components/Logo";
import CardsTab from "@/components/admin/tabs/CardsTab";
import DataTab from "@/components/admin/tabs/DataTab";
import PhotoCropTab from "@/components/admin/tabs/PhotoCropTab";
import NewEmployeeDialog from "@/components/admin/NewEmployeeDialog";

// Import sample data
import { CardData, CardDataWithPhoto, UploadedEmployee } from '@/types/admin';
import { getCardTypeFromEmployeeId } from "@/components/admin/UploadSpreadsheet";

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
  { id: 1, nome: "Carlos Silva", primeiroNome: "Carlos", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", data: "12/05/2023", status: "Ativo", valor: "--" },
  { id: 2, nome: "Maria Santos", primeiroNome: "Maria", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light", data: "15/05/2023", status: "Ativo", valor: "--" },
  { id: 3, nome: "José Oliveira", primeiroNome: "José", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta", data: "18/05/2023", status: "Pendente", valor: "--" },
  { id: 4, nome: "Ana Rodrigues", primeiroNome: "Ana", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light", data: "20/05/2023", status: "Ativo", valor: "--" },
  { id: 5, nome: "Paulo Costa", primeiroNome: "Paulo", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta", data: "22/05/2023", status: "Inativo", valor: "--" },
  { id: 6, nome: "Fernanda Lima", primeiroNome: "Fernanda", matricula: "3025467", cargo: "Diretora", setor: "Comercial", validade: "12/2024", foto: true, tipo: "Light", data: "25/05/2023", status: "Ativo", valor: "--" },
];

// Sample uploaded employees data
const mockUploadedEmployees: UploadedEmployee[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", tipo: "Light", foto: false },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", tipo: "Light", foto: false },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", tipo: "Conecta", foto: false },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", tipo: "Light", foto: false },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", tipo: "Conecta", foto: false },
];

const AdminArea = () => {
  const { toast } = useToast();
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [activeTab, setActiveTab] = useState("cartoes");
  const [uploadedEmployees, setUploadedEmployees] = useState<UploadedEmployee[]>([]);
  const [showUploadedData, setShowUploadedData] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState<string>("Light");
  const [newEmployeeDialogOpen, setNewEmployeeDialogOpen] = useState(false);
  
  const handleExcluirCartao = (id: number) => {
    setCartoesGerados(cartoesGerados.filter(cartao => cartao.id !== id));
    toast({
      title: "Cartão excluído",
      description: "O cartão foi removido com sucesso",
    });
  };
  
  const handleUploadPlanilha = (cardType: string) => {
    setSelectedCardType(cardType);
    
    const filteredEmployees = mockUploadedEmployees.filter(employee => {
      const employeeCardType = getCardTypeFromEmployeeId(employee.matricula);
      return cardType === "Todos" || employeeCardType === cardType;
    });
    
    setUploadedEmployees(filteredEmployees);
    setShowUploadedData(true);
    setActiveTab("todos-dados");
    
    toast({
      title: "Planilha enviada",
      description: `Os dados da planilha para cartões ${cardType} foram carregados`,
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

  const handleSubmitOrder = () => {
    setShowUploadedData(false);
    
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve",
    });
  };

  const handleAddNewEmployee = (newEmployee: Omit<UploadedEmployee, 'id'>) => {
    const newId = Math.max(...uploadedEmployees.map(e => e.id), 0) + 1;
    
    const newEmployeeWithId: UploadedEmployee = {
      id: newId,
      ...newEmployee
    };
    
    setUploadedEmployees(prev => [...prev, newEmployeeWithId]);
    
    if (!showUploadedData) {
      setShowUploadedData(true);
      setActiveTab("todos-dados");
    }
    
    toast({
      title: "Funcionário adicionado",
      description: `${newEmployee.nome} foi adicionado com sucesso.`
    });
  };
  
  const handleUploadForCardsTab = () => {
    handleUploadPlanilha(selectedCardType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
          
          <Button 
            onClick={() => setNewEmployeeDialogOpen(true)}
            className="bg-brand-primary hover:bg-brand-primaryDark"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar Pessoa
          </Button>
        </div>
        
        <Card className="border-[#52aa85]/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#52aa85] to-[#004c48] text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Painel de Controle</CardTitle>
            <CardDescription className="text-white/80">
              Gerencie segundas vias e cartões
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="cartoes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="cartoes" className="text-sm md:text-base">Cartões Gerados</TabsTrigger>
                <TabsTrigger value="dados" className="text-sm md:text-base">Dados e Cartões</TabsTrigger>
                <TabsTrigger value="todos-dados" className="text-sm md:text-base">TODOS OS DADOS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <CardsTab 
                  cards={cartoesGerados}
                  onConfirmPayment={handleConfirmarPagamento}
                  onDelete={handleExcluirCartao}
                  onDownload={handleDownloadPlanilha}
                  onUpload={handleUploadForCardsTab}
                />
              </TabsContent>
              
              <TabsContent value="dados" className="space-y-6">
                <DataTab 
                  cards={dadosCartoes}
                  onDownloadSpreadsheet={handleDownloadPlanilha}
                />
              </TabsContent>
              
              <TabsContent value="todos-dados" className="space-y-6">
                <PhotoCropTab 
                  uploadedEmployees={uploadedEmployees}
                  showUploadedData={showUploadedData}
                  selectedCardType={selectedCardType}
                  onSubmitOrder={handleSubmitOrder}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <NewEmployeeDialog 
        open={newEmployeeDialogOpen}
        onOpenChange={setNewEmployeeDialogOpen}
        onSave={handleAddNewEmployee}
      />
    </div>
  );
};

export default AdminArea;
