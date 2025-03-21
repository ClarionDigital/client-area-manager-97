
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogFooter, DialogHeader, 
  DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Camera, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadedEmployee } from '@/types/admin';

interface EmployeeEditorProps {
  employee: UploadedEmployee;
  onSave: (updatedEmployee: UploadedEmployee) => void;
  onPhotoUpload: (employeeId: number) => void;
}

const EmployeeEditor: React.FC<EmployeeEditorProps> = ({
  employee,
  onSave,
  onPhotoUpload
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<UploadedEmployee>({...employee});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!editedEmployee.nome || !editedEmployee.matricula) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e matrícula são campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    onSave(editedEmployee);
    setOpen(false);
    
    toast({
      title: "Dados atualizados",
      description: "As informações do funcionário foram atualizadas com sucesso"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-8 text-xs"
        >
          <Pencil className="h-3 w-3 mr-1" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              id="nome"
              name="nome"
              value={editedEmployee.nome}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="matricula" className="text-right">
              Matrícula
            </Label>
            <Input
              id="matricula"
              name="matricula"
              value={editedEmployee.matricula}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cargo" className="text-right">
              Cargo
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={editedEmployee.cargo}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="setor" className="text-right">
              Setor
            </Label>
            <Input
              id="setor"
              name="setor"
              value={editedEmployee.setor}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="validade" className="text-right">
              Validade
            </Label>
            <Input
              id="validade"
              name="validade"
              value={editedEmployee.validade}
              onChange={handleChange}
              className="col-span-3"
              placeholder="MM/AAAA"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Foto
            </Label>
            <div className="col-span-3 flex items-center">
              {editedEmployee.foto ? (
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Foto carregada</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <X className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-medium">Sem foto</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => onPhotoUpload(employee.id), 100);
                }}
                className="ml-auto"
              >
                <Camera className="h-3.5 w-3.5 mr-1" />
                {editedEmployee.foto ? 'Trocar Foto' : 'Adicionar Foto'}
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-brand-primary hover:bg-brand-primaryDark"
          >
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeEditor;
