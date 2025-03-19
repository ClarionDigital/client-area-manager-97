
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Download, Upload, Crop, Image, Check, ArrowLeft, ArrowRight, SendHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CardDataWithPhoto, PhotoCropTabProps, UploadedEmployee } from '@/types/admin';
import PhotoCropper, { CROP_WIDTH, CROP_HEIGHT } from "../PhotoCropper";

const PhotoCropTab: React.FC<PhotoCropTabProps> = ({
  uploadedEmployees = [],
  showUploadedData = false,
  selectedCardType = "Light",
  onSubmitOrder
}) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardDataWithPhoto | null>(null);

  const [allCards, setAllCards] = useState<UploadedEmployee[]>(
    uploadedEmployees.length > 0 
      ? uploadedEmployees 
      : [
        { id: 1, nome: "Carlos Silva", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", fotoUrl: "/lovable-uploads/c9519f36-ae3e-4e7c-a3e9-d37747362d44.png" },
        { id: 2, nome: "Maria Santos", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: false, tipo: "Light" },
        { id: 3, nome: "José Oliveira", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta" },
        { id: 4, nome: "Ana Rodrigues", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: false, tipo: "Light" },
        { id: 5, nome: "Paulo Costa", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta" }
      ]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allCards.length / itemsPerPage);
  const currentCards = allCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setCroppedImageUrl(null);
      
      setCropperOpen(true);
    }
  };

  const handleCropClick = () => {
    if (previewUrl) {
      setCropperOpen(true);
    }
  };

  const handleCropComplete = (croppedUrl: string) => {
    setCroppedImageUrl(croppedUrl);
    
    if (selectedCard) {
      setAllCards(prevCards => 
        prevCards.map(card => 
          card.id === selectedCard.id 
            ? { ...card, foto: true, fotoUrl: croppedUrl } 
            : card
        )
      );
      
      setSelectedCard(null);
      
      toast({
        title: "Foto recortada com sucesso",
        description: "A foto foi recortada nas dimensões corretas para o cartão."
      });
    }
  };

  const handleAddPhotoToCard = (card: UploadedEmployee) => {
    setSelectedCard(card as unknown as CardDataWithPhoto);
    
    if (croppedImageUrl) {
      setAllCards(prevCards => 
        prevCards.map(c => 
          c.id === card.id 
            ? { ...c, foto: true, fotoUrl: croppedImageUrl } 
            : c
        )
      );
      
      toast({
        title: "Foto adicionada",
        description: `Foto adicionada ao cartão de ${card.nome} com sucesso.`
      });
    } else {
      document.getElementById('photo-upload')?.click();
    }
  };

  const handleDownload = () => {
    if (croppedImageUrl) {
      const link = document.createElement('a');
      link.href = croppedImageUrl;
      link.download = 'foto_recortada.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download iniciado",
        description: "A foto recortada está sendo baixada."
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCroppedImageUrl(null);
    setSelectedCard(null);
  };

  const handleSubmitOrder = () => {
    onSubmitOrder();
    
    toast({
      title: "Pedido enviado com sucesso",
      description: "Os cartões serão processados em breve"
    });
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <div className={`h-1 ${card.tipo === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'}`}></div>
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
                  <div className="mt-2">
                    <Button 
                      size="sm" 
                      className={card.foto 
                        ? "bg-amber-500 hover:bg-amber-600 text-white" 
                        : "bg-brand-primary hover:bg-brand-primaryDark"
                      }
                      onClick={() => handleAddPhotoToCard(card)}
                    >
                      {card.foto ? "Atualizar Foto" : "Adicionar Foto"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className={currentPage === i + 1 ? "bg-brand-primary" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}

      <h3 className="text-lg font-medium mt-8 mb-4">Recorte de Foto</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Selecione uma Imagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!previewUrl ? (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg h-[300px]">
                  <Image className="w-16 h-16 text-gray-400 mb-4" />
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="bg-brand-primary hover:bg-brand-primaryDark text-white px-4 py-2 rounded-md inline-flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>Carregar Imagem</span>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                  <p className="text-sm text-gray-500 mt-2">
                    Clique para selecionar ou arraste uma imagem
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    className="relative border rounded-lg overflow-hidden mx-auto flex items-center justify-center bg-gray-100"
                    style={{ width: '100%', height: '300px' }}
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <div className="flex justify-center space-x-3">
                    <Button variant="outline" onClick={handleReset}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCropClick} 
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      Recortar
                      <Crop className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Foto Recortada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {croppedImageUrl ? (
                <div className="space-y-4">
                  <div 
                    className="border rounded-lg overflow-hidden mx-auto bg-gray-100 flex items-center justify-center"
                    style={{ width: '100%', height: '300px' }}
                  >
                    <img
                      src={croppedImageUrl}
                      alt="Cropped"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Button 
                      onClick={handleDownload} 
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Baixar Foto
                    </Button>
                    {selectedCard && (
                      <Button
                        onClick={() => {
                          setAllCards(prevCards => 
                            prevCards.map(card => 
                              card.id === selectedCard.id 
                                ? { ...card, foto: true, fotoUrl: croppedImageUrl } 
                                : card
                            )
                          );
                          
                          toast({
                            title: "Foto aplicada",
                            description: `Foto aplicada ao cartão de ${selectedCard.nome} com sucesso.`
                          });
                          
                          setSelectedCard(null);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="mr-2 w-4 h-4" />
                        Usar esta Foto
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg h-[300px]">
                  <Camera className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 text-center">
                    A imagem recortada aparecerá aqui
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Instruções para Recorte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">1. Selecione a Foto</h4>
              <p className="text-sm text-gray-600">
                Faça o upload de uma foto nítida com fundo claro e uniforme.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">2. Recorte a Imagem</h4>
              <p className="text-sm text-gray-600">
                Arraste a foto para posicioná-la dentro da área de recorte de {CROP_WIDTH}cm × {CROP_HEIGHT}cm.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">3. Salve a Foto</h4>
              <p className="text-sm text-gray-600">
                Baixe a foto recortada ou use-a diretamente para a impressão do cartão.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <PhotoCropper
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        onCropComplete={handleCropComplete}
        imageUrl={previewUrl}
      />
    </div>
  );
};

export default PhotoCropTab;
