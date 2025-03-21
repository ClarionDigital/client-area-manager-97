
import React, { useState, useRef } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, X } from "lucide-react";
import PhotoCropper from './PhotoCropper';

interface PhotoUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number;
  employeeName: string;
  employeeType: string;
  onPhotoSave: (employeeId: number, photoUrl: string) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  open,
  onOpenChange,
  employeeId,
  employeeName,
  employeeType,
  onPhotoSave
}) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione um arquivo de imagem válido (JPG, PNG)",
          variant: "destructive"
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    // Save the cropped image
    onPhotoSave(employeeId, croppedImageUrl);
    
    // Clean up
    setCropperOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    onOpenChange(false);
    
    toast({
      title: "Foto adicionada",
      description: "A foto foi adicionada com sucesso ao cartão",
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (previewUrl) {
      setCropperOpen(true);
    } else {
      toast({
        title: "Nenhuma foto selecionada",
        description: "Por favor, selecione uma foto para continuar",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Foto ao Cartão</DialogTitle>
            <DialogDescription>
              Selecione uma foto do funcionário para o cartão {employeeType}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="text-center mb-2">
              <p className="font-medium">{employeeName}</p>
              <p className="text-sm text-gray-500">#{employeeId}</p>
            </div>
            
            {previewUrl ? (
              <div className="relative w-full h-52 border rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button 
                  className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                  onClick={clearSelectedFile}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-52 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={triggerFileInput}
              >
                <Camera className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h4 className="text-sm font-medium mb-2">
                  Clique para selecionar uma foto
                </h4>
                <p className="text-xs text-gray-500">
                  Formatos suportados: JPG, PNG (máx. 5MB)
                </p>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={!previewUrl}
              className="bg-brand-primary hover:bg-brand-primaryDark"
            >
              <Upload className="mr-2 h-4 w-4" />
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cropper Dialog */}
      <PhotoCropper
        open={cropperOpen}
        onOpenChange={setCropperOpen}
        onCropComplete={handleCropComplete}
        imageUrl={previewUrl}
        cardType={employeeType === "Light" ? "Light" : "Conecta"}
        employeeName={employeeName}
      />
    </>
  );
};

export default PhotoUploader;
