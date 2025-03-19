
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, BarChart, Download, Users, CreditCard, AlertTriangle, MessageSquare, Plus, Settings } from "lucide-react";
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

const AdminAltArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [periodoEstatisticas, setPeriodoEstatisticas] = useState("semana");
  
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 p-4 md:p-8">
      <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início
      </Button>
      
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
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                <TabsTrigger value="cartoes">Dados e Cartões</TabsTrigger>
                <TabsTrigger value="integracao">Integrações</TabsTrigger>
                <TabsTrigger value="acesso">Controle de Acesso</TabsTrigger>
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
                            <path d="M9 12.5C8.17157 12.5 7.5 13.1716 7.5 14C7.5 14.8284 8.17157 15.5 9 15.5H15C15.8284 15.5 16.5 14.8284 16.5 14C16.5 13.1716 15.8284 12.5 15 12.5H9Z" fill="#3F83F8"/>
                          </svg>
                          Integração MinIO
                        </CardTitle>
                        <CardDescription>
                          Armazenamento de arquivos e imagens
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="minio-endpoint">Endpoint</Label>
                            <Input id="minio-endpoint" value="https://minio.example.com" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor="minio-access">Access Key</Label>
                              <Input id="minio-access" type="password" value="************" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="minio-secret">Secret Key</Label>
                              <Input id="minio-secret" type="password" value="************" />
                            </div>
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
                            <path d="M21 7.5V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H18.5" stroke="#25D366" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#25D366" strokeWidth="2"/>
                            <path d="M15.5 7.5H18.5V4.5" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          API WhatsApp
                        </CardTitle>
                        <CardDescription>
                          Envio de mensagens e notificações
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="wp-token">Token</Label>
                            <Input id="wp-token" type="password" value="**********************" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wp-numero">Número do WhatsApp</Label>
                            <Input id="wp-numero" value="+5521999998888" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wp-template">Template Padrão</Label>
                            <textarea 
                              id="wp-template"
                              rows={2}
                              className="w-full p-2 border rounded-md"
                              defaultValue="Olá {{1}}, seu crachá está pronto! Acesse: {{2}}"
                            ></textarea>
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
                            <path d="M21 5H3V19H21V5Z" fill="#F3F4F6"/>
                            <path d="M21 5H3V8H21V5Z" fill="#4B5563"/>
                            <circle cx="7" cy="6.5" r="1" fill="white"/>
                            <circle cx="10" cy="6.5" r="1" fill="white"/>
                            <circle cx="13" cy="6.5" r="1" fill="white"/>
                            <path d="M6 12H8V14H6V12Z" fill="#4B5563"/>
                            <path d="M11 12H13V14H11V12Z" fill="#4B5563"/>
                            <path d="M16 12H18V14H16V12Z" fill="#4B5563"/>
                            <path d="M6 16H8V18H6V16Z" fill="#4B5563"/>
                            <path d="M11 16H13V18H11V16Z" fill="#4B5563"/>
                            <path d="M16 16H18V18H16V16Z" fill="#4B5563"/>
                          </svg>
                          WebHooks
                        </CardTitle>
                        <CardDescription>
                          Configuração de callbacks e notificações
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="webhook-url">URL do WebHook</Label>
                            <Input id="webhook-url" value="https://api.example.com/hooks/cartoes" />
                          </div>
                          <div className="space-y-2">
                            <Label>Eventos</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="evento-novo" className="rounded" checked />
                                <Label htmlFor="evento-novo">Novo Cartão</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="evento-pagamento" className="rounded" checked />
                                <Label htmlFor="evento-pagamento">Pagamento</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="evento-cancelamento" className="rounded" />
                                <Label htmlFor="evento-cancelamento">Cancelamento</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id="evento-validade" className="rounded" />
                                <Label htmlFor="evento-validade">Expiração</Label>
                              </div>
                            </div>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm text-amber-700">Última sincronização: há 3 dias</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="acesso" className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Controle de Acesso</h3>
                    <p className="text-sm text-gray-500">
                      Gerencie usuários e permissões do sistema
                    </p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar Novo Usuário</DialogTitle>
                        <DialogDescription>
                          Adicione um novo usuário ao sistema com o nível de acesso desejado.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="usuario-nome">Nome</Label>
                            <Input id="usuario-nome" placeholder="Nome completo" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="usuario-email">E-mail</Label>
                            <Input id="usuario-email" type="email" placeholder="email@exemplo.com" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="usuario-nivel">Nível de Acesso</Label>
                          <Select defaultValue="operacional">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrador</SelectItem>
                              <SelectItem value="gerente">Gerente</SelectItem>
                              <SelectItem value="operacional">Operacional</SelectItem>
                              <SelectItem value="somente-leitura">Somente Leitura</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Permissões</Label>
                          <div className="grid grid-cols-2 gap-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-visualizar" className="rounded" checked />
                              <Label htmlFor="perm-visualizar">Visualizar dados</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-editar" className="rounded" checked />
                              <Label htmlFor="perm-editar">Editar dados</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-financeiro" className="rounded" />
                              <Label htmlFor="perm-financeiro">Financeiro</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-config" className="rounded" />
                              <Label htmlFor="perm-config">Configurações</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancelar</Button>
                        <Button onClick={handleCriarAcesso}>Criar Usuário</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Usuários do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Nível</TableHead>
                            <TableHead>Último Acesso</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Administrador</TableCell>
                            <TableCell>admin@exemplo.com</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Administrador
                              </span>
                            </TableCell>
                            <TableCell>Hoje, 10:45</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Gerente Financeiro</TableCell>
                            <TableCell>financeiro@exemplo.com</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Gerente
                              </span>
                            </TableCell>
                            <TableCell>Ontem, 15:30</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Operador</TableCell>
                            <TableCell>operador@exemplo.com</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Operacional
                              </span>
                            </TableCell>
                            <TableCell>23/05/2023</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Visualizador</TableCell>
                            <TableCell>visualizador@exemplo.com</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Somente Leitura
                              </span>
                            </TableCell>
                            <TableCell>20/05/2023</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="mt-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Validade dos Cartões</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Período de validade padrão</h4>
                                <p className="text-sm text-gray-500">
                                  Prazo de expiração a partir da data de emissão
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input 
                                  type="number" 
                                  defaultValue="12"
                                  className="w-20 text-center" 
                                />
                                <span>meses</span>
                              </div>
                            </div>
                            
                            <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
                              <div className="flex items-start">
                                <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                                <div>
                                  <h4 className="text-sm font-medium text-blue-700">Cartões a expirar</h4>
                                  <p className="text-xs text-blue-600 mt-1">
                                    25 cartões expiram nos próximos 30 dias
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end">
                              <Button variant="outline">
                                <BarChart className="mr-2 h-4 w-4" />
                                Relatório de Validades
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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

export default AdminAltArea;
