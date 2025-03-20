
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface EvolutionApiConfig {
  apiUrl: string;
  globalApiKey: string;
  instanceName: string;
  instanceKey: string;
}

const EvolutionApiIntegration: React.FC = () => {
  const [config, setConfig] = useState<EvolutionApiConfig>({
    apiUrl: "https://evolution.alternativacard.com",
    globalApiKey: "",
    instanceName: "",
    instanceKey: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real application, you would save this to your backend
    localStorage.setItem("evolutionApiConfig", JSON.stringify(config));
    toast.success("Configuração da API Evolution salva com sucesso");
  };

  const testConnection = async () => {
    try {
      toast.info("Testando conexão com a API Evolution...");
      
      // Here you would implement the actual API test
      // This is a mock for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Conexão estabelecida com sucesso!");
    } catch (error) {
      toast.error("Falha ao conectar com a API Evolution. Verifique as credenciais.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Integração WhatsApp - Evolution API v2</CardTitle>
        <CardDescription>
          Configure a integração com a API Evolution para envio de mensagens via WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiUrl">URL da API</Label>
          <Input 
            id="apiUrl" 
            name="apiUrl" 
            value={config.apiUrl} 
            onChange={handleChange} 
            placeholder="https://evolution.alternativacard.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="globalApiKey">Chave Global da API</Label>
          <Input 
            id="globalApiKey" 
            name="globalApiKey" 
            value={config.globalApiKey} 
            onChange={handleChange} 
            placeholder="Insira a chave global da API"
          />
          <p className="text-xs text-gray-500">A chave global será fornecida posteriormente</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instanceName">Nome da Instância</Label>
          <Input 
            id="instanceName" 
            name="instanceName" 
            value={config.instanceName} 
            onChange={handleChange} 
            placeholder="Insira o nome da instância"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instanceKey">Chave da Instância</Label>
          <Input 
            id="instanceKey" 
            name="instanceKey" 
            value={config.instanceKey} 
            onChange={handleChange} 
            placeholder="Insira a chave da instância"
          />
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Salvar Configuração
          </Button>
          <Button onClick={testConnection} variant="outline" className="flex-1">
            Testar Conexão
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvolutionApiIntegration;
