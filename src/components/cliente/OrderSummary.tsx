
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";

interface OrderSummaryProps {
  quantity: number;
  valorUnitario: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onFinalizarCompra: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  quantity,
  valorUnitario,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onFinalizarCompra
}) => {
  const valorTotal = valorUnitario * quantity;
  
  return (
    <div className="w-full space-y-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-all">
          <img 
            src="https://areadocliente.alternativacard.com/up/uploads/alt-67d2e3f6bd0fe.png" 
            alt="Crachá PVC" 
            className="w-24 h-24 object-contain rounded-md mb-3"
          />
          <div className="font-medium text-center">Crachá PVC</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-all">
          <img 
            src="https://areadocliente.alternativacard.com/up/uploads/alt-67d2e2f02ac11.png" 
            alt="Cordão" 
            className="w-24 h-24 object-contain rounded-md mb-3"
          />
          <div className="font-medium text-center">CORDÃO</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-all">
          <img 
            src="https://areadocliente.alternativacard.com/up/uploads/alt-67d2e3f6bd0fe.png" 
            alt="Porta Crachá" 
            className="w-24 h-24 object-contain rounded-md mb-3"
          />
          <div className="font-medium text-center">PORTA CRACHÁ</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-[#8cdcd8]/10 border border-blue-100 rounded-lg p-5 shadow-inner">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-blue-800">Total:</span>
          <span className="font-bold text-lg text-blue-800">R$ {valorTotal.toFixed(2)}</span>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Quantidade:</span>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onDecreaseQuantity}
                className="h-8 w-8 shadow-sm hover:bg-[#8cdcd8]/10 hover:border-[#8cdcd8] transition-colors"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onIncreaseQuantity}
                className="h-8 w-8 shadow-sm hover:bg-[#8cdcd8]/10 hover:border-[#8cdcd8] transition-colors"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-100">
        <p className="font-semibold mb-2">Informações de entrega:</p>
        <p>Após a confirmação do pedido, os materiais serão entregues na sede da Light. Você será notificado sobre o status da entrega via e-mail e WhatsApp.</p>
      </div>
      
      <Alert variant="success" className="bg-[#8cdcd8]/10 border-[#8cdcd8] shadow-md">
        <Check className="h-4 w-4 text-[#8cdcd8]" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Ao finalizar o pedido, você receberá um comprovante por e-mail. Mantenha seus dados atualizados.
        </AlertDescription>
      </Alert>
      
      <Button 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 shadow-md transition-all duration-200" 
        onClick={onFinalizarCompra}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Finalizar Pedido
      </Button>
    </div>
  );
};

export default OrderSummary;
