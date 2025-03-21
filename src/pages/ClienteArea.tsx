
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClienteArea = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/cliente/login");
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      Redirecionando...
    </div>
  );
};

export default ClienteArea;
