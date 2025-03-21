
import React from "react";
import { Card } from "@/components/ui/card";
import CardForm from "@/components/cliente/CardForm";

interface CardSectionProps {
  matricula: string;
  nomeAbreviado?: string;
  nomeCompleto?: string;
  fotoUrl?: string | null;
  previewUrl: string;
  onCardSaved: (cardData: {
    nomeAbreviado: string;
    nomeCompleto: string;
    foto: File | null;
    fotoUrl: string | null;
    previewUrl: string;
  }) => void;
}

const CardSection: React.FC<CardSectionProps> = ({
  matricula,
  nomeAbreviado,
  nomeCompleto,
  fotoUrl,
  previewUrl,
  onCardSaved
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-0">
      <div className="p-4 md:p-6 flex flex-col items-center">
        <img 
          src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
          alt="CrachaShop" 
          className="h-12 md:h-16 mb-6"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados do Cartão</h2>
        
        <CardForm 
          matricula={matricula}
          nomeAbreviadoInicial={nomeAbreviado}
          nomeCompletoInicial={nomeCompleto}
          fotoUrlInicial={fotoUrl}
          previewUrlInicial={previewUrl}
          onCardSaved={onCardSaved}
        />
      </div>
    </Card>
  );
};

export default CardSection;
