
import React, { useState, useRef } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileSpreadsheet, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CardType } from "@/types/admin";

interface UploadSpreadsheetProps {
  onUpload: (cardType: string) => void;
  onDownloadTemplate?: () => void;
}

// Card type options
const CARD_TYPES: CardType[] = [
  { value: "Light", label: "Light Padrão" },
  { value: "Conecta", label: "Conecta" }
];

// Helper function to determine card type from employee ID
export const getCardTypeFromEmployeeId = (id: string): string => {
  if (id.startsWith('3')) return 'Light';
  if (id.startsWith('7')) return 'Conecta';
  return 'Light'; // Default fallback
};

const UploadSpreadsheet: React.FC<UploadSpreadsheetProps> = ({ 
  onUpload,
  onDownloadTemplate 
}) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<string>("Light");
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'xlsx' || fileExtension === 'csv') {
        setSelectedFile(file);
      } else {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie um arquivo .xlsx ou .csv",
          variant: "destructive"
        });
      }
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para continuar.",
        variant: "destructive"
      });
      return;
    }

    // Parse the file to get its content
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        // In a real application, you would parse CSV/Excel here
        // For now, we'll simulate successful upload
        
        // Display success toast
        toast({
          title: "Planilha enviada com sucesso",
          description: `Planilha "${selectedFile.name}" processada para cartões ${selectedCardType}`,
        });
        
        onUpload(selectedCardType);
        setOpen(false);
        setSelectedFile(null);
      } catch (error) {
        toast({
          title: "Erro ao processar arquivo",
          description: "Ocorreu um erro ao processar o arquivo. Verifique o formato e tente novamente.",
          variant: "destructive"
        });
      }
    };
    
    fileReader.readAsText(selectedFile);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary hover:bg-brand-primaryDark">
          <Upload className="mr-2 h-4 w-4" />
          Importar Planilha
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar Planilha</DialogTitle>
          <DialogDescription>
            Faça upload de uma planilha com dados para adição de fotos personalizada.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {/* Card Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="card-type">Tipo de Cartão</Label>
            <Select 
              value={selectedCardType} 
              onValueChange={setSelectedCardType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo de cartão" />
              </SelectTrigger>
              <SelectContent>
                {CARD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Nota: Matrículas com início 3 são Light e início 7 são Conecta
            </p>
          </div>
          
          <div
            className={`border-2 ${
              isDragging ? "border-brand-primary bg-brand-primary/5" : "border-dashed border-gray-300"
            } rounded-lg p-6 text-center transition-all duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <FileSpreadsheet className="h-10 w-10 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  Trocar arquivo
                </Button>
              </div>
            ) : (
              <>
                <Upload className={`h-10 w-10 ${isDragging ? "text-brand-primary" : "text-gray-400"} mx-auto mb-4 transition-colors`} />
                <h4 className="text-sm font-medium mb-2">
                  {isDragging ? "Solte o arquivo aqui" : "Arraste sua planilha ou clique para fazer upload"}
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Formatos suportados: xlsx, csv
                </p>
                <Input 
                  type="file" 
                  className="hidden" 
                  id="planilha" 
                  ref={fileInputRef}
                  accept=".xlsx,.csv"
                  onChange={handleFileChange}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClickUpload}
                >
                  Selecionar Arquivo
                </Button>
              </>
            )}
          </div>
          
          {/* Template download link */}
          {onDownloadTemplate && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                size="sm"
                className="text-brand-primary"
                onClick={onDownloadTemplate}
              >
                <Download className="h-4 w-4 mr-1" />
                Baixar Planilha Modelo
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button 
            onClick={handleUpload} 
            className="bg-brand-primary hover:bg-brand-primaryDark"
            disabled={!selectedFile}
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSpreadsheet;
