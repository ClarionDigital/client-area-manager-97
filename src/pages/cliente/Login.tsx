
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginScreen from "@/components/cliente/LoginScreen";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (matricula: string) => {
    setIsLoading(true);
    
    try {
      // Usar o serviço de autenticação
      const response = await authService.loginCliente(matricula);
      
      if (response.success && response.data) {
        // Armazenar dados do usuário no localStorage
        localStorage.setItem("usuarioDados", JSON.stringify({
          matricula: response.data.matricula,
          nomeAbreviado: response.data.nome_abreviado,
          nomeCompleto: response.data.nome,
          foto: response.data.foto_url
        }));
        navigate("/cliente/cadastro");
      } else {
        toast({
          title: "Matrícula não encontrada",
          description: "A matrícula informada não foi encontrada no sistema",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login",
        variant: "destructive",
      });
      console.error("Erro de login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginScreen onLogin={handleLogin} isLoading={isLoading} />;
};

export default Login;
