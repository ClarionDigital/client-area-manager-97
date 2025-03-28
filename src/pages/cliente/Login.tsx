
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginScreen from "@/components/cliente/LoginScreen";
import { useToast } from "@/hooks/use-toast";

// Simula um banco de dados com usuários
const usuariosDB = [
  { 
    matricula: "12345", 
    nomeAbreviado: "JOÃO SILVA", 
    nomeCompleto: "João da Silva Santos"
  },
  { 
    matricula: "54321", 
    nomeAbreviado: "MARIA SOUSA", 
    nomeCompleto: "Maria Sousa Oliveira"
  },
  { 
    matricula: "98765", 
    nomeAbreviado: "PEDRO GOMES", 
    nomeCompleto: "Pedro Gomes Ferreira"
  },
  { 
    matricula: "3456789", 
    nomeAbreviado: "JOSÉ", 
    nomeCompleto: "José da Silva Santos"
  }
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Removemos o useEffect que verificava se o usuário já estava logado

  const handleLogin = (matricula: string) => {
    setIsLoading(true);
    
    // Simulando uma busca no banco de dados
    setTimeout(() => {
      const usuarioEncontrado = usuariosDB.find(usuario => usuario.matricula === matricula);
      
      if (usuarioEncontrado) {
        // Armazenar os dados do usuário no localStorage
        localStorage.setItem("usuarioDados", JSON.stringify({
          ...usuarioEncontrado,
          foto: usuarioEncontrado.matricula === "3456789" ? 
            "https://www.psicologo.com.br/wp-content/uploads/sou-uma-pessoa-boa-ou-nao.jpg" : 
            null
        }));
        navigate("/cliente/cadastro");
      } else {
        toast({
          title: "Matrícula não encontrada",
          description: "A matrícula informada não foi encontrada no sistema",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  return <LoginScreen onLogin={handleLogin} isLoading={isLoading} />;
};

export default Login;
