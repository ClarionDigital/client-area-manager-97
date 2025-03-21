
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  loginAlt: (email: string, password: string) => Promise<boolean>;
  isAuthenticatedAlt: boolean;
  userAlt: User | null;
  logoutAlt: () => void;
}

const defaultUsers = [
  {
    id: 1,
    email: 'admin@admin.com',
    password: 'admin',
    name: 'Administrador',
    role: 'admin',
  },
];

const defaultAltUsers = [
  {
    id: 1,
    email: 'contato@alternativacad.com',
    password: 'admin',
    name: 'Administrador Alternativa',
    role: 'admin-alt',
  },
];

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAlt, setUserAlt] = useState<User | null>(null);
  const [isAuthenticatedAlt, setIsAuthenticatedAlt] = useState(false);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }

    const storedUserAlt = localStorage.getItem('adminAltUser');
    if (storedUserAlt) {
      const parsedUserAlt = JSON.parse(storedUserAlt);
      setUserAlt(parsedUserAlt);
      setIsAuthenticatedAlt(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = defaultUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const loginAlt = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = defaultAltUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUserAlt(userWithoutPassword);
      setIsAuthenticatedAlt(true);
      localStorage.setItem('adminAltUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
  };

  const logoutAlt = () => {
    setUserAlt(null);
    setIsAuthenticatedAlt(false);
    localStorage.removeItem('adminAltUser');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // In a real app, this would send a reset email
    const userExists = defaultUsers.some((u) => u.email === email);
    return userExists;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        resetPassword,
        loginAlt,
        isAuthenticatedAlt,
        userAlt,
        logoutAlt,
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
