
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCpf, formatPhone, formatDate } from "@/utils/formatters";

interface PersonalInfoFormProps {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento?: string;
  onNomeCompletoChange: (value: string) => void;
  onCpfChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTelefoneChange: (value: string) => void;
  onDataNascimentoChange?: (value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  nomeCompleto,
  cpf,
  email,
  telefone,
  dataNascimento = "",
  onNomeCompletoChange,
  onCpfChange,
  onEmailChange,
  onTelefoneChange,
  onDataNascimentoChange = () => {}
}) => {
  const [errors, setErrors] = useState<{
    cpf?: string;
    email?: string;
    telefone?: string;
    dataNascimento?: string;
  }>({});
  
  // CPF validation
  const validateCpf = (value: string) => {
    // Remove formatting for validation
    const unformattedCpf = value.replace(/\D/g, '');
    
    if (unformattedCpf.length !== 11) {
      setErrors(prev => ({ ...prev, cpf: "CPF deve conter 11 dígitos" }));
      return false;
    }
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(unformattedCpf)) {
      setErrors(prev => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    
    // CPF validation algorithm
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(unformattedCpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(unformattedCpf.substring(9, 10))) {
      setErrors(prev => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(unformattedCpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(unformattedCpf.substring(10, 11))) {
      setErrors(prev => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, cpf: undefined }));
    return true;
  };
  
  // Email validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
      setErrors(prev => ({ ...prev, email: "Email inválido" }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, email: undefined }));
    return true;
  };
  
  // Phone validation
  const validatePhone = (value: string) => {
    const unformattedPhone = value.replace(/\D/g, '');
    
    if (unformattedPhone.length < 10 || unformattedPhone.length > 11) {
      setErrors(prev => ({ ...prev, telefone: "Telefone deve ter entre 10 e 11 dígitos" }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, telefone: undefined }));
    return true;
  };
  
  // Date validation
  const validateDate = (value: string) => {
    if (!value) {
      setErrors(prev => ({ ...prev, dataNascimento: "Data obrigatória" }));
      return false;
    }
    
    // Check format DD/MM/YYYY
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
    if (!dateRegex.test(value)) {
      setErrors(prev => ({ ...prev, dataNascimento: "Formato inválido (DD/MM/AAAA)" }));
      return false;
    }
    
    // Check if date is valid
    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      setErrors(prev => ({ ...prev, dataNascimento: "Data inválida" }));
      return false;
    }
    
    // Check if date is not in the future
    const today = new Date();
    if (date > today) {
      setErrors(prev => ({ ...prev, dataNascimento: "Data não pode ser futura" }));
      return false;
    }
    
    // Check if person is at least 18 years old
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    
    if (date > eighteenYearsAgo) {
      setErrors(prev => ({ ...prev, dataNascimento: "Você deve ter pelo menos 18 anos" }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, dataNascimento: undefined }));
    return true;
  };
  
  const handleCpfChange = (value: string) => {
    const formattedCpf = formatCpf(value);
    onCpfChange(formattedCpf);
    if (formattedCpf.length === 14) {
      validateCpf(formattedCpf);
    }
  };
  
  const handleEmailChange = (value: string) => {
    onEmailChange(value);
    if (value) {
      validateEmail(value);
    }
  };
  
  const handleTelefoneChange = (value: string) => {
    const formattedPhone = formatPhone(value);
    onTelefoneChange(formattedPhone);
    if (formattedPhone.length >= 14) {
      validatePhone(formattedPhone);
    }
  };
  
  const handleDataNascimentoChange = (value: string) => {
    const formattedDate = formatDate(value);
    onDataNascimentoChange(formattedDate);
    if (formattedDate.length === 10) {
      validateDate(formattedDate);
    }
  };

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
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">CPF</Label>
          <Input 
            id="cpf"
            placeholder="000.000.000-00" 
            value={cpf}
            onChange={(e) => handleCpfChange(e.target.value)}
            className={`shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all ${errors.cpf ? 'border-red-500' : ''}`}
            maxLength={14}
            required
          />
          {errors.cpf && (
            <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Data de Nascimento</Label>
          <Input 
            id="data-nascimento"
            placeholder="DD/MM/AAAA" 
            value={dataNascimento}
            onChange={(e) => handleDataNascimentoChange(e.target.value)}
            className={`shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all ${errors.dataNascimento ? 'border-red-500' : ''}`}
            maxLength={10}
            required
          />
          {errors.dataNascimento && (
            <p className="text-red-500 text-xs mt-1">{errors.dataNascimento}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Email</Label>
          <Input 
            id="email"
            placeholder="seu@email.com" 
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all ${errors.email ? 'border-red-500' : ''}`}
            type="email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Telefone</Label>
          <Input 
            id="telefone"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(e) => handleTelefoneChange(e.target.value)}
            className={`shadow-sm focus:ring-2 focus:ring-[#8cdcd8]/50 transition-all ${errors.telefone ? 'border-red-500' : ''}`}
            maxLength={15}
            required
          />
          {errors.telefone && (
            <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
