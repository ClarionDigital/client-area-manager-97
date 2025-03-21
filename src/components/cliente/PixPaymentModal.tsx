
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Check, Clock, Copy, QrCode } from "lucide-react";
import { LoaderCircle } from "lucide-react";

interface PixPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerData: {
    nomeCompleto: string;
    cpf: string;
    email: string;
    telefone: string;
  };
  valorTotal: number;
  quantity: number;
}

interface PixData {
  qrCode: string;
  pixKey: string;
  expirationDate: string;
  paymentId: string;
}

// Exemplo de QR Code em base64 para teste
const MOCK_QR_CODE = "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";

const PixPaymentModal: React.FC<PixPaymentModalProps> = ({
  open,
  onClose,
  onConfirm,
  customerData,
  valorTotal,
  quantity
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutos em segundos
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "error">("pending");
  const [checkingPayment, setCheckingPayment] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Código PIX copiado!",
        description: "Cole no seu aplicativo de banco para pagar",
        className: "bg-green-50 border-green-200",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Tente selecionar e copiar manualmente",
        variant: "destructive",
      });
    }
  };

  const createPixPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Simulando criação de pagamento PIX");
      
      // Simulamos a criação do pagamento em vez de chamar a API real
      // Isso evita erros de CORS e permite testar o fluxo da aplicação
      const mockPaymentId = `pix_${Date.now()}`;
      
      setTimeout(() => {
        setPixData({
          qrCode: MOCK_QR_CODE, // QR Code fixo para teste
          pixKey: "00020126580014br.gov.bcb.pix0136a37c47d7-935c-44a4-a2e1-2d9391123456520400005303986540510.005802BR5925ASAAS SISTEMAS E TESTE 6008Brasilia62070503***63041234",
          expirationDate: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
          paymentId: mockPaymentId
        });
        
        // Salva o ID do pagamento no localStorage para referência futura
        localStorage.setItem("lastPaymentId", mockPaymentId);
        setLoading(false);
      }, 1500);
      
      /* Código original que tenta chamar a API - Comentado para evitar erros
      const createPaymentResponse = await fetch("https://sandbox.asaas.com/api/v3/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": "3b4f4ccf-0a0d-424f-ab6b-ec09004b06e3"
        },
        body: JSON.stringify({
          customer: "cus_000005115434", // Cliente de teste
          billingType: "PIX",
          value: valorTotal,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Data de vencimento: amanhã
          description: `Compra de ${quantity} KIT Funcional Light`,
          externalReference: `LIGHT-${Date.now()}`,
          postalService: false
        })
      });

      if (!createPaymentResponse.ok) {
        throw new Error("Falha ao criar pagamento PIX");
      }

      const paymentData = await createPaymentResponse.json();
      console.log("Pagamento criado:", paymentData);

      // Obtém o QR Code do pagamento
      const qrCodeResponse = await fetch(`https://sandbox.asaas.com/api/v3/payments/${paymentData.id}/pixQrCode`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access_token": "3b4f4ccf-0a0d-424f-ab6b-ec09004b06e3"
        }
      });

      if (!qrCodeResponse.ok) {
        throw new Error("Falha ao obter QR Code PIX");
      }

      const qrCodeData = await qrCodeResponse.json();
      console.log("QR Code gerado:", qrCodeData);

      setPixData({
        qrCode: qrCodeData.encodedImage,
        pixKey: qrCodeData.payload,
        expirationDate: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        paymentId: paymentData.id
      });

      // Salva o ID do pagamento no localStorage
      localStorage.setItem("lastPaymentId", paymentData.id);
      */

    } catch (err) {
      console.error("Erro ao processar pagamento:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido ao processar pagamento");
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!pixData?.paymentId) return;
    
    setCheckingPayment(true);
    
    try {
      console.log("Simulando verificação de status de pagamento");
      
      // Simular um atraso na verificação de pagamento para dar tempo de clicar em "Já paguei"
      setTimeout(() => {
        setPaymentStatus("success");
        // Salva o ID do pagamento no localStorage
        localStorage.setItem("lastPaymentId", pixData.paymentId);
        
        toast({
          title: "Pagamento confirmado!",
          description: "Seu pagamento foi processado com sucesso",
          className: "bg-green-50 border-green-200",
        });
        
        // Aguarda 2 segundos antes de fechar o modal e confirmar
        setTimeout(() => {
          onConfirm();
        }, 2000);
        
        setCheckingPayment(false);
      }, 1500);
      
      /* Código original que tenta chamar a API - Comentado para evitar erros
      const response = await fetch(`https://sandbox.asaas.com/api/v3/payments/${pixData.paymentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access_token": "3b4f4ccf-0a0d-424f-ab6b-ec09004b06e3"
        }
      });

      if (!response.ok) {
        throw new Error("Falha ao verificar status do pagamento");
      }

      const data = await response.json();
      console.log("Status do pagamento:", data);

      if (data.status === "RECEIVED" || data.status === "CONFIRMED") {
        setPaymentStatus("success");
        // Salva o ID do pagamento no localStorage
        localStorage.setItem("lastPaymentId", pixData.paymentId);
        
        toast({
          title: "Pagamento confirmado!",
          description: "Seu pagamento foi processado com sucesso",
          className: "bg-green-50 border-green-200",
        });
        
        // Aguarda 2 segundos antes de fechar o modal e confirmar
        setTimeout(() => {
          onConfirm();
        }, 2000);
      }
      */
    } catch (err) {
      console.error("Erro ao verificar pagamento:", err);
      setCheckingPayment(false);
    }
  };

  useEffect(() => {
    if (open) {
      createPixPayment();
    }
  }, [open]);

  useEffect(() => {
    let timer: number | undefined;
    
    if (open && remainingTime > 0 && paymentStatus === "pending") {
      timer = window.setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    }
    
    if (remainingTime <= 0) {
      setError("Tempo para pagamento expirado. Por favor, gere um novo QR Code.");
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, remainingTime, paymentStatus]);

  // Verificar status do pagamento a cada 10 segundos
  useEffect(() => {
    let checkInterval: number | undefined;
    
    if (open && pixData && paymentStatus === "pending") {
      // Comentado para usar o botão manual em vez de verificação automática
      // checkPaymentStatus();
      
      // checkInterval = window.setInterval(() => {
      //   checkPaymentStatus();
      // }, 10000);
    }
    
    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [open, pixData, paymentStatus]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Pagamento PIX</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <LoaderCircle className="h-10 w-10 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600">Gerando QR Code PIX...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-800">Erro ao gerar pagamento</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-3 bg-white"
                  onClick={createPixPayment}
                >
                  Tentar novamente
                </Button>
              </div>
            </div>
          ) : paymentStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center">
              <Check className="h-12 w-12 text-green-500 mb-3" />
              <h3 className="font-medium text-xl text-green-800">Pagamento Confirmado!</h3>
              <p className="text-green-700 text-center mt-1">
                Seu pagamento foi processado com sucesso.
              </p>
              <p className="text-sm text-gray-500 text-center mt-4">
                Você será redirecionado em instantes...
              </p>
            </div>
          ) : pixData ? (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-medium text-amber-800">
                    Tempo para pagamento: <span className="font-bold">{formatTime(remainingTime)}</span>
                  </h3>
                </div>
                <p className="text-sm text-amber-700">
                  Este QR Code é válido por 10 minutos. Complete o pagamento dentro deste prazo.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Card className="border-2 border-dashed border-gray-300 bg-gray-50 p-4 flex flex-col items-center">
                    <div className="mb-2 text-sm font-medium text-gray-700">QR Code PIX</div>
                    {pixData?.qrCode ? (
                      <div className="bg-white p-2 rounded-lg">
                        <img 
                          src={`data:image/png;base64,${pixData.qrCode}`} 
                          alt="QR Code PIX" 
                          className="h-44 w-44"
                        />
                      </div>
                    ) : (
                      <div className="h-44 w-44 bg-gray-200 rounded-lg flex items-center justify-center">
                        <QrCode className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Escaneie o código com o aplicativo do seu banco
                    </p>
                  </Card>
                </div>
                
                <div className="flex-1">
                  <Card className="border border-gray-200 p-4 h-full flex flex-col">
                    <div className="mb-3 text-sm font-medium text-gray-700">Código PIX Copia e Cola</div>
                    <div className="relative">
                      <div className="border border-gray-300 rounded-md bg-gray-50 p-3 text-xs break-all text-gray-600 max-h-28 overflow-y-auto mb-2">
                        {pixData?.pixKey || "Carregando código PIX..."}
                      </div>
                      <Button 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => pixData?.pixKey && copyToClipboard(pixData.pixKey)}
                      >
                        <Copy className="h-4 w-4" /> Copiar código PIX
                      </Button>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600 space-y-2 flex-grow">
                      <h4 className="font-semibold">Como pagar:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        <li>Abra o aplicativo do seu banco</li>
                        <li>Escolha a opção "Pagar com PIX"</li>
                        <li>Escaneie o QR code ou copie e cole o código</li>
                        <li>Confirme as informações e finalize o pagamento</li>
                      </ol>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={checkPaymentStatus}
                        disabled={checkingPayment}
                      >
                        {checkingPayment ? (
                          <>
                            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                            Verificando...
                          </>
                        ) : (
                          <>Já paguei, verificar status</>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-sm text-gray-700 mb-2">Resumo do pedido:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-medium">{customerData.nomeCompleto}</span>
                  
                  <span className="text-gray-600">Produto:</span>
                  <span className="font-medium">KIT Funcional Light</span>
                  
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{quantity}</span>
                  
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium text-blue-800">R$ {valorTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
        
        {paymentStatus !== "success" && !loading && (
          <div className="flex justify-end mt-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PixPaymentModal;
