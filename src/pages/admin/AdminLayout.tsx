
import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsSmallMobile, useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Users, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLayout: React.FC = () => {
  const isSmallMobile = useIsSmallMobile();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Função para obter o rótulo do menu de acordo com o tamanho da tela
  const getTabLabel = (fullLabel: string, shortLabel: string) => {
    if (isSmallMobile) return shortLabel;
    return fullLabel;
  };

  // Verifica se o link está ativo
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso",
      className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#52aa85]/5 to-[#52aa85]/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Logo size="md" />
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-600">Bem-vindo,</p>
              <p className="font-medium text-[#52aa85]">{user?.nome || "Administrador"}</p>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-[#52aa85] text-[#52aa85] hover:bg-[#52aa85]/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isMobile ? "" : "Sair"}
            </Button>
          </div>
        </div>
        
        <Card className="border-[#52aa85]/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#52aa85] to-[#004c48] text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Painel de Controle</CardTitle>
            <CardDescription className="text-white/80">
              Gerencie segundas vias e cartões
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-6 gap-2 mb-8 tabs-responsive w-full">
              <NavLink 
                to="/admin/cartoes-gerados" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/cartoes-gerados') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("Cartões Gerados", "Cartões")}
              </NavLink>
              <NavLink 
                to="/admin/todos-cartoes" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/todos-cartoes') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("TODOS OS DADOS", "DADOS")}
              </NavLink>
              <NavLink 
                to="/admin/preenchidos-links" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/preenchidos-links') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("Preenchidos pelo Link", "Link")}
              </NavLink>
              <NavLink 
                to="/admin/novo-pedido" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/novo-pedido') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {getTabLabel("Criar Pedido", "Pedido")}
              </NavLink>
              <NavLink 
                to="/admin/gerenciar-usuarios" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/gerenciar-usuarios') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Users className="h-4 w-4 mr-1" />
                {getTabLabel("Usuários", "Users")}
              </NavLink>
              <NavLink 
                to="/admin/integracoes" 
                className={`flex justify-center items-center px-3 py-2 rounded-md transition-colors ${
                  isActive('/integracoes') ? 
                  'bg-background text-foreground shadow-sm' : 
                  'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Database className="h-4 w-4 mr-1" />
                {getTabLabel("Integrações", "API")}
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
