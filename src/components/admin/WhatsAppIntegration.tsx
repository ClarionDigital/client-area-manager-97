
import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface WhatsAppConfig {
  baseUrl: string;
  globalKey: string;
  instanceName: string;
  instanceKey: string;
}

export function WhatsAppIntegration() {
  const [config, setConfig] = useState<WhatsAppConfig>(() => {
    const savedConfig = localStorage.getItem('whatsappConfig');
    return savedConfig ? JSON.parse(savedConfig) : {
      baseUrl: '',
      globalKey: '',
      instanceName: '',
      instanceKey: ''
    };
  });
  
  const [testNumber, setTestNumber] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveConfig = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('whatsappConfig', JSON.stringify(config));
      toast.success("Configuração da API WhatsApp salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar a configuração.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const sendTestMessage = async () => {
    if (!testNumber || !testMessage) {
      toast.error("Número e mensagem são obrigatórios para o teste");
      return;
    }

    setIsSending(true);
    try {
      const formattedNumber = testNumber.replace(/\D/g, '');
      
      const response = await fetch(`${config.baseUrl}/message/sendText/${config.instanceName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.globalKey,
          'Authorization': `Bearer ${config.instanceKey}`
        },
        body: JSON.stringify({
          number: formattedNumber,
          options: {
            delay: 1200
          },
          textMessage: {
            text: testMessage
          }
        })
      });

      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        toast.success("Mensagem enviada com sucesso!");
      } else {
        throw new Error(data.message || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      toast.error(`Erro ao enviar mensagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Integração WhatsApp (Evolution API)
          </CardTitle>
          <CardDescription>
            Configure suas credenciais da Evolution API para envio de mensagens via WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">URL Base da API</Label>
            <Input
              id="baseUrl"
              name="baseUrl"
              placeholder="https://sua-api.example.com"
              value={config.baseUrl}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="globalKey">Global Key</Label>
            <Input
              id="globalKey"
              name="globalKey"
              placeholder="Chave global da API"
              value={config.globalKey}
              onChange={handleChange}
              type="password"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instanceName">Nome da Instância</Label>
            <Input
              id="instanceName"
              name="instanceName"
              placeholder="Nome da sua instância"
              value={config.instanceName}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instanceKey">Chave da Instância</Label>
            <Input
              id="instanceKey"
              name="instanceKey"
              placeholder="Chave da sua instância"
              value={config.instanceKey}
              onChange={handleChange}
              type="password"
            />
          </div>

          <Button 
            onClick={saveConfig} 
            disabled={isSaving}
            className="mt-4"
            variant="brand"
          >
            {isSaving ? "Salvando..." : "Salvar Configuração"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testar Envio de Mensagem</CardTitle>
          <CardDescription>
            Envie uma mensagem de teste para verificar a integração
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testNumber">Número com DDD (Ex: 5511999998888)</Label>
            <Input
              id="testNumber"
              placeholder="5511999998888"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="testMessage">Mensagem de Teste</Label>
            <Input
              id="testMessage"
              placeholder="Sua mensagem de teste"
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={sendTestMessage} 
            disabled={isSending || !config.baseUrl || !config.globalKey || !config.instanceName || !config.instanceKey}
            variant="orange"
          >
            {isSending ? "Enviando..." : "Enviar Mensagem de Teste"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
