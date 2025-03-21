
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardData } from "@/types/admin";
import { ImagePlus } from "lucide-react";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import SearchFilters from "@/components/admin/SearchFilters";
import CardList from "@/components/admin/CardList";
import CardGrid from "@/components/admin/CardGrid";
import CardDetail from "@/components/admin/CardDetail";
import ExportButton from "@/components/admin/dashboard/ExportButton";
import { generateCardPreviewUrl } from '@/utils/formatters';

interface CardsTabProps {
  cards: CardData[];
  onDownload: () => void;
  onUpload: (cardType: string) => void;
  onConfirmPayment?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const CardsTab: React.FC<CardsTabProps> = ({
  cards,
  onConfirmPayment = () => {},
  onDelete = () => {},
  onDownload,
  onUpload
}) => {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [visualizarId, setVisualizarId] = useState<number | null>(null);
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "grade">("lista");

  const filtrarCartoes = () => {
    return cards.filter(cartao => 
      (busca === "" || 
        cartao.nome.toLowerCase().includes(busca.toLowerCase()) || 
        cartao.matricula.includes(busca)) &&
      (filtroStatus === "todos" || cartao.status === filtroStatus) &&
      (filtroTipo === "todos" || cartao.tipo === filtroTipo)
    );
  };
  
  const cartoesFiltrados = filtrarCartoes();
  const cartaoSelecionado = visualizarId ? cards.find(cartao => cartao.id === visualizarId) : null;

  // Generate the preview URL for the card
  const getCardPreviewUrl = (card: CardData) => {
    // Extract first name from full name
    const firstName = card.nome.split(' ')[0];
    const cardId = card.matricula.startsWith("3") ? "3" : "7";
    
    return `https://areadocliente.alternativacard.com/up/card-light.php?nome=${encodeURIComponent(firstName)}&nome_completo=${encodeURIComponent(card.nome)}&matricula=${encodeURIComponent(card.matricula)}&foto=${card.fotoUrl ? encodeURIComponent(card.fotoUrl) : ""}&id=${cardId}`;
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Segundas Vias Geradas"
        description="Lista de todos os cartões gerados pelo sistema"
        onViewChange={() => setModoVisualizacao(modoVisualizacao === "lista" ? "grade" : "lista")}
        modoVisualizacao={modoVisualizacao}
        onDownload={onDownload}
        onUpload={onUpload}
      />
      
      <SearchFilters 
        search={busca}
        onSearchChange={setBusca}
        statusFilter={filtroStatus}
        onStatusFilterChange={setFiltroStatus}
        typeFilter={filtroTipo}
        onTypeFilterChange={setFiltroTipo}
      />
      
      {modoVisualizacao === "lista" ? (
        <CardList 
          cards={cartoesFiltrados}
          onView={setVisualizarId}
        />
      ) : (
        <CardGrid 
          cards={cartoesFiltrados}
          onView={setVisualizarId}
        />
      )}
      
      <div className="flex justify-end">
        <ExportButton onClick={onDownload} />
      </div>

      <Dialog open={visualizarId !== null} onOpenChange={(open) => !open && setVisualizarId(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualizar Cartão</DialogTitle>
          </DialogHeader>
          {cartaoSelecionado && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <div className={`${cartaoSelecionado.tipo === 'Light' ? 'bg-brand-primary' : 'bg-blue-600'} text-white text-center py-2 rounded-md font-bold`}>
                  {cartaoSelecionado.tipo}
                </div>
                <div className="flex flex-col items-center border p-6 rounded-md shadow-sm">
                  <div className="bg-gray-100 w-32 h-32 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                    {cartaoSelecionado.fotoUrl ? (
                      <img src={cartaoSelecionado.fotoUrl} alt={cartaoSelecionado.nome} className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{cartaoSelecionado.nome}</h3>
                  <p className="text-gray-600">Matrícula: {cartaoSelecionado.matricula}</p>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Prévia do Cartão</h3>
                <div className="border rounded-md overflow-hidden shadow-md mx-auto" style={{ width: '292px', height: '451px' }}>
                  <iframe 
                    src={getCardPreviewUrl(cartaoSelecionado)}
                    className="w-full h-full"
                    title="Prévia do Cartão"
                    sandbox="allow-scripts"
                    scrolling="no"
                    style={{ border: 'none', overflow: 'hidden' }}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setVisualizarId(null)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardsTab;
