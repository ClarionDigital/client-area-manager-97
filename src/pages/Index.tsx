
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const areas = [
    {
      title: "ÁREA DO CLIENTE LIGHT",
      description: "Acesso para clientes Light e Conecta. Solicite segunda via, gerencie seus dados e efetue pagamentos.",
      icon: <User className="h-8 w-8 mb-2 text-blue-500" />,
      path: "/cliente",
      color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
    },
    {
      title: "ÁREA LIGHT ADM",
      description: "Gerenciamento de cartões, segundas vias, busca avançada e controle financeiro.",
      icon: <Users className="h-8 w-8 mb-2 text-purple-500" />,
      path: "/admin",
      color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
    },
    {
      title: "ÁREA ADM ALTERNATIVA",
      description: "Estatísticas, gerenciamento avançado, integrações e hierarquia de acessos.",
      icon: <BarChart className="h-8 w-8 mb-2 text-emerald-500" />,
      path: "/admin-alt",
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Sistema de Gerenciamento
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gerencie cartões, dados de clientes e estatísticas em uma única plataforma.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-16">
          {areas.map((area, index) => (
            <Card key={index} className={`flex flex-col transition-all duration-300 hover:shadow-lg ${area.color}`}>
              <CardHeader className="text-center">
                <div className="flex justify-center">{area.icon}</div>
                <CardTitle className="text-xl font-bold">{area.title}</CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  {index === 0 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        Login com matrícula
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        Dados do crachá com foto
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        Pagamento integrado
                      </li>
                    </>
                  )}
                  
                  {index === 1 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                        Gerenciamento de segundas vias
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                        Busca avançada
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                        Controle financeiro
                      </li>
                    </>
                  )}
                  
                  {index === 2 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                        Estatísticas e relatórios
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                        Integrações API
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                        Hierarquia de acessos
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate(area.path)} 
                  className="w-full"
                  variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}
                >
                  Acessar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
