import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Download, FileText, Search, Trash2, Eye, Upload, DollarSign, CheckCircle, Phone, Clock, ImagePlus, Filter, RefreshCw, UserPlus, FileSpreadsheet, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const segundasVias = [
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

const dadosCartoes = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta" },
  { id: 6, nome: "Fernanda Lima", matricula: "3025467", cargo: "Diretora", setor: "Comercial", validade: "12/2024", foto: true, tipo: "Light" },
];

const transacoes = [
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
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4 md:p-8">
      <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início
      </Button>
      
      <div className="max-w-6xl mx-auto">
        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Área Light ADM</CardTitle>
            <CardDescription className="text-purple-100">
              Gerenciamento de cartões, segundas vias e controle financeiro
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Upload className="mr-2 h-4 w-4" />
                          Importar Planilha
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Importar Planilha</DialogTitle>
                          <DialogDescription>
                            Faça upload de uma planilha com dados para adição de fotos personalizada.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                            <h4 className="text-sm font-medium mb-2">
                              Arraste sua planilha ou clique para fazer upload
                            </h4>
                            <p className="text-xs text-gray-500 mb-4">
                              Formatos suportados: xlsx, csv
                            </p>
                            <Input type="file" className="hidden" id="planilha" />
                            <Label htmlFor="planilha" className="cursor-pointer">
                              <Button variant="outline" size="sm">Selecionar Arquivo</Button>
                            </Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancelar</Button>
                          <Button onClick={handleUploadPlanilha} className="bg-purple-600 hover:bg-purple-700">Enviar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 flex items-center relative">
                    <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nome ou matrícula"
                      className="pl-9"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger className="w-full md:w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos</SelectItem>
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                      <SelectTrigger className="w-full md:w-[140px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos</SelectItem>
                        <SelectItem value="Light">Light</SelectItem>
                        <SelectItem value="Conecta">Conecta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {modoVisualizacao === "lista" ? (
                  <div className="rounded-md border bg-white shadow-sm">
                    <Table>
                      <TableHeader className="bg-purple-50">
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Matrícula</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartoesFiltrados.length > 0 ? (
                          cartoesFiltrados.map((cartao) => (
                            <TableRow key={cartao.id} className="hover:bg-purple-50">
                              <TableCell className="font-medium">{cartao.nome}</TableCell>
                              <TableCell>
                                <span className={`${cartao.matricula.startsWith('3') ? 'text-blue-600' : 'text-green-600'} font-medium`}>
                                  {cartao.matricula}
                                </span>
                              </TableCell>
                              <TableCell>{cartao.data}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  cartao.tipo === 'Light' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {cartao.tipo}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  cartao.status === 'Pago' 
                                    ? 'bg-green-100 text-green-800' 
                                    : cartao.status === 'Pendente'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                }`}>
                                  {cartao.status}
                                </span>
                              </TableCell>
                              <TableCell>{cartao.valor}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setVisualizarId(cartao.id)}>
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Visualizar Cartão</DialogTitle>
                                        <DialogDescription>
                                          Detalhes do cartão gerado
                                        </DialogDescription>
                                      </DialogHeader>
                                      {cartaoSelecionado && (
                                        <div className="py-4">
                                          <div className="bg-white border rounded-lg p-4 max-w-xs mx-auto shadow-md">
                                            <div className={`${cartaoSelecionado.tipo === 'Light' ? 'bg-blue-700' : 'bg-green-700'} text-white text-center py-2 rounded-t-md font-bold`}>
                                              {cartaoSelecionado.tipo}
                                            </div>
                                            <div className="flex p-4">
                                              <div className="bg-gray-200 w-24 h-32 mr-4 flex items-center justify-center text-gray-400 rounded-md">
                                                <ImagePlus className="h-8 w-8" />
                                              </div>
                                              <div className="space-y-2">
                                                <p className="font-bold">{cartaoSelecionado.nome}</p>
                                                <p className="text-sm text-gray-600">Matrícula: {cartaoSelecionado.matricula}</p>
                                                <p className="text-sm text-gray-600">Cargo: Analista</p>
                                                <p className="text-sm text-gray-600">Validade: 12/2024</p>
                                                <p className="text-sm">
                                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    cartaoSelecionado.status === 'Pago' 
                                                      ? 'bg-green-100 text-green-800' 
                                                      : cartaoSelecionado.status === 'Pendente'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                  }`}>
                                                    {cartaoSelecionado.status}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {cartaoSelecionado.status === "Pendente" && (
                                            <div className="mt-4 flex justify-center">
                                              <Button 
                                                onClick={() => {
                                                  handleConfirmarPagamento(cartaoSelecionado.id);
                                                  setVisualizarId(null);
                                                }}
                                                className="bg-green-600 hover:bg-green-700"
                                              >
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Confirmar Pagamento
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button onClick={() => setVisualizarId(null)}>Fechar</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  {cartao.status === "Pendente" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={() => handleConfirmarPagamento(cartao.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  )}
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Excluir cartão?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Esta ação não pode ser desfeita. Este cartão será permanentemente excluído 
                                          do sistema e não poderá ser recuperado.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleExcluirCartao(cartao.id)} 
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          Excluir
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                              Nenhum cartão encontrado
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cartoesFiltrados.length > 0 ? (
                      cartoesFiltrados.map((cartao) => (
                        <Card key={cartao.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                          <div className={`${cartao.tipo === 'Light' ? 'bg-blue-700' : 'bg-green-700'} text-white text-center py-2 font-bold`}>
                            {cartao.tipo}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <div className="bg-gray-200 w-16 h-20 flex items-center justify-center text-gray-400 rounded-md mt-2">
                                <ImagePlus className="h-6 w-6" />
                              </div>
                              <div className="space-y-1 flex-1">
                                <p className="font-bold truncate">{cartao.nome}</p>
                                <p className="text-sm text-gray-600">Mat: {cartao.matricula}</p>
                                <p className="text-sm text-gray-600">Data: {cartao.data}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    cartao.status === 'Pago' 
                                      ? 'bg-green-100 text-green-800' 
                                      : cartao.status === 'Pendente'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {cartao.status}
                                  </span>
                                  <span className="font-medium text-sm">{cartao.valor}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-3">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setVisualizarId(cartao.id)}>
                                    <Eye className="h-3 w-3 mr-1" />
                                    Ver
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  {/* Conteúdo do diálogo - igual ao já definido acima */}
                                </DialogContent>
                              </Dialog>
                              
                              {cartao.status === "Pendente" && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                  onClick={() => handleConfirmarPagamento(cartao.id)}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Pago
                                </Button>
                              )}
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Excluir
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  {/* Conteúdo do alerta - igual ao já definido acima */}
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-6 text-gray-500 bg-white rounded-md border">
                        Nenhum cartão encontrado
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar dados
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="dados" className="space-y-6 bg-white p-6 rounded-md shadow-sm border">
                <h3 className="text-lg font-medium mb-4">Gerenciamento de Dados</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="busca-nome">Nome</Label>
                      <Input id="busca-nome" placeholder="Digite o nome completo" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="busca-matricula">Matrícula</Label>
                      <Input id="busca-matricula" placeholder="Digite a matrícula" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="busca-data">Data de Emissão</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          id="data-inicio" 
                          type="date" 
                          value={dataInicio}
                          onChange={(e) => setDataInicio(e.target.value)}
                        />
                        <Input 
                          id="data-fim" 
                          type="date"
                          value={dataFim}
                          onChange={(e) => setDataFim(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="status-pago" className="rounded" />
                          <Label htmlFor="status-pago">Pago</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="status-pendente" className="rounded" />
                          <Label htmlFor="status-pendente">Pendente</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="status-cancelado" className="rounded" />
                          <Label htmlFor="status-cancelado">Cancelado</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tipo-light" className="rounded" />
                          <Label htmlFor="tipo-light">Light</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="tipo-conecta" className="rounded" />
                          <Label htmlFor="tipo-conecta">Conecta</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Produto</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="produto-basico" className="rounded" />
                          <Label htmlFor="produto-basico">Básico</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="produto-kit" className="rounded" />
                          <Label htmlFor="produto-kit">Kit Completo</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Limpar
                  </Button>
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <Search className="h-4 w-4" />
                    Buscar
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="financeiro" className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Financeiro</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="border-green-200 hover:border-green-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Recebido</CardDescription>
                      <CardTitle className="text-2xl text-green-600">R$ 3.785,00</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Últimos 30 dias
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-yellow-200 hover:border-yellow-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardDescription>Pendente</CardDescription>
                      <CardTitle className="text-2xl text-yellow-600">R$ 420,00</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        12 transações
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardDescription>Cartões Emitidos</CardDescription>
                      <CardTitle className="text-2xl text-blue-600">128</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        Mês atual
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4 bg-white p-6 rounded-md shadow-sm border">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-medium">Últimas transações</h4>
                    <Button variant="outline" size="sm" className="gap-2">
                      <DollarSign className="h-4 w-4" />
                      Relatório Financeiro
                    </Button>
                  </div>
                  
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
                          <TableHead className="text-right">Ações</TableHead>
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
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {transacao.metodo}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="gap-2 w-full md:w-auto">
                      <Filter className="h-4 w-4" />
                      Filtrar Transações
                    </Button>
                  </div>
                </div>
                
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Adicionar Nova Transação</CardTitle>
                    <CardDescription>
                      Registre manualmente uma nova transação no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="transacao-cliente">Cliente</Label>
                        <div className="flex gap-2">
                          <Input id="transacao-cliente" placeholder="Nome do cliente" />
                          <Button variant="ghost" size="icon" className="h-10 w-10">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="transacao-matricula">Matrícula</Label>
                        <Input id="transacao-matricula" placeholder="Digite a matrícula" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="transacao-valor">Valor</Label>
                        <Input id="transacao-valor" placeholder="R$ 0,00" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="transacao-metodo">Método de Pagamento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um método" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pix">Pix</SelectItem>
                            <SelectItem value="cartao">Cartão</SelectItem>
                            <SelectItem value="boleto">Boleto</SelectItem>
                            <SelectItem value="transferencia">Transferência</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Registrar Transação
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArea;
