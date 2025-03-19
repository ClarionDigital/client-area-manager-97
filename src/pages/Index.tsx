
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-primary/10 to-brand-darkest/20 flex flex-col justify-center items-center p-4 text-center">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkest">
        Sistema de Gerenciamento de Cartões
      </h1>
      
      <p className="text-xl mb-12 max-w-md text-gray-600">
        Selecione a área que deseja acessar
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/cliente">
          <Button
            className="w-full h-24 text-lg flex flex-col gap-2 bg-brand-primary hover:bg-brand-primaryDark"
          >
            <span className="font-semibold">Área do Cliente</span>
            <span className="text-xs opacity-75">Acesso para usuários</span>
          </Button>
        </Link>
        
        <Link to="/admin">
          <Button
            className="w-full h-24 text-lg flex flex-col gap-2 bg-brand-darkest hover:bg-brand-darkest/90"
          >
            <span className="font-semibold">Área LIGHT ADM</span>
            <span className="text-xs opacity-75">Gerenciamento de cartões</span>
          </Button>
        </Link>
        
        <Link to="/admin-alt">
          <Button
            className="w-full h-24 text-lg flex flex-col gap-2 bg-brand-accent hover:bg-brand-accent/90"
          >
            <span className="font-semibold">Área ADM Alternativa</span>
            <span className="text-xs opacity-75">Estatísticas avançadas</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
