
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Filter } from "lucide-react";

// Import components
import Logo from "@/components/Logo";
import CardsTab from "@/components/admin/tabs/CardsTab";
import DataTab from "@/components/admin/tabs/DataTab";
import PhotoCropTab from "@/components/admin/tabs/PhotoCropTab";
import NewEmployeeDialog from "@/components/admin/NewEmployeeDialog";
import SearchFilters from "@/components/admin/SearchFilters";

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
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", tipo: "Light", foto: true },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", tipo: "Light", foto: true },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", tipo: "Conecta", foto: true },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", tipo: "Light", foto: true },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", tipo: "Conecta", foto: true },
];

const AdminArea = () => {
  const { toast } = useToast();
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [activeTab, setActiveTab] = useState("cartoes");
  const [uploadedEmployees, setUploadedEmployees] = useState<UploadedEmployee[]>(mockUploadedEmployees);
  const [showUploadedData, setShowUploadedData] = useState(true);
  const [selectedCardType, setSelectedCardType] = useState<string>("Todos");
  const [newEmployeeDialogOpen, setNewEmployeeDialogOpen] = useState(false);
  
  // Search and filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [sorting, setSorting] = useState({ field: 'nome', direction: 'asc' as 'asc' | 'desc' });
  
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
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve",
    });
  };

  const handleRequestSecondCopy = (id: number) => {
    // Add the employee to the segundasVias list if not already there
    const employee = uploadedEmployees.find(emp => emp.id === id);
    
    if (employee) {
      const alreadyInList = cartoesGerados.some(cartao => cartao.id === id);
      
      if (!alreadyInList) {
        const newCard: CardData = {
          id: employee.id,
          nome: employee.nome,
          matricula: employee.matricula,
          data: new Date().toLocaleDateString('pt-BR'),
          status: "Pendente",
          valor: "--",
          tipo: employee.tipo
        };
        
        setCartoesGerados([...cartoesGerados, newCard]);
      }
      
      toast({
        title: "Segunda via solicitada",
        description: `Segunda via do cartão para ${employee.nome} foi solicitada`,
      });
    }
  };

  const handleAddNewEmployee = (newEmployee: Omit<UploadedEmployee, 'id'>) => {
    const newId = Math.max(...uploadedEmployees.map(e => e.id), 0) + 1;
    
    const newEmployeeWithId: UploadedEmployee = {
      id: newId,
      ...newEmployee,
      foto: true // Set photo to true for demonstration purposes
    };
    
    setUploadedEmployees(prev => [...prev, newEmployeeWithId]);
    
    toast({
      title: "Funcionário adicionado",
      description: `${newEmployee.nome} foi adicionado com sucesso.`
    });
  };
  
  const handleSortingChange = (field: string, direction: 'asc' | 'desc') => {
    setSorting({ field, direction });
  };

  // Filter and sort all employee data
  const filteredEmployees = useMemo(() => {
    return uploadedEmployees.filter(employee => 
      (search === "" || 
        employee.nome.toLowerCase().includes(search.toLowerCase()) || 
        employee.matricula.includes(search)) &&
      (typeFilter === "todos" || employee.tipo === typeFilter)
    ).sort((a, b) => {
      if (sorting.field === 'nome') {
        return sorting.direction === 'asc' 
          ? a.nome.localeCompare(b.nome) 
          : b.nome.localeCompare(a.nome);
      }
      // Add other sorting options as needed
      return 0;
    });
  }, [uploadedEmployees, search, typeFilter, sorting]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
          
          <Button 
            onClick={() => setNewEmployeeDialogOpen(true)}
            className="bg-brand-primary hover:bg-brand-primaryDark"
            variant="brand"
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
                  onUpload={handleUploadPlanilha}
                />
              </TabsContent>
              
              <TabsContent value="dados" className="space-y-6">
                <DataTab 
                  cards={dadosCartoes}
                  onDownloadSpreadsheet={handleDownloadPlanilha}
                />
              </TabsContent>
              
              <TabsContent value="todos-dados" className="space-y-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Todos os Cartões Cadastrados
                    </h2>
                    <Button
                      variant="outline"
                      onClick={handleDownloadPlanilha}
                    >
                      Exportar Lista
                    </Button>
                  </div>
                  
                  <SearchFilters
                    search={search}
                    onSearchChange={setSearch}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((employee) => (
                      <div 
                        key={employee.id} 
                        className={`rounded-lg border p-4 ${
                          employee.tipo === "Light" 
                            ? "border-[#52aa85]/20 bg-gradient-to-b from-white to-[#52aa85]/5" 
                            : "border-[#0a5eb3]/20 bg-gradient-to-b from-white to-[#0a5eb3]/5"
                        } shadow-sm transition-all duration-200 hover:shadow-md`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="h-20 w-16 overflow-hidden rounded-md border bg-gray-100 flex items-center justify-center">
                            {employee.foto ? (
                              <img 
                                src={`/placeholder.svg`} 
                                alt={employee.nome}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs text-center">Sem foto</div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{employee.nome}</h3>
                            <p className="text-sm text-gray-500 mb-1">
                              Mat: <span className="font-medium text-gray-700">{employee.matricula}</span>
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                              {employee.cargo} - {employee.setor}
                            </p>
                            <p className="text-sm text-gray-500">
                              Validade: {employee.validade}
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Button 
                                variant="orange"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => handleRequestSecondCopy(employee.id)}
                              >
                                PEDIR SEGUNDA VIA
                              </Button>
                              <Button 
                                variant="destructive"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => handleExcluirCartao(employee.id)}
                              >
                                DELETAR CARTÃO
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
