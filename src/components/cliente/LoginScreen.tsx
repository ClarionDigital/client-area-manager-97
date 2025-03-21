
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginScreenProps {
  onLogin: (matricula: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [matricula, setMatricula] = useState("");
  const { toast } = useToast();

  const handleConsultar = () => {
    if (matricula.trim() === "") {
      toast({
        title: "Erro",
        description: "Por favor insira sua matrícula",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Matrícula válida",
      description: "Sua matrícula foi validada com sucesso",
      className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
    });
    
    onLogin(matricula);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border-0">
        <div className="p-6 flex flex-col items-center">
          <img 
            src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
            alt="CrachaShop" 
            className="h-16 mb-8"
          />
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left w-full">Matrícula Light</h2>
          
          <div className="w-full mb-4">
            <Input 
              placeholder="Digite sua matrícula" 
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full h-12 text-base shadow-sm"
            />
          </div>
          
          <Button 
            onClick={handleConsultar} 
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 mb-6 shadow-md"
          >
            <Search className="h-5 w-5" />
            Consultar Matrícula
          </Button>
          
          <div className="bg-gray-100 p-4 rounded-lg text-gray-700 text-sm mb-8 w-full shadow-inner">
            <p>
              Sistema de solicitação de 2ª via do Kit de Identificação Pessoal Light. Preencha corretamente o número da sua matrícula, e o sistema gerará o seu último crachá com o mesmo modelo atualizado.
            </p>
          </div>
          
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
            alt="Light" 
            className="h-12"
          />
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
