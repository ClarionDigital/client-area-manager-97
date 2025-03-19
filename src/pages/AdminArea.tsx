
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, Download, FileText, Trash2, Upload, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import Header from "@/components/Header";
import CardList from "@/components/admin/CardList";
import CardGrid from "@/components/admin/CardGrid";
import SearchFilters from "@/components/admin/SearchFilters";
import CardDetail from "@/components/admin/CardDetail";
import UploadSpreadsheet from "@/components/admin/UploadSpreadsheet";
import FinancialStats from "@/components/admin/FinancialStats";
import WalletManagement from "@/components/admin/WalletManagement";

// Sample data
import { CardData, TransactionData, CardDataWithPhoto } from "@/types/admin";

const segundasVias: CardData[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", data: "12/05/2023", status: "Pago", valor: "R$ 35,00", tipo: "Light" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", data: "15/05/2023", status: "Pago", valor: "R$ 45,00", tipo: "Light" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", data: "18/05/2023", status: "Pendente", valor: "R$ 35,00", tipo: "Conecta" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", data: "20/05/2023", status: "Pago", valor: "R$ 35,00", tipo: "Light" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", data: "22/05/2023", status: "Cancelado", valor: "R$ 45,00", tipo: "Conecta" },
  { id: 6, nome: "Fernanda Lima", matricula: "3025467", data: "25/05/2023", status: "Pago", valor: "R$ 35,00", tipo: "Light" },
  { id: 7, nome: "Ricardo Souza", matricula: "7056234", data: "26/05/2023", status: "Pendente", valor: "R$ 45,00", tipo: "Conecta" },
  { id: 8, nome: "Juliana Alves", matricula: "3037654", data: "27/05/2023", status: "Pago", valor: "R$ 35,00", tipo: "Light" },
  { id: 9, nome: "Eduardo Mendes", matricula: "7069872", data: "28/05/2023", status: "Cancelado", valor: "R$ 35,00", tipo: "Conecta" },
  { id: 10, nome: "Patrícia Rocha", matricula: "3045678", data: "29/05/2023", status: "Pago", valor: "R$ 45,00", tipo: "Light" },
];

const dadosCartoes: CardDataWithPhoto[] = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", data: "12/05/2023", status: "Ativo", valor: "R$ 35,00" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light", data: "15/05/2023", status: "Ativo", valor: "R$ 45,00" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta", data: "18/05/2023", status: "Pendente", valor: "R$ 35,00" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light", data: "20/05/2023", status: "Ativo", valor: "R$ 35,00" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta", data: "22/05/2023", status: "Inativo", valor: "R$ 45,00" },
  { id: 6, nome: "Fernanda Lima", matricula: "3025467", cargo: "Diretora", setor: "Comercial", validade: "12/2024", foto: true, tipo: "Light", data: "25/05/2023", status: "Ativo", valor: "R$ 35,00" },
];

const transacoes: TransactionData[] = [
  { id: 3582, cliente: "Maria Santos", valor: "R$ 45,00", data: "22/05/2023", status: "Confirmado", metodo: "Cartão" },
  { id: 3581, cliente: "João Silva", valor: "R$ 35,00", data: "21/05/2023", status: "Confirmado", metodo: "Pix" },
  { id: 3580, cliente: "Ana Oliveira", valor: "R$ 35,00", data: "20/05/2023", status: "Pendente", metodo: "Pix" },
  { id: 3579, cliente: "Carlos Eduardo", valor: "R$ 45,00", data: "19/05/2023", status: "Cancelado", metodo: "Cartão" },
  { id: 3578, cliente: "Patrícia Rocha", valor: "R$ 45,00", data: "18/05/2023", status: "Confirmado", metodo: "Pix" },
  { id: 3577, cliente: "Ricardo Souza", valor: "R$ 35,00", data: "17/05/2023", status: "Pendente", metodo: "Cartão" },
  { id: 3576, cliente: "Juliana Alves", valor: "R$ 45,00", data: "16/05/2023", status: "Confirmado", metodo: "Pix" },
];

const AdminArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [visualizarId, setVisualizarId] = useState<number | null>(null);
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "grade">("lista");
  const [activeTab, setActiveTab] = useState("cartoes");
  
  const filtrarCartoes = () => {
    return cartoesGerados.filter(cartao => 
      (busca === "" || 
        cartao.nome.toLowerCase().includes(busca.toLowerCase()) || 
        cartao.matricula.includes(busca)) &&
      (filtroStatus === "" || cartao.status === filtroStatus) &&
      (filtroTipo === "" || cartao.tipo === filtroTipo)
    );
  };
  
  const cartoesFiltrados = filtrarCartoes();
  
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
  
  const cartaoSelecionado = visualizarId ? cartoesGerados.find(cartao => cartao.id === visualizarId) : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary/5 to-brand-primary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header 
          title="ÁREA LIGHT ADM" 
          subtitle="Gerenciamento de cartões, segundas vias e controle financeiro"
        />
        
        <Card className="border-brand-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-darkest text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Painel de Controle</CardTitle>
            <CardDescription className="text-white/80">
              Gerencie segundas vias, cartões e controle financeiro
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="cartoes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="cartoes" className="text-sm md:text-base">Cartões Gerados</TabsTrigger>
                <TabsTrigger value="dados" className="text-sm md:text-base">Dados e Cartões</TabsTrigger>
                <TabsTrigger value="financeiro" className="text-sm md:text-base">Financeiro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Segundas Vias Geradas</h3>
                    <p className="text-sm text-gray-500">
                      Lista de todos os cartões gerados pelo sistema
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => window.print()}>
                      <FileText className="mr-2 h-4 w-4" />
                      Relatório
                    </Button>
                    
                    <UploadSpreadsheet onUpload={handleUploadPlanilha} />
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setModoVisualizacao(modoVisualizacao === "lista" ? "grade" : "lista")}
                    >
                      {modoVisualizacao === "lista" ? (
                        <><Eye className="mr-2 h-4 w-4" />Visualização em Grade</>
                      ) : (
                        <><FileText className="mr-2 h-4 w-4" />Visualização em Lista</>
                      )}
                    </Button>
                  </div>
                </div>
                
                <SearchFilters 
                  search={busca}
                  onSearchChange={setBusca}
                  statusFilter={filtroStatus}
                  onStatusFilterChange={setFiltroStatus}
                  typeFilter={filtroTipo}
                  onTypeFilterChange={setFiltroTipo}
                />
                
                {modoVisualizacao === "lista" ? (
                  <CardList 
                    cards={cartoesFiltrados}
                    onView={setVisualizarId}
                    onConfirmPayment={handleConfirmarPagamento}
                    onDelete={handleExcluirCartao}
                  />
                ) : (
                  <CardGrid 
                    cards={cartoesFiltrados}
                    onView={setVisualizarId}
                    onConfirmPayment={handleConfirmarPagamento}
                    onDelete={handleExcluirCartao}
                  />
                )}
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadPlanilha}
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar dados
                  </Button>
                </div>

                {/* Card Detail Dialog */}
                <Dialog open={visualizarId !== null} onOpenChange={(open) => !open && setVisualizarId(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Visualizar Cartão</DialogTitle>
                    </DialogHeader>
                    {cartaoSelecionado && (
                      <CardDetail 
                        card={cartaoSelecionado} 
                        onConfirmPayment={handleConfirmarPagamento} 
                      />
                    )}
                    <DialogFooter>
                      <Button onClick={() => setVisualizarId(null)}>Fechar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>
              
              <TabsContent value="dados" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Dados e Cartões</h3>
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadPlanilha}
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Baixar Planilha
                  </Button>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cartões Cadastrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader className="bg-brand-primary/10">
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Matrícula</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Setor</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Foto</TableHead>
                            <TableHead>Validade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dadosCartoes.map((cartao) => (
                            <TableRow key={cartao.id}>
                              <TableCell className="font-medium">{cartao.nome}</TableCell>
                              <TableCell>{cartao.matricula}</TableCell>
                              <TableCell>{cartao.cargo}</TableCell>
                              <TableCell>{cartao.setor}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  cartao.tipo === 'Light' 
                                    ? 'bg-brand-primary/20 text-brand-primaryDark' 
                                    : 'bg-brand-accent/20 text-brand-accent'
                                }`}>
                                  {cartao.tipo}
                                </span>
                              </TableCell>
                              <TableCell>
                                {cartao.foto 
                                  ? <span className="text-green-600">Sim</span> 
                                  : <span className="text-red-600">Não</span>}
                              </TableCell>
                              <TableCell>{cartao.validade}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upload de Imagens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {dadosCartoes.filter(c => !c.foto).map((cartao) => (
                        <div key={cartao.id} className="border rounded-md p-4 flex items-center space-x-3">
                          <div className="bg-gray-200 w-12 h-16 flex items-center justify-center text-gray-400 rounded-md">
                            <Upload className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{cartao.nome}</p>
                            <p className="text-xs text-gray-600">Mat: {cartao.matricula}</p>
                            <p className="text-xs text-gray-600">{cartao.cargo}</p>
                            <Button size="sm" className="mt-2 bg-brand-primary hover:bg-brand-primaryDark text-xs">
                              Enviar Foto
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="financeiro" className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Financeiro</h3>
                
                <FinancialStats
                  totalReceived="R$ 3.785,00"
                  pendingAmount="R$ 420,00"
                  pendingTransactions={12}
                  cardsIssued={128}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Últimas Transações</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Cliente</TableHead>
                              <TableHead>Valor</TableHead>
                              <TableHead>Data</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Método</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transacoes.map((transacao) => (
                              <TableRow key={transacao.id} className="hover:bg-gray-50">
                                <TableCell className="font-medium">#{transacao.id}</TableCell>
                                <TableCell>{transacao.cliente}</TableCell>
                                <TableCell>{transacao.valor}</TableCell>
                                <TableCell>{transacao.data}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    transacao.status === 'Confirmado' 
                                      ? 'bg-green-100 text-green-800' 
                                      : transacao.status === 'Pendente'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {transacao.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    transacao.metodo === 'Pix' 
                                      ? 'bg-brand-primary/20 text-brand-primaryDark' 
                                      : 'bg-brand-secondary/20 text-brand-accent'
                                  }`}>
                                    {transacao.metodo}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <WalletManagement />
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
