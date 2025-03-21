
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useSupabaseConfig } from './useSupabaseConfig';

const SupabaseConfigTab: React.FC = () => {
  const {
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
  } = useSupabaseConfig();
  
  return (
    <>
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
    </>
  );
};

export default SupabaseConfigTab;
