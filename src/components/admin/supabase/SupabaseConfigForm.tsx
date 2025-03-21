
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupabaseConfigTab from './SupabaseConfigTab';
import SupabaseToolsTab from './SupabaseToolsTab';

const SupabaseConfigForm: React.FC = () => {
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
            <SupabaseConfigTab />
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-6">
            <SupabaseToolsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SupabaseConfigForm;
