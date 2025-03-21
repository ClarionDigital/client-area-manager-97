
import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIsSmallMobile, useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/Logo";

const AdminLayout: React.FC = () => {
  const isSmallMobile = useIsSmallMobile();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Função para obter o rótulo do menu de acordo com o tamanho da tela
  const getTabLabel = (fullLabel: string, shortLabel: string) => {
    if (isSmallMobile) return shortLabel;
    return fullLabel;
  };

  // Verifica se o link está ativo
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
        </div>
        
        <Card className="border-[#52aa85]/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#52aa85] to-[#004c48] text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Painel de Controle</CardTitle>
            <CardDescription className="text-white/80">
              Gerencie segundas vias e cartões
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-2 mb-8 tabs-responsive w-full">
              <NavLink 
                to="/admin-modular/cartoes-gerados" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/cartoes-gerados') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("Cartões Gerados", "Cartões")}
              </NavLink>
              <NavLink 
                to="/admin-modular/todos-cartoes" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/todos-cartoes') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("TODOS OS DADOS", "DADOS")}
              </NavLink>
              <NavLink 
                to="/admin-modular/preenchidos-links" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/preenchidos-links') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("Preenchidos pelo Link", "Link")}
              </NavLink>
              <NavLink 
                to="/admin-modular/novo-pedido" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/novo-pedido') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("Criar Pedido", "Pedido")}
              </NavLink>
            </div>
            
            {/* Conteúdo da página será renderizado aqui */}
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLayout;
