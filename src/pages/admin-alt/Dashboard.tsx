
import React from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, Users, ShoppingCart, TrendingUp } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema Alternativa Card
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cartões Gerados</p>
              <h2 className="text-3xl font-bold">1,253</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">+12% em relação ao mês anterior</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Usuários</p>
              <h2 className="text-3xl font-bold">384</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">+5% em relação ao mês anterior</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pedidos</p>
              <h2 className="text-3xl font-bold">837</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">+18% em relação ao mês anterior</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Receita</p>
              <h2 className="text-3xl font-bold">R$ 12,538</h2>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">+9% em relação ao mês anterior</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div>
                  <p className="font-medium">Pedido #12{item}5</p>
                  <p className="text-sm text-muted-foreground">Cartão solicitado por João Silva</p>
                </div>
                <span className="text-sm text-muted-foreground">Há {item} hora{item !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Resumo Semanal</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Cartões pendentes</p>
              <p className="font-medium">48</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Cartões processados</p>
              <p className="font-medium">156</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Taxa de aprovação</p>
              <p className="font-medium">98.5%</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Tempo médio de processamento</p>
              <p className="font-medium">2.3 horas</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
