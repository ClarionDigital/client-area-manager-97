
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Camera, Check, Download, Save, Edit } from "lucide-react";
import { CardDataWithPhoto, SpreadsheetTemplate } from '@/types/admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface DataTabProps {
  cards: CardDataWithPhoto[];
  onDownloadSpreadsheet: () => void;
}

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
  const [spreadsheetUploaded, setSpreadsheetUploaded] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

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
        </div>
      </div>
      
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
                Acesse a aba "TODOS OS DADOS" para visualizar, adicionar fotos e gerenciar os cartões.
              </p>
              <Button 
                onClick={() => toast({
                  title: "Redirecionando",
                  description: "Acesse a aba TODOS OS DADOS para visualizar os cartões"
                })}
                className="bg-brand-primary hover:bg-brand-primaryDark mt-4"
              >
                Ver Todos os Cartões
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
};

export default DataTab;
