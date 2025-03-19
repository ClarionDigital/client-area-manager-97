import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BarChart, Download, Users, CreditCard, AlertTriangle, MessageSquare, Plus, Settings, ChevronRight, Bell, BarChart2, Minimize2, Calendar, Cpu, Globe, Shield, Mail, Smartphone, FileText, RefreshCw, Activity, Lock, FileSpreadsheet, Layers, Image, Book, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados simulados
const estatisticas = {
  hoje: { cartoes: 12, receita: 480, pendentes: 3 },
  semana: { cartoes: 78, receita: 2940, pendentes: 15 },
  mes: { cartoes: 245, receita: 9275, pendentes: 42 },
  total: { cartoes: 3210, receita: 124785, pendentes: 156 }
};

const segundasVias = [
  { id: 1, nome: "Carlos Silva", matricula: "3001245", data: "12/05/2023", status: "Pago", tipo: "Light", quantidade: 2 },
  { id: 2, nome: "Maria Santos", matricula: "3018756", data: "15/05/2023", status: "Pago", tipo: "Light", quantidade: 1 },
  { id: 3, nome: "José Oliveira", matricula: "7042389", data: "18/05/2023", status: "Pendente", tipo: "Conecta", quantidade: 1 },
  { id: 4, nome: "Ana Rodrigues", matricula: "3021567", data: "20/05/2023", status: "Pago", tipo: "Light", quantidade: 3 },
  { id: 5, nome: "Paulo Costa", matricula: "7031298", data: "22/05/2023", status: "Cancelado", tipo: "Conecta", quantidade: 1 },
];

// Histórico de eventos do sistema
const eventosHistorico = [
  { id: 1, tipo: "Novo cartão", data: "30/05/2023 14:32", usuario: "admin", mensagem: "Cartão gerado para Maria Santos" },
  { id: 2, tipo: "Pagamento", data: "30/05/2023 10:15", usuario: "financeiro", mensagem: "Pagamento confirmado: ID #3582" },
  { id: 3, tipo: "API", data: "29/05/2023 18:45", usuario: "sistema", mensagem: "Integração MinIO sincronizada" },
  { id: 4, tipo: "Whatsapp", data: "29/05/2023 16:20", usuario: "sistema", mensagem: "25 mensagens enviadas" },
  { id: 5, tipo: "Login", data: "29/05/2023 09:10", usuario: "gerente", mensagem: "Login realizado com sucesso" },
];

// Taxas de conversão
const conversoes = {
  visitantes: 1250,
  inicios: 420,
  finalizados: 245,
  taxa: 58.3
};

const AdminAltArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [periodoEstatisticas, setPeriodoEstatisticas] = useState("semana");
  const [modoManutencao, setModoManutencao] = useState(false);
  const [menuNotificacoes, setMenuNotificacoes] = useState(false);
  
  const handleEnviarMensagem = () => {
    toast({
      title: "Mensagem enviada",
      description: "As mensagens foram enviadas para os clientes selecionados"
    });
  };
  
  const handleCriarAcesso = () => {
    toast({
      title: "Novo acesso criado",
      description: "O usuário receberá as credenciais por e-mail"
    });
  };

  const handleModoManutencao = () => {
    setModoManutencao(!modoManutencao);
    toast({
      title: modoManutencao ? "Modo manutenção desativado" : "Modo manutenção ativado",
      description: modoManutencao ? "O sistema está acessível para todos os usuários" : "O sistema está em manutenção e inacessível para usuários comuns"
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "O backup do banco de dados foi iniciado e será concluído em breve"
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="outline" size="icon" onClick={() => setMenuNotificacoes(!menuNotificacoes)}>
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            {menuNotificacoes && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-2 z-50">
                <h4 className="text-sm font-medium p-2">Notificações</h4>
                <div className="space-y-2 max-h-64 overflow-auto">
                  <div className="bg-yellow-50 p-2 rounded-md">
                    <p className="text-xs font-medium">Pagamento pendente</p>
                    <p className="text-xs text-gray-600">3 cartões aguardando pagamento</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-md">
                    <p className="text-xs font-medium">Sincronização API</p>
                    <p className="text-xs text-gray-600">API WhatsApp sincronizada com sucesso</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded-md">
                    <p className="text-xs font-medium">Backup concluído</p>
                    <p className="text-xs text-gray-600">Backup diário finalizado às 03:00</p>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-xs">Ver todas</Button>
                </div>
              </div>
            )}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" /> Configurações
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Configurações do Sistema</DialogTitle>
                <DialogDescription>
                  Ajuste as configurações gerais do sistema
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Modo Manutenção</h4>
                    <p className="text-xs text-gray-600">Bloqueia o acesso de usuários comuns</p>
                  </div>
                  <Switch checked={modoManutencao} onCheckedChange={handleModoManutencao} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Notificações por E-mail</h4>
                    <p className="text-xs text-gray-600">Envia resumos diários por e-mail</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Backup Automático</h4>
                    <p className="text-xs text-gray-600">Realiza backup do banco de dados</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Modo Escuro</h4>
                    <p className="text-xs text-gray-600">Alterna para o tema escuro</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Área ADM Alternativa</CardTitle>
            <CardDescription>
              Estatísticas, integrações e gerenciamento avançado do sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="estatisticas">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 mb-8">
                <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                <TabsTrigger value="cartoes">Dados e Cartões</TabsTrigger>
                <TabsTrigger value="integracao">Integrações</TabsTrigger>
                <TabsTrigger value="acesso">Controle de Acesso</TabsTrigger>
                <TabsTrigger value="sistema">Sistema</TabsTrigger>
              </TabsList>
              
              <TabsContent value="estatisticas" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Painel de Estatísticas</h3>
                    <p className="text-sm text-gray-500">
                      Análise de desempenho e métricas do sistema
                    </p>
                  </div>
                  
                  <Select value={periodoEstatisticas} onValueChange={setPeriodoEstatisticas}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="semana">Esta semana</SelectItem>
                      <SelectItem value="mes">Este mês</SelectItem>
                      <SelectItem value="total">Total</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardDescription>Cartões Emitidos</CardDescription>
                      <CardTitle className="text-3xl">
                        {estatisticas[periodoEstatisticas as keyof typeof estatisticas].cartoes}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-600">
                        {periodoEstatisticas === 'hoje' ? 'Nas últimas 24h' :
                         periodoEstatisticas === 'semana' ? 'Nos últimos 7 dias' :
                         periodoEstatisticas === 'mes' ? 'Nos últimos 30 dias' : 'Desde o início'}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader className="pb-2">
                      <CardDescription>Receita Total</CardDescription>
                      <CardTitle className="text-3xl">
                        R$ {estatisticas[periodoEstatisticas as keyof typeof estatisticas].receita.toLocaleString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-600">
                        Ticket médio: R$ {Math.round(estatisticas[periodoEstatisticas as keyof typeof estatisticas].receita / 
                                               estatisticas[periodoEstatisticas as keyof typeof estatisticas].cartoes)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <CardHeader className="pb-2">
                      <CardDescription>Pagamentos Pendentes</CardDescription>
                      <CardTitle className="text-3xl">
                        {estatisticas[periodoEstatisticas as keyof typeof estatisticas].pendentes}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-600">
                        {Math.round((estatisticas[periodoEstatisticas as keyof typeof estatisticas].pendentes / 
                                    estatisticas[periodoEstatisticas as keyof typeof estatisticas].cartoes) * 100)}% do total
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Distribuição por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <div className="relative h-40 w-40">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-sm text-gray-500">Total</div>
                              <div className="text-2xl font-bold">245</div>
                            </div>
                          </div>
                          {/* Círculo externo representando o gráfico de pizza */}
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="188.5 251.3" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#06b6d4" strokeWidth="20" strokeDasharray="62.8 251.3" strokeDashoffset="-188.5" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-center gap-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm">Light (75%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                          <span className="text-sm">Conecta (25%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Emissões por Dia</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2 pt-6 px-2">
                        {[15, 23, 18, 25, 32, 28, 20].map((value, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div 
                              className="bg-emerald-500 rounded-t-sm w-8" 
                              style={{ height: `${value * 2}px` }}
                            ></div>
                            <div className="text-xs mt-2">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-emerald-600" />
                        Taxa de Conversão
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">{conversoes.taxa}%</div>
                        <p className="text-sm text-gray-500">Taxa de finalização</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Visitantes</span>
                            <span className="font-medium">{conversoes.visitantes}</span>
                          </div>
                          <Progress value={100} className="h-2 bg-gray-100" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Iniciaram cadastro</span>
                            <span className="font-medium">{conversoes.inicios}</span>
                          </div>
                          <Progress value={(conversoes.inicios/conversoes.visitantes)*100} className="h-2 bg-gray-100" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Finalizaram</span>
                            <span className="font-medium">{conversoes.finalizados}</span>
                          </div>
                          <Progress value={(conversoes.finalizados/conversoes.visitantes)*100} className="h-2 bg-gray-100" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-blue-600" />
                        Comunicações Recentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="text-sm">
                        <div className="flex justify-between items-center px-6 py-3 border-b">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>E-mails enviados</span>
                          </div>
                          <span className="font-medium">152</span>
                        </div>
                        <div className="flex justify-between items-center px-6 py-3 border-b">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-4 w-4 text-gray-500" />
                            <span>Mensagens WhatsApp</span>
                          </div>
                          <span className="font-medium">86</span>
                        </div>
                        <div className="flex justify-between items-center px-6 py-3 border-b">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span>Notificações sistema</span>
                          </div>
                          <span className="font-medium">43</span>
                        </div>
                        <div className="flex justify-between items-center px-6 py-3">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span>Falhas de entrega</span>
                          </div>
                          <span className="font-medium">7</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        Ver relatório detalhado
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                        Atividade Recente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-64 overflow-auto p-0">
                      <div className="text-sm">
                        {eventosHistorico.map((evento) => (
                          <div key={evento.id} className="px-6 py-3 border-b last:border-0">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{evento.tipo}</span>
                              <span className="text-xs text-gray-500">{evento.data}</span>
                            </div>
                            <p className="text-gray-600 text-xs">{evento.mensagem}</p>
                            <p className="text-gray-400 text-xs mt-1">por {evento.usuario}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        Ver histórico completo
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="cartoes" className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Gestão de Dados e Cartões</h3>
                    <p className="text-sm text-gray-500">
                      Visualize e gerencie todos os dados do sistema
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Enviar Mensagens
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Enviar Mensagens</DialogTitle>
                          <DialogDescription>
                            Envie notificações por e-mail ou WhatsApp para os clientes.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Tipo de Mensagem</Label>
                            <div className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="tipo-email" checked className="rounded" />
                                <Label htmlFor="tipo-email">E-mail</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="tipo-whatsapp" checked className="rounded" />
                                <Label htmlFor="tipo-whatsapp">WhatsApp</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Destinatários</Label>
                            <Select defaultValue="pendentes">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione os destinatários" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todos">Todos os clientes</SelectItem>
                                <SelectItem value="pendentes">Pagamentos pendentes</SelectItem>
                                <SelectItem value="recentes">Cadastros recentes</SelectItem>
                                <SelectItem value="selecionados">Clientes selecionados</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="mensagem">Mensagem</Label>
                            <textarea 
                              id="mensagem"
                              rows={4}
                              className="w-full p-2 border rounded-md"
                              defaultValue="Olá [nome], informamos que seu crachá está disponível. Para mais informações acesse o sistema."
                            ></textarea>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancelar</Button>
                          <Button onClick={handleEnviarMensagem}>Enviar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Lista de Segundas Vias</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nome</TableHead>
                              <TableHead>Matrícula</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>Data</TableHead>
                              <TableHead>Quantidade</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {segundasVias.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.nome}</TableCell>
                                <TableCell>{item.matricula}</TableCell>
                                <TableCell>{item.tipo}</TableCell>
                                <TableCell>{item.data}</TableCell>
                                <TableCell>{item.quantidade}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    item.status === 'Pago' 
                                      ? 'bg-green-100 text-green-800' 
                                      : item.status === 'Pendente'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {item.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Cartões Gerados sem Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nome</TableHead>
                              <TableHead>Matrícula</TableHead>
                              <TableHead>Data</TableHead>
                              <TableHead>Valor</TableHead>
                              <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">José Oliveira</TableCell>
                              <TableCell>7042389</TableCell>
                              <TableCell>18/05/2023</TableCell>
                              <TableCell>R$ 35,00</TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Lembrete
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Fernanda Lima</TableCell>
                              <TableCell>3052147</TableCell>
                              <TableCell>20/05/2023</TableCell>
                              <TableCell>R$ 45,00</TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Lembrete
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="integracao" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Integrações</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Configure as integrações com APIs externas e serviços
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Integração ASAAS
                        </CardTitle>
                        <CardDescription>
                          Processamento de pagamentos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="asaas-api">API Key</Label>
                            <Input id="asaas-api" type="password" value="**********************" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="asaas-ambiente">Ambiente</Label>
                            <Select defaultValue="producao">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o ambiente" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sandbox">Sandbox</SelectItem>
                                <SelectItem value="producao">Produção</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="bg-green-50 border border-green-200 p-3 rounded-md flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-green-700">Integração ativa</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" fill="#EAF3FF"/>
                            <path d="M9 8.5C8.17157 8.5 7.5 9.17157 7.5 10C7.5 10.8284 8.17157 11.5 9 11.5H15C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5H9Z" fill="#70C4FF"/>
                            <path d="M9 12.5C8.17157 12.5 7.5 13.1716 7.5 14C7.5 14.8284 8.17157 15
