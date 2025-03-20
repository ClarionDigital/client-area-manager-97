
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Import components
import Logo from "@/components/Logo";
import CardsTab from "@/components/admin/tabs/CardsTab";
import DataTab from "@/components/admin/tabs/DataTab";
import PhotoCropTab from "@/components/admin/tabs/PhotoCropTab";
import SearchFilters from "@/components/admin/SearchFilters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

// Sample data for users who filled the form via link
const preenchidosPorLink = [
  { id: 1, nome: "Roberto Almeida", email: "roberto.almeida@email.com", telefone: "(21) 99876-5432", empresa: "ABC Ltda", cargo: "Desenvolvedor", dataPreenchimento: "02/06/2023", linkId: "LINK-001" },
  { id: 2, nome: "Camila Ferreira", email: "camila.ferreira@email.com", telefone: "(11) 98765-4321", empresa: "XYZ S.A.", cargo: "Designer", dataPreenchimento: "03/06/2023", linkId: "LINK-001" },
  { id: 3, nome: "Marcelo Gomes", email: "marcelo.gomes@email.com", telefone: "(31) 97654-3210", empresa: "123 Inc.", cargo: "Gerente de Projetos", dataPreenchimento: "04/06/2023", linkId: "LINK-002" },
  { id: 4, nome: "Luciana Martins", email: "luciana.martins@email.com", telefone: "(41) 96543-2109", empresa: "Tech Solutions", cargo: "Analista de Dados", dataPreenchimento: "05/06/2023", linkId: "LINK-002" },
  { id: 5, nome: "Felipe Santos", email: "felipe.santos@email.com", telefone: "(51) 95432-1098", empresa: "Inovação Ltd", cargo: "Diretor de Marketing", dataPreenchimento: "06/06/2023", linkId: "LINK-003" },
];

const AdminArea = () => {
  const { toast } = useToast();
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [activeTab, setActiveTab] = useState("cartoes");
  const [uploadedEmployees, setUploadedEmployees] = useState<UploadedEmployee[]>(mockUploadedEmployees);
  const [showUploadedData, setShowUploadedData] = useState(true);
  const [selectedCardType, setSelectedCardType] = useState<string>("Todos");
  
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

  // Filter for link-filled users
  const [linkSearch, setLinkSearch] = useState("");
  const [linkFilter, setLinkFilter] = useState("todos");
  
  const filteredLinkUsers = useMemo(() => {
    return preenchidosPorLink.filter(user => 
      (linkSearch === "" || 
        user.nome.toLowerCase().includes(linkSearch.toLowerCase()) || 
        user.email.toLowerCase().includes(linkSearch.toLowerCase())) &&
      (linkFilter === "todos" || user.linkId === linkFilter)
    );
  }, [linkSearch, linkFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
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
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="cartoes" className="text-sm md:text-base">Cartões Gerados</TabsTrigger>
                <TabsTrigger value="dados" className="text-sm md:text-base">Dados e Cartões</TabsTrigger>
                <TabsTrigger value="todos-dados" className="text-sm md:text-base">TODOS OS DADOS</TabsTrigger>
                <TabsTrigger value="preenchidos-link" className="text-sm md:text-base">Preenchidos pelo Link</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <CardsTab 
                  cards={cartoesGerados}
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
              
              <TabsContent value="preenchidos-link" className="space-y-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Preenchidos pelo Link
                    </h2>
                    <Button
                      variant="outline"
                      onClick={handleDownloadPlanilha}
                    >
                      Exportar Lista
                    </Button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-auto md:flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#52aa85]"
                        value={linkSearch}
                        onChange={(e) => setLinkSearch(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-auto">
                      <select
                        className="w-full md:w-auto px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#52aa85]"
                        value={linkFilter}
                        onChange={(e) => setLinkFilter(e.target.value)}
                      >
                        <option value="todos">Todos os Links</option>
                        <option value="LINK-001">LINK-001</option>
                        <option value="LINK-002">LINK-002</option>
                        <option value="LINK-003">LINK-003</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>ID do Link</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLinkUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.nome}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.telefone}</TableCell>
                            <TableCell>{user.empresa}</TableCell>
                            <TableCell>{user.cargo}</TableCell>
                            <TableCell>{user.dataPreenchimento}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                {user.linkId}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArea;
