import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ImagePlus } from "lucide-react";
import { CardData } from '@/types/admin';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

interface CardGridProps {
  cards: CardData[];
  onView: (id: number) => void;
  onConfirmPayment?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ITEMS_PER_PAGE = 9;

const CardGrid: React.FC<CardGridProps> = ({ 
  cards, 
  onView,
  onConfirmPayment,
  onDelete
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i}
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            isActive={currentPage === 1}
            onClick={() => goToPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i}
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            isActive={currentPage === totalPages}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
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
            
            {renderPaginationItems()}
            
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
