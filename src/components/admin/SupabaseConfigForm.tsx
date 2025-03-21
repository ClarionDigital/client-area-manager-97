
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { updateSupabaseConfig, testSupabaseConnection, supabase } from "@/lib/supabase";
import { AlertCircle, CheckCircle, Database, RefreshCw, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupabaseConfigForm: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [serviceRoleKey, setServiceRoleKey] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
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
      
      <CardContent className="p-6">
        <Tabs defaultValue="config" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="config">Configuração</TabsTrigger>
            <TabsTrigger value="tools">Ferramentas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="config" className="space-y-4">
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
            
            <div className="space-y-2">
              <Label htmlFor="service-role-key">
                Chave de Serviço (service_role key) <span className="text-gray-500 text-xs">(opcional)</span>
              </Label>
              <Input
                id="service-role-key"
                value={serviceRoleKey}
                onChange={(e) => setServiceRoleKey(e.target.value)}
                type="password"
                placeholder="sua-chave-service-role"
                className="border-[#52aa85]/20"
              />
              <p className="text-xs text-gray-500">
                Chave com permissões elevadas, necessária para algumas operações administrativas como backup do banco
              </p>
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
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button
                variant="outline"
                className="border-[#52aa85] text-[#52aa85] hover:bg-[#52aa85]/10 w-full sm:w-1/2"
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
                className="bg-[#52aa85] hover:bg-[#52aa85]/90 w-full sm:w-1/2"
                onClick={handleSaveConfig}
                disabled={isLoading || !url || !key}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  isConfigured ? "Atualizar Configuração" : "Salvar Configuração"
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SupabaseConfigForm;
