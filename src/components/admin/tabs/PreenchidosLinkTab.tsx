
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, Clipboard, Share2, QrCode } from "lucide-react";
import AdminPagination from "@/components/admin/AdminPagination";
import OrderSubmitButton from "@/components/admin/OrderSubmitButton";
import { useToast } from "@/hooks/use-toast";
import ShareLinkDialog from "@/components/admin/ShareLinkDialog";

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

const ITEMS_PER_PAGE = 10;

const PreenchidosLinkTab: React.FC<PreenchidosLinkTabProps> = ({
  preenchidosPorLink: initialUsers,
  onDownload,
  onSubmitOrder
}) => {
  const { toast } = useToast();
  const [linkSearch, setLinkSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PreenchidosLinkUser | null>(null);
  
  const filteredLinkUsers = initialUsers.filter(user => 
    (linkSearch === "" || 
      user.nome.toLowerCase().includes(linkSearch.toLowerCase()) || 
      (user.matricula && user.matricula.toLowerCase().includes(linkSearch.toLowerCase())) ||
      (user.linkId && user.linkId.toLowerCase().includes(linkSearch.toLowerCase())))
  );

  const totalPages = Math.ceil(filteredLinkUsers.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = filteredLinkUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleExportCSV = () => {
    const header = "Nome,Nome Completo,Matrícula,Tipo,Email,Telefone,Empresa,Data Preenchimento,Validade,Origem";
    
    const csvData = filteredLinkUsers.map(user => {
      return `${user.primeiroNome},${user.nome},${user.matricula},${user.tipo},${user.email},${user.telefone},${user.empresa},${user.dataPreenchimento},${user.validade},${user.linkId}`;
    }).join("\n");
    
    const csvContent = `${header}\n${csvData}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `preenchidos-pelo-link-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download concluído",
      description: "A planilha foi baixada com sucesso",
    });
    
    onDownload();
  };
  
  const handleShareLink = (user: PreenchidosLinkUser) => {
    setSelectedUser(user);
    setShareDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Preenchidos pelo Link e Portal Individual
        </h2>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar Lista Completa
        </Button>
      </div>
      
      <div className="relative w-full mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por nome, matrícula ou origem..."
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
              <TableHead>Foto</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
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
                  <TableCell>
                    {user.foto ? (
                      <span className="text-green-600 font-medium">Sim</span>
                    ) : (
                      <span className="text-red-600 font-medium">Não</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.linkId === "CARTAO-INDIVIDUAL" 
                        ? "bg-purple-50 text-purple-700" 
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {user.linkId === "CARTAO-INDIVIDUAL" ? "Portal Individual" : "Link"}
                    </span>
                  </TableCell>
                  <TableCell>{user.dataPreenchimento}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShareLink(user)}
                      className="h-8 px-2 text-gray-600 hover:text-gray-900"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Compartilhar Link</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <AdminPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
      
      <OrderSubmitButton onClick={onSubmitOrder} />
      
      {selectedUser && (
        <ShareLinkDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          matricula={selectedUser.matricula}
          nome={selectedUser.nome}
        />
      )}
    </div>
  );
};

export default PreenchidosLinkTab;
