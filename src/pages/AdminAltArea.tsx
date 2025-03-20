
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Import components
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import CardDetail from "@/components/admin/CardDetail";
import EvolutionApiIntegration from "@/components/admin/EvolutionApiIntegration";

const AdminAltArea = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header title="Área Administrativa Alternativa" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Logo />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Área Administrativa Alternativa
          </h1>
        </div>

        <Tabs defaultValue="cards">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="cards">Cartões</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="dados">Dados</TabsTrigger>
            <TabsTrigger value="recorte">Recorte de Foto</TabsTrigger>
            <TabsTrigger value="integracoes">Integrações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integracoes">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Gerencie as integrações com serviços externos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <EvolutionApiIntegration />
                  
                  {/* Placeholder for future integrations */}
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">Mais integrações serão adicionadas em breve.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAltArea;
