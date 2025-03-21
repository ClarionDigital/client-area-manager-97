
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCpf, formatPhone } from "@/utils/formatters";

interface PersonalInfoFormProps {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  onNomeCompletoChange: (value: string) => void;
  onCpfChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTelefoneChange: (value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  nomeCompleto,
  cpf,
  email,
  telefone,
  onNomeCompletoChange,
  onCpfChange,
  onEmailChange,
  onTelefoneChange
}) => {
  return (
    <div className="w-full space-y-4 mb-6">
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">Nome Completo</Label>
        <Input 
          id="nome-completo"
          placeholder="Digite seu nome completo" 
          defaultValue={nomeCompleto} 
          onChange={(e) => onNomeCompletoChange(e.target.value)}
          className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">CPF</Label>
          <Input 
            id="cpf"
            placeholder="000.000.000-00" 
            value={cpf}
            onChange={(e) => onCpfChange(formatCpf(e.target.value))}
            className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all" 
            maxLength={14}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Data de Nascimento</Label>
          <Input 
            placeholder="DD/MM/AAAA" 
            className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Email</Label>
          <Input 
            id="email"
            placeholder="seu@email.com" 
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all"
            type="email"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Telefone</Label>
          <Input 
            id="telefone"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(e) => onTelefoneChange(formatPhone(e.target.value))}
            className="shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all"
            maxLength={15}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
