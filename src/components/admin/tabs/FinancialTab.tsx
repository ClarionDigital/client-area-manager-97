
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionData } from "@/types/admin";
import FinancialStats from "@/components/admin/FinancialStats";
import WalletManagement from "@/components/admin/WalletManagement";

interface FinancialTabProps {
  transactions: TransactionData[];
}

const FinancialTab: React.FC<FinancialTabProps> = ({ transactions }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Financeiro</h3>
      
      <FinancialStats
        totalReceived="--"
        pendingAmount="--"
        pendingTransactions={12}
        cardsIssued={128}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data de Início</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transacao) => (
                    <TableRow key={transacao.id} className="hover:bg-gray-50">
                      <TableCell>{transacao.cliente}</TableCell>
                      <TableCell>{transacao.data}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transacao.status === 'Confirmado' 
                            ? 'bg-green-100 text-green-800' 
                            : transacao.status === 'Pendente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {transacao.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <WalletManagement />
      </div>
    </div>
  );
};

export default FinancialTab;
