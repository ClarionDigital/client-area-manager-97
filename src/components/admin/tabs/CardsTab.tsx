
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardData } from "@/types/admin";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import SearchFilters from "@/components/admin/SearchFilters";
import CardList from "@/components/admin/CardList";
import CardGrid from "@/components/admin/CardGrid";
import CardDetail from "@/components/admin/CardDetail";
import ExportButton from "@/components/admin/dashboard/ExportButton";

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

  const getCardPreviewUrl = (card: CardData) => {
    const cardId = card.matricula.startsWith("3") ? "3" : "7";
    return `https://areadocliente.alternativacard.com/up/card-light.php?nome=${encodeURIComponent(card.nome.split(' ')[0])}&nome_completo=${encodeURIComponent(card.nome)}&matricula=${encodeURIComponent(card.matricula)}&foto=${card.fotoUrl ? encodeURIComponent(card.fotoUrl) : ""}&id=${cardId}`;
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Visualizar Cartão</DialogTitle>
          </DialogHeader>
          {cartaoSelecionado && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardDetail card={cartaoSelecionado} />
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Prévia do Cartão</h3>
                <div className="border rounded-md overflow-hidden w-full shadow-md">
                  <iframe 
                    src={getCardPreviewUrl(cartaoSelecionado)}
                    className="w-full h-56 md:h-64"
                    title="Prévia do Cartão"
                    sandbox="allow-scripts"
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
