
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { updateSupabaseConfig, testSupabaseConnection } from "@/lib/supabase";

export const useSupabaseConfig = () => {
  const [url, setUrl] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [serviceRoleKey, setServiceRoleKey] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);

  // Carregar configurações salvas se existirem
  useEffect(() => {
    const savedConfig = localStorage.getItem('supabaseConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setUrl(config.url);
      setKey(config.key);
      setServiceRoleKey(config.serviceRoleKey || '');
      setIsConfigured(true);
    }
  }, []);

  const handleSaveConfig = async () => {
    if (!url || !key) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a URL e a chave do Supabase",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Atualizar configurações com a service role key opcional
      const config = { url, key, serviceRoleKey };
      localStorage.setItem('supabaseConfig', JSON.stringify(config));
      
      // Necessário para atualizar o cliente do Supabase
      window.location.reload();
      
      toast({
        title: "Configuração salva",
        description: "As credenciais do Supabase foram atualizadas",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
      
      setIsConfigured(true);
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a configuração",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await testSupabaseConnection();
      setTestResult(result);
      
      if (result.success) {
        toast({
          title: "Conexão bem-sucedida",
          description: result.message,
          className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
        });
      } else {
        toast({
          title: "Falha na conexão",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao testar conexão:", error);
      setTestResult({
        success: false,
        message: "Erro ao testar conexão. Verifique o console para mais detalhes."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    url,
    setUrl,
    key,
    setKey,
    serviceRoleKey,
    setServiceRoleKey,
    isConfigured,
    isLoading,
    testResult,
    handleSaveConfig,
    handleTestConnection
  };
};
