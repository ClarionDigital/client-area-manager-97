
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
import { ArrowLeft, Download, FileText, Search, Trash2, Eye, Upload, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados simulados para demonstração
const segundasVias = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", data: "12/05/2023", status: "Pago", valor: "R$ 35,00" },
  { id: 2, nome: "Maria Santos", matricula: "3018756", data: "15/05/2023", status: "Pago", valor: "R$ 45,00" },
  { id: 3, nome: "José Oliveira", matricula: "7042389", data: "18/05/2023", status: "Pendente", valor: "R$ 35,00" },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", data: "20/05/2023", status: "Pago", valor: "R$ 35,00" },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", data: "22/05/2023", status: "Cancelado", valor: "R$ 45,00" },
];

const AdminArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [visualizarId, setVisualizarId] = useState<number | null>(null);
  const [cartoesGerados, setCartoesGerados] = useState(segundasVias);
  
  // Função para filtrar os dados
  const filtrarCartoes = () => {
    return cartoesGerados.filter(cartao => 
      (busca === "" || 
        cartao.nome.toLowerCase().includes(busca.toLowerCase()) || 
        cartao.matricula.includes(busca)) &&
      (filtroStatus === "" || cartao.status === filtroStatus)
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
  
  const cartaoSelecionado = visualizarId ? cartoesGerados.find(cartao => cartao.id === visualizarId) : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4 md:p-8">
      <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início
      </Button>
      
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Área Light ADM</CardTitle>
            <CardDescription>
              Gerencie cartões, segundas vias e controle financeiro
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="cartoes">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="cartoes">Cartões Gerados</TabsTrigger>
                <TabsTrigger value="busca">Busca Avançada</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartoes" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Segundas Vias Geradas</h3>
                    <p className="text-sm text-gray-500">
                      Lista de todos os cartões gerados pelo sistema
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.print()}>
                      <FileText className="mr-2 h-4 w-4" />
                      Relatório
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
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
                          <Button onClick={handleUploadPlanilha}>Enviar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartoesFiltrados.length > 0 ? (
                        cartoesFiltrados.map((cartao) => (
                          <TableRow key={cartao.id}>
                            <TableCell className="font-medium">{cartao.nome}</TableCell>
                            <TableCell>{cartao.matricula}</TableCell>
                            <TableCell>{cartao.data}</TableCell>
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
                                    <Button variant="outline" size="sm" onClick={() => setVisualizarId(cartao.id)}>
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
                                        <div className="bg-white border rounded-lg p-4 max-w-xs mx-auto">
                                          <div className="bg-blue-700 text-white text-center py-2 rounded-t-md">
                                            {cartaoSelecionado.matricula.startsWith('3') ? 'LIGHT' : 'CONECTA'}
                                          </div>
                                          <div className="flex p-4">
                                            <div className="bg-gray-200 w-24 h-32 mr-4 flex items-center justify-center text-gray-400">
                                              FOTO
                                            </div>
                                            <div className="space-y-2">
                                              <p className="font-bold">{cartaoSelecionado.nome}</p>
                                              <p className="text-sm text-gray-600">Matrícula: {cartaoSelecionado.matricula}</p>
                                              <p className="text-sm text-gray-600">Cargo: Analista</p>
                                              <p className="text-sm text-gray-600">Validade: 12/2024</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <Button onClick={() => setVisualizarId(null)}>Fechar</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="text-red-500">
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
                          <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                            Nenhum cartão encontrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar dados
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="busca" className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Busca Avançada</h3>
                
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
                        <Input id="busca-data-inicio" type="date" />
                        <Input id="busca-data-fim" type="date" />
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
                  <Button variant="outline">Limpar</Button>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="financeiro" className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Financeiro</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Recebido</CardDescription>
                      <CardTitle className="text-2xl">R$ 3.785,00</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        Últimos 30 dias
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Pendente</CardDescription>
                      <CardTitle className="text-2xl">R$ 420,00</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        12 transações
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Cartões Emitidos</CardDescription>
                      <CardTitle className="text-2xl">128</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500">
                        Mês atual
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-medium">Últimas transações</h4>
                    <Button variant="outline" size="sm">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Relatório Financeiro
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
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
                        <TableRow>
                          <TableCell className="font-medium">#3582</TableCell>
                          <TableCell>Maria Santos</TableCell>
                          <TableCell>R$ 45,00</TableCell>
                          <TableCell>22/05/2023</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Confirmado
                            </span>
                          </TableCell>
                          <TableCell>Cartão</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">#3581</TableCell>
                          <TableCell>João Silva</TableCell>
                          <TableCell>R$ 35,00</TableCell>
                          <TableCell>21/05/2023</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Confirmado
                            </span>
                          </TableCell>
                          <TableCell>Pix</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">#3580</TableCell>
                          <TableCell>Ana Oliveira</TableCell>
                          <TableCell>R$ 35,00</TableCell>
                          <TableCell>20/05/2023</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pendente
                            </span>
                          </TableCell>
                          <TableCell>Pix</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">#3579</TableCell>
                          <TableCell>Carlos Eduardo</TableCell>
                          <TableCell>R$ 45,00</TableCell>
                          <TableCell>19/05/2023</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Cancelado
                            </span>
                          </TableCell>
                          <TableCell>Cartão</TableCell>
                        </TableRow>
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
