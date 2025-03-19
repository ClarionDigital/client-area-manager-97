
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Camera, Check, X } from "lucide-react";
import { CardDataWithPhoto } from "@/types/admin";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const DataTab: React.FC<DataTabProps> = ({ cards, onDownloadSpreadsheet }) => {
  const [selectedCard, setSelectedCard] = useState<CardDataWithPhoto | null>(null);
  const [photoUploadOpen, setPhotoUploadOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter cards based on tab selection
  const filteredCards = activeTab === "todos" 
    ? cards 
    : activeTab === "comFoto" 
      ? cards.filter(card => card.foto) 
      : cards.filter(card => !card.foto);

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
    // Here you would typically upload the photo to a server
    // and update the card's photo status
    setPhotoUploadOpen(false);
    setPreviewUrl(null);
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
        <Button 
          variant="outline" 
          onClick={onDownloadSpreadsheet}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Baixar Planilha
        </Button>
      </div>
      
      <Tabs defaultValue="todos" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos os Cartões</TabsTrigger>
          <TabsTrigger value="comFoto">Com Foto</TabsTrigger>
          <TabsTrigger value="semFoto">Sem Foto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cartões Cadastrados</CardTitle>
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
                    {currentItems.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>{card.primeiroNome || card.nome.split(' ')[0]}</TableCell>
                        <TableCell className="font-medium">{card.nome}</TableCell>
                        <TableCell>{card.matricula}</TableCell>
                        <TableCell>
                          {card.foto 
                            ? <span className="text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" /> Sim</span> 
                            : <span className="text-red-600 flex items-center"><X className="h-4 w-4 mr-1" /> Não</span>}
                        </TableCell>
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
                            variant={card.foto ? "outline" : "default"}
                            className={card.foto 
                              ? "text-amber-600 border-amber-600 hover:bg-amber-50" 
                              : "bg-brand-primary hover:bg-brand-primaryDark"}
                            onClick={() => handleUploadClick(card)}
                          >
                            {card.foto ? "Atualizar Foto" : "Adicionar Foto"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
          {/* Same content as "todos" but filtered for cards with photos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cartões com Foto</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Same table structure as above but with currentItems filtered for cards with photos */}
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
                    {currentItems.map((card) => (
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
                    ))}
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
                    {currentItems.map((card) => (
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
                    ))}
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
            <Button type="button" onClick={handleSavePhoto} disabled={!previewUrl}>
              Salvar Foto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTab;
