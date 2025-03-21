
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSupabaseTools = () => {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Check if Supabase is configured
  useEffect(() => {
    const savedConfig = localStorage.getItem('supabaseConfig');
    setIsConfigured(!!savedConfig);
  }, []);

  const handleDownloadDatabase = async () => {
    if (!isConfigured) {
      toast({
        title: "Configuração necessária",
        description: "Configure o Supabase antes de fazer o download",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      // Obter lista de tabelas
      const { data: tables, error: tablesError } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (tablesError) throw tablesError;
      
      if (!tables || tables.length === 0) {
        toast({
          title: "Nenhuma tabela encontrada",
          description: "Não foi possível encontrar tabelas no banco de dados",
          variant: "destructive",
        });
        return;
      }
      
      // Criar um objeto para armazenar os dados de todas as tabelas
      const databaseData: Record<string, any[]> = {};
      
      // Buscar dados de cada tabela
      for (const table of tables) {
        const tableName = table.tablename;
        const { data, error } = await supabase
          .from(tableName)
          .select('*');
          
        if (error) {
          console.error(`Erro ao buscar dados da tabela ${tableName}:`, error);
          continue;
        }
        
        databaseData[tableName] = data || [];
      }
      
      // Criar um arquivo JSON com os dados
      const jsonData = JSON.stringify(databaseData, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Criar um link para download e clicar nele
      const a = document.createElement('a');
      a.href = url;
      a.download = `supabase-database-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Limpar
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
      
      toast({
        title: "Download concluído",
        description: "Os dados do banco de dados foram baixados com sucesso",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
      
    } catch (error: any) {
      console.error("Erro ao fazer download do banco de dados:", error);
      toast({
        title: "Erro no download",
        description: `Não foi possível baixar os dados: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isConfigured,
    isDownloading,
    handleDownloadDatabase
  };
};
