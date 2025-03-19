
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
  onConfirmPayment: (id: number) => void;
  onDelete: (id: number) => void;
  onDownload: () => void;
  onUpload: () => void;
}

const CardsTab: React.FC<CardsTabProps> = ({
  cards,
  onConfirmPayment,
  onDelete,
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
          onConfirmPayment={onConfirmPayment}
          onDelete={onDelete}
        />
      ) : (
        <CardGrid 
          cards={cartoesFiltrados}
          onView={setVisualizarId}
          onConfirmPayment={onConfirmPayment}
          onDelete={onDelete}
        />
      )}
      
      <div className="flex justify-end">
        <ExportButton onClick={onDownload} />
      </div>

      {/* Card Detail Dialog */}
      <Dialog open={visualizarId !== null} onOpenChange={(open) => !open && setVisualizarId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualizar Cartão</DialogTitle>
          </DialogHeader>
          {cartaoSelecionado && (
            <CardDetail 
              card={cartaoSelecionado} 
              onConfirmPayment={onConfirmPayment} 
            />
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
