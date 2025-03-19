
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Trash2, ImagePlus } from "lucide-react";
import { CardData } from '@/types/admin';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface CardGridProps {
  cards: CardData[];
  onView: (id: number) => void;
  onConfirmPayment: (id: number) => void;
  onDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 6;

const CardGrid: React.FC<CardGridProps> = ({ 
  cards, 
  onView, 
  onConfirmPayment, 
  onDelete 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination values
  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((card) => (
            <Card key={card.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
              <div className={`${card.tipo === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'} text-white text-center py-2 font-bold`}>
                {card.tipo}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-200 w-16 h-20 flex items-center justify-center text-gray-400 rounded-md mt-2">
                    <ImagePlus className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="font-bold truncate">{card.nome}</p>
                    <p className="text-sm text-gray-600">Mat: {card.matricula}</p>
                    <p className="text-sm text-gray-600">Data: {card.data}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.status === 'Pago' 
                          ? 'bg-green-100 text-green-800' 
                          : card.status === 'Pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {card.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                    onClick={() => onView(card.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  
                  {card.status === "Pendente" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => onConfirmPayment(card.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Pago
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => onDelete(card.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-gray-500 bg-white rounded-md border">
            Nenhum cartão encontrado
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  isActive={currentPage === index + 1}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CardGrid;
