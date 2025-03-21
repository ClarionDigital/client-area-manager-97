
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentScreen from "@/components/cliente/PaymentScreen";

interface CustomerData {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  quantity: number;
  valorUnitario: number;
}

const Pagamento = () => {
  const navigate = useNavigate();
  const [clienteData, setClienteData] = useState<CustomerData | null>(null);

  useEffect(() => {
    // Verificar se existem dados do cliente no localStorage
    const storedData = localStorage.getItem("clienteData");
    if (!storedData) {
      navigate("/cliente/login");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as CustomerData;
      setClienteData(parsedData);
    } catch (error) {
      console.error("Erro ao carregar dados do cliente:", error);
      navigate("/cliente/login");
    }
  }, [navigate]);

  const handleBackToOrder = () => {
    navigate("/cliente/cadastro");
  };

  if (!clienteData) {
    return <div className="min-h-screen bg-amber-50 flex items-center justify-center">Carregando...</div>;
  }

  return (
    <PaymentScreen
      customerData={{
        nomeCompleto: clienteData.nomeCompleto,
        cpf: clienteData.cpf,
        email: clienteData.email,
        telefone: clienteData.telefone
      }}
      quantity={clienteData.quantity}
      valorUnitario={clienteData.valorUnitario}
      onBack={handleBackToOrder}
    />
  );
};

export default Pagamento;
