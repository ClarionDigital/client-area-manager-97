
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Camera, Check, X, Download, Save, Edit, Plus } from "lucide-react";
import { CardDataWithPhoto, SpreadsheetTemplate } from '@/types/admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface DataTabProps {
  cards: CardDataWithPhoto[];
  onDownloadSpreadsheet: () => void;
}

const ITEMS_PER_PAGE = 5;

// Sample template for download
const spreadsheetTemplate: SpreadsheetTemplate[] = [
  { id: 1, primeiroNome: "João", nome: "João Silva", matricula: "12345", cargo: "Analista", setor: "TI", validade: "12/2025", tipo: "Light" },
  { id: 2, primeiroNome: "Maria", nome: "Maria Santos", matricula: "23456", cargo: "Gerente", setor: "RH", validade: "12/2025", tipo: "Conecta" }
];

const DataTab: React.FC<DataTabProps> = ({ cards: initialCards, onDownloadSpreadsheet }) => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CardDataWithPhoto[]>(initialCards);
  const [selectedCard, setSelectedCard] = useState<CardDataWithPhoto | null>(null);
  const [photoUploadOpen, setPhotoUploadOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("planilha");
  const [currentPage, setCurrentPage] = useState(1);
  const [spreadsheetUploaded, setSpreadsheetUploaded] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  // Filter cards based on tab selection
  const filteredCards = activeTab === "todos" 
    ? cards 
    : activeTab === "comFoto" 
      ? cards.filter(card => card.foto) 
      : activeTab === "semFoto"
        ? cards.filter(card => !card.foto)
        : cards;

  // Calculate pagination
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredCards.slice(indexOfFirstItem, indexOfLastItem);

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = (card: CardDataWithPhoto) => {
    setSelectedCard(card);
    setPhotoUploadOpen(true);
  };

  const handleSavePhoto = () => {
    if (selectedCard && previewUrl) {
      // Update the card's photo status
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === selectedCard.id ? { ...card, foto: true } : card
        )
      );
      
      toast({
        title: "Foto salva com sucesso",
        description: `A foto para ${selectedCard.nome} foi adicionada.`
      });
    }
    setPhotoUploadOpen(false);
    setPreviewUrl(null);
  };

  // Handle spreadsheet upload
  const handleSpreadsheetUpload = () => {
    // Simulate spreadsheet upload
    setSpreadsheetUploaded(true);
    setActiveTab("todos");
    
    toast({
      title: "Planilha importada com sucesso",
      description: "Os dados foram carregados e estão prontos para edição."
    });
  };

  // Handle downloading template spreadsheet
  const handleDownloadTemplate = () => {
    // In a real app, this would create and download a real Excel file
    setTemplateDialogOpen(false);
    
    toast({
      title: "Download iniciado",
      description: "A planilha de exemplo está sendo baixada."
    });
  };

  // Toggle edit mode for a card
  const toggleEditMode = (id: number) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, editMode: !card.editMode } : card
      )
    );
  };

  // Update card data
  const updateCardField = (id: number, field: keyof CardDataWithPhoto, value: string) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  // Add new card
  const addNewCard = () => {
    const newId = Math.max(...cards.map(card => card.id)) + 1;
    const newCard: CardDataWithPhoto = {
      id: newId,
      primeiroNome: "",
      nome: "Novo Funcionário",
      matricula: "",
      data: new Date().toLocaleDateString(),
      cargo: "",
      setor: "",
      validade: "12/2025",
      status: "Pendente",
      valor: "--",
      tipo: "Light",
      foto: false,
      editMode: true
    };
    
    setCards(prevCards => [...prevCards, newCard]);
    
    // Ensure the new card is visible by switching to the "todos" tab
    setActiveTab("todos");
    
    // Navigate to the last page where the new card would be
    const newTotalPages = Math.ceil((cards.length + 1) / ITEMS_PER_PAGE);
    setCurrentPage(newTotalPages);
  };

  // Save all changes
  const saveAllChanges = () => {
    // Here you would typically send the updated data to your backend
    setCards(prevCards => 
      prevCards.map(card => ({ ...card, editMode: false }))
    );
    
    toast({
      title: "Dados salvos com sucesso",
      description: "Todas as alterações foram salvas."
    });
  };

  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset page when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Dados e Cartões</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setTemplateDialogOpen(true)}
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar Planilha Modelo
          </Button>
          {spreadsheetUploaded && (
            <Button onClick={saveAllChanges} className="bg-brand-primary hover:bg-brand-primaryDark">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="planilha" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="planilha">Importar Planilha</TabsTrigger>
          <TabsTrigger value="todos">Todos os Cartões</TabsTrigger>
          <TabsTrigger value="comFoto">Com Foto</TabsTrigger>
          <TabsTrigger value="semFoto">Sem Foto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planilha" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upload de Planilha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!spreadsheetUploaded ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">
                    Arraste sua planilha ou clique para fazer upload
                  </h4>
                  <p className="text-sm text-gray-500 mb-6">
                    Formato suportado: .xlsx
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                      onClick={() => setTemplateDialogOpen(true)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Modelo
                    </Button>
                    <Button 
                      onClick={handleSpreadsheetUpload}
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Enviar Planilha
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <Check className="h-16 w-16 text-green-500 mx-auto" />
                  <h4 className="text-lg font-medium">
                    Planilha carregada com sucesso!
                  </h4>
                  <p className="text-sm text-gray-500">
                    Agora você pode editar os dados e adicionar fotos aos funcionários.
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button 
                      onClick={() => handleTabChange("todos")}
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      Ver Todos os Cartões
                    </Button>
                    <Button 
                      onClick={() => handleTabChange("semFoto")}
                      variant="outline"
                    >
                      Ver Cartões sem Foto
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="todos" className="mt-0">
          <Card>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <CardTitle className="text-lg">Cartões Cadastrados</CardTitle>
              <Button 
                size="sm" 
                onClick={addNewCard}
                className="bg-brand-primary hover:bg-brand-primaryDark"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-brand-primary/10">
                    <TableRow>
                      <TableHead>Primeiro Nome</TableHead>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Foto</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>
                            {card.editMode ? (
                              <Input 
                                type="text" 
                                value={card.primeiroNome || card.nome.split(' ')[0]} 
                                onChange={(e) => updateCardField(card.id, 'primeiroNome', e.target.value)}
                                className="h-8 w-full"
                              />
                            ) : (
                              card.primeiroNome || card.nome.split(' ')[0]
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {card.editMode ? (
                              <Input 
                                type="text" 
                                value={card.nome} 
                                onChange={(e) => updateCardField(card.id, 'nome', e.target.value)}
                                className="h-8 w-full"
                              />
                            ) : (
                              card.nome
                            )}
                          </TableCell>
                          <TableCell>
                            {card.editMode ? (
                              <Input 
                                type="text" 
                                value={card.matricula} 
                                onChange={(e) => updateCardField(card.id, 'matricula', e.target.value)}
                                className="h-8 w-full"
                              />
                            ) : (
                              card.matricula
                            )}
                          </TableCell>
                          <TableCell>
                            {card.foto 
                              ? <span className="text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" /> Sim</span> 
                              : <span className="text-red-600 flex items-center"><X className="h-4 w-4 mr-1" /> Não</span>}
                          </TableCell>
                          <TableCell>
                            {card.editMode ? (
                              <select 
                                value={card.tipo} 
                                onChange={(e) => updateCardField(card.id, 'tipo', e.target.value)}
                                className="h-8 w-full border rounded px-2"
                              >
                                <option value="Light">Light</option>
                                <option value="Conecta">Conecta</option>
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                card.tipo === 'Light' 
                                  ? 'bg-brand-primary/20 text-brand-primaryDark' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {card.tipo}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {card.editMode ? (
                              <Input 
                                type="text" 
                                value={card.validade} 
                                onChange={(e) => updateCardField(card.id, 'validade', e.target.value)}
                                className="h-8 w-full"
                              />
                            ) : (
                              card.validade
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant={card.foto ? "outline" : "default"}
                                className={card.foto 
                                  ? "text-amber-600 border-amber-600 hover:bg-amber-50" 
                                  : "bg-brand-primary hover:bg-brand-primaryDark"}
                                onClick={() => handleUploadClick(card)}
                              >
                                {card.foto ? "Atualizar Foto" : "Adicionar Foto"}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toggleEditMode(card.id)}
                                className={card.editMode 
                                  ? "text-green-600 border-green-600 hover:bg-green-50" 
                                  : "text-amber-600 border-amber-600 hover:bg-amber-50"}
                              >
                                {card.editMode ? <Save className="h-3 w-3" /> : <Edit className="h-3 w-3" />}
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
                        onClick={() => goToPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          isActive={currentPage === index + 1}
                          onClick={() => goToPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comFoto" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cartões com Foto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-brand-primary/10">
                    <TableRow>
                      <TableHead>Primeiro Nome</TableHead>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>{card.primeiroNome || card.nome.split(' ')[0]}</TableCell>
                          <TableCell className="font-medium">{card.nome}</TableCell>
                          <TableCell>{card.matricula}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              card.tipo === 'Light' 
                                ? 'bg-brand-primary/20 text-brand-primaryDark' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {card.tipo}
                            </span>
                          </TableCell>
                          <TableCell>{card.validade}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-amber-600 border-amber-600 hover:bg-amber-50"
                              onClick={() => handleUploadClick(card)}
                            >
                              Atualizar Foto
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                          Nenhum cartão com foto encontrado
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
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          isActive={currentPage === index + 1}
                          onClick={() => goToPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="semFoto" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cartões sem Foto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-brand-primary/10">
                    <TableRow>
                      <TableHead>Primeiro Nome</TableHead>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>{card.primeiroNome || card.nome.split(' ')[0]}</TableCell>
                          <TableCell className="font-medium">{card.nome}</TableCell>
                          <TableCell>{card.matricula}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              card.tipo === 'Light' 
                                ? 'bg-brand-primary/20 text-brand-primaryDark' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {card.tipo}
                            </span>
                          </TableCell>
                          <TableCell>{card.validade}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              className="bg-brand-primary hover:bg-brand-primaryDark"
                              onClick={() => handleUploadClick(card)}
                            >
                              Adicionar Foto
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                          Todos os cartões já possuem foto
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
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          isActive={currentPage === index + 1}
                          onClick={() => goToPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {currentItems.map((card) => (
              <div key={card.id} className="border rounded-md p-4 flex items-center space-x-3">
                <div className="bg-gray-200 w-12 h-16 flex items-center justify-center text-gray-400 rounded-md">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{card.nome}</p>
                  <p className="text-xs text-gray-600">Mat: {card.matricula}</p>
                  <p className="text-xs text-gray-600">Validade: {card.validade}</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-brand-primary hover:bg-brand-primaryDark text-xs"
                    onClick={() => handleUploadClick(card)}
                  >
                    Enviar Foto
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Photo Upload Dialog */}
      <Dialog open={photoUploadOpen} onOpenChange={setPhotoUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload de Foto - {selectedCard?.nome}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {previewUrl ? (
              <div className="mt-2 relative rounded-md overflow-hidden aspect-[3/4] max-w-[280px] mx-auto">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Camera className="h-12 w-12 text-gray-400" />
                <label className="cursor-pointer">
                  <Button variant="outline">Selecionar Foto</Button>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoSelect} />
                </label>
              </div>
            )}
            
            <p className="text-sm text-gray-500 text-center">
              Matrícula: {selectedCard?.matricula}<br />
              Tipo: {selectedCard?.tipo}<br />
              Validade: {selectedCard?.validade}
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => {
              setPhotoUploadOpen(false);
              setPreviewUrl(null);
            }}>
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={handleSavePhoto} 
              disabled={!previewUrl}
              className="bg-brand-primary hover:bg-brand-primaryDark"
            >
              Salvar Foto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Download Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Baixar Planilha Modelo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-4">
              A planilha modelo contém as colunas necessárias para importação de dados:
            </p>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-brand-primary/10">
                  <TableRow>
                    <TableHead>Primeiro Nome</TableHead>
                    <TableHead>Nome Completo</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spreadsheetTemplate.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.primeiroNome}</TableCell>
                      <TableCell>{item.nome}</TableCell>
                      <TableCell>{item.matricula}</TableCell>
                      <TableCell>{item.cargo}</TableCell>
                      <TableCell>{item.setor}</TableCell>
                      <TableCell>{item.validade}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleDownloadTemplate}
              className="bg-brand-primary hover:bg-brand-primaryDark"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar Modelo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTab;
