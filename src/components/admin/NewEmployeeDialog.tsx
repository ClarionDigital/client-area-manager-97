
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewEmployeeDialogProps, UploadedEmployee } from "@/types/admin";
import { UserPlus } from 'lucide-react';
import { getCardTypeFromEmployeeId } from './UploadSpreadsheet';

const NewEmployeeDialog: React.FC<NewEmployeeDialogProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const [newEmployee, setNewEmployee] = useState({
    nome: '',
    matricula: '',
    cargo: '',
    setor: '',
    validade: '12/2024',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Calculate card type based on employee ID (matricula)
    const tipo = getCardTypeFromEmployeeId(newEmployee.matricula);
    
    onSave({
      ...newEmployee,
      tipo,
      foto: false
    });
    
    // Reset form
    setNewEmployee({
      nome: '',
      matricula: '',
      cargo: '',
      setor: '',
      validade: '12/2024',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo funcionário ao sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              name="nome"
              value={newEmployee.nome}
              onChange={handleChange}
              placeholder="João da Silva"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="matricula">Matrícula</Label>
            <Input
              id="matricula"
              name="matricula"
              value={newEmployee.matricula}
              onChange={handleChange}
              placeholder="3001234 ou 7001234"
            />
            <p className="text-xs text-gray-500">
              Matrícula 3XXXXXX para cartão Light, 7XXXXXX para cartão Conecta.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                name="cargo"
                value={newEmployee.cargo}
                onChange={handleChange}
                placeholder="Analista"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="setor">Setor</Label>
              <Input
                id="setor"
                name="setor"
                value={newEmployee.setor}
                onChange={handleChange}
                placeholder="TI"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="validade">Validade</Label>
            <Input
              id="validade"
              name="validade"
              value={newEmployee.validade}
              onChange={handleChange}
              placeholder="12/2024"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-brand-primary hover:bg-brand-primaryDark"
            disabled={!newEmployee.nome || !newEmployee.matricula || !newEmployee.cargo || !newEmployee.setor}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewEmployeeDialog;
