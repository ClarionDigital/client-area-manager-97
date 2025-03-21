
import React from "react";
import { Card } from "@/components/ui/card";
import PersonalInfoForm from "@/components/cliente/PersonalInfoForm";
import OrderSummary from "@/components/cliente/OrderSummary";

interface FormSectionProps {
  cardSaved: boolean;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  quantity: number;
  valorUnitario: number;
  isSubmitting: boolean;
  onFormClick: () => void;
  onNomeCompletoChange: (value: string) => void;
  onCpfChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTelefoneChange: (value: string) => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onFinalizarCompra: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  cardSaved,
  nomeCompleto,
  cpf,
  email,
  telefone,
  quantity,
  valorUnitario,
  isSubmitting,
  onFormClick,
  onNomeCompletoChange,
  onCpfChange,
  onEmailChange,
  onTelefoneChange,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onFinalizarCompra
}) => {
  return (
    <Card 
      className="bg-white shadow-lg rounded-xl overflow-hidden border-0" 
      onClick={!cardSaved ? onFormClick : undefined}
    >
      <div className={`p-4 md:p-6 flex flex-col items-center ${!cardSaved ? 'opacity-70 pointer-events-none' : ''}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados Pessoais</h2>
        
        <PersonalInfoForm
          nomeCompleto={nomeCompleto}
          cpf={cpf}
          email={email}
          telefone={telefone}
          onNomeCompletoChange={onNomeCompletoChange}
          onCpfChange={onCpfChange}
          onEmailChange={onEmailChange}
          onTelefoneChange={onTelefoneChange}
        />
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Finalização</h2>
        
        <OrderSummary
          quantity={quantity}
          valorUnitario={valorUnitario}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          onFinalizarCompra={onFinalizarCompra}
          isSubmitting={isSubmitting}
        />
        
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
          alt="Light" 
          className="h-12 mt-4"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </Card>
  );
};

export default FormSection;
