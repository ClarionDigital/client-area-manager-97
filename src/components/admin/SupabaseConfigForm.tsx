
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { updateSupabaseConfig, testSupabaseConnection } from "@/lib/supabase";
import { AlertCircle, CheckCircle, Database, RefreshCw } from "lucide-react";

const SupabaseConfigForm: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [key, setKey] = useState<string>('');
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
      // Atualizar configurações
      updateSupabaseConfig(url, key);
      
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

  return (
    <Card className="w-full border-[#52aa85]/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#52aa85] to-[#004c48] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Configuração do Supabase
        </CardTitle>
        <CardDescription className="text-white/80">
          Configure sua conexão com o Supabase externo
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supabase-url">URL do Supabase</Label>
          <Input
            id="supabase-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://seu-projeto.supabase.co"
            className="border-[#52aa85]/20"
          />
          <p className="text-xs text-gray-500">Ex: https://abcdefghijklm.supabase.co</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supabase-key">Chave Anônima (anon key)</Label>
          <Input
            id="supabase-key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="password"
            placeholder="sua-chave-anon"
            className="border-[#52aa85]/20"
          />
          <p className="text-xs text-gray-500">Você pode encontrar esta chave nas configurações do seu projeto no Supabase</p>
        </div>
        
        {testResult && (
          <div className={`p-3 rounded-md flex items-start gap-2 ${
            testResult.success ? 'bg-green-50 text-green-700 border border-green-200' : 
            'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {testResult.success ? 
              <CheckCircle className="h-5 w-5 mt-0.5" /> : 
              <AlertCircle className="h-5 w-5 mt-0.5" />
            }
            <div>
              <p className="font-medium">{testResult.success ? 'Sucesso' : 'Erro'}</p>
              <p className="text-sm">{testResult.message}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between gap-4 p-6 pt-0">
        <Button
          variant="outline"
          className="border-[#52aa85] text-[#52aa85] hover:bg-[#52aa85]/10 w-1/2"
          onClick={handleTestConnection}
          disabled={isLoading || !url || !key}
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            "Testar Conexão"
          )}
        </Button>
        
        <Button
          className="bg-[#52aa85] hover:bg-[#52aa85]/90 w-1/2"
          onClick={handleSaveConfig}
          disabled={isLoading || !url || !key}
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            isConfigured ? "Atualizar Configuração" : "Salvar Configuração"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseConfigForm;
