import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Search, Filter, Send, Trash, Upload, PlusCircle, Download } from "lucide-react";

// Import components
import Logo from "@/components/Logo";
import CardsTab from "@/components/admin/tabs/CardsTab";
import SearchFilters from "@/components/admin/SearchFilters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis 
} from "@/components/ui/pagination";
import NovoPedidoTab from "@/components/admin/tabs/NovoPedidoTab";

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
const initialPreenchidosPorLink = [
  { id: 1, nome: "Roberto Almeida", primeiroNome: "Roberto", email: "roberto.almeida@email.com", telefone: "(21) 99876-5432", empresa: "ABC Ltda", matricula: "3001246", tipo: "Light", foto: false, validade: "12/2024", cargo: "Desenvolvedor", dataPreenchimento: "02/06/2023", linkId: "LINK-001", setor: "TI" },
  { id: 2, nome: "Camila Ferreira", primeiroNome: "Camila", email: "camila.ferreira@email.com", telefone: "(11) 98765-4321", empresa: "XYZ S.A.", matricula: "3001247", tipo: "Light", foto: false, validade: "12/2024", cargo: "Designer", dataPreenchimento: "03/06/2023", linkId: "LINK-001", setor: "Design" },
  { id: 3, nome: "Marcelo Gomes", primeiroNome: "Marcelo", email: "marcelo.gomes@email.com", telefone: "(31) 97654-3210", empresa: "123 Inc.", matricula: "7031299", tipo: "Conecta", foto: false, validade: "12/2024", cargo: "Gerente de Projetos", dataPreenchimento: "04/06/2023", linkId: "LINK-002", setor: "Projetos" },
  { id: 4, nome: "Luciana Martins", primeiroNome: "Luciana", email: "luciana.martins@email.com", telefone: "(41) 96543-2109", empresa: "Tech Solutions", matricula: "3001248", tipo: "Light", foto: false, validade: "12/2024", cargo: "Analista de Dados", dataPreenchimento: "05/06/2023", linkId: "LINK-002", setor: "Dados" },
  { id: 5, nome: "Felipe Santos", primeiroNome: "Felipe", email: "felipe.santos@email.com", telefone: "(51) 95432-1098", empresa: "Inovação Ltd", matricula: "7031300", tipo: "Conecta", foto: false, validade: "12/2024", cargo: "Diretor de Marketing", dataPreenchimento: "06/06/2023", linkId: "LINK-003", setor: "Marketing" },
];

const AdminArea = () => {
  const { toast } = useToast();
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [activeTab, setActiveTab] = useState("cartoes");
  const [uploadedEmployees, setUploadedEmployees] = useState<UploadedEmployee[]>(mockUploadedEmployees);
  const [selectedCardType, setSelectedCardType] = useState<string>("Todos");
  const [preenchidosPorLink, setPreenchidosPorLink] = useState(initialPreenchidosPorLink);
  const [novoPedido, setNovoPedido] = useState<UploadedEmployee[]>([]);
  
  // Search and filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [sorting, setSorting] = useState({ field: 'nome', direction: 'asc' as 'asc' | 'desc' });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
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
    
    // Simulate adding new employees from the uploaded file
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
    // Find the employee
    const employee = uploadedEmployees.find(emp => emp.id === id);
    
    if (employee) {
      // Create a new entry for preenchidosPorLink with all required fields
      const newEntry = {
        id: Date.now(), // Use timestamp as unique ID
        nome: employee.nome,
        primeiroNome: employee.nome.split(' ')[0],
        matricula: employee.matricula,
        tipo: employee.tipo,
        foto: false,
        validade: employee.validade || "12/2024",
        cargo: employee.cargo || "",
        setor: employee.setor || "",
        // Add required fields with default values
        email: "",
        telefone: "",
        empresa: "",
        dataPreenchimento: new Date().toLocaleDateString(),
        linkId: ""
      };
      
      // Add to preenchidosPorLink
      setPreenchidosPorLink(prev => [...prev, newEntry]);
      
      // Switch to the preenchidos-link tab
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
  
  const filteredLinkUsers = useMemo(() => {
    return preenchidosPorLink.filter(user => 
      (linkSearch === "" || 
        user.nome.toLowerCase().includes(linkSearch.toLowerCase()) || 
        (user.matricula && user.matricula.toLowerCase().includes(linkSearch.toLowerCase())))
    );
  }, [preenchidosPorLink, linkSearch]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Pagination controls
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i}
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            isActive={currentPage === 1}
            onClick={() => goToPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i}
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            isActive={currentPage === totalPages}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

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
                <TabsTrigger value="todos-dados" className="text-sm md:text-base">TODOS OS DADOS</TabsTrigger>
                <TabsTrigger value="preenchidos-link" className="text-sm md:text-base">Preenchidos pelo Link</TabsTrigger>
                <TabsTrigger value="novo-pedido" className="text-sm md:text-base">Criar Pedido</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <CardsTab 
                  cards={cartoesGerados}
                  onDownload={handleDownloadPlanilha}
                  onUpload={handleUploadPlanilha}
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
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Nome</TableHead>
                          <TableHead>Nome Completo</TableHead>
                          <TableHead>Matrícula</TableHead>
                          <TableHead>Foto</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentEmployees.length > 0 ? (
                          currentEmployees.map((employee) => (
                            <TableRow key={employee.id} className="hover:bg-brand-primary/5">
                              <TableCell className="font-medium">{employee.nome.split(' ')[0]}</TableCell>
                              <TableCell>{employee.nome}</TableCell>
                              <TableCell>
                                <span className={`${employee.matricula.startsWith('3') ? 'text-brand-primary' : 'text-blue-600'} font-medium`}>
                                  {employee.matricula}
                                </span>
                              </TableCell>
                              <TableCell>
                                {employee.foto ? (
                                  <span className="text-green-600 font-medium">Sim</span>
                                ) : (
                                  <span className="text-red-600 font-medium">Não</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
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
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDeleteUploadedEmployee(employee.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                              Nenhum cartão encontrado
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => goToPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {renderPaginationItems()}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
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
                  
                  <div className="relative w-full mb-6">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Buscar por nome ou matrícula..."
                      className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#52aa85]"
                      value={linkSearch}
                      onChange={(e) => setLinkSearch(e.target.value)}
                    />
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Nome</TableHead>
                          <TableHead>Nome Completo</TableHead>
                          <TableHead>Matrícula</TableHead>
                          <TableHead>Tipo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLinkUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.primeiroNome}</TableCell>
                            <TableCell>{user.nome}</TableCell>
                            <TableCell>{user.matricula}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                user.tipo === "Light" 
                                  ? "bg-green-50 text-green-700" 
                                  : "bg-blue-50 text-blue-700"
                              }`}>
                                {user.tipo}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button 
                      variant="orange" 
                      size="lg" 
                      onClick={handleSubmitOrder}
                      className="px-8"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      ENVIAR PEDIDO
                    </Button>
                  </div>
                </div>
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArea;
