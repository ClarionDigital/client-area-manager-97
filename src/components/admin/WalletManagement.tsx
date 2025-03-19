
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Plus, ArrowUp, ArrowDown } from "lucide-react";

const WalletManagement = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(500);
  const [addAmount, setAddAmount] = useState('');

  const handleAddBalance = () => {
    const amount = Number(addAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor válido",
        variant: "destructive"
      });
      return;
    }

    setBalance(balance + amount);
    setAddAmount('');
    toast({
      title: "Saldo adicionado",
      description: `R$ ${amount.toFixed(2)} foi adicionado ao seu saldo`,
    });
  };

  return (
    <Card className="border-brand-primary/20">
      <CardHeader>
        <CardTitle className="text-xl text-brand-primaryDark">
          Carteira Digital
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <p className="text-sm text-gray-500">Saldo Atual</p>
              <p className="text-2xl font-bold text-brand-primary">R$ {balance.toFixed(2)}</p>
            </div>
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-brand-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Adicionar Saldo</p>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Valor em R$"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAddBalance}
                className="bg-brand-primary hover:bg-brand-primaryDark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>

          <p className="text-sm font-medium">Histórico Recente</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3">
                  <ArrowUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Depósito</p>
                  <p className="text-xs text-gray-500">28/05/2023 - 14:32</p>
                </div>
              </div>
              <p className="text-sm font-medium text-green-700">+R$ 200,00</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center mr-3">
                  <ArrowDown className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Emissão de Cartões</p>
                  <p className="text-xs text-gray-500">25/05/2023 - 09:15</p>
                </div>
              </div>
              <p className="text-sm font-medium text-red-700">-R$ 105,00</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletManagement;
