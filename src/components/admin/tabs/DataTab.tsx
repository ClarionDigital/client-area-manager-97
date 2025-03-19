
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet } from "lucide-react";
import { CardDataWithPhoto } from "@/types/admin";

interface DataTabProps {
  cards: CardDataWithPhoto[];
  onDownloadSpreadsheet: () => void;
}

const DataTab: React.FC<DataTabProps> = ({ cards, onDownloadSpreadsheet }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Dados e Cartões</h3>
        <Button 
          variant="outline" 
          onClick={onDownloadSpreadsheet}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Baixar Planilha
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Cartões Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-brand-primary/10">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>Validade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((cartao) => (
                  <TableRow key={cartao.id}>
                    <TableCell className="font-medium">{cartao.nome}</TableCell>
                    <TableCell>{cartao.matricula}</TableCell>
                    <TableCell>{cartao.cargo}</TableCell>
                    <TableCell>{cartao.setor}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cartao.tipo === 'Light' 
                          ? 'bg-brand-primary/20 text-brand-primaryDark' 
                          : 'bg-brand-accent/20 text-brand-accent'
                      }`}>
                        {cartao.tipo}
                      </span>
                    </TableCell>
                    <TableCell>
                      {cartao.foto 
                        ? <span className="text-green-600">Sim</span> 
                        : <span className="text-red-600">Não</span>}
                    </TableCell>
                    <TableCell>{cartao.validade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upload de Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.filter(c => !c.foto).map((cartao) => (
              <div key={cartao.id} className="border rounded-md p-4 flex items-center space-x-3">
                <div className="bg-gray-200 w-12 h-16 flex items-center justify-center text-gray-400 rounded-md">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{cartao.nome}</p>
                  <p className="text-xs text-gray-600">Mat: {cartao.matricula}</p>
                  <p className="text-xs text-gray-600">{cartao.cargo}</p>
                  <Button size="sm" className="mt-2 bg-brand-primary hover:bg-brand-primaryDark text-xs">
                    Enviar Foto
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTab;
