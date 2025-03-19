
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Download, Upload, Crop, Image } from "lucide-react";

const PhotoCropTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setCroppedImageUrl(null);
      setIsCropping(false);
    }
  };

  const handleCropClick = () => {
    if (previewUrl && !isCropping) {
      setIsCropping(true);
    } else if (isCropping && canvasRef.current && imageRef.current) {
      // Simplified crop - in a real implementation you'd use proper cropping logic
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx && imageRef.current) {
        // Set canvas dimensions to target size (passport style)
        canvas.width = 300;
        canvas.height = 400;
        
        // Draw a portion of the image (simplified crop)
        ctx.drawImage(
          imageRef.current,
          0, 0,                           // Source x, y
          imageRef.current.width, imageRef.current.height,   // Source width, height
          0, 0,                           // Destination x, y
          canvas.width, canvas.height     // Destination width, height
        );
        
        // Convert to data URL and set as cropped image
        const croppedUrl = canvas.toDataURL('image/jpeg');
        setCroppedImageUrl(croppedUrl);
        setIsCropping(false);
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
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCroppedImageUrl(null);
    setIsCropping(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Recorte de Foto</h3>
      
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
                  <div className="relative border rounded-lg overflow-hidden aspect-[4/5] w-full max-w-[300px] mx-auto">
                    <img
                      ref={imageRef}
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {isCropping && (
                      <div className="absolute inset-0 border-4 border-brand-primary/50 pointer-events-none"></div>
                    )}
                  </div>
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
                  <div className="border rounded-lg overflow-hidden aspect-[3/4] w-full max-w-[300px] mx-auto">
                    <img
                      src={croppedImageUrl}
                      alt="Cropped"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleDownload} 
                      className="bg-brand-primary hover:bg-brand-primaryDark"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Baixar Foto
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
                Ajuste o recorte para enquadrar o rosto da pessoa adequadamente.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">3. Salve a Foto</h4>
              <p className="text-sm text-gray-600">
                Baixe a foto recortada e use-a para a impressão do cartão.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoCropTab;
