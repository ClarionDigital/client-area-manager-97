
import React from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface UploadSpreadsheetProps {
  onUpload: () => void;
}

const UploadSpreadsheet: React.FC<UploadSpreadsheetProps> = ({ onUpload }) => {
  return (
    <Dialog>
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
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h4 className="text-sm font-medium mb-2">
              Arraste sua planilha ou clique para fazer upload
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Formatos suportados: xlsx, csv
            </p>
            <Input type="file" className="hidden" id="planilha" />
            <Label htmlFor="planilha" className="cursor-pointer">
              <Button variant="outline" size="sm">Selecionar Arquivo</Button>
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button onClick={onUpload} className="bg-brand-primary hover:bg-brand-primaryDark">
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSpreadsheet;
