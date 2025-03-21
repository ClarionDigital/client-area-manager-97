
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Mail, ArrowLeft, Send } from "lucide-react";

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor informe seu e-mail",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await resetPassword(email);
      
      if (success) {
        setSubmitted(true);
        toast({
          title: "E-mail enviado",
          description: "As instruções de recuperação foram enviadas para seu e-mail",
          className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
        });
      } else {
        toast({
          title: "Erro",
          description: "E-mail não encontrado em nossa base de dados",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação",
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
            src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
            alt="CrachaShop" 
            className="h-16 mb-8"
          />
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center w-full">Recuperação de Senha</h2>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <p className="text-gray-600 text-sm mb-4">
                Informe o e-mail associado à sua conta para receber as instruções de recuperação de senha.
              </p>
              
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
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#52aa85] hover:bg-[#438e6d] text-white flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="h-5 w-5" />
                {isLoading ? "Enviando..." : "Enviar Instruções"}
              </Button>
              
              <div className="text-center">
                <Link 
                  to="/admin/login" 
                  className="text-[#52aa85] hover:text-[#438e6d] text-sm flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para o login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-[#52aa85]/10 p-4 rounded-lg border border-[#52aa85]/20">
                <p className="text-gray-700">
                  Um e-mail com instruções para recuperar sua senha foi enviado para:
                </p>
                <p className="font-medium text-[#52aa85] mt-2">{email}</p>
              </div>
              
              <p className="text-sm text-gray-600">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              
              <Button 
                onClick={() => navigate("/admin/login")}
                className="bg-[#52aa85] hover:bg-[#438e6d] text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o login
              </Button>
            </div>
          )}
          
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
            alt="Light" 
            className="h-12 mt-8"
          />
        </div>
      </Card>
    </div>
  );
};

export default RecuperarSenha;
