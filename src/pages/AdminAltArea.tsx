
import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppIntegration } from "@/components/admin/WhatsAppIntegration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

export default function AdminAltArea() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Header title="Área Administrativa Alternativa" />
      
      <main className="container mx-auto py-6 px-4">
        <Tabs defaultValue="integrations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integrations" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Integrações</h2>
            <WhatsAppIntegration />
          </TabsContent>
          
          <TabsContent value="settings">
            <h2 className="text-2xl font-bold mb-4">Configurações</h2>
            <p>Conteúdo das configurações será adicionado aqui.</p>
          </TabsContent>
          
          <TabsContent value="users">
            <h2 className="text-2xl font-bold mb-4">Usuários</h2>
            <p>Gestão de usuários será adicionada aqui.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
