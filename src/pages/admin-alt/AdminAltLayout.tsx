
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Home, Settings, Users, CreditCard } from "lucide-react";

const AdminAltLayout: React.FC = () => {
  const { userAlt, logoutAlt } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAlt();
    navigate("/admin-alt/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#062b48] text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://areadocliente.alternativacard.com/wp-content/uploads/2022/08/logo4.png" 
              alt="Alternativa Card" 
              className="h-10"
            />
            <span className="ml-4 text-xl font-medium text-white hidden md:inline">
              Painel Administrativo
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-200 hidden md:inline">
              {userAlt?.name}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center bg-transparent text-white border-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-[#031e33] text-white shadow-md">
          <nav className="p-4 flex flex-col h-full">
            <Link 
              to="/admin-alt/dashboard" 
              className="flex items-center py-3 px-4 rounded-md hover:bg-[#062b48]/70 mb-2"
            >
              <Home className="h-5 w-5 text-white" />
              <span className="ml-3 text-white hidden md:inline">Dashboard</span>
            </Link>
            <Link 
              to="/admin-alt/cartoes" 
              className="flex items-center py-3 px-4 rounded-md hover:bg-[#062b48]/70 mb-2"
            >
              <CreditCard className="h-5 w-5 text-white" />
              <span className="ml-3 text-white hidden md:inline">Cartões</span>
            </Link>
            <Link 
              to="/admin-alt/usuarios" 
              className="flex items-center py-3 px-4 rounded-md hover:bg-[#062b48]/70 mb-2"
            >
              <Users className="h-5 w-5 text-white" />
              <span className="ml-3 text-white hidden md:inline">Usuários</span>
            </Link>
            <Link 
              to="/admin-alt/configuracoes" 
              className="flex items-center py-3 px-4 rounded-md hover:bg-[#062b48]/70 mb-2"
            >
              <Settings className="h-5 w-5 text-white" />
              <span className="ml-3 text-white hidden md:inline">Configurações</span>
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminAltLayout;
