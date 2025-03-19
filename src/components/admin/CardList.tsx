
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Trash2 } from "lucide-react";
import { CardData } from '@/types/admin';

interface CardListProps {
  cards: CardData[];
  onView: (id: number) => void;
  onConfirmPayment: (id: number) => void;
  onDelete: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ 
  cards, 
  onView, 
  onConfirmPayment, 
  onDelete 
}) => {
  return (
    <Card className="border-brand-primary/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-brand-primaryDark">
          Segundas Vias Geradas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-brand-primary/10">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.length > 0 ? (
                cards.map((card) => (
                  <TableRow key={card.id} className="hover:bg-brand-primary/5">
                    <TableCell className="font-medium">{card.nome}</TableCell>
                    <TableCell>
                      <span className={`${card.matricula.startsWith('3') ? 'text-brand-primary' : 'text-brand-secondary'} font-medium`}>
                        {card.matricula}
                      </span>
                    </TableCell>
                    <TableCell>{card.data}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.tipo === 'Light' 
                          ? 'bg-brand-primary/20 text-brand-primaryDark' 
                          : 'bg-brand-secondary/20 text-brand-accent'
                      }`}>
                        {card.tipo}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.status === 'Pago' 
                          ? 'bg-green-100 text-green-800' 
                          : card.status === 'Pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {card.status}
                      </span>
                    </TableCell>
                    <TableCell>{card.valor}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-brand-primary hover:text-white hover:bg-brand-primary"
                          onClick={() => onView(card.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {card.status === "Pendente" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => onConfirmPayment(card.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => onDelete(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Nenhum cartão encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardList;
