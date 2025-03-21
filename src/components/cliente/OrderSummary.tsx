
import React from "react";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";

interface OrderSummaryProps {
  quantity: number;
  valorUnitario: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onFinalizarCompra: () => void;
  isSubmitting?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  quantity,
  valorUnitario,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onFinalizarCompra,
  isSubmitting = false,
}) => {
  const valorTotal = quantity * valorUnitario;
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  return (
    <div className="w-full space-y-6">
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Produto:</span>
            <span className="font-medium">KIT Funcional Light</span>
          </div>
          
          <div className="text-xs text-gray-500 ml-auto">
            contendo Cartão PVC, Cordão Digital e Porta crachá
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Valor unitário:</span>
            <span className="font-medium">{formatCurrency(valorUnitario)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Quantidade:</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={onDecreaseQuantity}
                className="text-gray-500 hover:text-blue-600 transition-colors"
                disabled={quantity <= 1}
              >
                <MinusCircle size={20} />
              </button>
              <span className="font-medium w-6 text-center">{quantity}</span>
              <button 
                onClick={onIncreaseQuantity}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
            <span className="text-gray-700 font-medium">Valor Total:</span>
            <span className="text-lg font-bold text-[#ff6a34]">{formatCurrency(valorTotal)}</span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onFinalizarCompra} 
        className="w-full h-12 bg-[#ff6a34] hover:bg-[#ff5c23] text-white font-semibold shadow-md transition-all duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
          </div>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Finalizar Compra
          </>
        )}
      </Button>
    </div>
  );
};

export default OrderSummary;
