
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, QrCode, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [orderProcessing, setOrderProcessing] = useState(false);
  
  const valorTotal = valorUnitario * quantity;
  
  const handleProcessPayment = () => {
    setOrderProcessing(true);
    
    setTimeout(() => {
      setOrderProcessing(false);
      toast({
        title: "Pagamento realizado com sucesso!",
        description: "Você receberá um e-mail e WhatsApp com a confirmação",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
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
              <p className="text-gray-600">Revise seus dados e escolha a forma de pagamento.</p>
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
                          <div className="font-medium">Kit Completo Light</div>
                          <div className="text-gray-500 text-xs">Crachá PVC + Cordão + Porta Crachá</div>
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
                  
                  <Tabs defaultValue="pix" value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="pix" className="flex items-center gap-2">
                        <QrCode className="h-4 w-4" />
                        PIX
                      </TabsTrigger>
                      <TabsTrigger value="cartao" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Cartão
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="pix" className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-2 border-2 border-dashed border-gray-300 rounded-md">
                          <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                            <QrCode className="h-16 w-16 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <AlertDescription className="text-xs text-blue-800">
                          Ao clicar em "Pagar agora", você receberá o QR Code PIX para fazer o pagamento.
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                    
                    <TabsContent value="cartao" className="space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="card-number">Número do Cartão</Label>
                          <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="expiry">Validade</Label>
                            <Input id="expiry" placeholder="MM/AA" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="card-name">Nome no Cartão</Label>
                          <Input id="card-name" placeholder="NOME COMO ESTÁ NO CARTÃO" />
                        </div>
                        
                        <div className="space-y-1">
                          <Label>Parcelamento</Label>
                          <RadioGroup defaultValue="1" className="pt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="parcela-1" />
                              <Label htmlFor="parcela-1" className="cursor-pointer">1x de R$ {valorTotal.toFixed(2)} (sem juros)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id="parcela-2" />
                              <Label htmlFor="parcela-2" className="cursor-pointer">2x de R$ {(valorTotal / 2).toFixed(2)} (sem juros)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id="parcela-3" />
                              <Label htmlFor="parcela-3" className="cursor-pointer">3x de R$ {(valorTotal / 3).toFixed(2)} (sem juros)</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button 
                    className="w-full mt-4 h-12 bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all duration-200"
                    onClick={handleProcessPayment}
                    disabled={orderProcessing}
                  >
                    {orderProcessing ? (
                      <>Processando...</>
                    ) : (
                      <>
                        Pagar agora <ArrowRight className="ml-2 h-4 w-4" />
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
    </div>
  );
};

export default PaymentScreen;
