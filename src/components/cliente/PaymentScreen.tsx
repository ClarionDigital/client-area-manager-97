
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PixPaymentModal from "./PixPaymentModal";

interface CustomerData {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
}

interface PaymentScreenProps {
  customerData: CustomerData;
  quantity: number;
  valorUnitario: number;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  customerData,
  quantity,
  valorUnitario,
  onBack
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [pixModalOpen, setPixModalOpen] = useState(false);
  
  const valorTotal = valorUnitario * quantity;
  
  const handleProcessPayment = () => {
    setOrderProcessing(true);
    
    // Abrir o modal de pagamento PIX
    setPixModalOpen(true);
    setOrderProcessing(false);
  };
  
  const handlePaymentConfirmed = () => {
    // Redirecionar para a página de confirmação
    toast({
      title: "Pagamento confirmado!",
      description: "Seu pagamento PIX foi processado com sucesso!",
      className: "bg-green-50 border-green-200",
    });
    
    navigate("/cliente/confirmacao");
  };
  
  const handleClosePixModal = () => {
    setPixModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-amber-50 p-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-0">
          <div className="p-4 md:p-6 flex flex-col items-center">
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-12 md:h-16 mb-6"
            />
            
            <div className="w-full mb-8">
              <Button 
                variant="ghost" 
                className="text-gray-600 mb-4 pl-0"
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para pedido
              </Button>
              
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Finalizar Pagamento</h2>
              <p className="text-gray-600">Revise seus dados e continue para o pagamento.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
              <div className="md:col-span-2">
                <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-inner">
                  <h3 className="font-medium text-lg mb-3">Dados Pessoais</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-gray-500">Nome:</span>
                      <span className="font-medium">{customerData.nomeCompleto}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-gray-500">CPF:</span>
                      <span className="font-medium">{customerData.cpf}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-gray-500">E-mail:</span>
                      <span className="font-medium">{customerData.email}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-gray-500">Telefone:</span>
                      <span className="font-medium">{customerData.telefone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <h3 className="font-medium text-lg mb-3">Detalhes do Pedido</h3>
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
                          <div className="font-medium">KIT Funcional Light</div>
                          <div className="text-gray-500 text-xs">Cartão PVC, Cordão Digital, Porta Crachá</div>
                        </td>
                        <td className="text-center py-3">{quantity}</td>
                        <td className="text-right py-3">R$ {valorUnitario.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-right py-3 font-bold">Total:</td>
                        <td className="text-right py-3 font-bold text-blue-800">R$ {valorTotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h3 className="font-medium text-lg mb-4">Método de Pagamento</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-md border border-blue-100">
                      <QrCode className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">PIX</span>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      <div className="bg-white p-2 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                      <AlertDescription className="text-xs text-blue-800">
                        Ao clicar em "Pagar com PIX", você receberá o QR Code PIX para fazer o pagamento.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 h-12 bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all duration-200"
                    onClick={handleProcessPayment}
                    disabled={orderProcessing}
                  >
                    {orderProcessing ? (
                      <>Processando...</>
                    ) : (
                      <>
                        Pagar com PIX <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Pagamento processado com segurança
                  </p>
                </div>
              </div>
            </div>
            
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
              alt="Light" 
              className="h-10 mt-4"
            />
          </div>
        </Card>
      </div>
      
      <PixPaymentModal
        open={pixModalOpen}
        onClose={handleClosePixModal}
        onConfirm={handlePaymentConfirmed}
        customerData={customerData}
        valorTotal={valorTotal}
        quantity={quantity}
      />
    </div>
  );
};

export default PaymentScreen;
