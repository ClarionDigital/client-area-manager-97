
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign } from "lucide-react";

interface FinancialStatsProps {
  totalReceived: string;
  pendingAmount: string;
  pendingTransactions: number;
  cardsIssued: number;
}

const FinancialStats: React.FC<FinancialStatsProps> = ({
  totalReceived,
  pendingAmount,
  pendingTransactions,
  cardsIssued
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="border-green-200 hover:border-green-300 transition-colors">
        <CardHeader className="pb-2">
          <CardDescription>Total Recebido</CardDescription>
          <CardTitle className="text-2xl text-green-600">{totalReceived}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Últimos 30 dias
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-yellow-200 hover:border-yellow-300 transition-colors">
        <CardHeader className="pb-2">
          <CardDescription>Pendente</CardDescription>
          <CardTitle className="text-2xl text-yellow-600">{pendingAmount}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500">
            {pendingTransactions} transações
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-brand-primary/40 hover:border-brand-primary transition-colors">
        <CardHeader className="pb-2">
          <CardDescription>Cartões Emitidos</CardDescription>
          <CardTitle className="text-2xl text-brand-primary">{cardsIssued}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500">
            Mês atual
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStats;
