
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadSpreadsheetProps {
  onUpload: () => void;
}

const UploadSpreadsheet: React.FC<UploadSpreadsheetProps> = ({ onUpload }) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

    // In a real app, this would process the file
    toast({
      title: "Planilha enviada",
      description: "Os dados da planilha serão processados em breve",
    });
    
    onUpload();
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
        <div className="py-4">
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
