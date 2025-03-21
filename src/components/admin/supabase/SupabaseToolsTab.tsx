
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useSupabaseTools } from './useSupabaseTools';

const SupabaseToolsTab: React.FC = () => {
  const {
    isConfigured,
    isDownloading,
    handleDownloadDatabase
  } = useSupabaseTools();
  
  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
      <h3 className="text-lg font-medium text-[#52aa85] mb-2">Ferramentas de Banco de Dados</h3>
      <p className="text-sm text-gray-600 mb-4">
        Baixe o backup do seu banco de dados do Supabase ou visualize informações sobre a estrutura.
      </p>
      
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleDownloadDatabase}
          disabled={isDownloading || !isConfigured}
          className="flex items-center gap-2"
        >
          {isDownloading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isDownloading ? "Baixando..." : "Baixar Banco de Dados"}
        </Button>
        
        {!isConfigured && (
          <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
            Configure as credenciais do Supabase primeiro para acessar as ferramentas de banco de dados.
          </p>
        )}
      </div>
    </div>
  );
};

export default SupabaseToolsTab;
