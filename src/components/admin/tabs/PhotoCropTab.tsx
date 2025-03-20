
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera, Download, SendHorizontal, Trash2, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadedEmployee } from '@/types/admin';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhotoCropTabProps {
  uploadedEmployees: UploadedEmployee[];
  showUploadedData: boolean;
  selectedCardType: string;
  onSubmitOrder: () => void;
}

const PhotoCropTab: React.FC<PhotoCropTabProps> = ({
  uploadedEmployees = [],
  showUploadedData = false,
  selectedCardType = "Light",
  onSubmitOrder
}) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("todos");
  const itemsPerPage = 5;
  
  // Sample data if none provided
  const [allCards, setAllCards] = useState<UploadedEmployee[]>(
    uploadedEmployees.length > 0 
      ? uploadedEmployees 
      : [
        { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", fotoUrl: "/lovable-uploads/c9519f36-ae3e-4e7c-a3e9-d37747362d44.png" },
        { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light", fotoUrl: "/lovable-uploads/e60ff178-4d52-40cc-bbc3-e91693eff9c1.png" },
        { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: true, tipo: "Conecta", fotoUrl: "/lovable-uploads/c9519f36-ae3e-4e7c-a3e9-d37747362d44.png" },
        { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light", fotoUrl: "/lovable-uploads/e60ff178-4d52-40cc-bbc3-e91693eff9c1.png" },
        { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: true, tipo: "Conecta", fotoUrl: "/lovable-uploads/c9519f36-ae3e-4e7c-a3e9-d37747362d44.png" }
      ]
  );

  // Filter cards based on active tab
  const filteredCards = activeTab === "todos"
    ? allCards
    : activeTab === "light"
      ? allCards.filter(card => card.tipo === "Light")
      : allCards.filter(card => card.tipo === "Conecta");
  
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const currentCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteCard = (id: number) => {
    setAllCards(allCards.filter(card => card.id !== id));
    
    toast({
      title: "Cartão excluído",
      description: "O cartão foi excluído com sucesso.",
      variant: "success",
    });
  };

  const handleRequestDuplicate = (card: UploadedEmployee) => {
    toast({
      title: "Segunda via solicitada",
      description: `A segunda via do cartão de ${card.nome} foi solicitada com sucesso.`,
      variant: "success",
    });
  };

  const handleSubmitOrder = () => {
    onSubmitOrder();
    
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve"
    });
  };

  // Handle tab change and reset pagination
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{showUploadedData ? `Planilha ${selectedCardType}` : 'TODOS OS DADOS'}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar Lista
          </Button>
          
          {showUploadedData && (
            <Button 
              onClick={handleSubmitOrder}
              className="bg-brand-primary hover:bg-brand-primaryDark"
            >
              <SendHorizontal className="mr-2 h-4 w-4" />
              Enviar Pedido
            </Button>
          )}
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCards.map((card) => (
          <Card key={card.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-200">
            <div className={`h-2 ${card.tipo === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'}`}></div>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-20 rounded overflow-hidden bg-gray-100 border flex items-center justify-center">
                  {card.foto && card.fotoUrl ? (
                    <img 
                      src={card.fotoUrl} 
                      alt={card.nome} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg">{card.nome}</h4>
                  <p className={`text-sm font-medium ${card.matricula.startsWith('3') ? 'text-brand-primary' : 'text-blue-600'}`}>
                    Mat: {card.matricula}
                  </p>
                  <p className="text-sm text-gray-600">
                    {card.cargo} - {card.setor}
                  </p>
                  <p className="text-sm text-gray-600">
                    Validade: {card.validade}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="orange"
                      onClick={() => handleRequestDuplicate(card)}
                      className="text-xs"
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      PEDIR SEGUNDA VIA
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      DELETAR CARTÃO
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for list view */}
      <Tabs defaultValue="todos" value={activeTab} onValueChange={handleTabChange} className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos os Cartões</TabsTrigger>
          <TabsTrigger value="light">Light</TabsTrigger>
          <TabsTrigger value="conecta">Conecta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="mt-0">
          <Card>
            <CardHeader className="pb-2 bg-gradient-to-r from-zinc-50 to-slate-100">
              <CardTitle className="text-lg">Lista Completa de Cartões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-brand-primary/10">
                    <TableRow>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCards.length > 0 ? (
                      currentCards.map((card) => (
                        <TableRow key={card.id} className="hover:bg-brand-primary/5">
                          <TableCell className="font-medium">{card.nome}</TableCell>
                          <TableCell>{card.matricula}</TableCell>
                          <TableCell>{card.cargo}</TableCell>
                          <TableCell>{card.setor}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              card.tipo === 'Light' 
                                ? 'bg-brand-primary/20 text-brand-primaryDark' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {card.tipo}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-green-600 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" /> Ativo
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="orange"
                                onClick={() => handleRequestDuplicate(card)}
                                className="text-xs whitespace-nowrap"
                              >
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                SEGUNDA VIA
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-xs whitespace-nowrap"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                DELETAR
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-gray-500">
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
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="light" className="mt-0">
          <Card>
            <CardHeader className="pb-2 bg-gradient-to-r from-[#8cdcd8]/10 to-[#52aa85]/10">
              <CardTitle className="text-lg">Cartões Light</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-brand-primary/10">
                    <TableRow>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCards.length > 0 ? (
                      currentCards.map((card) => (
                        <TableRow key={card.id} className="hover:bg-brand-primary/5">
                          <TableCell className="font-medium">{card.nome}</TableCell>
                          <TableCell>{card.matricula}</TableCell>
                          <TableCell>{card.setor}</TableCell>
                          <TableCell>{card.validade}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="orange"
                                onClick={() => handleRequestDuplicate(card)}
                                className="text-xs whitespace-nowrap"
                              >
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                SEGUNDA VIA
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-xs whitespace-nowrap"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                DELETAR
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                          Nenhum cartão Light encontrado
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
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conecta" className="mt-0">
          <Card>
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100/50">
              <CardTitle className="text-lg">Cartões Conecta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-blue-100/50">
                    <TableRow>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCards.length > 0 ? (
                      currentCards.map((card) => (
                        <TableRow key={card.id} className="hover:bg-blue-50/50">
                          <TableCell className="font-medium">{card.nome}</TableCell>
                          <TableCell>{card.matricula}</TableCell>
                          <TableCell>{card.setor}</TableCell>
                          <TableCell>{card.validade}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="orange"
                                onClick={() => handleRequestDuplicate(card)}
                                className="text-xs whitespace-nowrap"
                              >
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                SEGUNDA VIA
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-xs whitespace-nowrap"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                DELETAR
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                          Nenhum cartão Conecta encontrado
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
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PhotoCropTab;
