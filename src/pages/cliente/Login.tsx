
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginScreen from "@/components/cliente/LoginScreen";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (matricula: string) => {
    // Armazenar a matrícula no localStorage para uso em outras páginas
    localStorage.setItem("matricula", matricula);
    navigate("/cliente/cadastro");
  };

  return <LoginScreen onLogin={handleLogin} />;
};

export default Login;
