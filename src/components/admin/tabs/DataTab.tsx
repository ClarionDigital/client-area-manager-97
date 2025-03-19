
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Camera } from "lucide-react";
import { CardDataWithPhoto } from "@/types/admin";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface DataTabProps {
  cards: CardDataWithPhoto[];
  onDownloadSpreadsheet: () => void;
}

const DataTab: React.FC<DataTabProps> = ({ cards, onDownloadSpreadsheet }) => {
  const [selectedCard, setSelectedCard] = useState<CardDataWithPhoto | null>(null);
  const [photoUploadOpen, setPhotoUploadOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((cartao) => (
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
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant={cartao.foto ? "outline" : "default"}
                        className={cartao.foto ? "text-amber-600 border-amber-600 hover:bg-amber-50" : "bg-brand-primary hover:bg-brand-primaryDark"}
                        onClick={() => handleUploadClick(cartao)}
                      >
                        {cartao.foto ? "Atualizar Foto" : "Adicionar Foto"}
                      </Button>
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
          <CardTitle className="text-lg">Upload de Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.filter(c => !c.foto).map((cartao) => (
              <div key={cartao.id} className="border rounded-md p-4 flex items-center space-x-3">
                <div className="bg-gray-200 w-12 h-16 flex items-center justify-center text-gray-400 rounded-md">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{cartao.nome}</p>
                  <p className="text-xs text-gray-600">Mat: {cartao.matricula}</p>
                  <p className="text-xs text-gray-600">{cartao.cargo}</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-brand-primary hover:bg-brand-primaryDark text-xs"
                    onClick={() => handleUploadClick(cartao)}
                  >
                    Enviar Foto
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              Cargo: {selectedCard?.cargo}<br />
              Setor: {selectedCard?.setor}
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
