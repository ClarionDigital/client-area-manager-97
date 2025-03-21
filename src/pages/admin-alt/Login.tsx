
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";

const AdminAltLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loginAlt } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await loginAlt(email, password);
      
      if (success) {
        toast({
          title: "Login realizado",
          description: "Você foi autenticado com sucesso",
          className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
        });
        navigate("/admin-alt/dashboard");
      } else {
        toast({
          title: "Erro",
          description: "E-mail ou senha inválidos",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden border-0">
        <div className="p-6 flex flex-col items-center">
          <img 
            src="https://areadocliente.alternativacard.com/wp-content/uploads/2022/08/logo4.png" 
            alt="Alternativa Card" 
            className="h-16 mb-8"
          />
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Acesso Administrativo</h2>
          
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  id="email"
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full h-12 text-base shadow-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full h-12 text-base shadow-sm"
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#52aa85] hover:bg-[#438e6d] text-white flex items-center justify-center gap-2 shadow-md"
            >
              <LogIn className="h-5 w-5" />
              {isLoading ? "Autenticando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="bg-gray-100 p-4 rounded-lg text-gray-700 text-sm mt-8 w-full shadow-inner">
            <p>
              Sistema de Administração do serviço de solicitação de 2ª via do Kit de Identificação Pessoal Alternativa Card. Apenas usuários autorizados podem acessar esse sistema.
            </p>
          </div>
          
          <img 
            src="https://areadocliente.alternativacard.com/wp-content/uploads/2022/08/logo4.png" 
            alt="Alternativa Card" 
            className="h-12 mt-8"
          />
        </div>
      </Card>
    </div>
  );
};

export default AdminAltLogin;
