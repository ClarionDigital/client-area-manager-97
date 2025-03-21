
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface CustomerData {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  quantity: number;
  valorUnitario: number;
}

const ConfirmacaoPagamento = () => {
  const navigate = useNavigate();
  const [clienteData, setClienteData] = useState<CustomerData | null>(null);
  const [emailEnviado, setEmailEnviado] = useState(false);

  useEffect(() => {
    // Recuperar dados do cliente do localStorage
    const storedData = localStorage.getItem("clienteData");
    if (!storedData) {
      navigate("/cliente/login");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as CustomerData;
      setClienteData(parsedData);
      
      // Simular o envio de email (em um ambiente real, isso seria feito pelo backend)
      setTimeout(() => {
        console.log("E-mail enviado para:", parsedData.email, "com os detalhes da compra");
        setEmailEnviado(true);
      }, 1500);
      
    } catch (error) {
      console.error("Erro ao carregar dados do cliente:", error);
      navigate("/cliente/login");
    }
  }, [navigate]);

  const handleVoltarInicio = () => {
    // Limpar dados do localStorage ao voltar para a página inicial
    localStorage.removeItem("clienteData");
    localStorage.removeItem("matricula");
    navigate("/");
  };

  if (!clienteData) {
    return <div className="min-h-screen bg-amber-50 flex items-center justify-center">Carregando...</div>;
  }

  const valorTotal = clienteData.quantity * clienteData.valorUnitario;

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-0">
          <div className="p-6 md:p-8 flex flex-col items-center">
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-12 md:h-16 mb-6"
            />
            
            <div className="bg-green-50 w-full rounded-lg p-6 mb-8 flex flex-col items-center">
              <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">Pagamento Confirmado!</h1>
              <p className="text-green-600 text-center mb-2">
                Seu pedido foi processado com sucesso.
              </p>
              <p className="text-sm text-gray-600 text-center">
                {emailEnviado ? 
                  "Um e-mail com os detalhes da compra foi enviado para seu endereço de e-mail." : 
                  "Um e-mail com os detalhes da compra será enviado em instantes."}
              </p>
            </div>
            
            <div className="w-full mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-lg mb-3">Dados do Cliente</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500">Nome:</span>
                    <span className="font-medium">{clienteData.nomeCompleto}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500">E-mail:</span>
                    <span className="font-medium">{clienteData.email}</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-gray-500">Telefone:</span>
                    <span className="font-medium">{clienteData.telefone}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-lg mb-3">Pedido</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-500">Item</th>
                      <th className="text-center py-2 font-medium text-gray-500">Qtd</th>
                      <th className="text-right py-2 font-medium text-gray-500">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">
                        <div className="font-medium">Kit Completo Light</div>
                        <div className="text-gray-500 text-xs">Crachá PVC + Cordão + Porta Crachá</div>
                      </td>
                      <td className="text-center py-3">{clienteData.quantity}</td>
                      <td className="text-right py-3">R$ {clienteData.valorUnitario.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-right py-3 font-bold">Total:</td>
                      <td className="text-right py-3 font-bold text-blue-800">R$ {valorTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <Button 
              variant="orange"
              size="lg"
              className="w-full max-w-sm"
              onClick={handleVoltarInicio}
            >
              Voltar para a Página Inicial
            </Button>
            
            <div className="mt-8 flex justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
                alt="Light" 
                className="h-10"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmacaoPagamento;
