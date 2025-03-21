
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Send } from "lucide-react";

interface PreenchidosLinkUser {
  id: number;
  nome: string;
  primeiroNome: string;
  email: string;
  telefone: string;
  empresa: string;
  matricula: string;
  tipo: string;
  foto: boolean;
  validade: string;
  cargo: string;
  dataPreenchimento: string;
  linkId: string;
  setor: string;
}

interface PreenchidosLinkTabProps {
  preenchidosPorLink: PreenchidosLinkUser[];
  onDownload: () => void;
  onSubmitOrder: () => void;
}

const PreenchidosLinkTab: React.FC<PreenchidosLinkTabProps> = ({
  preenchidosPorLink: initialUsers,
  onDownload,
  onSubmitOrder
}) => {
  const [linkSearch, setLinkSearch] = useState("");
  
  const filteredLinkUsers = initialUsers.filter(user => 
    (linkSearch === "" || 
      user.nome.toLowerCase().includes(linkSearch.toLowerCase()) || 
      (user.matricula && user.matricula.toLowerCase().includes(linkSearch.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Preenchidos pelo Link
        </h2>
        <Button
          variant="outline"
          onClick={onDownload}
        >
          Exportar Lista
        </Button>
      </div>
      
      <div className="relative w-full mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por nome ou matrícula..."
          className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#52aa85]"
          value={linkSearch}
          onChange={(e) => setLinkSearch(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nome</TableHead>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinkUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.primeiroNome}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.matricula}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    user.tipo === "Light" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {user.tipo}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          variant="orange" 
          size="lg" 
          onClick={onSubmitOrder}
          className="px-8"
        >
          <Send className="mr-2 h-5 w-5" />
          ENVIAR PEDIDO
        </Button>
      </div>
    </div>
  );
};

export default PreenchidosLinkTab;
