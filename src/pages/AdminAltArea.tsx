import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useIsSmallMobile, useIsMobile } from "@/hooks/use-mobile";

// Importações de componentes
import Logo from "@/components/Logo";
import CardsTab from "@/components/admin/tabs/CardsTab";
import NovoPedidoTab from "@/components/admin/tabs/NovoPedidoTab";
import PreenchidosLinkTab from "@/components/admin/tabs/PreenchidosLinkTab";
import TodosDadosTab from "@/components/admin/tabs/TodosDadosTab";
import Integracoes from "./admin/Integracoes";

// Importações de dados de exemplo
import { CardData, UploadedEmployee } from '@/types/admin';

// Dados de exemplo (versão simplificada)
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

// Dados de exemplo para funcionários carregados
const mockUploadedEmployees: UploadedEmployee[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", tipo: "Light", foto: true },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", tipo: "Light", foto: true },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", tipo: "Conecta", foto: true },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", tipo: "Light", foto: true },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", tipo: "Conecta", foto: true },
];

// Dados de exemplo para usuários que preencheram via link
const initialPreenchidosPorLink = [
  { id: 1, nome: "Roberto Almeida", primeiroNome: "Roberto", email: "roberto.almeida@email.com", telefone: "(21) 99876-5432", empresa: "ABC Ltda", matricula: "3001246", tipo: "Light", foto: false, validade: "12/2024", cargo: "Desenvolvedor", dataPreenchimento: "02/06/2023", linkId: "LINK-001", setor: "TI" },
  { id: 2, nome: "Camila Ferreira", primeiroNome: "Camila", email: "camila.ferreira@email.com", telefone: "(11) 98765-4321", empresa: "XYZ S.A.", matricula: "3001247", tipo: "Light", foto: false, validade: "12/2024", cargo: "Designer", dataPreenchimento: "03/06/2023", linkId: "LINK-001", setor: "Design" },
  { id: 3, nome: "Marcelo Gomes", primeiroNome: "Marcelo", email: "marcelo.gomes@email.com", telefone: "(31) 97654-3210", empresa: "123 Inc.", matricula: "7031299", tipo: "Conecta", foto: false, validade: "12/2024", cargo: "Gerente de Projetos", dataPreenchimento: "04/06/2023", linkId: "LINK-002", setor: "Projetos" },
  { id: 4, nome: "Luciana Martins", primeiroNome: "Luciana", email: "luciana.martins@email.com", telefone: "(41) 96543-2109", empresa: "Tech Solutions", matricula: "3001248", tipo: "Light", foto: false, validade: "12/2024", cargo: "Analista de Dados", dataPreenchimento: "05/06/2023", linkId: "LINK-002", setor: "Dados" },
  { id: 5, nome: "Felipe Santos", primeiroNome: "Felipe", email: "felipe.santos@email.com", telefone: "(51) 95432-1098", empresa: "Inovação Ltd", matricula: "7031300", tipo: "Conecta", foto: false, validade: "12/2024", cargo: "Diretor de Marketing", dataPreenchimento: "06/06/2023", linkId: "LINK-003", setor: "Marketing" },
];

const AdminArea = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const isSmallMobile = useIsSmallMobile();
  
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [activeTab, setActiveTab] = useState("cartoes");
  const [uploadedEmployees, setUploadedEmployees] = useState<UploadedEmployee[]>(mockUploadedEmployees);
  const [selectedCardType, setSelectedCardType] = useState<string>("Todos");
  const [preenchidosPorLink, setPreenchidosPorLink] = useState(initialPreenchidosPorLink);
  const [novoPedido, setNovoPedido] = useState<UploadedEmployee[]>([]);
  
  const handleExcluirCartao = (id: number) => {
    setCartoesGerados(cartoesGerados.filter(cartao => cartao.id !== id));
    setUploadedEmployees(uploadedEmployees.filter(employee => employee.id !== id));
    
    toast({
      title: "Cartão excluído",
      description: "O cartão foi removido com sucesso",
    });
  };
  
  const handleUploadPlanilha = (cardType: string) => {
    setSelectedCardType(cardType);
    setActiveTab("novo-pedido");
    
    const newEmployees: UploadedEmployee[] = [
      { id: Date.now(), nome: "Pedro Rocha", matricula: "3005678", tipo: "Light", foto: false, cargo: "Analista", setor: "TI", validade: "12/2024" },
      { id: Date.now() + 1, nome: "Laura Oliveira", matricula: "7008765", tipo: "Conecta", foto: false, cargo: "Gerente", setor: "Vendas", validade: "12/2024" },
      { id: Date.now() + 2, nome: "Roberto Maia", matricula: "3009854", tipo: "Light", foto: false, cargo: "Técnico", setor: "Suporte", validade: "12/2024" },
    ];
    
    setNovoPedido(newEmployees);
    
    toast({
      title: "Planilha enviada",
      description: `Os dados da planilha para cartões ${cardType} foram carregados`,
    });
  };

  const handleDownloadPlanilha = () => {
    toast({
      title: "Download iniciado",
      description: "A planilha está sendo baixada",
    });
  };

  const handleSubmitOrder = () => {
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve",
    });
  };

  const handleRequestSecondCopy = (id: number) => {
    const employee = uploadedEmployees.find(emp => emp.id === id);
    
    if (employee) {
      const newEntry = {
        id: Date.now(),
        nome: employee.nome,
        primeiroNome: employee.nome.split(' ')[0],
        matricula: employee.matricula,
        tipo: employee.tipo,
        foto: false,
        validade: employee.validade || "12/2024",
        cargo: employee.cargo || "",
        setor: employee.setor || "",
        email: "",
        telefone: "",
        empresa: "",
        dataPreenchimento: new Date().toLocaleDateString(),
        linkId: ""
      };
      
      setPreenchidosPorLink(prev => [...prev, newEntry]);
      
      setActiveTab("preenchidos-link");
      
      toast({
        title: "Segunda via solicitada",
        description: `Segunda via para ${employee.nome} foi adicionada à lista`,
      });
    }
  };
  
  const handleDeleteUploadedEmployee = (id: number) => {
    setUploadedEmployees(prev => prev.filter(emp => emp.id !== id));
    toast({
      title: "Registro excluído",
      description: "O funcionário foi removido da lista",
    });
  };

  const getTabLabel = (fullLabel: string, shortLabel: string) => {
    if (isSmallMobile) return shortLabel;
    return fullLabel;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
          
          <Link to="/admin-modular">
            <Button variant="outline" className="text-brand-primary border-brand-primary hover:bg-brand-primary hover:text-white">
              Acessar Nova Versão
            </Button>
          </Link>
        </div>
        
        <Card className="border-[#52aa85]/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#52aa85] to-[#004c48] text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Painel de Controle</CardTitle>
            <CardDescription className="text-white/80">
              Gerencie segundas vias e cartões
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="cartoes" value={activeTab} onValueChange={setActiveTab} className="w-full tabs-responsive">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="cartoes">
                  {getTabLabel("Cartões Gerados", "Cartões")}
                </TabsTrigger>
                <TabsTrigger value="todos-dados">
                  {getTabLabel("TODOS OS DADOS", "DADOS")}
                </TabsTrigger>
                <TabsTrigger value="preenchidos-link">
                  {getTabLabel("Preenchidos pelo Link", "Link")}
                </TabsTrigger>
                <TabsTrigger value="novo-pedido">
                  {getTabLabel("Criar Pedido", "Pedido")}
                </TabsTrigger>
                <TabsTrigger value="integracoes">
                  {getTabLabel("Integrações", "Sistema")}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <CardsTab 
                  cards={cartoesGerados}
                  onDownload={handleDownloadPlanilha}
                  onUpload={handleUploadPlanilha}
                />
              </TabsContent>
              
              <TabsContent value="todos-dados" className="space-y-6">
                <TodosDadosTab 
                  uploadedEmployees={uploadedEmployees}
                  onDownloadPlanilha={handleDownloadPlanilha}
                  onRequestSecondCopy={handleRequestSecondCopy}
                  onDeleteEmployee={handleDeleteUploadedEmployee}
                />
              </TabsContent>
              
              <TabsContent value="preenchidos-link" className="space-y-6">
                <PreenchidosLinkTab 
                  preenchidosPorLink={preenchidosPorLink}
                  onDownload={handleDownloadPlanilha}
                  onSubmitOrder={handleSubmitOrder}
                />
              </TabsContent>
              
              <TabsContent value="novo-pedido" className="space-y-6">
                <NovoPedidoTab 
                  novoPedido={novoPedido}
                  selectedCardType={selectedCardType}
                  onDownloadTemplate={handleDownloadPlanilha}
                  onUploadPlanilha={handleUploadPlanilha}
                  onSubmitOrder={handleSubmitOrder}
                  setNovoPedido={setNovoPedido}
                />
              </TabsContent>
              
              <TabsContent value="integracoes" className="space-y-6">
                <Integracoes />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArea;
