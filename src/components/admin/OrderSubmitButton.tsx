
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface OrderSubmitButtonProps {
  onClick: () => void;
}

const OrderSubmitButton: React.FC<OrderSubmitButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center mt-8">
      <Button 
        variant="orange" 
        size="lg" 
        onClick={onClick}
        className="px-8"
      >
        <Send className="mr-2 h-5 w-5" />
        ENVIAR PEDIDO
      </Button>
    </div>
  );
};

export default OrderSubmitButton;
