
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

interface User {
  id: string;
  email: string;
  nome: string;
  papel: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Verificar sessão existente ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Será implementado com authService.loginAdmin real
    const response = await authService.loginAdmin(email, password);
    
    if (response.success && response.data) {
      const userData = {
        id: response.data.id,
        email: response.data.email,
        nome: response.data.nome,
        papel: response.data.papel
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    const response = await authService.resetPassword(email);
    return response.success;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
