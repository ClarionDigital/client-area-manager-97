
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewEmployeeDialogProps } from "@/types/admin";
import { getCardTypeFromEmployeeId } from './UploadSpreadsheet';

const NewEmployeeDialog: React.FC<NewEmployeeDialogProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const [newEmployee, setNewEmployee] = useState({
    nome: '',
    matricula: '',
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
      foto: false,
      cargo: '', // Keep empty string for backward compatibility
      setor: '',  // Keep empty string for backward compatibility
    });
    
    // Reset form
    setNewEmployee({
      nome: '',
      matricula: '',
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
            disabled={!newEmployee.nome || !newEmployee.matricula}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewEmployeeDialog;
