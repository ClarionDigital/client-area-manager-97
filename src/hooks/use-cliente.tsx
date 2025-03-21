
import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';

interface ClienteData {
  id?: string;
  matricula: string;
  nomeAbreviado: string;
  nomeCompleto: string;
  foto: string | null;
}

export const useCliente = () => {
  const [cliente, setCliente] = useState<ClienteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há dados do usuário no localStorage
    const checkClienteData = () => {
      const usuarioDados = localStorage.getItem("usuarioDados");
      if (usuarioDados) {
        const dadosJson = JSON.parse(usuarioDados);
        setCliente(dadosJson);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkClienteData();
  }, []);

  const login = async (matricula: string) => {
    setIsLoading(true);
    const response = await authService.loginCliente(matricula);
    
    if (response.success && response.data) {
      const userData = {
        id: response.data.id,
        matricula: response.data.matricula,
        nomeAbreviado: response.data.nome_abreviado,
        nomeCompleto: response.data.nome,
        foto: response.data.foto_url
      };
      
      setCliente(userData);
      setIsAuthenticated(true);
      localStorage.setItem("usuarioDados", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem("usuarioDados");
    setCliente(null);
    setIsAuthenticated(false);
  };

  return {
    cliente,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
};
