
import React from 'react';
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { CardData } from '@/types/admin';

interface CardDetailProps {
  card: CardData;
}

const CardDetail: React.FC<CardDetailProps> = ({ card }) => {
  return (
    <div className="py-4">
      <div className="bg-white border rounded-lg p-4 max-w-xs mx-auto shadow-md">
        <div className={`${card.tipo === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'} text-white text-center py-2 rounded-t-md font-bold`}>
          {card.tipo}
        </div>
        <div className="flex p-4">
          <div className="bg-gray-200 w-24 h-32 mr-4 flex items-center justify-center text-gray-400 rounded-md">
            <ImagePlus className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <p className="font-bold">{card.nome}</p>
            <p className="text-sm text-gray-600">Matrícula: {card.matricula}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
