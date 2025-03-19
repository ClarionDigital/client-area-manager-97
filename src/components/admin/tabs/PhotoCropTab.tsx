
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Download, Upload, Crop, Image, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CardDataWithPhoto } from '@/types/admin';

const CROP_WIDTH = 5.5; // cm
const CROP_HEIGHT = 5.2; // cm
const CARD_SIZE = { width: 300, height: 280 }; // pixel dimensions for display

const PhotoCropTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropBoxRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setCroppedImageUrl(null);
      setIsCropping(false);
      setCropPosition({ x: 0, y: 0 });
      setZoomLevel(1);
    }
  };

  const handleCropClick = () => {
    if (previewUrl && !isCropping) {
      setIsCropping(true);
    } else if (isCropping && canvasRef.current && imageRef.current) {
      // Perform the actual crop operation
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx && imageRef.current) {
        // Set canvas dimensions for ID photo (ratio of 5.5cm x 5.2cm)
        canvas.width = CARD_SIZE.width;
        canvas.height = CARD_SIZE.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image with crop and zoom applied
        const aspectRatio = imageRef.current.width / imageRef.current.height;
        const scaledWidth = imageRef.current.height * aspectRatio * zoomLevel;
        const scaledHeight = imageRef.current.height * zoomLevel;
        
        ctx.drawImage(
          imageRef.current,
          cropPosition.x, cropPosition.y,        // Source x, y (where to start cropping)
          scaledWidth / zoomLevel, scaledHeight / zoomLevel, // Source width, height
          0, 0,                                  // Destination x, y
          canvas.width, canvas.height            // Destination width, height
        );
        
        // Convert to data URL and set as cropped image
        const croppedUrl = canvas.toDataURL('image/jpeg');
        setCroppedImageUrl(croppedUrl);
        setIsCropping(false);
        
        toast({
          title: "Foto recortada com sucesso",
          description: "A foto foi recortada nas dimensões corretas para o cartão."
        });
      }
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
    setIsCropping(false);
    setCropPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  const moveCrop = (direction: string) => {
    const step = 10;
    switch(direction) {
      case 'left':
        setCropPosition({ ...cropPosition, x: Math.max(0, cropPosition.x - step) });
        break;
      case 'right':
        setCropPosition({ ...cropPosition, x: cropPosition.x + step });
        break;
      case 'up':
        setCropPosition({ ...cropPosition, y: Math.max(0, cropPosition.y - step) });
        break;
      case 'down':
        setCropPosition({ ...cropPosition, y: cropPosition.y + step });
        break;
    }
  };

  const adjustZoom = (change: number) => {
    setZoomLevel(Math.max(0.5, Math.min(3, zoomLevel + change)));
  };

  // Sample data for all cards
  const allCards: CardDataWithPhoto[] = [
    { id: 1, nome: "Carlos Silva", primeiroNome: "Carlos", matricula: "3001245", cargo: "Analista", setor: "TI", validade: "12/2024", foto: true, tipo: "Light", data: "12/05/2023", status: "Ativo", valor: "--", fotoUrl: "/lovable-uploads/e60ff178-4d52-40cc-bbc3-e91693eff9c1.png" },
    { id: 2, nome: "Maria Santos", primeiroNome: "Maria", matricula: "3018756", cargo: "Coordenadora", setor: "RH", validade: "12/2024", foto: true, tipo: "Light", data: "15/05/2023", status: "Ativo", valor: "--" },
    { id: 3, nome: "José Oliveira", primeiroNome: "José", matricula: "7042389", cargo: "Técnico", setor: "Operações", validade: "12/2024", foto: false, tipo: "Conecta", data: "18/05/2023", status: "Pendente", valor: "--" },
    { id: 4, nome: "Ana Rodrigues", primeiroNome: "Ana", matricula: "3021567", cargo: "Gerente", setor: "Financeiro", validade: "12/2024", foto: true, tipo: "Light", data: "20/05/2023", status: "Ativo", valor: "--" },
    { id: 5, nome: "Paulo Costa", primeiroNome: "Paulo", matricula: "7031298", cargo: "Supervisor", setor: "Atendimento", validade: "12/2024", foto: false, tipo: "Conecta", data: "22/05/2023", status: "Inativo", valor: "--" },
    { id: 6, nome: "Fernanda Lima", primeiroNome: "Fernanda", matricula: "3025467", cargo: "Diretora", setor: "Comercial", validade: "12/2024", foto: true, tipo: "Light", data: "25/05/2023", status: "Ativo", valor: "--" },
    { id: 7, nome: "Ricardo Souza", primeiroNome: "Ricardo", matricula: "7056234", cargo: "Gerente", setor: "TI", validade: "12/2024", foto: false, tipo: "Conecta", data: "26/05/2023", status: "Inativo", valor: "--" },
    { id: 8, nome: "Juliana Alves", primeiroNome: "Juliana", matricula: "3037654", cargo: "Analista", setor: "Marketing", validade: "12/2024", foto: true, tipo: "Light", data: "27/05/2023", status: "Ativo", valor: "--" },
    { id: 9, nome: "Eduardo Mendes", primeiroNome: "Eduardo", matricula: "7069872", cargo: "Assistente", setor: "Administração", validade: "12/2024", foto: false, tipo: "Conecta", data: "28/05/2023", status: "Pendente", valor: "--" },
    { id: 10, nome: "Patrícia Rocha", primeiroNome: "Patrícia", matricula: "3045678", cargo: "Supervisora", setor: "Vendas", validade: "12/2024", foto: true, tipo: "Light", data: "29/05/2023", status: "Ativo", valor: "--" },
  ];

  // Pagination state for all cards
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allCards.length / itemsPerPage);
  const currentCards = allCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">TODOS OS DADOS</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar Lista Completa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <div className={`h-1 ${card.tipo === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'}`}></div>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-20 rounded overflow-hidden bg-gray-100 border flex items-center justify-center">
                  {card.foto ? (
                    <img 
                      src={card.fotoUrl || "/placeholder.svg"} 
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

      {/* Pagination */}
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

      <h3 className="text-lg font-medium mt-8 mb-4">Recorte de Foto</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Selecione uma Imagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!previewUrl ? (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
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
                    className="relative border rounded-lg overflow-hidden mx-auto"
                    style={{ width: `${CARD_SIZE.width}px`, height: `${CARD_SIZE.height}px` }}
                  >
                    <img
                      ref={imageRef}
                      src={previewUrl}
                      alt="Preview"
                      className="absolute"
                      style={{ 
                        transform: `translate(-${cropPosition.x}px, -${cropPosition.y}px) scale(${zoomLevel})`,
                        transformOrigin: '0 0',
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                    {isCropping && (
                      <div 
                        ref={cropBoxRef}
                        className="absolute border-4 border-brand-primary/70 pointer-events-none"
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          top: 0,
                          left: 0
                        }}
                      >
                        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs bg-white py-1 rounded">
                          {CROP_WIDTH}cm × {CROP_HEIGHT}cm
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {isCropping && (
                    <div className="space-y-3">
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => moveCrop('left')}>
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => moveCrop('up')}>
                          <ArrowLeft className="h-4 w-4 rotate-90" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => moveCrop('down')}>
                          <ArrowLeft className="h-4 w-4 -rotate-90" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => moveCrop('right')}>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => adjustZoom(-0.1)}>-</Button>
                        <div className="text-sm">Zoom: {Math.round(zoomLevel * 100)}%</div>
                        <Button size="sm" variant="outline" onClick={() => adjustZoom(0.1)}>+</Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-center space-x-3">
                    <Button variant="outline" onClick={handleReset}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCropClick} 
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      {isCropping ? "Concluir Recorte" : "Recortar"}
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
                    style={{ width: `${CARD_SIZE.width}px`, height: `${CARD_SIZE.height}px` }}
                  >
                    <img
                      src={croppedImageUrl}
                      alt="Cropped"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button 
                      onClick={handleDownload} 
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Baixar Foto
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="mr-2 w-4 h-4" />
                      Usar esta Foto
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg h-full">
                  <Camera className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 text-center">
                    A imagem recortada aparecerá aqui
                  </p>
                </div>
              )}
            </div>
            
            {/* Hidden canvas for cropping operations */}
            <canvas ref={canvasRef} className="hidden"></canvas>
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
                Ajuste o recorte para enquadrar o rosto da pessoa nas dimensões {CROP_WIDTH}cm × {CROP_HEIGHT}cm.
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
    </div>
  );
};

export default PhotoCropTab;
