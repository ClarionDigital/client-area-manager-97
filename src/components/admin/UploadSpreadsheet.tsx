
import React, { useState } from 'react';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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

    // Display success toast
    toast({
      title: "Planilha enviada",
      description: `Os dados da planilha ${selectedCardType} serão processados em breve`,
    });
    
    onUpload(selectedCardType);
    setOpen(false);
    setSelectedFile(null);
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
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h4 className="text-sm font-medium mb-2">
                  Arraste sua planilha ou clique para fazer upload
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Formatos suportados: xlsx, csv
                </p>
                <Input 
                  type="file" 
                  className="hidden" 
                  id="planilha" 
                  accept=".xlsx,.csv"
                  onChange={handleFileChange}
                />
                <Label htmlFor="planilha" className="cursor-pointer">
                  <Button variant="outline" size="sm">Selecionar Arquivo</Button>
                </Label>
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
